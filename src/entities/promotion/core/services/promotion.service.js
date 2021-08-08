import promotionValidation from './promotion.validate'

const getProductPromotion = async(product, request)=>{
    const product_promotion = await request.promotions.getProductPromotion(product);
    return product_promotion;
}

const getProductsForPromotion = async(request,products, company)=>{

    const promotions = await request.promotions.getPromotionsAvailable({company: company})

    products.forEach((product)=>{
        for(let i=0; i < promotions.length; i++){
            for(let y=0; y < promotions[i].data.PromotionProducts.length; y++){
                if(product.value === promotions[i].data.PromotionProducts[y].value ){
                    product["isdisabled"] = true
                }
            }
        }
    })

    return products
}

const setNewPromotion= async (request, payload)=>{
    const validationResponse = promotionValidation.validatePromotionBeforeSave(payload)

    if(validationResponse.result){
        const settingResponse = await request.promotions.setNewPromotions(payload)
        if(settingResponse){
            return { result: true, msj:"La promoción se ha registrado de forma correcta" , emptyFields:[]}
        }else{
            return { result: true, msj:"Error al hacer el registro de la promoción" , emptyFields:[]}
        }
    }

    return validationResponse;
}

const getPromotionsAvailable = async(request, payload)=>{
    let size           = 0;
    let promotionArray = [];

    const promotions = await request.promotions.getPromotionsAvailable(payload)
          size       = promotions.length;
    
    while(promotions.length>0){
        promotionArray.push(promotions.splice(0,25))
    }
    
    return {array: promotionArray, size: size}
}

const deletePromotion        = async(request, payload)=>{
    const response = await request.promotions.deletePromotion(payload)

    return response
}

const getPromotionsById      = async(request, payload)=>{
    const promotion = await request.promotions.getPromotionById(payload)
    return promotion
}

const updatePromotion        = async(request, payload)=>{
    
    const validationResponse = promotionValidation.validatePromotionBeforeSave(payload)
    
    if(validationResponse.result){
        const updateResponse = await request.promotions.updatePromotion(payload)
        if(updateResponse){
            return { result: true , msj: "La actualización de la promoción se ha realizado de forma correcta", emptyFields:[]}
        }else{
            return { result: false, msj: "Error al realizar la actualización de la promoción", emptyFields:[]}
        }
    }

    return validationResponse
}

const promotion_service = {
    getProductPromotion    : getProductPromotion    ,
    setNewPromotion        : setNewPromotion        ,
    getProductsForPromotion: getProductsForPromotion,
    getPromotionsAvailable : getPromotionsAvailable ,
    deletePromotion        : deletePromotion        ,
    getPromotionsById      : getPromotionsById      ,
    updatePromotion        : updatePromotion
}

export default promotion_service;