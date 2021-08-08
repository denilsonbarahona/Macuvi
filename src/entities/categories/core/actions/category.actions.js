export const GET_CATEGORIES                        = '[category] get';
export const GET_CATEGORIES_SUCCESS                = '[category] success';
export const GET_CATEGORIES_FAIL                   = '[category] fail';
export const SET_CATEGORY_SELECTED                 = '[category] set selected';
export const CREATE_CATEGORY                       = '[category] create category';
export const CATEGORY_FORM_RESPONSE_SUCCESS        = '[category] form response success';
export const CATEGORY_FORM_RESPONSE_FAIL           = '[category] form response fail';
export const CATEGORY_BEFORE_SUBMIT_               = '[category] before submit';
export const GET_TABLE_CATEGORIES                  = '[category] get categories table';
export const GET_CATEGORY_BY_ID                    = '[category] get category by id';
export const SHOW_CATEGORY_BY_ID                   = '[category] show category by id';
export const SET_CATEGORY_BY_ID_FALSE              = '[category] set category by id false';
export const UPDATE_CATEGORY_BY_ID                 = '[category] update category by id';
export const SHOW_UPDATE_CATEGORY_BY_ID_RESPONSE   = '[category] show update category by id response';
export const DELETE_CATEGORY_BY_ID                 = '[category] delete category id';
export const DELETE_CATEGORY_RESPONSE              = '[category] delete category response';
export const GET_CATEGORIES_LIST                   = '[category] get categories list';
export const SHOW_CATEGORIES_LIST                  = '[category] show categories list';
export const RESET_FIND_CATEGORY                   = '[category] reset find categories';


export const LoadCategories = company =>({
    type    : GET_CATEGORIES,
    payload : company
})

export const ShowCategories = categories =>({
    type    : GET_CATEGORIES_SUCCESS,
    payload : categories
})

export const CategoriesFail = error => ({
    type    : GET_CATEGORIES_FAIL,
    payload : error
})

export const setCategortSelected = payload =>({
    type    : SET_CATEGORY_SELECTED,
    payload : payload
})

export const createCategory_ = payload =>({
    type    : CREATE_CATEGORY ,
    payload : payload
})

export const formReponse = payload =>({
    type    : (payload.response)
                ?CATEGORY_FORM_RESPONSE_SUCCESS
                :CATEGORY_FORM_RESPONSE_FAIL,
    payload : payload
})

export const stateBeforeSubmit = () =>({
    type : CATEGORY_BEFORE_SUBMIT_
})

export const getCategoriesTable = (payload) =>({
    type    : GET_TABLE_CATEGORIES ,
    payload : payload
})

export const getCategoryById = (payload) =>({
    type    : GET_CATEGORY_BY_ID ,
    payload : payload
})

export const showCategoryById = (payload) =>({
    type    : SHOW_CATEGORY_BY_ID ,
    payload : payload
})

export const setCategoryByIdFalse = () =>({
    type    : SET_CATEGORY_BY_ID_FALSE
})

export const updateCategoryById = (payload) =>({
    type    : UPDATE_CATEGORY_BY_ID ,
    payload : payload
})

export const updateCategoryByIdResponse = (payload) =>({
    type    : SHOW_UPDATE_CATEGORY_BY_ID_RESPONSE ,
    payload : payload
})

export const deleteCategoryById = (payload) =>({
    type    : DELETE_CATEGORY_BY_ID ,
    payload : payload
})

export const deleteCategoryResponse = (payload) =>({
    type    : DELETE_CATEGORY_RESPONSE ,
    payload : payload
})

export const getCategoriesList = (payload)=>({
    type    : GET_CATEGORIES_LIST ,
    payload : payload
})

export const showCategoriesList = (payload)=>({
    type    : SHOW_CATEGORIES_LIST , 
    payload : payload
})

export const resetFindCategory =()=>({
    type    : RESET_FIND_CATEGORY
})