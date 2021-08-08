import firebase from '../../../../Service/firebase/firebase.service';

const getBalance = async(company, auth)=>{
    const balance = await firebase.firestore().collection("CashBalance")
                                .where("CashBalanceAuthId","==",auth)
                                .where("CashBalanceState","==",1)
                                .where("CashBalanceCompanyId","==",company)
                                .get().then((res)=>{ 
                                    var balance = []
                                    balance.push( res.docs.map(dataSnapShot=>{ return { id: dataSnapShot.id , data: dataSnapShot.data() } }) )                                
                                    return balance;
                                })
                                .catch(()=>{
                                    return []
                                })
    return !balance.length?[]:balance[0];
}

const createBalance = async(params)=>{
    const datetime = new Date()
    const date = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()

    const success =  firebase.firestore().collection("CashBalance").add({
                        CashBalanceAuthId           : params.auth ,
                        CashBalanceAuthName         : params.authName,
                        CashBalanceEndDate          : "" ,
                        CashBalanceFinalBalanceCash : params.initBalance ,
                        CashBalanceInitBalanceCash  : params.initBalance ,
                        CashBalanceMoneyExpenses    : 0  ,
                        CashBalanceMoneyIncome      : 0  ,
                        CashBalanceStartDate        : date ,
                        CashBalanceState            : 1  /*State 1 means that this balance is already open*/ ,
                        CashBalancesExpensesDetail  : [] ,
                        CashBalancesIncomesDetail   : [] ,
                        CashBalancesInvoices        : [] ,
                        CashBalanceCompanyId        : params.companyId        
                    })
                    .then(()=>{ return true })
                    .catch(()=>{ return false })
    return success
}

const closeBalance = async(balanceId)=>{
    
    const datetime = new Date()
    const date = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()
 
    const balance = await firebase.firestore().collection("CashBalance").doc(balanceId).get()
                              
    const success = await firebase.firestore().collection("CashBalance").doc(balanceId)
                            .update({
                                CashBalanceState  : 0 ,
                                CashBalanceEndDate: date,
                                CashBalanceFinalBalanceCash : (Number(balance.data().CashBalanceInitBalanceCash)+Number(balance.data().CashBalanceMoneyIncome))-Number(balance.data().CashBalanceMoneyExpenses), 
                            })
                            .then(()=>{return true })
                            .catch(()=>{ return false })
    return success;
}

const createExpense = async(balanceId, expenseDescription , expenseValue)=>{
    
    const datetime = new Date()
    const date     = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()    
    const balance  = await firebase.firestore().collection("CashBalance").doc(balanceId).get()
    const expense  = balance.data().CashBalancesExpensesDetail;
    
    expense.push({  date        : date , 
                    description : expenseDescription.toUpperCase(), 
                    value       : expenseValue }) 

    const success  = await balance.ref.update({ 
                                                CashBalanceFinalBalanceCash : Number(balance.data().CashBalanceFinalBalanceCash)-Number(expenseValue),
                                                CashBalanceMoneyExpenses    : Number(balance.data().CashBalanceMoneyExpenses)+Number(expenseValue),
                                                CashBalancesExpensesDetail  : expense
                                            })
                                            .then(res=>{  return true  })
                                            .catch(err=>{ return false })
    return success;
}

const createIncome = async(payload)=>{
    
    const datetime = new Date()
    const date     = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()    
    const balance  = await firebase.firestore().collection("CashBalance").doc(payload.id).get()
    const income   = balance.data().CashBalancesIncomesDetail;
    const invoices = balance.data().CashBalancesInvoices;
    
    income.push({   date        : date , 
                    description : payload.description.toUpperCase(), 
                    value       : payload.value }) 
    
    if(payload.setInvoice){
        invoices.push({date   : payload.invoice.date, 
                       invoice: payload.invoice.number, 
                       value  : payload.invoice.value })
    }
                    
    const success  = await balance.ref.update({ 
                                                CashBalanceFinalBalanceCash : Number(balance.data().CashBalanceFinalBalanceCash)+Number(payload.value),
                                                CashBalanceMoneyIncome      : Number(balance.data().CashBalanceMoneyIncome)+Number(payload.value),
                                                CashBalancesIncomesDetail   : income,
                                                CashBalancesInvoices        : invoices
                                            })
                                            .then(() =>{ return true  })
                                            .catch(()=>{ return false })
    return success;
}




const balance_service = {

    getBalance    : getBalance      ,
    createBalance : createBalance   ,
    closeBalance  : closeBalance    ,
    createExpense : createExpense   ,
    createIncome  : createIncome
}

export default balance_service;