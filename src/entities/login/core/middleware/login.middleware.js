import * as loginActions from '../actions/login.actions';
import loginService from '../services/login.services'
import * as uiActions from '../../../ui/core/actions/ui.actions';
import * as cookieActions from '../../../../cookies/actions/cookie.actions';

const loginMiddleWare = (requests)=>({dispatch})=>next=> async(action)=>{
        next(action);
     
        if(action.type === loginActions.LOAD_LOGIN){            
            dispatch(uiActions.setLoading(true))
            const login = await loginService.login(requests, action.payload)                         
            if(login.result){                       
                dispatch( cookieActions.saveCookie(JSON.stringify({ login:login.login, company:login.company }) ) )
                dispatch(uiActions.setLoading(false))  
                dispatch(loginActions.LoginSuccess(login))    
            }else{                
                dispatch(loginActions.LoginFail({msj:login.msj, emptyFields:[]}) )    
                dispatch(uiActions.setLoading(false))  
            }            
        }   
}

const SignUpMiddleWare = (requests)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type===loginActions.LOAD_SIGN_UP){
        dispatch(uiActions.setLoading(true))                
        /************ HERE WE DO THE SIGN UP PROCESS RETURNING THE RESULT OF THE PROCESS************/
        const response = await loginService.signUp(action.payload, requests).then(res=>{ return res })         
        if(response.result){
            action.payload.resetFormState()
        }
        dispatch(loginActions.ShowLoginResponse(response))
        dispatch(uiActions.setLoading(false))
    }
}

const securityLevelMiddleWare = ()=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type===loginActions.SIGN_UP_PASS_LEVEL){             
        /************ HERE WE CHECK THE SECURITY LEVEL OF THE PASSWORD************/
        const passLevel = await loginService.passSecurityLevel(action.payload).then(res=>{return res})        
        dispatch(loginActions.showSecurityLevel(passLevel))       
    }
}

const signUpFromInvitation = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === loginActions.SIGN_UP_FROM_INVITATION){        
        dispatch(uiActions.setLoadingButton(true))        
        const signUpFromInvitation = await loginService.signUpFromInvitation(request, action.payload)        
        if(!signUpFromInvitation.result){
            dispatch(loginActions.signUpFailure({msj: signUpFromInvitation.msj, emptyFields: signUpFromInvitation.emptyFields}))
            dispatch(uiActions.setLoadingButton(false))
        }else{
            dispatch(uiActions.setLoadingButton(false))
            dispatch(loginActions.signUpSuccess(signUpFromInvitation))
        }
        
    }
}

const requestChangePassword = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === loginActions.REQUEST_CHANGE_PASSWORD){
        dispatch(uiActions.setLoadingButton(true))
        const requestResponse = await loginService.requestChangePassword(request, action.payload)
        dispatch(loginActions.ShowLoginResponse(requestResponse))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const changeLoginPassword = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === loginActions.CHANGE_PASSWORD_LOGIN){
        dispatch(uiActions.setLoadingButton(true))
        const changePasswordResponse = await loginService.changeLoginPassword(request, action.payload)
        dispatch(loginActions.ShowLoginResponse(changePasswordResponse))        
        dispatch(uiActions.setLoadingButton(false))
    }
}

const activateAccount = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === loginActions.ACTIVATE_ACCOUNT){
        dispatch(uiActions.setLoading(true))
        const activateAccount = await loginService.ActivateAccount(request, action.payload)
        dispatch(loginActions.ShowLoginResponse(activateAccount))
        dispatch(uiActions.setLoading(false))
    }
}

const authMiddleWare = [ loginMiddleWare     , SignUpMiddleWare     ,securityLevelMiddleWare,
                         signUpFromInvitation, requestChangePassword,changeLoginPassword    ,
                         activateAccount ]

export default authMiddleWare
