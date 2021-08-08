import validationsService  from '../../../../validation/validation';

const companyValidationBeforeSave = (payload)=>{
    /******* FIRST WE CHECK IF THE STATE HAS ALL REQUIRED FIELD ******/
    const Requiredvalidation = validationsService.requiredValidation(payload)

    if(!Requiredvalidation.validated){        
        return { result: false, msj:"Se tienen que ingresar todos los campos que contiene (*).",
            emptyFields:Requiredvalidation.emptyFields }
    }
    
    if(payload.docs.init.trim() !== "" && payload.docs.ending.trim() ===""){
        return { result: false, msj:"Se tiene que especificar el ultimo valor en el rango de facturación.",
            emptyFields:Requiredvalidation.emptyFields }
    }

    if(payload.docs.ending.trim() !== "" && payload.docs.init.trim() ===""){
        return { result: false, msj:"Se tiene que especificar el primer valor en el rango de facturación.",
            emptyFields:Requiredvalidation.emptyFields }
    }

    if(payload.docs.ending.split("-").length < 4 || payload.docs.init.split("-").length < 4) {
        return { result: false, msj:"Se tiene que ingresar un formato valido para el rango de facturación. formato: 000-000-01-00000000",
            emptyFields:Requiredvalidation.emptyFields }
    }

    return { result: true, msj:"", emptyFields:[] }
}

const validationBeforeToSave = {
    companyValidationBeforeSave: companyValidationBeforeSave
}

export default validationBeforeToSave;