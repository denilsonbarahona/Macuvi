import firebase from '../../../../Service/firebase/firebase.service';
import {permission} from '../services/const/authPermission';


const getLogin = async(loginState)=>{

    const loginResponse = await firebase.firebase.auth().signInWithEmailAndPassword(loginState.email_.trim(), loginState.password_)
                            .then(res=>{ return { result  : true, 
                                                  uid     : res.user.uid, 
                                                  verified: res.user.emailVerified } 
                                                })
                            .catch(()=>{ return  {result: false, uid:"", verified: false} })   
    
    let login   = {} 
    let company = {}   

    if(loginResponse.result && loginResponse.verified ) {
        login = await firebase.firestore().collection("Login").where("AuthUserFirebaseUi","==",loginResponse.uid)
                        .get().then(res=>{
                            let response =  res.docs.map(dataSnapShot=>{
                                                const user = { id    : dataSnapShot.id , companyId: dataSnapShot.data().AuthCompanyId , 
                                                               name  : dataSnapShot.data().AuthUserName, isMaster: dataSnapShot.data().AuthIsMasterUser,
                                                               access: dataSnapShot.data().AuthUserConfAccess, error:false
                                                            }
                                                
                                                return user
                                            })
                            return response[0]
                        })
        
        company = await firebase.firestore().collection("Companies")
                            .doc(login.companyId)
                            .get().then(res=>{  return res.data() })
        
        return {result: true, login: login , company: company, msj:""}

    }else if(loginResponse.result && !loginResponse.verified){
        
        return {result: false, 
            login: {}, 
            company: {}, 
            msj:"Para acceder es necesario que se confirme la cuenta, hemos enviado un correo a la siguiente dirección: "+loginState.email_.trim() }

    }else{
        
        return {result: false,
            login: {},
            company: {}, 
            msj:"Email o contraseña son incorrectos" }

    }                     
    
}

const checkEmailavailability = async(email)=>{
    const availability = await firebase.firestore().collection("Login").where("AuthUserEmail","==",email.trim())
                                .get().then(res =>{
                                    return res.docs.map(snapShot=>{
                                        return snapShot.id
                                    })
                                });
    
    return (availability.length>0)?false:true
}

const signUpByEmail = async(signUpState)=>{
    /*******HERE WE CREATE THE LOGIN INSIDE FIREBASE AUTH*****/
    const success = await firebase.firebase.auth().createUserWithEmailAndPassword(signUpState.email.trim(), signUpState.password)
        .then(()=>{ return true})
        .catch(()=>{ return false});

    if(success){
        /****** IF AUTH REGISTER WAS SUCCESSFUL WE GET THE FIREBASE CURRENT USER INFORMATION *****/
        const user = firebase.firebase.auth().currentUser;        
        
        /****** IN ORDEN TO COMPLEATE THE SIGN UP WE HAVE TO GET THE CURRENT DATE *****/
        var today = new Date()
        var stringDate = today.getFullYear()+"-"+(today.getMonth() + 1)+"-"+today.getDate()

        /****** THEN WE CREATE THE COMPANY INFORMATION FOR THIS NEW USER *****/
        const newCompany = await firebase.firestore().collection("Companies")
                                    .add({
                                        CompanyName: signUpState.company.toUpperCase() ,
                                        CompanyDate: stringDate,
                                        CompanyAddress: "",
                                        CompanyCAI: "",
                                        CompanyCity: "",
                                        CompanyRTN: "",
                                        CompanyCorrelative: 0,
                                        CompanyEmail: signUpState.email.trim()
                                    }).then(res=>{ return res })
        
        /******** AT THIS MOMENT WE HAVE TO FILL THE LOGIN DOCUMENT WITH THE USER INFORMATION THAT WAS PROVIDED***********/  
        /*** AS A NEW ACTIVE USER THE AuthUserState IS GOING TO BE 1 ALSO AuthActivatedState THAT SAY IF THE USER HAS ACTIVATED ACCOUNT BY THE EMAIL LINK ****/                                  
        await firebase.firestore().collection("Login")
                                .add({
                                    AuthIsMasterUser     :  1                      ,
                                    AuthSignUpDate       :  stringDate             ,
                                    AuthUserName         :  signUpState.name.toUpperCase()   ,
                                    AuthCompanyName      :  signUpState.company.toUpperCase() ,
                                    AuthCompanyId        :  newCompany.id          ,
                                    AuthUserEmail        :  signUpState.email.trim()  ,
                                    AuthUserFirebaseUi   :  user.uid               ,
                                    AuthUserState        :  1                      ,
                                    AuthActivatedState   :  1                      ,                                    
                                    AuthActivatedRef     : (Math.random()*6 +1).toString().replace(".",""),
                                    AuthUserConfAccess   :  permission
                                }).then(res=>{ return res })
        
        /****** IF AUTH REGISTER WAS SUCCESSFUL WE SEND THE EMAIL VERIFICATION TO THE USER *****/
        await user.sendEmailVerification();
        await firebase.firebase.auth().signOut();

        return { result: true, 
                 msj:"Hemos enviado un correo a "+signUpState.email.trim()+" para que realices la confirmación de tu cuenta y puedas finalizar tu proceso de subscripción, Si no vez el correo electrónico, verifica otros lugares en los que podría estar, como su correo basura o spam."}
    }else{
        return { result: false, msj:"Error al completar el registro del usuario, intenta con un email diferente"}
    }
}

const signUpFromInvitation   = async(payload)=>{
    /***************** HERE WE CHECK IF THE EMAIL AND REFERENCES HAS A PRE LOGIN LOG **************/
    const preLogin = await firebase.firestore().collection("PreLogin") 
                            .where("PreLoginEmail","==",payload.email.trim())                
                            .where("PreloginReference","==",payload.reference.trim())
                            .get().then(res=>{
                                return res.docs.map(snapshot=>{
                                    return snapshot.id
                                })
                            }).catch(()=>{return [] })
    /************** IF THERE IS A PRE LOGIN LOG THE CONTINUE WITH THE PROCESS ***********/          
    if(preLogin.length>0){        
        /********* HERE WE CREATE THE NEW USER IN THE FIREBASE AUTHENTICATION SERVICE *******/
        const success   = await firebase.firebase.auth().createUserWithEmailAndPassword(payload.email.trim(), payload.password)
            .then(()=>{ return true})
            .catch(()=>{ return false});

        if(success){
            /*********** HERE WE SET THE USER A VERIFY****************/
            const fncverify      = await firebase.firebase.functions().httpsCallable("verify")
            const verifyResponse = await fncverify().then(result=>{ return result }).catch(()=>{ return {data:0} })

            if(verifyResponse.data ===1){
                /******** AFTER SETTING AS VERIFY THE USER WE HAVE TO UPDATE THE LOGIN STATE, AND UAI FOR A SUCCESSFUL LOGIN *******/
                var today = new Date()
                var stringDate = today.getFullYear()+"-"+(today.getMonth() + 1)+"-"+today.getDate()

                const login = await firebase.firestore().collection("Login")
                                        .where("AuthUserEmail","==",payload.email.trim())
                                        .where("AuthActivatedRef","==",payload.reference)
                                        .get()
                                        .then(res=>{ return res.docs.map(dataSnapShot=>{ return dataSnapShot.id }) })

                const update = await firebase.firestore().collection("Login").doc(login[0])
                        .update({
                            AuthIsMasterUser     :  0 ,
                            AuthSignUpDate       :  stringDate ,
                            AuthUserName         :  payload.name.toUpperCase()   ,
                            AuthUserFirebaseUi   :  firebase.firebase.auth().currentUser.uid ,
                            AuthUserState        :  1 ,
                            AuthActivatedState   :  1
                        })
                        .then(()=>{ return true })
                        .catch(()=>{ return false })
                
               return { result: update, msj:update?"":"Error al realizar la creación del usuario",emptyFields: [] }
            }else{
                return { result: false, msj:"Error al realizar la creación del usuario",emptyFields: [] }
            }        
        }else{
            /********* IN ORDER TO AVOID THE NEVER SIGNUP FOR UNFINISHED PROCESS WE CALL THIS FUNCTIONS ALWAIT THE CREATION IS GIVIN AN ERROR ****/
           const failedresponse = await verifyAndSettingForFailedSignUps(payload)
           return failedresponse
        }                 
    }else{
        return { result: false, msj:"La invitación a este correo electrónico no existe",emptyFields: [] }
    }
}

const verifyAndSettingForFailedSignUps = async(payload) =>{
    const fncverify      = await firebase.firebase.functions().httpsCallable("verify")
    const verifyResponse = await fncverify().then(result=>{ return result }).catch(()=>{ return false })
    
    if(verifyResponse.data ===1){
        /******** AFTER SETTING AS VERIFY THE USER WE HAVE TO UPDATE THE LOGIN STATE, AND UAI FOR A SUCCESSFUL LOGIN *******/
        var today = new Date()
        var stringDate = today.getFullYear()+"-"+(today.getMonth() + 1)+"-"+today.getDate()

        const login = await firebase.firestore().collection("Login")
                                .where("AuthUserEmail","==",payload.email.trim())
                                .where("AuthActivatedRef","==",payload.reference)
                                .get()
                                .then(res=>{ return res.docs.map(dataSnapShot=>{ return dataSnapShot.id }) })

        const update = firebase.firestore().collection("Login").doc(login[0])
                .update({
                    AuthIsMasterUser     :  0 ,
                    AuthSignUpDate       :  stringDate ,
                    AuthUserName         :  payload.name.toUpperCase()   ,
                    AuthUserFirebaseUi   :  firebase.firebase.auth().currentUser.uid ,
                    AuthUserState        :  1 ,
                    AuthActivatedState   :  1
                })
                .then(()=>{ return true })
                .catch(()=>{ return false })
        
       return { result: update, msj:update?"":"Error al realizar la creación del usuario",emptyFields: [] }
    }else{
        return { result: false, msj:"Error al realizar la creación del usuario",emptyFields: [] }
    }  

}

const requestChangePassword  = async(payload)=>{
    const requestResponse = await firebase.firebase.auth().sendPasswordResetEmail(payload.email.trim())
                                    .then( () =>{ return { result: true , msj: "", emptyFields:[] } })
                                    .catch((e)=>{ 
                                                if(e.code ==="auth/too-many-requests"){
                                                    return { result: false, msj: "Temporalmente hemos bloqueado las peticiones desde este dispositivo debido a actividad inusual, puedes intentar realizar este proceso dentro de 20 minutos.", emptyFields:[] } 
                                                }else{
                                                    return { result: false, msj: "Error al realizar la solicitud para cambiar la contraseña", emptyFields:[] } 
                                                }                                                
                                            })
    return requestResponse;
}

const changePassword = async(payload)=>{
    /**************VERIFY THE RESET CODE */
    const verifyResponse = await firebase.firebase.auth().verifyPasswordResetCode(payload.permission.oobCode)
                                        .then( ()=>{ return true })
                                        .catch(()=>{ return false });
    if(verifyResponse){
        const confirmResponse = await firebase.firebase.auth().confirmPasswordReset(payload.permission.oobCode, payload.password)
                                        .then( ()=>{ return true })
                                        .catch(()=>{ return false });        
        
        return  { result: confirmResponse, msj: confirmResponse?"":"Error al realizar el cambio de la contraseña.", emptyFields:[]}
    } 
      
    return  { result: false, msj: "El link para cambiar la contraseña ya ha expirado, vuelve a realizar el proceso de cambio de contraseña", emptyFields:[] }
}

const activateAccount = async(payload)=>{
    const activateResponse = await firebase.firebase.auth().applyActionCode(payload.permission.oobCode)
                                        .then( ()=>{ return {result: true, msj:""} })
                                        .catch(()=>{ return {result: false, msj:"Error al realizar la activación de la cuenta, vuelva a intentar más tarde."} });
    return activateResponse;
}

const login_service = 
{ 
  login                 : getLogin               , 
  checkEmailavailability: checkEmailavailability ,
  signUpByEmail         : signUpByEmail          ,
  signUpFromInvitation  : signUpFromInvitation   ,
  requestChangePassword : requestChangePassword  ,
  changePassword        : changePassword         ,
  activateAccount       : activateAccount
}

export default login_service