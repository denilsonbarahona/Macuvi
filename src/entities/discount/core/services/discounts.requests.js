import discountValidation from './discount.validations'

const findGlobalDiscounts = async (company , requests)=>{
    const discounts = await requests.discounts.getGlobalDiscounts(company).then(res=>{return res})
    return discounts;
}

const getProductDiscount = async (product, requests)=>{
    const productDiscount = await requests.discounts.getProductDiscounts(product).then(res=>{return res})
    return productDiscount;
}

const setNewDiscount     = async(requests , payload)=>{
    const discountStateResponse = discountValidation.DiscountValidation(payload)
    
    if(discountStateResponse.result){
        const setDiscountResponse = await requests.discounts.setDiscount(payload)
        if(setDiscountResponse){
            payload.resetState()
            return { result: true, msj:"El descuento se ha registrado de forma correcta" , emptyFields:[]}
        }else{

            return { result: false, msj:"Error al hacer el registro del descuento" , emptyFields:[]}
        }
    }

    return discountStateResponse
}

const getDiscounts       = async(requests, paylaod)=>{
    let size          = 0;
    let discountArray = [];
    const discounts   = await requests.discounts.getDiscounts(paylaod);
    
    size = discounts.length;

    while(discounts.length>0){
        discountArray.push(discounts.splice(0,25))
    }
    
    return {array: discountArray, size: size}
}

const deleteDiscount     = async(request, payload)=>{
    const deleteResponse = await request.discounts.deleteDiscount(payload)
    return deleteResponse
}

const getDiscountById    = async(request, payload)=>{
    const discount = await request.discounts.getDiscountById(payload)
    return discount
}

const updateDiscount    = async(request, payload)=>{
    const discountStateResponse = discountValidation.DiscountValidation(payload)
    if(discountStateResponse.result){
       
        const updateDiscountResponse = await request.discounts.updateDiscount(payload)
        if(updateDiscountResponse){
            return { result: true, msj: "La actualización del descuento se ha realizado de forma correcta"}
        }else{
            return { result: false, msj: "Error al realizar la actualización del descuento"}
        }
    }

    return discountStateResponse
}


const discount_requests = {
    findGlobalDiscounts: findGlobalDiscounts ,
    getProductDiscount : getProductDiscount  ,
    setNewDiscount     : setNewDiscount      ,
    getDiscounts       : getDiscounts        ,
    deleteDiscount     : deleteDiscount      ,
    getDiscountById    : getDiscountById     ,
    updateDiscount     : updateDiscount
}

export default discount_requests;