export const UPDATE_COMPANY_INFORMATION    = '[company] update company information';
export const SHOW_COMPANY_UPDATE_RESPONSE  = '[company] show company update response';
export const GET_COMPANY_INFORMATION_BY_ID = '[company] get company information by id';


export const getCompanyInformationById  = (payload)=>({
    type    : GET_COMPANY_INFORMATION_BY_ID ,
    payload : payload
}) 

export const updateCompanyInformation   = (payload)=>({
    type    : UPDATE_COMPANY_INFORMATION ,
    payload : payload
})

export const showCompanyUpdateResponse  = (payload)=>({
    type    : SHOW_COMPANY_UPDATE_RESPONSE ,
    payload : payload
}) 
