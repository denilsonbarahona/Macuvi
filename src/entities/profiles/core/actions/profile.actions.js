export const NEW_PROFILE           = '[profile] new profile';
export const SHOW_PROFILE_RESPONSE = '[profile] show profiles response';
export const GET_PROFILES          = '[profile] get profiles';
export const SHOW_PROFILES         = '[profile] show profiles';
export const DELETE_PROFILE        = '[profile] delete profile';
export const GET_PROFILE_TO_UPDATE = '[profile] get profile to update';
export const UPDATE_PROFILE        = '[profile] update profile';

export const newProfile = (payload)=>({
    type    : NEW_PROFILE ,
    payload : payload 
})

export const showProfileResponse = (payload)=>({
    type    : SHOW_PROFILE_RESPONSE ,
    payload : payload
})

export const getProfiles = (payload)=>({
    type    : GET_PROFILES ,
    payload : payload   
})

export const showProfiles = (payload)=>({
    type    : SHOW_PROFILES ,
    payload : payload
})

export const deleteProfile = (payload)=>({
    type    : DELETE_PROFILE , 
    payload : payload 
})

export const updateProfile = (payload)=>({
    type    : UPDATE_PROFILE ,
    payload : payload
})

export const getProfileToUpdate = (payload)=>({
    type    : GET_PROFILE_TO_UPDATE ,
    payload : payload
})