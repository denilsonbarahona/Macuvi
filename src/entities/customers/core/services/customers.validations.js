import validationsService  from '../../../../validation/validation';

const newCustomerValidation= async(request, payload, type , id)=>{
    /******* FIRST WE CHECK IF THE STATE HAS ALL REQUIRED FIELD ******/
    const Requiredvalidation = validationsService.requiredValidation(payload)

    if(!Requiredvalidation.validated){        
        return { result: false, msj:"Para registrar un cliente el nombre y el DNI son obligatorios.",emptyFields:Requiredvalidation.emptyFields}
    }
    /************* HERE WE HAVE TO CHECK THE EXISTANCE OF THE DNI IN THIS SHOP ***********/
    const dniResponse = await request.customers.checkDNIInCompany(payload, type , id)

    if(dniResponse){
        return { result: false, msj:"El DNI de esta persona ya esta registrado dentro de los clientes de la empresa.",emptyFields:Requiredvalidation.emptyFields}
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const setPaymentValidation= (payload)=>{
    const requieredValidation = validationsService.requiredValidation(payload)

    if(!requieredValidation.validated){
        return {result: false, msj: "Para registrar el abono es necesario la forma de pago y la cantidad de dinero que se abona.", emptyFields:requieredValidation.emptyFields}
    }

    if(Number(payload.pay)<=0){
        return {result: false, msj: "Se tiene que abonar una cantidad mayor a cero.", emptyFields:requieredValidation.emptyFields}
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const NofiticationConfValidation =(payload)=>{
    const requieredValidation = validationsService.requiredValidation(payload)

    if(!requieredValidation.validated){
        return {result: false, msj: "Se tiene que ingresar la cantidad de días", emptyFields:requieredValidation.emptyFields}
    }

    const greaterThan = validationsService.GreatherThan(payload)
    if(!greaterThan.validated){
        return {result: false, msj: greaterThan.exeptionMsj, emptyFields:requieredValidation.emptyFields}
    }

    return { result: true, msj:"" , emptyFields:[]}
}

const customerValidator = {

    newCustomerValidation: newCustomerValidation ,
    setPaymentValidation : setPaymentValidation  ,
    NofiticationConfValidation: NofiticationConfValidation

}


export default customerValidator;