export const SET_NEW_PROMOTION               = "[promotion] set new promotion";
export const GET_PRODUCT_FOR_WITH_PROMOTION  = '[promotion] get products for with promotion';
export const SHOW_PRODUCT_FOR_WITH_PROMOTION = '[promotion] show products for with promotion';
export const SHOW_PROMOTION_SETTING_RESPONSE = '[promotion] show promotion setting response';
export const GET_PROMOTIONS_AVAILABLE        = '[promotion] get promotion available';
export const SHOW_PROMOTIONS_AVAILABLE       = '[promotion] show promotions available';
export const DELETE_PROMOTION                = '[promotion] delete promotion';
export const SHOW_DELETE_PROMOTION_RESPONSE  = '[promotion] show delete promotion response';
export const RESET_PROMOTION_RESPONSE        = '[promotion] reset promotion response';
export const GET_PROMOTION_BY_ID             = '[promotion] get promotion by id';
export const SHOW_PROMOTION_FOR_EDIT         = '[promotion] show promotion for edit';
export const UPDATE_PROMOTION                = '[promotion] update promotion';
export const SHOW_UPDATE_PROMOTION_RESPONSE  = '[promotion] show update promotion response';


export const SetNewPromotion = (payload)=>({
    type     : SET_NEW_PROMOTION ,
    payload  : payload
})

export const getProductsForPromotion = (payload)=>({
    type    : GET_PRODUCT_FOR_WITH_PROMOTION , 
    payload : payload
})

export const showProductsForPromotion = (payload)=>({
    type    : SHOW_PRODUCT_FOR_WITH_PROMOTION ,
    payload : payload
})

export const showPromotionSettingResponse = (payload)=>({
    type    : SHOW_PROMOTION_SETTING_RESPONSE ,
    payload : payload
})

export const getPromotionAvailable = (payload)=>({
    type    : GET_PROMOTIONS_AVAILABLE ,
    payload : payload
})

export const showPromotionsAvailable = (payload)=>({
    type    : SHOW_PROMOTIONS_AVAILABLE ,
    payload : payload
})

export const deletePromotion = (payload) =>({
    type    : DELETE_PROMOTION ,
    payload : payload
})

export const showDeletePromotionResponse = (payload)=>({
    type    : SHOW_DELETE_PROMOTION_RESPONSE , 
    payload : payload
})

export const resetPromotionResponse = ()=>({
    type    : RESET_PROMOTION_RESPONSE
})

export const getPromotionById =(payload)=>({
    type    : GET_PROMOTION_BY_ID ,
    payload : payload
})

export const showPromotionForEdit =()=>({
    type    : SHOW_PROMOTION_FOR_EDIT
})

export const updatePromotion = (payload)=>({
    type    : UPDATE_PROMOTION ,
    payload : payload
})

export const showUpdatePromotionResponse = (payload)=>({
    type    : SHOW_UPDATE_PROMOTION_RESPONSE ,
    payload : payload
})
