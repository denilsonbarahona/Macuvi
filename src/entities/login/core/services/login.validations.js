import validationsService  from '../../../../validation/validation';

const signUpValidator =async (requests,signUpState, validateEmail)=>{
     
    
     /********** HERE WE CHECK THE FIELDS WHERE WELL SETTED*******************************************/ 
     const Requiredvalidation   = validationsService.requiredValidation(signUpState)    
     if(!Requiredvalidation.validated){        
        return { result: false, msj:"",emptyFields:Requiredvalidation.emptyFields}
    }

    if(signUpState.password.length < 8){
        return { result: false, msj:"La contraseña debe tener un mínimo de 8 caracteres",emptyFields:Requiredvalidation.emptyFields}
    }
     /********** HERE WE CHECK IF IN THE FORM STATE DATA THERE ARE NOT EQUALS FIELD*******************/ 
     const notEqualData = validationsService.compareValidation(signUpState)
     if(!notEqualData.validated){
        return { result: false, msj:notEqualData.exeptionMsj,  emptyFields:Requiredvalidation.emptyFields}
    }
    /********** HERE WE CHECK THE AVAILABILITY OF THE EMAIL BEFORE TO INIT THE PROCESS OF SIGN UP*********/
    if(validateEmail){
        const availability = await requests.login.checkEmailavailability(signUpState.email).then(res=>{return res})
        if(!availability){
            return {result: false, msj: "Este email ya esta registrado para otra cuenta.", emptyFields:Requiredvalidation.emptyFields }
        }
    } 
     
     return { result: true, msj:"" , emptyFields:[]}
}

const securityLevelValidator = async(password)=>{
    const securityLevel = validationsService.passwordValidation(password)
    return securityLevel;
}

const requestValidation = async(request,payload)=>{
    
     /********** HERE WE CHECK THE FIELDS WHERE WELL SETTED*******************************************/ 
     const Requiredvalidation   = validationsService.requiredValidation(payload)    
     if(!Requiredvalidation.validated){        
        return { result: false, msj:"Es necesario que se ingrese el correo electrónico relacionado a la cuenta.",emptyFields:Requiredvalidation.emptyFields}
    }

    /******** HERE WE CHECK IF THE EMAIL WE ARAE TRYING TO CHANGE PASSWORD EXIST*/
    const availability = await request.login.checkEmailavailability(payload.email).then(res=>{return res})
    if(availability){
        return {result: false, msj: "No hay ninguna cuenta relacionada a este correo electrónico.", emptyFields:Requiredvalidation.emptyFields }
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const changePasswordValidation = async( payload)=>{

    /********** HERE WE CHECK THE FIELDS WHERE WELL SETTED*******************************************/ 
    const Requiredvalidation   = validationsService.requiredValidation(payload)    
    if(!Requiredvalidation.validated){        
       return { result: false, msj:"",emptyFields:Requiredvalidation.emptyFields}
    }

    if(payload.password.length < 8){
        return { result: false, msj:"La contraseña debe tener un mínimo de 8 caracteres",emptyFields:Requiredvalidation.emptyFields}
    }

    /********** HERE WE CHECK IF IN THE FORM STATE DATA THERE ARE NOT EQUALS FIELD*******************/ 
    const notEqualData = validationsService.compareValidation(payload)
    if(!notEqualData.validated){
        return { result: false, msj:notEqualData.exeptionMsj,  emptyFields:Requiredvalidation.emptyFields}
    }

   return { result: true, msj:"" , emptyFields:[]}
}


const loginValidator = {
    signUpValidator         : signUpValidator,
    securityLevelValidator  : securityLevelValidator,
    requestValidation       : requestValidation ,
    changePasswordValidation: changePasswordValidation
}


export default loginValidator;