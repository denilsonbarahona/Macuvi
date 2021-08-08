import * as uiActions from '../actions/ui.actions'

const initState = {
    loading        : false,
    loadingProducts: false,
    loadingCategory: false,
    loadingToTicket: false,
    button         : false,
    buttonPopUp    : false,
    headerLoading  : false
}

const uiReducer = (state = initState, action)=>{

    switch (action.type){
        case uiActions.SET_LOADING_ON              :  return {...state, loading: true }
        case uiActions.SET_LOADING_OFF             :  return {...state, loading: false }
        case uiActions.SET_CATEGORY_LOADING_ON     :  return {...state, loadingCategory: true }
        case uiActions.SET_CATEGORY_LOADING_OFF    :  return {...state, loadingCategory: false }
        case uiActions.LOAD_PRODUCTS               :  return {...state, loadingProducts: true}
        case uiActions.LOAD_PRODUCTS_OFF           :  return {...state, loadingProducts: false }
        case uiActions.LOAD_PRODUCT_TICKET         :  return {...state, loadingToTicket: true}
        case uiActions.LOAD_PRODUCT_TICKET_OFF     :  return {...state, loadingToTicket: false}
        case uiActions.SET_LOADING_BUTTON_ON       :  return {...state, button: true}
        case uiActions.SET_LOADING_BUTTON_OFF      :  return {...state, button: false}   
        case uiActions.SET_LOADING_BUTTON_POPUP_OFF:  return {...state, buttonPopUp: false}
        case uiActions.SET_LOADING_BUTTON_POPUP_ON :  return {...state, buttonPopUp: true}        
        case uiActions.GET_HEADER_LOADING          :  return {...state, headerLoading: true}
        default: return state
    }
}

export default uiReducer