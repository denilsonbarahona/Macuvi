import profileValidator from './profile.validation'

const newProfile     = async(request, payload)=>{

    const validated = await profileValidator.validationBeforeSave(request, payload, true)    
    if(validated.result){
        const newProfileResponse = await request.profile.setNewProfile(payload)
        return newProfileResponse
    }
    return validated
}

const getProfiles    = async(request, payload)=>{
    let size          = 0;
    let founded       = [];
    let profilesArray = [];
    
    const profiles = await request.profile.getProfiles(payload)
    
    if(payload.filter.type ==="0"){
        founded = profiles
    }else {
        for(let i=0; i<profiles.length; i++){
            if(payload.filter.type==="1"){
                if(profiles[i].data.AuthUserName.includes(payload.filter.value.toUpperCase())){
                    founded.push(profiles[i])
                } 
            }else if(payload.filter.type==="2"){
                if(profiles[i].data.AuthUserEmail.includes(payload.filter.value)){
                    founded.push(profiles[i])
                }
            }else{
                founded.push(profiles[i])
            }
        }
    }
    
    size     = founded.length;

    while(founded.length>0){
        profilesArray.push(founded.splice(0,25))
    }

    return {array: profilesArray, size: size}    
}

const deleteProfile  = async(request, payload)=>{
    const deleteRespone = await request.profile.deleteProfile(payload)
    return deleteRespone;
}

const getProfileById = async(request, payload)=>{
    const profile = await request.profile.getProfileToUpdate(payload)
    return profile;
}

const updateProfile  = async(request, payload)=>{
    const validated = await profileValidator.validationBeforeSave(request, payload,false)    
    if(validated.result){
        const profile = await request.profile.updateProfile(payload)
        return profile
    }
    return validated
   
}

const profileServices = {
    newProfile    : newProfile     ,
    getProfiles   : getProfiles    ,
    deleteProfile : deleteProfile  ,
    getProfileById: getProfileById ,
    updateProfile : updateProfile
}

export default profileServices;