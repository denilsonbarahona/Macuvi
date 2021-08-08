export const LOAD_LOGIN              = '[login] load';
export const LOGIN_SUCCESS           = '[login] success';
export const LOGIN_FAIL              = '[login] fail';
export const LOAD_SIGN_UP            = '[login] load sign up';
export const SIGN_UP_SUCCCESS        = '[login] sign up success';
export const SIGN_UP_FAILURE         = '[login] sign up failure';
export const SIGN_UP_PASS_LEVEL      = '[login] security level';
export const SIGN_UP_SHOW_PASS_LEVEL = '[login] show security level';
export const LOAD_PASS_RESET         = '[login] load reset';
export const PASS_RESET_SUCCESS      = '[login] reset success';
export const PASS_RESET_FAILURE      = '[login] reset failure';
export const SIGN_UP_FROM_INVITATION = '[login] sign up from invitation';
export const REQUEST_CHANGE_PASSWORD = '[login] request change password';
export const SHOW_LOGIN_RESPONSE     = '[login] show login response';
export const CHANGE_PASSWORD_LOGIN   = '[login] change password login';
export const ACTIVATE_ACCOUNT        = '[login] activate account';

export const LoadLogin = login => ({
    type   : LOAD_LOGIN,
    payload: login
})

export const LoginSuccess = login => ({
    type   : LOGIN_SUCCESS,
    payload: login
})

export const LoginFail = error => ({
    type   : LOGIN_FAIL,
    payload: error
})

export const loadSignUp = login =>({
    type: LOAD_SIGN_UP,
    payload: login
})

export const signUpSuccess = login =>({
    type: SIGN_UP_SUCCCESS,
    payload: login
})

export const signUpFailure = (payload) =>({
    type: SIGN_UP_FAILURE,
    payload:payload
})

export const securityLevelValidator = (password)=>({
    type: SIGN_UP_PASS_LEVEL,
    payload:password
})

export const showSecurityLevel = (level)=>({
    type: SIGN_UP_SHOW_PASS_LEVEL,
    payload:level
})


export const loadPassReset = login =>({
    type   : LOAD_PASS_RESET,
    payload: login
})

export const passResetSuccess = login =>({
    type   : PASS_RESET_SUCCESS,
    payload:login
})

export const passResetFailure = login =>({
    type   : PASS_RESET_FAILURE,
    payload: login
})

export const signUpFromInvitation = payload =>({
    type   : SIGN_UP_FROM_INVITATION ,
    payload: payload
})

export const requestChangePassword = payload =>({
    type    : REQUEST_CHANGE_PASSWORD ,
    payload : payload
})

export const ShowLoginResponse = payload =>({
    type    : SHOW_LOGIN_RESPONSE ,
    payload : payload
})

export const changePasswordlogin = payload =>({
    type    : CHANGE_PASSWORD_LOGIN ,
    payload : payload
})

export const activateAccount = payload =>({
    type    : ACTIVATE_ACCOUNT ,
    payload : payload 
})