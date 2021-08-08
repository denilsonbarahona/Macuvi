import * as profileActions from '../actions/profile.actions'
import * as uiActions      from '../../../ui/core/actions/ui.actions'
import profileServices     from '../services/profile.service';

const setProfileAction = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === profileActions.NEW_PROFILE){
        dispatch(uiActions.setLoadingButton(true))
        const addProfileResponse = await profileServices.newProfile(request, action.payload)
        dispatch(profileActions.showProfileResponse(addProfileResponse))
        action.payload.resetProfileState()
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getProfiles = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === profileActions.GET_PROFILES){        
        if(action.payload.filter.type !=="0"){ 
            dispatch(uiActions.setLoadingButton(true)) 
        }else{ 
            dispatch(uiActions.setLoading(true)) 
        }
        const profiles = await profileServices.getProfiles(request, action.payload)        
        dispatch(profileActions.showProfiles(profiles))
        if(action.payload.filter.type !=="0"){ 
            dispatch(uiActions.setLoadingButton(false)) 
        }else{ 
            dispatch(uiActions.setLoading(false)) 
        }
    }
}

const deleteProfile = (request) =>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === profileActions.DELETE_PROFILE){
        dispatch(uiActions.setLoadingButtonPopUp(true))
        const deleteResponse = await profileServices.deleteProfile(request, action.payload)
        if(deleteResponse.result){
            const profiles = await profileServices.getProfiles(request, action.payload) 
            dispatch(profileActions.showProfiles(profiles))
        }
        dispatch(profileActions.showProfileResponse(deleteResponse))
        dispatch(uiActions.setLoadingButtonPopUp(false))
    }
}

const getProfileToUpdate = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === profileActions.GET_PROFILE_TO_UPDATE){
        dispatch(uiActions.setLoading(true))
        const profile = await profileServices.getProfileById(request,action.payload)
        window.resetProfileState(profile)
        dispatch(uiActions.setLoading(false))
    }
}

const updateProfile = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === profileActions.UPDATE_PROFILE){
        dispatch(uiActions.setLoadingButton(true))
        const updateResponse = await profileServices.updateProfile(request, action.payload)
        dispatch(profileActions.showProfileResponse(updateResponse))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const profileMiddleWare = [setProfileAction, getProfiles, deleteProfile, getProfileToUpdate, updateProfile]

export default profileMiddleWare