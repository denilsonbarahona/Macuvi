import validationsService  from '../../../../validation/validation';

const validatTaxBeforeToSave = (payload)=>{
    console.log(payload)
    /*********** HERE WE CHECK THE REQUIRED INFORMATION FOR THE GENERAL INFORMATION TO EACH PRODUCT**************/
    const Requiredvalidation = validationsService.requiredValidation({...payload })
    if(!Requiredvalidation.validated){
        return { result: false, msj:"Se tiene que ingresar toda la información del impuesto.", emptyFields:Requiredvalidation.emptyFields}
    }

    /*** HERE WE VALIDATE THE FIELD THAT HAS TO BE GREATHER THAN 0 */
    const greatherThanValidation = validationsService.GreatherThan(payload);
    if(!greatherThanValidation.validated){
        return { result: false, msj:greatherThanValidation.exeptionMsj,  emptyFields:Requiredvalidation.emptyFields}
    }

   /*********** IF EVERYTHING IS SUCCESS WE RETURN TRUE **************/
   return { result: true, msj: "", emptyFields: [] }
}

const validatTax = {
    validatTaxBeforeToSave: validatTaxBeforeToSave
}

export default validatTax;