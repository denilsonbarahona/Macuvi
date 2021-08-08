export const LOAD_LOGIN                     = '[ui] page loaded';
export const LOAD_PRODUCTS                  = '[ui] load products'
export const LOAD_PRODUCTS_OFF              = '[ui] load products off';
export const SET_CATEGORY_LOADING_ON        = '[ui] set category loading on';
export const SET_CATEGORY_LOADING_OFF       = '[ui] set category loading off';
export const SET_LOADING_ON                 = '[ui] set loading on';
export const SET_LOADING_OFF                = '[ui] set loading off';
export const LOAD_PRODUCT_TICKET            = '[ui] set loading product ticket';
export const LOAD_PRODUCT_TICKET_OFF        = '[ui] set loading product ticket off';
export const SET_LOADING_BUTTON_ON          = '[ui] set loading button on';
export const SET_LOADING_BUTTON_OFF         = '[ui] set loading button off';
export const SET_LOADING_BUTTON_POPUP_OFF   = '[ui] set loading button popup off';
export const SET_LOADING_BUTTON_POPUP_ON    = '[ui] set loading button popup on';
export const GET_HEADER_LOADING             = '[ui] get header loading';


export const loadLogin = state =>({    
    type: LOAD_LOGIN,
    payload: state
});

export const setLoading = isLoading => ({
    type: isLoading ? SET_LOADING_ON : SET_LOADING_OFF,
    payload: isLoading,
});

export const setProductsLoading = isLoading =>({
    type: isLoading ? LOAD_PRODUCTS : LOAD_PRODUCTS_OFF,
    payload: isLoading,
})

export const setCategoryLoading = isLoading =>({
    type: isLoading?SET_CATEGORY_LOADING_ON:SET_CATEGORY_LOADING_OFF,
    payload: isLoading
})

export const setLoadingProductToTicket = isLoading =>({
    type: isLoading ? LOAD_PRODUCT_TICKET : LOAD_PRODUCT_TICKET_OFF,
    payload: isLoading,
})

export const setLoadingButton = isLoading =>({
    type: isLoading ? SET_LOADING_BUTTON_ON : SET_LOADING_BUTTON_OFF,
    payload: isLoading,
})

export const setLoadingButtonPopUp = isLoading =>({
    type: isLoading ? SET_LOADING_BUTTON_POPUP_ON : SET_LOADING_BUTTON_POPUP_OFF,
    payload: isLoading,
})

export const getHeaderLoading = (loading)=>({
    type    : GET_HEADER_LOADING ,
    payload : loading
})