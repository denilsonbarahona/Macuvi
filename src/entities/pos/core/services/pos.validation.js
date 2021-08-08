import validationsService  from '../../../../validation/validation';

const validationBeforeToSave = (payload)=>{
      
    /********** HERE WE CHECK THE FIELDS WHERE WELL SETTED*******************************************/ 
    const requiredValidation = validationsService.requiredValidation(payload);
    if(!requiredValidation.validated){
        return { result: false, msj:"Se tiene que ingresar el nombre del POS y el porcentaje de cobro.",emptyFields:requiredValidation.emptyFields}
    }
    return {result: true, msj:"", emptyFields:[]}
}

const posValidator = {
    validationBeforeToSave: validationBeforeToSave
}

export default posValidator;
