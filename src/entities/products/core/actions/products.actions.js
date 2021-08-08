export const GET_PRODUCTS                 = '[product] get by category';
export const GET_PRODUCTS_SUCCESS         = '[product] get success';
export const GET_PRODUCTS_FAIL            = '[product] get fail';
export const LOAD_VARIATIONS_POPUP        = '[product] load variation popup';
export const SHOW_VARIATIONS_POPUP        = '[product] show variations popup';
export const SHOW_ERROR_VARIATIONS_POPUP  = '[product] show error variations popup';
export const SET_IDENTITIES               = '[product] set identities';
export const GET_PRODUCTS_BY_INPUT        = '[product] get products by input';
export const SHOW_PRODUCTS_FILTER         = '[product] show products filter';
export const GET_PRODUCTS_LIST            = '[product] get products list';
export const SHOW_PRODUCTS_LIST           = '[product] show product list';
export const GET_PRODUCT_BY_ID            = '[product] get product by id';
export const SHOW_PRODUCT_BY_ID           = '[product] show product by id';
export const UPDATE_CHANGE_STATE          = '[product] update change state';
export const RESET_STATE_EDIT_PRODUCT     = '[product] reset state edit product';
export const UPDATE_PRODUCT_INFORMATION   = '[product] update product information';
export const SHOW_UPDATE_RESPONSE         = '[product] show update response';
export const DELETE_PRODUCT               = '[product] delete product';
export const SHOW_DELETE_RESPONSE         = '[product] show delete response';
export const GET_IDENTITIES               = '[product] get identities';
export const SHOW_IDENTITIES              = '[product] show identities';
export const FILTER_IDENTITY              = '[product] filter identity';
export const GET_IDENTITIES_DESCRIPTIONS  = '[product] get identities descriptions';
export const SHOW_IDENTITIES_DESCRIPTIONS = '[product] show identities descriptions';
export const UPDATE_IDENTITY_DESCRIPTION  = '[product] update identity description';
export const SHOW_UPDATE_IDENTITY_DESCRIPTION_RESPONSE  = '[product] show identity description response';
export const CREATE_PRODUCT_INFORMATION   = '[product] create product information';
export const SHOW_CREATE_PRODUCT_RESPONSE = '[product] show create product response';
export const RESET_CREATION_STATE         = '[product] reset creation product state';
export const STOP_CREATION_STATE_CHANGE   = '[product] stop creaction state change';
export const CLEAN_PRODUCT_PAYLOAD        = '[product] clean product payload';
export const GET_VARIATIONS_BY_PRODUCT    = '[product] get variations by product';

export const LoadProductsByCategory = payload =>({
    type    : GET_PRODUCTS,
    payload : payload
})

export const ShowProductsByCategory = products =>({
    type    : GET_PRODUCTS_SUCCESS,
    payload : products
})

export const ProductsFail = error => ({
    type    : GET_PRODUCTS_FAIL,
    payload : error
})

export const loadVariationPopUp = product =>({
    type    : LOAD_VARIATIONS_POPUP,
    payload : product 
})

export const ShowVariationsPopUp = product =>({
    type    : SHOW_VARIATIONS_POPUP,
    payload : product 
})

export const ShowErrorVariationsPopUp = error =>({
    type: SHOW_ERROR_VARIATIONS_POPUP,
    payload: error
})

export const SetIdentities = identities =>({
    type: SET_IDENTITIES,
    payload: identities
})

export const GetProductsByInput = payload =>({
    type: GET_PRODUCTS_BY_INPUT,
    payload: payload
})

export const ShowProductsFilter = payload =>({
    type    : SHOW_PRODUCTS_FILTER,
    payload : payload
})

export const GetProductList = payload =>({
    type    : GET_PRODUCTS_LIST ,
    payload : payload
})

export const ShowProductsList = payload =>({
    type    : SHOW_PRODUCTS_LIST ,
    payload : payload
})

export const GetProductById = payload =>({
    type    : GET_PRODUCT_BY_ID ,
    payload : payload
})

export const ShowProductById = payload =>({
    type    : SHOW_PRODUCT_BY_ID ,
    payload : payload
})

export const UpdateChangeState = () =>({
    type    : UPDATE_CHANGE_STATE 
})

export const ResetEditProdutState =()=>({
    type  : RESET_STATE_EDIT_PRODUCT
})

export const UpdateProductInformation =(payload)=>({
    type    : UPDATE_PRODUCT_INFORMATION , 
    payload : payload
})

export const ShowUpdateResponse =(payload)=>({
    type    : SHOW_UPDATE_RESPONSE , 
    payload : payload
})

export const DeleteProduct = (payload)=>({
    type    : DELETE_PRODUCT ,
    payload : payload
})

export const ShowDeleteResponse = (payload)=>({
    type    : SHOW_DELETE_RESPONSE , 
    payload : payload
})

export const GetIdentities = (payload)=>({
    type    : GET_IDENTITIES , 
    payload : payload
})

export const ShowIdentities = (payload)=>({
    type    : SHOW_IDENTITIES ,
    payload : payload
})

export const FilterIdentity = (payload)=>({
    type    : FILTER_IDENTITY , 
    payload : payload
})

export const GetIdentitiesDescriptions = (payload)=>({
    type    : GET_IDENTITIES_DESCRIPTIONS ,
    payload : payload
})

export const ShowIdentitiesDescriptions = (payload)=>({
    type    : SHOW_IDENTITIES_DESCRIPTIONS ,
    payload : payload
})

export const UpdateIdentityDescription = (payload) =>({
    type    : UPDATE_IDENTITY_DESCRIPTION ,
    payload : payload
})

export const ShowIdentityDescriptionResponse =(payload)=>({
    type    : SHOW_UPDATE_IDENTITY_DESCRIPTION_RESPONSE,
    payload : payload
})

export const CreateProductInformation =(payload)=>({
    type    : CREATE_PRODUCT_INFORMATION ,
    payload : payload
})

export const ShowCreateProductResponse = (payload)=>({
    type    : SHOW_CREATE_PRODUCT_RESPONSE ,
    payload : payload
})

export const ChangeCreateState = (payload) =>({
    type    : (payload)?RESET_CREATION_STATE:STOP_CREATION_STATE_CHANGE ,
    payload : payload
})

export const CleanProductsPayload = (payload) => ({
    type    : CLEAN_PRODUCT_PAYLOAD ,
    payload : payload
})

export const GetVariationByProduct = (payload) =>({
    type    : GET_VARIATIONS_BY_PRODUCT,
    payload : payload
})