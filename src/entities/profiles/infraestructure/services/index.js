import firebase from '../../../../Service/firebase/firebase.service';

const setNewProfile = async(payload)=>{
    /******** HERE WE CHECK IF THE PRE LOGIN WAS ALREADY REGISTER  ********/
    const jsonResponse = { result: false, msj:"", emptyFields:[] }
    const preLogin = await firebase.firestore().collection("PreLogin")
                        .where("PreLoginEmail","==",payload.email)
                        .where("PreLoginCompany","==",payload.company)
                        .get().then(res=>{
                            return res.docs.map(snapShot=>{
                                return snapShot.id
                            })
                        }) 

    /****** IF IT WAS NOT ALREADY REGISTER WE BEGIN WITH THE PRE LOGIN REGISTER ***/
    if(preLogin.length === 0){
        var refPreLogin = (Math.random()*6 +1).toString().replace(".","");
        let datetime = new Date()

        let date = datetime.getFullYear()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getDate()
        const preLoginResponse = await firebase.firestore().collection("PreLogin")
                                        .add({
                                            PreLoginEmail    : payload.email,
                                            PreLoginName     : payload.name.toUpperCase() ,
                                            PreLoginHostName : payload.host.toUpperCase() ,
                                            PreloginReference: "pre-ref: "+refPreLogin ,
                                            preLogindDate    : date ,
                                            preLogindTime    : new Date(date).getTime()
                                        })
                                        .then( ()=>{ return true })
                                        .catch((e)=>{ return false })
    
        /************ IF THERE WAS NOT PROBLEM WITH THE PRE LOGIN, WE FINISH REGISTER THE LOGIN ***********/
        if(preLoginResponse){
            const loginResponse = await firebase.firestore().collection("Login")
                                        .add({
                                            AuthIsMasterUser     :  0 ,
                                            AuthSignUpDate       :  null  ,
                                            AuthUserName         :  payload.name.toUpperCase()  ,
                                            AuthCompanyName      :  payload.companyName.toUpperCase() ,
                                            AuthCompanyId        :  payload.company ,
                                            AuthUserEmail        :  payload.email   ,
                                            AuthUserFirebaseUi   :  null,                            
                                            AuthUserState        :  1 , 
                                            AuthActivatedState   :  2 , // user state 2 mean that the user has not register yet
                                            AuthActivatedRef     : "pre-ref: "+refPreLogin ,
                                            AuthUserConfAccess   : payload.permission
                                        })
                                        .then( ()=>{ return true })
                                        .catch(()=>{ return false })
            jsonResponse.result = loginResponse
            jsonResponse.msj    = loginResponse?"El registro del nuevo usuario se ha realizado de forma correcta":"Se tuvo un error al realizar la incorporación de un nuevo usuario"            
        }else{
            jsonResponse.result = preLoginResponse
            jsonResponse.msj    = preLoginResponse?"El registro del nuevo usuario se ha realizado de forma correcta":"Se tuvo un error al realizar la incorporación de un nuevo usuario"
        }
    }else {
        jsonResponse.result = preLogin.length>0
        jsonResponse.msj    = preLogin.length>0?"El registro del nuevo usuario se ha realizado de forma correcta":"Este usuario ya se ha registrado previamente"
    }

    return jsonResponse
}

const getProfiles   = async(payload)=>{
    const profiles = await firebase.firestore().collection("Login")
                            .where("AuthCompanyId","==",payload.company)
                            .get()
                            .then(res=>{
                                let profiles = []
                                profiles.push(res.docs.map(dataSnapshot=>{
                                    return {id: dataSnapshot.id, data: dataSnapshot.data()}
                                }))
                                return profiles[0]
                            })
                            .catch(()=>{ return [] })    
    return profiles;
}

const deleteProfile = async(payload)=>{
    
    if(!payload.isMaster){
        const profile = await firebase.firestore().collection("Login").doc(payload.id).get()
                                    .then(res=>{ return {data: res.data()} })
                                    .catch(()=>{ return {data: {} }})

        if(profile.data.AuthActivatedState === 2){
            const response = await firebase.firestore().collection("Login").doc(payload.id)
                        .delete()
                        .then(()=>{ return {result: true  , msj:"La información del perfil se ha eliminado de forma correcta"} })
                        .catch((e)=>{ return {result: false  , msj:"Error al eliminar la información de este perfil"} })
            return response
        }else{
            const fncdeleteUser  = await firebase.firebase.functions().httpsCallable("deleteUser")
            const deleteResponse = await fncdeleteUser({uid:payload.uid})    
            if(deleteResponse.data === 1){
                const response = await firebase.firestore().collection("Login").doc(payload.id)
                            .delete()
                            .then(()=>{ return {result: true  , msj:"La información del perfil se ha eliminado de forma correcta"} })
                            .catch(()=>{ return {result: false  , msj:"Error al eliminar la información de este perfil"} })
                return response
            }else{
                return {result: false  , msj:"Error al eliminar la información de este perfil"}
            }
        }                      
    }else {
        return {result: false  , msj:"Los usuarios que son administradores no pueden ser eliminados, solo se puede actualizar su información."}
    }    
}

const getProfileToUpdate = async(payload)=>{
    const profile = await firebase.firestore().collection("Login").doc(payload.id)
                                .get()
                                .then(res=>{ return { data: res.data() } })
                                .catch(()=>{ return { data: {} } })
    return profile
}

const updateProfile = async(payload)=>{
    const updateResponse = await firebase.firestore().collection("Login").doc(payload.id)
                                    .update({
                                        AuthUserName: payload.name.toUpperCase() ,
                                        AuthUserConfAccess: payload.permission
                                    })
                                    .then(()=>{ return  {result:true  , msj:"La actualización se realizó de forma correcta"} })
                                    .catch(()=>{ return {result:false , msj:"Error al realizar la actualización del perfil"} })
    return updateResponse;
}

const  profile_service = {
    setNewProfile     : setNewProfile ,
    getProfiles       : getProfiles   ,
    deleteProfile     : deleteProfile ,
    getProfileToUpdate: getProfileToUpdate ,
    updateProfile     : updateProfile
}

export default profile_service;