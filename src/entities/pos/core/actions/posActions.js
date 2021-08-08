export const SET_NEW_POS = '[pos] set new pos';
export const SHOW_POS_RESPONSE = '[pos] show pos response';
export const GET_POS = '[pos] get pos';
export const GET_POS_COMBOX = '[pos] get pos combox';
export const SHOW_POS_LIST = '[pos] show pos list';
export const DELETE_POS = '[pos] delete pos';
export const GET_POS_BY_ID = '[pos] get pos by id';
export const UPDATE_POS_BY_ID  = '[pos] update pos by id';

export const setNewPOS = (payload)=>({
    type   : SET_NEW_POS , 
    payload: payload
})

export const showPOSResponse = (payload)=>({
    type   : SHOW_POS_RESPONSE ,
    payload: payload
})

export const getPOSList = (payload)=>({
    type     : GET_POS ,
    payload  : payload
})

export const showPOSList = (payload)=>({
    type    : SHOW_POS_LIST ,
    payload : payload
})  

export const deletePOS = (payload)=>({
    type    : DELETE_POS ,
    payload : payload
})

export const getPOSBYID = (payload)=>({
    type    : GET_POS_BY_ID ,
    payload : payload
})

export const updatePOS = (payload)=>({
    type    : UPDATE_POS_BY_ID ,
    payload : payload
})

export const getPOSCombox = (payload)=>({
    type : GET_POS_COMBOX,
    payload: payload
})