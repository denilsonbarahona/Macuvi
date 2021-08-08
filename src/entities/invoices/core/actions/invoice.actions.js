export const ADD_TO_INVOICE              = '[invoice] add to invoice'             ;
export const ADDED_TO_INVOICE            = '[invoice] added to invoice'           ;
export const SHOW_INVOICE_TOTAL          = '[invoice] show invoice total'         ;
export const CALCULATE_GLOBAL_DISCOUNT   = '[invoice] calculate global discount'  ;
export const LOAD_CHANGE_VARIATION_POPUP = '[invoice] load change variation popup';
export const UPDATE_VARIATION_POPUP      = '[invoice] update variation popup'     ;
export const SHOW_ERROR_VARIATION_POPUP  = '[invoice] show error variation popup' ;
export const APPLY_PROMOTION             = '[invoice] apply promotion'            ;
export const APPLY_DISCOUNT              = '[invoice] apply discount'             ;
export const RECORD_INVOICE              = '[invoice] record invoice'             ;
export const RECORD_INVOICE_WITH_CASH    = '[invoice] record invoice with cash'   ;
export const SHOW_CASH_POPUP             = '[invoice] show cash popup'            ;
export const SHOW_TICKET_ERROR           = '[invoice] show ticket error'          ;
export const SHOW_CASH_POPUP_ERROR       = '[invoice] show cash popup error'      ;
export const INVOICE_REDIRECT_TO_PRINT   = '[invoice] invoice redirect to print'  ;
export const GET_INVOICE_TO_PRINT        = '[invoice] get invoice to print'       ;
export const SHOW_INVOICE_TO_PRINT       = '[invoice] show invoice to print'      ;
export const EXONERATE_INVOICE           = '[invoice] exonerate invoice'          ;
export const SET_EXONERATED_INVOICE      = '[invoice] set exonerated invoice'     ;
export const GET_INVOICES_LIST           = '[invoice] get invoices list'          ;
export const SHOW_INVOICES_LIST          = '[invoice] show invoices list'         ;
export const INIT_CLEAN_UP               = '[invoice] init clean up'              ;
export const CLEAN_UP                    = '[invoice] clean up'                   ;
export const GET_PRODUCTS_IN_INVOICE     = '[invoice] get products in invoice'    ;
export const SHOW_PRODUCTS_IN_INVOICE    = '[invoice] show products in invoice'   ;
export const CANCEL_INVOICE              = '[invoice] cancel invoice'             ;
export const CHANGE_STATE_POPUP          = '[invoice] change popup'               ;
export const REMOVE_ITEM_FROM_INVOICE    = '[invoice] remove item from invoice'   ;
export const CALCULATE_PRICE_WITH_FEE    = '[invoice] calculate price with fee'   ;

export const addToInvoice = product =>({
    type    : ADD_TO_INVOICE,
    payload : product
})

export const addedToInvoice = product =>({
    type    : ADDED_TO_INVOICE,
    payload : product
})

export const showInvoiceTotal = invoice_total =>({
    type    : SHOW_INVOICE_TOTAL,
    payload : invoice_total
})

export const loadChangeVariationPopUp = product =>({
    type    : LOAD_CHANGE_VARIATION_POPUP,
    payload : product
})

export const updateVariationPopUp = variation =>({
    type    : UPDATE_VARIATION_POPUP,
    payload : variation
})

export const showErrorVariationPopUp = error =>({
    type    : SHOW_ERROR_VARIATION_POPUP,
    payload : error
})

export const calculateGlobalDiscount = payload =>({
    type    : CALCULATE_GLOBAL_DISCOUNT,
    payload : payload
})

export const applyPromotion = payload =>({
    type    : APPLY_PROMOTION,
    payload : payload 
})

export const applyDiscount = payload =>({
    type    : APPLY_DISCOUNT,
    payload : payload
})

export const setRecordInvoice = payload =>({
    type    : RECORD_INVOICE,
    payload : payload
})

export const setRecordInvoiceWithCash = payload =>({
    type    : RECORD_INVOICE_WITH_CASH,
    payload : payload
})

export const showCashPopUp = () =>({
    type    : SHOW_CASH_POPUP
})

export const showTicketError = payload =>({
    type    : SHOW_TICKET_ERROR ,
    payload : payload
})
 
export const showCashPopUpError = payload =>({
    type    : SHOW_CASH_POPUP_ERROR,
    payload : payload
})

export const redirectToPrint = payload =>({
    type    : INVOICE_REDIRECT_TO_PRINT ,
    payload : payload
})

export const getInvoiceToPrint = payload =>({
    type    : GET_INVOICE_TO_PRINT ,
    payload : payload
})

export const showInvoiceToPrint = payload =>({
    type    : SHOW_INVOICE_TO_PRINT ,
    payload : payload
})

export const exonerateInvoice = payload =>({
    type    : EXONERATE_INVOICE ,
    payload : payload
})

export const setExoneratedInvoice = payload =>({
    type    : SET_EXONERATED_INVOICE ,
    payload : payload
})

export const getInvoicesList  = payload =>({
    type    : GET_INVOICES_LIST ,
    payload : payload
})

export const showInvoicesList = payload =>({
    type    : SHOW_INVOICES_LIST ,
    payload : payload
})

export const initCleanUp = () =>({
    type    : INIT_CLEAN_UP
})

export const cleanUp = () =>({
    type    : CLEAN_UP
})

export const getProductsInInvoice =(payload)=>({
    type    : GET_PRODUCTS_IN_INVOICE ,
    payload : payload
})

export const showProductsInInvoice = (payload) =>({
    type   : SHOW_PRODUCTS_IN_INVOICE,
    payload: payload
})

export const cancelInvoice = (payload) =>({
    type    : CANCEL_INVOICE ,
    payload : payload
})

export const changePopUpState = (payload)=>({
    type    : CHANGE_STATE_POPUP,
    payload : payload
})

export const removeItemFromInvoice = (payload)=>({
    type: REMOVE_ITEM_FROM_INVOICE,
    payload: payload
})

export const calculatePriceWithFee = (payload)=>({
    type: CALCULATE_PRICE_WITH_FEE,
    payload: payload
})