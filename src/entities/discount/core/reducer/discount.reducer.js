import * as discountActions from '../actions/discount.actions';

const initialState = {
    payload         : []    ,
    setWithDiscount : []    ,
    globalDicount   : 0     ,
    success         : true  ,
    error           : false ,    
    loaded          : false , 
    show            : false ,
    errorDesc       : {}    ,    
    discountResponse: {show:false, response:false, msj:""}
}


const discount_reducer =(state = initialState, action)=>{
    switch(action.type){
        case discountActions.SHOW_GLOBAL_DISCOUNT      : return { ...state, payload         : action.payload, success : true , error:false , errorDesc:{} , loaded : true }
        case discountActions.SET_GLOBAL_DISCOUNT       : return { ...state, globalDicount   : action.payload }
        case discountActions.SHOW_PRODUCT_WITH_DISCOUNT: return { ...state, setWithDiscount : action.payload, loaded: false }
        case discountActions.SHOW_SET_DISCOUNT_RESPONSE: return { ...state, discountResponse: {show: true, response: action.payload.result, msj: action.payload.msj}}
        case discountActions.SHOW_DISCOUNTS            : return { ...state, payload         : action.payload, loaded: true}
        case discountActions.SHOW_DELETE_DISCOUNT      : return { ...state, discountResponse: {show: true , response: action.payload.result, msj: action.payload.msj}}
        case discountActions.RESET_DISCOUNT_RESPONSE   : return { ...state, discountResponse: {show: false, response: ""                   , msj: ""}}
        case discountActions.SHOW_DISCOUNT_FOR_EDIT    : return { ...state, show: true }
        case discountActions.SHOW_UPDATE_RESPONSE      : return { ...state, discountResponse: {show: true , response: action.payload.result, msj: action.payload.msj }}
        default:  return state;
    }
}


export default discount_reducer;
