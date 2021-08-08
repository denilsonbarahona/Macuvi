import validationsService  from '../../../../validation/validation';


const validatePromotionBeforeSave = (payload )=>{
    const requiredValidation = validationsService.requiredValidation(payload);
    
    if(!requiredValidation.validated){
        return { result: false, msj:"Se tiene que ingresar el nombre de la promoción o la cantidad de productos en promoción.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.withPromotion.length < 1){
        return { result: false, msj:"se tienen que seleccionar los productos a los que se aplica la promoción.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.discount && [undefined, ""].includes(payload.percentaje)){
        return { result: false, msj:"se tiene que especificar el descuento de la promoción, el descuento tiene que ser mayor a cero.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.discount && Number(payload.percentaje)<1 ){
        return { result: false, msj:"se tiene que especificar el descuento de la promoción, el descuento tiene que ser mayor a cero.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.off && [undefined, ""].includes(payload.free)){
        return { result: false, msj:"se tiene que especificar la cantidad de productos gratis que se va a entregar al cliente, La cantidad de productos tiene que ser mayor a cero.",emptyFields:requiredValidation.emptyFields}
    }
    
    if(payload.off && Number(payload.free)<1 ){
        return { result: false, msj:"se tiene que especificar la cantidad de productos gratis que se va a entregar al cliente, La cantidad de productos tiene que ser mayor a cero.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.life && ([undefined,""].includes(payload.date.init) || [undefined,""].includes(payload.date.end)) ){
        return { result: false, msj:"se tiene que especificar el rango de fecha para la disponibilidad de la promoción.",emptyFields:requiredValidation.emptyFields}
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const promotionValidation = {
    validatePromotionBeforeSave: validatePromotionBeforeSave
}

export default promotionValidation;