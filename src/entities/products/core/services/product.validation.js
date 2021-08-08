import validationsService  from '../../../../validation/validation';

const validationProductBeforeToSave=(payload)=>{
    
    /*********** HERE WE CHECK THE REQUIRED INFORMATION FOR THE GENERAL INFORMATION TO EACH PRODUCT**************/
    const Requiredvalidation = validationsService.requiredValidation({...payload.product, required: payload.productRequiered.required})
    if(!Requiredvalidation.validated){
        return { response: false, msj:"Se tiene que ingresar toda la información general del producto.", emptyFields:Requiredvalidation.emptyFields}
    }
   /*********** NOW HERE WE CHECK THAT THE VARIATION ARRAY IS GREATHER THAN 0 **************/
    if(payload.variations.items.length < 1 && Number(payload.product.hasVari) === 1){
        return { response: false, msj:"se tiene que agregar las variaciones que va a tener el producto.", emptyFields:Requiredvalidation.emptyFields}
    }

    if(payload.variations.items.length < 1 && Number(payload.product.hasVari) === 0){
        return { response: false, msj:"Se tiene que ingresar toda la información general del producto.", emptyFields:Requiredvalidation.emptyFields}
    }
    
    if(Number(payload.product.hasVari) === 0){
        const RequiredVariationvalidation = validationsService.requiredValidation({...payload.variations.items[0].data, required: payload.productWithOutVariationRequiered.required})
        if(!RequiredVariationvalidation.validated){
            return { response: false, msj:"Se tiene que ingresar toda la información general del producto.", emptyFields:RequiredVariationvalidation.emptyFields}
        }
    }
   /*********** NOW HERE WE CHECK FOR PRODUCTS WITH VARIATIOS THAT THE REQUIRED FIELD DONT BE EMPTY OR UNDEFINED **************/
    if(Number(payload.product.hasVari) === 1){
        const variationValidationResponse = validationsService.RequieredDataArrayByCondition({...payload.variations, condition:payload.productWithvariationRequiered })
        if(!variationValidationResponse.validated){
            return { response: false, msj: variationValidationResponse.msj, emptyFields: variationValidationResponse.emptyFields}
        }
    }    
   /*********** IF EVERYTHING IS SUCCESS WE RETURN TRUE **************/
   return { response: true, msj: "", emptyFields: [] }
}


const validationIdentityDescription =(payload)=>{
    const Requiredvalidation = validationsService.requiredValidation({...payload})
    if(!Requiredvalidation.validated){
        return { response: false, msj:"Se tiene que ingresar la descripción del identificador.", emptyFields:Requiredvalidation.emptyFields}
    }

    return { response: true, msj: "", emptyFields: [] }
}

const productValidation={
    validationProductBeforeToSave: validationProductBeforeToSave ,
    validationIdentityDescription: validationIdentityDescription
}

export default productValidation;