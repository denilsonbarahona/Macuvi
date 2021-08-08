import * as cookieActions from '../actions/cookie.actions'

const initState = {
    cookie : ""   ,
    find   : true , 
    logout : false
}

const cookie = (state = initState, action)=>{

    switch (action.type){
        case cookieActions.SHOW_COOKIE: return {cookie: action.payload, find: false, logout:false}
        case cookieActions.LOGOUT: 
        case cookieActions.DELETE_COOKIE: return {...state, find: false, logout:true}  
        case cookieActions.RESET_COOKIE : return {...state, find: true}      
        default: return state
    }
}

export default cookie