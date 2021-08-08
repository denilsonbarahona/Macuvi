import * as customerActions from '../actions/customer.action';

const initialState = {
    payload              : []    ,
    customer             : {}    ,
    receivable           : {}    ,
    success              : true  ,
    getCustomers         : true  ,
    getAccountsReceivable: true  ,
    error                : false ,
    ChangeCustomerState  : false ,  
    ChangePayReceivable  : false ,
    SetResponse          : {show:false, response:false, msj:""} ,
    deleteResponse       : {show:false, response:false, msj:""} ,
    updateResponse       : {show:false, response:false, msj:""} ,
    accountReceivableResponse: {show: false, response: false, msj:""}

}

const customer_reducers = (state = initialState, action)=>{
    switch(action.type){
        case customerActions.SHOW_CUSTOMERS               : return {...state , payload            : action.payload, 
                                                                               success            : true , 
                                                                               error              : false, 
                                                                               getCustomers       : false }
        case customerActions.RESET_CUSTOMER_STATE         : return {...state , ChangeCustomerState: action.payload }
        case customerActions.SHOW_SET_CUSTOMER_RESPONSE   : return {...state , SetResponse        : { show: true, response: action.payload.result, msj: action.payload.msj }}
        case customerActions.SHOW_DELETE_RESPONSE         : return {...state , deleteResponse     : { show: true, response: action.payload.result, msj: action.payload.msj }} 
        case customerActions.SHOW_CUSTOMER_TO_UPDATE      : return {...state , customer           : action.payload , ChangeCustomerState: true }
        case customerActions.SHOW_UPDATE_CUSTOMER_RESPONSE: return {...state , updateResponse     : { show: true, response: action.payload.result, msj: action.payload.msj }}
        case customerActions.SHOW_ACCOUNTS_RECEIVABLE     : return {...state , payload            : action.payload , getAccountsReceivable: false }
        case customerActions.SHOW_ACCOUNT_RECEIVABLE_BY_ID: return {...state , receivable         : action.payload , ChangeCustomerState: true }
        case customerActions.CHANGE_PAY_RECEIVABLE_FORM   : return {...state , ChangePayReceivable: action.payload}
        case customerActions.ACCOUNT_RECEIVABLE_RESPONSE  : return {...state , accountReceivableResponse: { show: true, response: action.payload.result, msj: action.payload.msj } }
        default : return state
    }
}

export default customer_reducers;
