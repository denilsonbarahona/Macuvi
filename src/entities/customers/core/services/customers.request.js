import customerValidator    from './customers.validations';

const getCustomersCombo     = async (compamy, request)=>{
    const customers = await request.customers.getCustomers(compamy).then(res=>{return res})
    var combo = [{value:"0", label:"SIN NOMBRE"}]
    
    customers.forEach((customer)=>{
        combo.push({value: customer.id, RTN: customer.data.CustomerRTN , label: customer.data.CustomerID+"-"+customer.data.CustomerName})
    })

    return combo; 
}

const setCustomers          = async(request, payload)=>{
    const customerValidatorResponse = await customerValidator.newCustomerValidation(request, payload, "create", "")
    if(customerValidatorResponse.result){
        const customerResponse = await request.customers.newCustomer(payload)
        if(customerResponse){
            return { result: true, msj:"La creación del cliente se ha realizado de forma correcta" , emptyFields:[]}
        }else{
            return { result: false, msj:"Error del servidor al realizar la creación del cliente" , emptyFields:[]}
        }
    }
    return customerValidatorResponse;
}

const getFilterCustomers    = async(request, payload)=>{
    let size           = 0
    let customers      = await request.customers.getCustomers(payload.company);
    let customerArray  = []
    let founded        = []
    
    /******* HERE WER MAKE THE FILTER THAT WILL BE APPLIED ************/
    if(payload.filter.type !=="0"){
        for(let i=0;i < customers.length; i++){
            if(payload.filter.type ==="1"){
                if( customers[i].data.CustomerID.includes( payload.filter.value.trim() ) ){
                    founded.push(customers[i])
                }
            }else if(payload.filter.type ==="2") {
                if( customers[i].data.CustomerName.includes( payload.filter.value.trim().toUpperCase() ) ){
                    founded.push(customers[i])
                }
            }else if(payload.filter.type === "3"){
                if( customers[i].data.CustomerPhoneNumber.includes( payload.filter.value.trim() ) ){
                    founded.push(customers[i])
                }
            }else {
                founded.push(customers[i])
            }
        }
    }else {
        founded = customers
    }

    size = founded.length;

    /************** HERE WE MAKE A SPLICE OF 25 THAT HELP US TO MAKE THE PAGINATION EACH PAGE WILL HAVE 25 ROWS ***********/
    while(founded.length > 0){
        customerArray.push(founded.splice(0, 25))
    }
    return {array: customerArray, size: size}
}

const deleteCustomer        = async(request, payload)=>{
    const deleteResponse = await request.customers.deleteCustomer(payload);
    return deleteResponse
}

const getCustomerById       = async(request, payload)=>{
    const customer = await request.customers.getCustomerById(payload)
    return customer
}

const updateCustomer        = async(request, payload)=>{
    const customerValidatorResponse = await customerValidator.newCustomerValidation(request, payload,"update", payload.id)
    if(customerValidatorResponse.result){
        const updateResponse = await request.customers.updateCustomer(payload)
        if(updateResponse){
            return { result: true, msj:"La actualización de la información del cliente se ha realizado de forma correcta " , emptyFields:[]}
        }else{
            return { result: false, msj:"Error al realizar la actualización del cliente" , emptyFields:[]}
        }
    }

    return customerValidatorResponse
}

const getAccountsReceivable = async(request, payload)=>{
    const accountsReceivable = await request.customers.getAccountsReceivable(payload)
    return accountsReceivable;
}

const deleteAccountReceivable = async(request, payload)=>{
    const deleteResponse = await request.customers.deleteAccountReceivable(payload)
    return deleteResponse
}

const getReceivableById    = async(request, payload)=>{
    const receivable = await request.customers.getReceivableById(payload)
    return receivable
}

const setPayment           = async(request, payload) =>{
    
    const receivableValidation = customerValidator.setPaymentValidation(payload)
    
    if(receivableValidation.result){
        const balance = await request.balance.getBalance(payload.company , payload.auth); 
        const receivableResponse = await request.customers.setPaymentToReceivable({...payload, balance: balance[0].id})
        if(receivableResponse){
            return { result: true, msj:"El abono se ha registrado de forma correcta" , emptyFields:[]}
        }else{
            return { result: false, msj:"Error al hacer el registro del abono" , emptyFields:[]}
        }
    }

    return receivableValidation
}

const AccountReceivableNotificationConfig = async(request, payload)=>{
    const notificationValidation = customerValidator.NofiticationConfValidation(payload)
    if(notificationValidation.result){
        const setNotificationResponse = await request.customers.setAccountReceivableNotificationConf(payload);
        return setNotificationResponse;
    }
    return notificationValidation
}

const getAccountReceivableNotificationConf = async(request, payload)=>{
    const accountReceivableNotification = await request.customers.getAccountReceivableNotificationConf(payload)
    return accountReceivableNotification
}

const setCreditFroAccountReceivable = async (request, payload)=>{
    /**** fist we have to check the active account receivable for the customer */
    const accountReceivable = await request.customers.getCustomerActiveAccountReceivable(payload);
    
    if(accountReceivable[0].result){
        /**** now we have to check if we have to set credit updating the account receivable or creating the record ***/        
        if ( ![undefined,""].includes(accountReceivable[0].id) ) {

            const updateResponse = await request.customers.setCreditAccountsReceivable({...payload, 
                                                         account:{id: accountReceivable[0].id, data: accountReceivable[0].data }})
            return updateResponse;
        } else {
            /********  *******/
            const createResponse = await request.customers.setAccountsReceivable({...payload})
            return createResponse;
        }
    }else{
        return false;
    }
}


const customers_requests = {
    getCustomersCombo                   : getCustomersCombo ,
    setCustomers                        : setCustomers      ,
    getFilterCustomers                  : getFilterCustomers,
    deleteCustomer                      : deleteCustomer    ,
    getCustomerById                     : getCustomerById   ,
    updateCustomer                      : updateCustomer    ,
    getAccountsReceivable               : getAccountsReceivable ,
    deleteAccountReceivable             : deleteAccountReceivable,
    getReceivableById                   : getReceivableById ,
    setPayment                          : setPayment        ,
    AccountReceivableNotificationConfig : AccountReceivableNotificationConfig,
    getAccountReceivableNotificationConf: getAccountReceivableNotificationConf,
    setCreditFroAccountReceivable       : setCreditFroAccountReceivable
}

export default customers_requests;