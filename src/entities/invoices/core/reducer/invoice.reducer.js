import * as invoiceActions from '../actions/invoice.actions';

const initialState ={
    payload           : []     ,
    success           : true   ,
    total             : {}     ,
    error             : false  , 
    errorDesc         : {}     ,
    showPopUpError    : false  ,
    popUpError        : ""     ,
    showCashPopUp     : false  , 
    cashPopUpError    : ""     ,
    errorCashPopUp    : false  ,
    invoiceToPrintId  : "false",
    invoiceFindToPrint: true   ,
    invoiceToPrint    : {}     ,
    change            : {}     ,
    isExonerated      : false  ,
    getInvoices       : true   ,
    invoicesList      : []     ,
    productsInInvoice : []     ,
    canceled          : false  ,
    changePopUp       : false  
}


const invoice_reducer = (state = initialState, action)=>{

    switch(action.type){
        
        case invoiceActions.ADDED_TO_INVOICE            : return {  payload             : action.payload , success        : true           ,
                                                                    total               : state.total    , change         : state.change   ,
                                                                    error               : false          , errorDesc      : {}             ,
                                                                    popUpError          : ""             , showPopUpError : false          ,
                                                                    showCashPopUp       : false          , errorCashPopUp : false          ,
                                                                    invoiceToPrintId    : state.invoiceToPrintId                           ,
                                                                    invoiceFindToPrint  : true           , isExonerated     : state.isExonerated, 
                                                                    invoiceToPrint      : state.invoiceToPrint, getInvoices : state.getInvoices ,
                                                                    productsInInvoice   : []             , canceled         : state.canceled,
                                                                    changePopUp         : state.changePopUp
                                                                }; 

        case invoiceActions.SHOW_INVOICE_TOTAL          : return {  payload             : state.payload        , success       : state.success  ,
                                                                    total               : action.payload       , change        : state.change   ,
                                                                    error               : false                , errorDesc     : {}             ,
                                                                    popUpError          : ""                   , showPopUpError:false           ,
                                                                    showCashPopUp       : false                , errorCashPopUp:false           ,
                                                                    invoiceToPrintId    : state.invoiceToPrintId, isExonerated : state.isExonerated,
                                                                    invoiceFindToPrint  : true                 , invoiceToPrint: state.invoiceToPrint,
                                                                    getInvoices         : state.getInvoices    , productsInInvoice: [],
                                                                    canceled            : state.canceled       , changePopUp   : state.changePopUp
                                                                };

        case invoiceActions.LOAD_CHANGE_VARIATION_POPUP : return {  payload            : state.payload   , success        : state.success  ,
                                                                    total              : state.total     , change         : action.payload ,
                                                                    error              : false           , errorDesc      : {}             ,
                                                                    popUpError         : ""              , showPopUpError : false          ,
                                                                    showCashPopUp      : false           , errorCashPopUp : false          ,
                                                                    invoiceToPrintId   : state.invoiceToPrintId, isExonerated: state.isExonerated,
                                                                    invoiceFindToPrint : true            , invoiceToPrint : state.invoiceToPrint ,
                                                                    getInvoices        : state.getInvoices, productsInInvoice: [], 
                                                                    canceled           : state.canceled  , changePopUp    : state.changePopUp
                                                                };

        case invoiceActions.SHOW_ERROR_VARIATION_POPUP  : return {  payload            : state.payload   , success        : state.success  ,
                                                                    total              : state.total     , change         : state.change   , 
                                                                    error              : true            , errorDesc      : action.payload ,
                                                                    popUpError         : ""              , showPopUpError : false          ,
                                                                    showCashPopUp      : false           , errorCashPopUp : false          ,
                                                                    invoiceToPrintId   : state.invoiceToPrintId, isExonerated: state.isExonerated,
                                                                    invoiceFindToPrint : true            , invoiceToPrint : state.invoiceToPrint ,
                                                                    getInvoices        : state.getInvoices,productsInInvoice: [], 
                                                                    canceled           : state.canceled  , changePopUp    : state.changePopUp
                                                                }
        case invoiceActions.SHOW_CASH_POPUP             : return {  payload            : state.payload   , success        : state.success  ,
                                                                    total              : state.total     , change         : state.change   , 
                                                                    error              : state.error     , errorDesc      : state.payload  ,
                                                                    popUpError         : ""              , showPopUpError : state.showPopUpError,
                                                                    showCashPopUp      : true            , errorCashPopUp : false          ,
                                                                    invoiceToPrintId   : state.invoiceToPrintId                            ,
                                                                    invoiceFindToPrint : true            , invoiceToPrint : state.invoiceToPrint,
                                                                    isExonerated       : state.isExonerated , getInvoices : state.getInvoices,
                                                                    productsInInvoice  : []              , canceled       : state.canceled  ,
                                                                    changePopUp        : state.changePopUp
                                                                }
        case invoiceActions.SHOW_TICKET_ERROR           : return { payload            : state.payload   , success        : state.success  ,
                                                                   total              : state.total     , change         : state.change   , 
                                                                   error              : state.error     , errorDesc      : state.errorDesc,
                                                                   popUpError         : action.payload  , showPopUpError : true           ,
                                                                   showCashPopUp      : false           , errorCashPopUp : false          ,
                                                                   invoiceToPrintId   : state.invoiceToPrintId                            ,
                                                                   invoiceFindToPrint : true            , invoiceToPrint : state.invoiceToPrint,
                                                                   isExonerated       : state.isExonerated , getInvoices : state.getInvoices,
                                                                   productsInInvoice  : []              , canceled       : state.canceled ,
                                                                   changePopUp        : state.changePopUp
                                                                 }
        case invoiceActions.SHOW_CASH_POPUP_ERROR       : return {  payload            : state.payload       , success          : state.success  ,
                                                                    total              : state.total         , change           : state.change   , 
                                                                    error              : state.error         , errorDesc        : state.errorDesc,
                                                                    popUpError         : state.popUpError    , showPopUpError   : false       ,
                                                                    showCashPopUp      : state.showCashPopUp , errorCashPopUp   : true,
                                                                    cashPopUpError     : action.payload      , invoiceToPrintId : state.invoiceToPrintId,
                                                                    invoiceFindToPrint : true                , invoiceToPrint   : state.invoiceToPrint,
                                                                    isExonerated       : state.isExonerated  , getInvoices      : state.getInvoices,
                                                                    productsInInvoice  : []                  , canceled         : state.canceled,
                                                                    changePopUp        : state.changePopUp
                                                                }
        case invoiceActions.SET_EXONERATED_INVOICE     : return {  payload            : state.payload       , success          : state.success  ,
                                                                    total              : state.total         , change           : state.change   , 
                                                                    error              : state.error         , errorDesc        : state.errorDesc,
                                                                    popUpError         : state.popUpError    , showPopUpError   : false       ,
                                                                    showCashPopUp      : state.showCashPopUp , errorCashPopUp   : true,
                                                                    cashPopUpError     : state.cashPopUpError, invoiceToPrintId : state.invoiceToPrintId,
                                                                    invoiceFindToPrint : true                , invoiceToPrint   : state.invoiceToPrint,
                                                                    isExonerated       : action.payload      , getInvoices      : state.getInvoices,
                                                                    productsInInvoice  : []                  , canceled         : state.canceled,
                                                                    changePopUp        : state.changePopUp
                                                                }
        case invoiceActions.CHANGE_STATE_POPUP         : return {   payload            : state.payload       , success          : state.success  ,
                                                                    total              : state.total         , change           : state.change   , 
                                                                    error              : state.error         , errorDesc        : state.errorDesc,
                                                                    popUpError         : state.popUpError    , showPopUpError   : false,
                                                                    showCashPopUp      : state.showCashPopUp , errorCashPopUp   : true,
                                                                    cashPopUpError     : state.cashPopUpError, invoiceToPrintId : state.invoiceToPrintId,
                                                                    invoiceFindToPrint : true                , invoiceToPrint   : state.invoiceToPrint,
                                                                    isExonerated       : state.isExonerated  , getInvoices      : state.getInvoices,
                                                                    productsInInvoice  : []                  , canceled         : state.canceled ,
                                                                    changePopUp        : action.payload
                                                                }                                                        
        case invoiceActions.INVOICE_REDIRECT_TO_PRINT   : return {  payload            : state.payload        , success          : state.success  ,
                                                                    total              : state.total          , change           : state.change   , 
                                                                    error              : state.error          , errorDesc        : state.errorDesc,
                                                                    popUpError         : state.popUpError     , showPopUpError   : false          ,
                                                                    showCashPopUp      : state.showCashPopUp  , errorCashPopUp   : true           ,
                                                                    cashPopUpError     : state.cashPopUpError , invoiceToPrintId : action.payload ,
                                                                    invoiceFindToPrint : true                 , invoiceToPrint   : state.invoiceToPrint,
                                                                    isExonerated       : state.isExonerated   , getInvoices      : true,
                                                                    invoicesList       : state.invoicesList   , productsInInvoice: [], 
                                                                    canceled           : state.canceled       , changePopUp      : false
                                                                }
        case invoiceActions.SHOW_INVOICE_TO_PRINT       : return {  payload           : []    , success          : true,
                                                                    total             : {}    , change           : {}, 
                                                                    error             : false , errorDesc        : {}   ,
                                                                    popUpError        : ""    , showPopUpError   : false,
                                                                    showCashPopUp     : false , errorCashPopUp   : false,
                                                                    cashPopUpError    : ""    , invoiceToPrintId : "false",
                                                                    invoiceFindToPrint: false , invoiceToPrint   : action.payload.invoice,
                                                                    isExonerated      : false , getInvoices      : true,
                                                                    invoicesList      : state.invoicesList, productsInInvoice: [] ,
                                                                    canceled          : action.payload.canceled, 
                                                                    changePopUp       : false      
                                                                }
        case invoiceActions.CLEAN_UP                    : return {  payload           : []    , success          : true,
                                                                    total             : {}    , change           : {}, 
                                                                    error             : false , errorDesc        : {},
                                                                    popUpError        : ""    , showPopUpError   : false,
                                                                    showCashPopUp     : false , errorCashPopUp   : false,
                                                                    cashPopUpError    : ""    , invoiceToPrintId : "false",
                                                                    invoiceFindToPrint: true  , invoiceToPrint   : {},
                                                                    isExonerated      : false , getInvoices      : false ,
                                                                    invoicesList      : state.invoicesList, productsInInvoice   : [], 
                                                                    canceled          : state.canceled , changePopUp : false
                                                                }
        case invoiceActions.SHOW_INVOICES_LIST          : return {  payload           : []    , success          : true,
                                                                    total             : {}    , change           : {}, 
                                                                    error             : false , errorDesc        : {},
                                                                    popUpError        : ""    , showPopUpError   : false,
                                                                    showCashPopUp     : false , errorCashPopUp   : false,
                                                                    cashPopUpError    : ""    , invoiceToPrintId : "false",
                                                                    invoiceFindToPrint: true  , invoiceToPrint   : {},
                                                                    isExonerated      : false , getInvoices      : false ,
                                                                    invoicesList      : action.payload, productsInInvoice: [], 
                                                                    canceled          : state.canceled, changePopUp: false
                                                                }  
        case invoiceActions.SHOW_PRODUCTS_IN_INVOICE    : return {  payload           : []    , success          : true,
                                                                    total             : {}    , change           : {}, 
                                                                    error             : false , errorDesc        : {},
                                                                    popUpError        : ""    , showPopUpError   : false,
                                                                    showCashPopUp     : false , errorCashPopUp   : false,
                                                                    cashPopUpError    : ""    , invoiceToPrintId : "false",
                                                                    invoiceFindToPrint: true  , invoiceToPrint   : {},
                                                                    isExonerated      : false , getInvoices      : false ,
                                                                    invoicesList      : state.invoicesList, productsInInvoice: action.payload, 
                                                                    canceled          : state.canceled, changePopUp: false
                                                                }                                                              
        default: return state;
    }
}

export default invoice_reducer;

