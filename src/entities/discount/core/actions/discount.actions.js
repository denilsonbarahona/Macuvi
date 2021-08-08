export const FIND_GLOBAL_DISCOUNT       ='[discount] find global discount';
export const SHOW_GLOBAL_DISCOUNT       ='[discount] show global discount';
export const SET_GLOBAL_DISCOUNT        ='[discount] set global discount';
export const SET_DISCOUNT               ='[discount] set discount';
export const SET_PRODUCTS_WITH_DISCOUNT ='[discount] set products with discount';
export const SHOW_PRODUCT_WITH_DISCOUNT ='[discount] show products with discount';
export const SHOW_SET_DISCOUNT_RESPONSE ='[discount] show set discount response';
export const GET_DISCOUNTS              ='[discount] get discounts';
export const SHOW_DISCOUNTS             ='[discount] show discounts';
export const DELETE_DISCOUNT            ='[discount] delete discount';
export const SHOW_DELETE_DISCOUNT       ='[discount] show delete discount';
export const RESET_DISCOUNT_RESPONSE    ='[discount] reset discount response';
export const GET_DISCOUNT_BY_ID         ='[discount] get discount by id';
export const SHOW_DISCOUNT_FOR_EDIT     ='[discount] show discount for edit';
export const UPDATE_DISCOUNT            ='[discount] update discount';
export const SHOW_UPDATE_RESPONSE       ='[discount] show update response';

export const findGlobalDiscount = company => ({
    type    : FIND_GLOBAL_DISCOUNT,
    payload : company
});

export const showGlobalDiscount = payload => ({
    type    : SHOW_GLOBAL_DISCOUNT,
    payload : payload
});

export const setGlobalDiscount = discount =>({
    type    : SET_GLOBAL_DISCOUNT,
    payload : discount
})

export const setNewDiscount      = payload => ({
    type    : SET_DISCOUNT ,
    payload : payload
})

export const setProductsWithDiscount = payload =>({
    type    : SET_PRODUCTS_WITH_DISCOUNT ,
    payload : payload
})

export const showProductsWithDiscount = payload =>({
    type    : SHOW_PRODUCT_WITH_DISCOUNT , 
    payload : payload
})

export const showSetDiscountResponse = payload =>({
    type    : SHOW_SET_DISCOUNT_RESPONSE ,
    payload : payload
})

export const getDiscountsAvailable = payload =>({
    type    : GET_DISCOUNTS , 
    payload : payload
})

export const showDiscounts = payload =>({
    type    : SHOW_DISCOUNTS ,
    payload : payload
})

export const deleteDiscount = payload =>({
    type    : DELETE_DISCOUNT ,
    payload : payload
})

export const showDeleteDiscount = payload =>({
    type    : SHOW_DELETE_DISCOUNT ,
    payload : payload
})

export const resetDiscountResponse = ()=>({
    type    : RESET_DISCOUNT_RESPONSE
})

export const getDiscountById =(payload)=>({
    type    : GET_DISCOUNT_BY_ID ,
    payload : payload
})

export const showDiscountForEdit=()=>({
    type    : SHOW_DISCOUNT_FOR_EDIT 
})

export const updateDiscount =(paylaod)=>({
    type    : UPDATE_DISCOUNT ,
    payload : paylaod
})

export const showUpdateResponse =(payload)=>({
    type    : SHOW_UPDATE_RESPONSE ,
    payload : payload
})