import * as cookieActions from '../actions/cookie.actions'
import cookie from '../service/cookie.service'

const setCookie = () =>()=>next=>async(action)=>{
    next(action);
    if(action.type === cookieActions.SAVE_COOKIE){                     
        cookie.saveCookie( JSON.stringify(action.payload) )
    }
}

const getCookie = ()=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === cookieActions.LOAD_COOKIE){
        dispatch(cookieActions.showCookie( cookie.getCookie() ))
    }
} 

const deleteCookie = ()=>({dispatch})=>next=>async(action)=>{
    next(action);
    
    if(action.type === cookieActions.LOGOUT){ 
        cookie.deleteCookie()
        dispatch(cookieActions.deleteCookie())
    }
}

const cookieMiddleware = [
    setCookie,
    getCookie,
    deleteCookie
]


export default cookieMiddleware;