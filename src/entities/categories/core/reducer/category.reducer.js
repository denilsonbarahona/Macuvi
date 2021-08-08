import * as categoryActions from '../actions/category.actions';

const initialState = {
    payload : [],
    fail    : false,
    success : false,
    find    : true,
    msj     : "",
    setCategory: false,
    category   : {},
    deleteResponse: {} 
}

const category_reducer = (state = initialState, action)=>{
    switch(action.type){
        case categoryActions.GET_CATEGORIES_SUCCESS: return { ...state, payload: action.payload, find: false ,success: true, fail: false, msj:""}
        case categoryActions.CATEGORY_FORM_RESPONSE_SUCCESS: return {...state, success:true, fail: false, msj: action.payload.msj }
        case categoryActions.CATEGORY_FORM_RESPONSE_FAIL: return {...state, success:false, fail: true, msj: action.payload.msj }
        case categoryActions.CATEGORY_BEFORE_SUBMIT_: return {...state, success:false, fail: false, msj: "" }
        case categoryActions.SHOW_CATEGORY_BY_ID: return {...state, category: action.payload, setCategory: true}
        case categoryActions.SET_CATEGORY_BY_ID_FALSE: return {...state, setCategory: false}
        case categoryActions.SHOW_UPDATE_CATEGORY_BY_ID_RESPONSE: return {...state, msj: action.payload.msj, fail: !action.payload.response, success: action.payload.response }
        case categoryActions.DELETE_CATEGORY_RESPONSE: return {...state, deleteResponse: action.payload }
        case categoryActions.SHOW_CATEGORIES_LIST: return {...state, payload: action.payload, find: false}
        case categoryActions.RESET_FIND_CATEGORY: return {...state, find:true}
        default: return state;
    }
}


export default category_reducer;