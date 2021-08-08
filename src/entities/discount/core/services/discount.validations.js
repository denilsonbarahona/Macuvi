import validationsService  from '../../../../validation/validation';

const DiscountValidation = (payload)=>{
    /*********FIRST WE CHECK THE IF THE STATE HAS THE REQUIERED FIELD *******/

    const requiredValidation = validationsService.requiredValidation(payload);
    if(!requiredValidation.validated){
        return { result: false, msj:"Se tiene que ingresar el nombre del descuento o el descuento en porcentajes.",emptyFields:requiredValidation.emptyFields}
    }

    const discountIn = validationsService.RequiredOneField(payload);
    if(!discountIn.validated){
        return { result: false, msj:"se tiene que seleccionar en donde se aplicara el descuento.",emptyFields:requiredValidation.emptyFields}
    }

    if(!payload.all && payload.withDiscount.length < 1){
        return { result: false, msj:"se tienen que seleccionar los productos o categorías a las que se aplica el descuento.",emptyFields:requiredValidation.emptyFields}
    }

    if(payload.life && ([undefined,""].includes(payload.date.init) || [undefined,""].includes(payload.date.end)) ){
        return { result: false, msj:"se tiene que especificar el rango de fecha para la disponibilidad del descuento.",emptyFields:requiredValidation.emptyFields}
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const discountValidation = {
    DiscountValidation: DiscountValidation 
}

export default discountValidation;