import validationsService  from '../../../../validation/validation';

const validationBeforeSave = async(request, payload, checkAvailability)=>{
    
    /********** HERE WE CHECK THE FIELDS WHERE WELL SETTED*******************************************/ 
    const requiredValidation = validationsService.requiredValidation(payload);
    if(!requiredValidation.validated){
        return { result: false, msj:"Se tiene que ingresar el nombre del usuario y el correo electrónico.",emptyFields:requiredValidation.emptyFields}
    }

    if(checkAvailability){
        /********** HERE WE CHECK THE AVAILABILITY OF THE EMAIL BEFORE TO INIT THE PROCESS OF NEW PROFILE*********/
        const availability = await request.login.checkEmailavailability(payload.email) 
        if(!availability){
            return {result: false, msj: "Este correo electrónico ya esta registrado para otra cuenta.", emptyFields:requiredValidation.emptyFields }
        }
    }
    

    let permission_granted = false;
    const keys = Object.keys(payload.permission) 
    for(let i=0; i < keys.length; i++){
        if(payload.permission[keys[i]] === true){
            permission_granted = true;
            break;
        }
    }

    if(!permission_granted){
        return {result: false, msj: "se tiene que seleccionar el acceso al menú del usuario.", emptyFields:requiredValidation.emptyFields }
    }

    return {result: true, msj: "", emptyFields:requiredValidation.emptyFields }
}

const profileValidator = {
    validationBeforeSave: validationBeforeSave
}

export default profileValidator