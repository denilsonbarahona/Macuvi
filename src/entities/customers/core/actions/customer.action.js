export const GET_CUSTOMERS                 = '[customers] get customers';
export const SHOW_CUSTOMERS                = '[customers] show customers';
export const SET_CUSTOMER                  = '[customers] set customer';
export const SHOW_SET_CUSTOMER_RESPONSE    = '[customers] show set customer response';
export const RESET_CUSTOMER_STATE          = '[customers] reset customer state';
export const GET_FILTER_CUSTOMERS          = '[customers] get filter customers';
export const DELETE_CUSTOMER_BY_ID         = '[customers] delete customers';
export const SHOW_DELETE_RESPONSE          = '[customers] show delete response';
export const GET_CUSTOMER_BY_ID            = '[customers] get customer by id';
export const SHOW_CUSTOMER_TO_UPDATE       = '[customers] show customer to update';
export const UPDATE_CUSTOMER               = '[customers] update customer';
export const SHOW_UPDATE_CUSTOMER_RESPONSE = '[customers] show update customer response';
export const GET_ACCOUNTS_RECEIVABLE       = '[customers] get accounts receivable';
export const SHOW_ACCOUNTS_RECEIVABLE      = '[customers] show accounts receivable';
export const DELETE_ACCOUNTS_RECEIVABLE    = '[customers] delete accounts receivable';
export const GET_ACCOUNT_RECEIVABLE_BY_ID  = '[customers] get account receivable by id';
export const SHOW_ACCOUNT_RECEIVABLE_BY_ID = '[customers] show account receivable by id';
export const SET_PAYMENT_TO_RECEIVABLE     = '[customers] set payment to receivable';
export const SHOW_SET_PAYMENT_TO_RECEIVABLE= '[customers] show set payment to receivable';
export const CHANGE_PAY_RECEIVABLE_FORM    = '[customers] change pay receivable form';
export const SET_ACCOUNT_RECEIVABLE_CONF   = '[customers] set account receivable conf';
export const ACCOUNT_RECEIVABLE_RESPONSE   = '[customers] account receivable response';
export const GET_ACCOUNT_RECIEVABLE_CONF   = '[customers] get account receivable conf';

export const getCustomers = company =>({
    type: GET_CUSTOMERS ,
    payload: company
})

export const showCustomers = customers =>({
    type: SHOW_CUSTOMERS ,
    payload: customers
})

export const setCustomer = payload =>({
    type   : SET_CUSTOMER ,
    payload: payload
})

export const showSetCustomerResponse = payload =>({
    type   : SHOW_SET_CUSTOMER_RESPONSE ,
    payload: payload
})

export const ResetCustomerState = payload =>({
    type    : RESET_CUSTOMER_STATE ,
    payload : payload
})

export const GetFilterCustomers = payload =>({
    type    : GET_FILTER_CUSTOMERS ,
    payload : payload
})

export const DeleteCustomerById = payload =>({
    type    : DELETE_CUSTOMER_BY_ID , 
    payload : payload
})

export const ShowDeleteCustomerResponse = payload =>({
    type    : SHOW_DELETE_RESPONSE ,
    payload : payload
})

export const GetCustomerByID = payload =>({
    type    : GET_CUSTOMER_BY_ID ,
    payload : payload
})

export const showCustomerToUpdate = payload =>({
    type    : SHOW_CUSTOMER_TO_UPDATE , 
    payload : payload
})

export const UpdateCustomer = payload=>({
    type    : UPDATE_CUSTOMER , 
    payload : payload 
})

export const ShowUpdateCustomerResponse = payload =>({
    type    : SHOW_UPDATE_CUSTOMER_RESPONSE ,
    payload : payload
})

export const GetAccountsReceivable = payload => ({
    type    : GET_ACCOUNTS_RECEIVABLE ,
    payload : payload
})

export const ShowAccountsReceivanle = payload => ({
    type    : SHOW_ACCOUNTS_RECEIVABLE ,
    payload : payload
})

export const DeleteAccountReceivable = payload => ({
    type    : DELETE_ACCOUNTS_RECEIVABLE ,
    payload : payload
})

export const GetAccountsReceivableById = payload =>({
    type    : GET_ACCOUNT_RECEIVABLE_BY_ID ,
    payload : payload
})

export const ShowAccountReceivableById = payload =>({
    type    : SHOW_ACCOUNT_RECEIVABLE_BY_ID ,
    payload : payload
})

export const SetPaymentToReceivable = payload =>({
    type    : SET_PAYMENT_TO_RECEIVABLE , 
    payload : payload
})

export const SetChangePaymentStateForm = payload =>({
    type    : CHANGE_PAY_RECEIVABLE_FORM ,
    payload : payload
})

export const setAccountReceivableConfNotification = (payload)=>({
    type    : SET_ACCOUNT_RECEIVABLE_CONF ,
    payload : payload
})

export const setAccountReceivableResponse = payload =>({
    type    : ACCOUNT_RECEIVABLE_RESPONSE ,
    payload : payload
})

export const getAccountReceivableConf = payload =>({
    type    : GET_ACCOUNT_RECIEVABLE_CONF ,
    payload : payload
})