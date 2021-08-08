export const GET_TAXES  = '[taxes] get taxes';
export const SHOW_TAXES = '[taxes] show taxes';
export const RESET_FIND_TAXES = '[taxed] reset find taxed';
export const SET_NEW_TAX = '[taxes] set new tax';
export const SHOW_TAXES_RESPONSE = '[taxes] show taxes response';
export const GET_TABLE_TAXES = '[taxes] get table taxes';
export const DELETE_TAX = "[taxes] delete tax";
export const GET_TAX_BY_ID = "[taxes] get tax by id";
export const UPDATE_TAX = "[taxes] update tax";

export const GetTaxes=(payload)=>({
    type     : GET_TAXES , 
    payload  : payload 
})

export const ShowTaxes = (payload) =>({
    type    : SHOW_TAXES ,
    payload : payload
})

export const ResetFindTaxed = ()=>({
    type    : RESET_FIND_TAXES
})

export const SetNewTax = (payload)=>({
    type : SET_NEW_TAX ,
    payload: payload
})

export const ShowTaxesResponse = (payload)=>({
    type : SHOW_TAXES_RESPONSE ,
    payload: payload
})

export const GetTableTaxes = (payload)=>({
    type: GET_TABLE_TAXES ,
    payload: payload
})

export const DeleteTax = (payload) =>({
    type: DELETE_TAX ,
    payload: payload
})

export const GetTaxById = (payload) =>({
    type: GET_TAX_BY_ID ,
    payload: payload
})

export const UpdateTax = (payload)=>({
    type: UPDATE_TAX ,
    payload: payload
})