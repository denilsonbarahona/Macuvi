import  * as PromoActions from '../actions/promotion.actions';

const initialState = {
    payload              : [] ,
    withPromotion        : [] ,
    showPromotionResponse: {show:false, response:false, msj:""} ,
    showPromotions       : false, 
    loaded               : false,
    show                 : false 
}

const promotion_reducer = (state = initialState , action) =>{
    switch( action.type ){
        case PromoActions.SHOW_PRODUCT_FOR_WITH_PROMOTION : return { ...state, withPromotion: action.payload, showPromotions: true }
        case PromoActions.SHOW_PROMOTION_SETTING_RESPONSE : return { ...state, showPromotionResponse: {show: true, response: action.payload.result, msj: action.payload.msj } }
        case PromoActions.SHOW_PROMOTIONS_AVAILABLE       : return { ...state, payload: action.payload , loaded: true}
        case PromoActions.SHOW_DELETE_PROMOTION_RESPONSE  : return { ...state, showPromotionResponse: {show: true , response: action.payload.result, msj: action.payload.msj } }
        case PromoActions.RESET_PROMOTION_RESPONSE        : return { ...state, showPromotionResponse: {show: false, response: ""                  , msj: ""}}
        case PromoActions.SHOW_PROMOTION_FOR_EDIT         : return { ...state, show: true}
        case PromoActions.SHOW_UPDATE_PROMOTION_RESPONSE  : return { ...state, showPromotionResponse: {show: true , response: action.payload.result, msj: action.payload.msj } }
        default: return state;
    }
}

export default promotion_reducer;