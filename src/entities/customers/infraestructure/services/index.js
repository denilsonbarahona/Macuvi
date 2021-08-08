import firebase from '../../../../Service/firebase/firebase.service';

const getCustomers = async(company)=>{
    const customer = await firebase.firestore().collection("Customers")
                                    .where("CustomerCompanyId","==",company)
                                    .get().then(res=>{
                                        var AllCustomers = []
                                        AllCustomers.push(res.docs.map(dataSnapShot=>{
                                                            const customers_ = {id: dataSnapShot.id , data: dataSnapShot.data()}

                                                            return customers_;
                                                        }))
                                        return AllCustomers;
                                    })
    return customer[0]
}

const checkDNIInCompany = async(payload, type , id)=>{
    const customerDNI = await firebase.firestore().collection("Customers")
                                        .where("CustomerCompanyId","==",payload.company)
                                        .where("CustomerID","==",payload.dni)
                                        .get().then(res=>{
                                            let customers = []
                                            customers.push(res.docs.map(dataSnapShot=>{
                                                            const customers_ = {id:dataSnapShot.id}
                                                            return customers_;
                                                        }))

                                            if(type ==="update" &&  customers[0].length === 1){
                                                return (customers[0][0].id === id)?false:true
                                            }else {
                                                return customers[0].length ? true : false
                                            }
                                            
                                        })    
    return customerDNI;
}

const newCustomer = async (payload)=>{
    var today = new Date()
    var stringDate = today.getFullYear()+"-"+(today.getMonth() + 1)+"-"+today.getDate()
        
    const customerResponse = await firebase.firestore().collection("Customers")
                                            .add({
                                                CustomerCompanyId   : payload.company,
                                                CustomerDate        : stringDate,
                                                CustomerEmail       : payload.email,
                                                CustomerID          : payload.dni,
                                                CustomerName        : payload.name.toUpperCase(),
                                                CustomerPhoneNumber : payload.phone,
                                                CustomerRTN         : payload.rtn
                                            })
                                            .then (()=>{ return true  })
                                            .catch(()=>{ return false })
    return customerResponse
}

const deleteCustomer = async(payload)=>{
    const response = await firebase.firestore().collection("Customers").doc(payload.id)
                        .delete()
                        .then(()=>{ return  {result: true  , msj:"La información del cliente se ha eliminado de forma correcta"} })
                        .catch(()=>{ return {result: false , msj:"Error al eliminar la información del cliente"} })
    return response

}

const getCustomerById = async(payload)=>{
    const customer = await firebase.firestore().collection("Customers").doc(payload.id).get()
    return customer.data()
}

const updateCustomer = async(payload)=>{
    const customer = await firebase.firestore().collection("Customers")
                                .doc(payload.id)
                                .update({
                                    CustomerCompanyId   : payload.company,
                                    CustomerEmail       : payload.email,
                                    CustomerID          : payload.dni,
                                    CustomerName        : payload.name.toUpperCase(),
                                    CustomerPhoneNumber : payload.phone,
                                    CustomerRTN         : payload.rtn
                                })
                                .then (()=>{ return true  })
                                .catch(()=>{ return false })
    return customer
}

const getAccountsReceivable = async(payload)=>{
    const chunk_accounts = []
    let   founded        = []
    let   size           = 0
    /*** 
     *  HERE WE GET THE ACCOUNTS RECEIVABLES THAT THERE ARE IN A COMPANY
     * 
    */
    const accounts       = await firebase.firestore().collection("AccountsReceivable")
                                    .where("AccountsReceivableCompanyId","==",payload.company)
                                    .where("AccountsReceivableState","==",1).get()
                                    .then(res=>{
                                            var receivables = []
                                            receivables.push( res.docs.map(dataSnapShot=>{
                                                                    return {id:dataSnapShot.id , data: dataSnapShot.data()}
                                                                }) )
                                            return receivables;
                                    })
                                    .catch(()=>{ return false })
    
    /*********
     * HERE WE CHECK IF THE QUERY RESULT WAS DIFERENT OF FALSE IF IT IS FALSE WE RETURN EMPTY ARRAY 
     *  IF NOT WE CHECK THE FILTER OPTIONS
     */
    if(accounts !== false){
        size = accounts[0].length

        /***
         * IF THE FILTER IS ZERO WE GET ALL ACCOUNTS RECEIVABLE IN FIREBASE FOR THIS COMPANY
         */
        if(payload.filter.type !=="0"){

            for(let i=0; i < accounts[0].length; i++){
                /**
                 * HERE THE FILTER HAS TO BE FOR THE DNI NUMBER 
                 */
                if(payload.filter.type ==="1"){
                    if( accounts[0][i].data.AccountsReceivableCustomer.idNumber.toString().includes(payload.filter.value.trim()) ){
                        founded.push(accounts[0][i])
                    }
                } else if(payload.filter.type ==="2"){
                   /**
                     * HERE THE FILTER HAS TO BE FOR THE NAME 
                     */
                    if( accounts[0][i].data.AccountsReceivableCustomer.Name.includes(payload.filter.value.trim().toUpperCase()) ){
                        founded.push(accounts[0][i])
                    }
                } else{
                    founded.push(accounts[0][i])
                }               
            }
        }else{
            founded = accounts[0]
        }

        while(founded.length>0){
            chunk_accounts.push( founded.splice(0,25) )
        }

        return {array: chunk_accounts, size: size }
    }

    return {array:[], size: 0}
}

const deleteAccountReceivable = async(payload)=>{
    const response = firebase.firestore().collection("AccountsReceivable").doc(payload.id).delete()
                        .then(()=>{ return  {result: true  , msj:"La cuenta por cobrar se la eliminado de forma correcta"} })
                        .catch(()=>{ return {result: false , msj:"Error al eliminar la cuenta por cobrar"} })
    return response
}

const getReceivableById = async(payload)=>{
    const recivable = await firebase.firestore().collection("AccountsReceivable").doc(payload.id).get()
    return recivable.data()
}

const setPaymentToReceivable = async(payload)=>{    
    /******* HERE WE GET THE CURRENT ACCOUNT RECEIVABLE REF ************/
    const accountDocRef = firebase.firestore().collection("AccountsReceivable").doc(payload.id);
    const balance = firebase.firestore().collection("CashBalance").doc(payload.balance);
    /*******************************************************************/
    const income = await balance.get().then(res=>{ return res.data().CashBalancesIncomesDetail; })
    const totalBalance = await balance.get().then(res=>{ return res.data().CashBalanceFinalBalanceCash; })
    const totalIncome = await balance.get().then(res=>{ return res.data().CashBalanceMoneyIncome; })
    /*******************************************************************/
    const success = await firebase.firestore().runTransaction(transaction=>{
        return transaction.get(accountDocRef).then(res=>{
            /***************HERE WE GET THE CURRENT DATE FORMATED ***************/ 
            let datetime = new Date()
            let date     = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()
            /************** HERE WE SET THE FIELD THAT WE ARE GOING TO UPDATE **********/
            let   totalPayment = Number(res.data().AccountsReceivablePayments ) + Number(payload.pay)
            let   total        = Number(res.data().AccountsReceivableTotalDebt) - Number(payload.pay)
            
            let random       = (Math.random()*1000)+700
            let PayReference = (res.id+"-"+random.toString().replace(".","")).toUpperCase();
            let payments     = res.data().AccountsReceivablePaymentsDetail
                payments.push({date: date, value: Number(payload.pay).toFixed(2), type: payload.type , reference: PayReference })

            transaction.update(accountDocRef, {
                AccountsReceivableTotalDebt: total.toFixed(2),
                AccountsReceivablePayments: totalPayment.toFixed(2),
                AccountsReceivablePaymentsDetail: payments,
                AccountsReceivableState: (Number(total).toFixed(2)<=Number(0).toFixed(2))?0:1
            }) 

            /************** IF TYPE THEN WE INCREASE THE CURRENT BALANCE ********/
            if (payload.type ==="Efectivo") {
               income.push({
                    date: date , 
                    description: "Pago a cuenta por cobrar".toUpperCase(), 
                    value: payload.pay }) 

                transaction.update(balance, {
                    CashBalanceFinalBalanceCash: Number(totalBalance)+Number(payload.pay),
                    CashBalanceMoneyIncome: Number(totalIncome)+Number(payload.pay),
                    CashBalancesIncomesDetail: income,
                })
            }
        })
    })
    .then(()=>{ return true })
    .catch(()=>{ return false })

    return success

}

const getCustomerActiveAccountReceivable = async(payload)=>{
    
    const accountReceivable = await firebase.firestore().collection("AccountsReceivable")
                                            .where("AccountsReceivableCompanyId","==",payload.company)
                                            .where("AccountsReceivableCustomer.id","==",payload.customer.value)
                                            .where("AccountsReceivableState","==",1)
                                            .get()
                                            .then(res=>{
                                                let account = []
                                                account.push(res.docs.map(dataSnapShot=>{
                                                    return {id: dataSnapShot.id, data: dataSnapShot.data(), result: true}
                                                }))
                                                return !account[0].length?
                                                            [{id: "", data: "", result: true}]:
                                                            account[0]
                                                        })
                                            .catch(()=>{
                                                return [{id: "", data: {}, result: false}] });
    return accountReceivable;
}

const setAccountsReceivable  = async(payload)=>{

    const result = await firebase.firestore().collection("AccountsReceivable")
                                .add({
                                    AccountsReceivableCompanyId: payload.company ,
                                    AccountsReceivableCustomer : { id      : payload.customer.value,  
                                                                   idNumber: payload.customer.label.split("-")[0] ,
                                                                   Name    : payload.customer.label.split("-")[1] } ,
                                    AccountsReceivableState    : 1,
                                    AccountsReceivableCreditDetail: [{date: payload.date, value: Number(payload.total) }],
                                    AccountsReceivableCredit   : Number(payload.total) ,
                                    AccountsReceivablePaymentsDetail: [],
                                    AccountsReceivablePayments : 0,
                                    AccountsReceivableDate     : payload.date,
                                    AccountsReceivableDateTime : new Date(payload.date).getTime(),
                                    AccountsReceivableTotalDebt: Number(payload.total)
                                })
                                .then( ()=>{ return true })
                                .catch(()=>{ return false });
    return result;
}

const setCreditAccountsReceivable = async(payload)=>{
    
    const CreditAccounts = payload.account.data.AccountsReceivableCreditDetail;
          CreditAccounts.push({date: payload.date, value: payload.total })
          
    const SetCreditResponse = await firebase.firestore().collection("AccountsReceivable").doc(payload.account.id)
                                        .update({
                                            AccountsReceivableCreditDetail  :  CreditAccounts ,
                                            AccountsReceivableTotalDebt     :  Number(payload.account.data.AccountsReceivableTotalDebt)+Number(payload.total),
                                            AccountsReceivableCredit        :  Number(payload.account.data.AccountsReceivableCredit)+Number(payload.total)
                                        })
                                        .then(()=>{
                                            return true })
                                        .catch(()=>{ 
                                            return false })
    return SetCreditResponse;
}

const setAccountReceivableNotificationConf = async(payload)=>{


        if(payload.id !== ""){
            const UpdateresponseNotification = await firebase.firestore().collection("AccountsReceivableConfiguration").doc(payload.id)
                    .update({ ConfigurationDays: Number(payload.days) })
                    .then(()=>{  return { result: true, msj:"la configuración se ha realizado de forma correcta", emptyFields:[] }  })
                    .catch(()=>{ return { result: false, msj:"Error al agrega el limite de días en cuentas por cobrar", emptyFields:[] }  })
            return UpdateresponseNotification;
        }else{
            const setResponseNotification = await firebase.firestore().collection("AccountsReceivableConfiguration")
                    .add({
                        ConfigurationDays: Number(payload.days) ,
                        ConfigurationCompany: payload.company
                    })
                    .then(()=>{  return { result: true, msj:"la configuración se ha realizado de forma correcta", emptyFields:[] }  })
                    .catch(()=>{ return { result: false, msj:"Error al agrega el limite de días en cuentas por cobrar", emptyFields:[] }  })
            return setResponseNotification                                
        }        
    
}

const getAccountReceivableNotificationConf = async(payload)=>{
    const confNotification = await firebase.firestore().collection("AccountsReceivableConfiguration")
            .where("ConfigurationCompany","==",payload.company)
            .get()
            .then(res=>{
                let configuration = {id: "", data:{} }
                    configuration = res.docs.length>0
                                        ?res.docs.map(dataSnapShot=>{ return {id: dataSnapShot.id, data: dataSnapShot.data() } })
                                        :[configuration]
                return configuration[0]
            })
            .catch(()=>{ return [{id: "", data:{} }] })    
    return confNotification                                                
}

const customer_services = {
    getCustomers           : getCustomers        ,
    checkDNIInCompany      : checkDNIInCompany   ,
    newCustomer            : newCustomer         ,
    deleteCustomer         : deleteCustomer      ,
    getCustomerById        : getCustomerById     ,
    updateCustomer         : updateCustomer      ,
    getAccountsReceivable  : getAccountsReceivable,
    deleteAccountReceivable: deleteAccountReceivable,
    getReceivableById      : getReceivableById   ,
    setPaymentToReceivable : setPaymentToReceivable,
    setAccountReceivableNotificationConf: setAccountReceivableNotificationConf,
    getAccountReceivableNotificationConf: getAccountReceivableNotificationConf,
    setAccountsReceivable  : setAccountsReceivable,
    getCustomerActiveAccountReceivable: getCustomerActiveAccountReceivable,
    setCreditAccountsReceivable: setCreditAccountsReceivable
}

export default customer_services;

