import * as loginActions from '../actions/login.actions'

const initialState = {
    payload: [],
    error: {
        msj:"",
        emptyFields:[]
    },
    response: {show: false, response: false, msj:"",emptyFields:[]} ,
    securityLevel: {securityLevel:0},
    fail: false
}

const login_reducer =(state = initialState, action)=>{
       
    switch(action.type){
        case loginActions.LOAD_SIGN_UP           :
        case loginActions.LOAD_LOGIN             : return {...state, payload: action.payload, fail: false, error:{ msj:"", emptyFields:[]} }                                       
        case loginActions.SIGN_UP_SUCCCESS       :
        case loginActions.LOGIN_SUCCESS          : return {...state, payload: action.payload, success: true, fail:false, error:{ msj:"", emptyFields:[]} }
        case loginActions.SIGN_UP_FAILURE        :
        case loginActions.LOGIN_FAIL             : return {...state, error  : action.payload, fail: true }
        case loginActions.SHOW_LOGIN_RESPONSE    : return {...state, response: {show: true, response: action.payload.result, msj: action.payload.msj, emptyFields: action.payload.emptyFields } }
        case loginActions.SIGN_UP_SHOW_PASS_LEVEL: return {...state, securityLevel: action.payload }
        default                                  : return state
    }
}

export default login_reducer;