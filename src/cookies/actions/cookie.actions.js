export const SAVE_COOKIE   = '[cookie] save';
export const LOAD_COOKIE   = '[cookie] load cookie';
export const SHOW_COOKIE   = '[cookie] show cookie';
export const LOGOUT        = '[cookie] logout';
export const DELETE_COOKIE = '[cookie] delete cookie';
export const RESET_COOKIE  = '[cookie] reset cookie';

export const saveCookie = cookie => ({
    type: SAVE_COOKIE,
    payload: cookie
});

export const showCookie = (cookie) => ({
    type: SHOW_COOKIE,
    payload: cookie
});

export const loadCookie = () => ({
    type: LOAD_COOKIE,
    payload: {}
});

export const logOut = () => ({
    type: LOGOUT,
    payload: {}
}); 

export const deleteCookie = cookie => ({
    type: DELETE_COOKIE,
    payload: cookie
});

export const resetCookie = cookie =>({
    type : RESET_COOKIE
})