import productValidation from './product.validation';

const getProductsByCategory = async(request, categoryid , company)=>{

    const products = await request.products.getProductsAvailableByCategory(categoryid, company).then(res=>{ return res })
     const size     = ( window.screen.width < 1024 )?9:12;
     var sheet      = [] 
     var finalPager = []

     for(let i = 0; i < products.length; i++){
        if(sheet.length === size){
            finalPager.push(sheet);
            sheet = []
        }
         sheet.push(products[i])
     }

     finalPager.push(sheet) 
     return finalPager
}

const getProductsByInput = async(request, payload)=>{
    var founded = []
    const productsCode = await request.products.getVariationBarCodeByInput({company: payload.company, input: payload.input})
    payload.grid.forEach(sheet => {
        productsCode.forEach(code=>{
            const codeFilter = sheet.filter(product=>product.product.id === code.data.VariationProduct)
            founded = [...founded, ...codeFilter]
        })
        const filter = sheet.filter(product=> product.product.name.includes(payload.input.toString().trim().toUpperCase()) )
        founded = [...founded, ...filter]
    });

    var sheet = [] 
    var finalPager = []
    const size = ( window.screen.width < 1024 )?9:12;
     for(let i = 0; i < founded.length; i++){
        if(sheet.length === size){
            finalPager.push(sheet);
            sheet = []
        }
         sheet.push(founded[i])
     }

     finalPager.push(sheet) 

    return finalPager;
}

const getProductsList = async(request, payload)=>{
    const products = await request.products.getProductList(payload)
    return products;
}

const getProductById = async(request, product)=>{
    const product_ = await request.products.getProductById(product);
    return product_;
}

const updateProduct = async(request , payload)=>{
  const validationResponse = productValidation.validationProductBeforeToSave(payload);

  if(validationResponse.response){
      const variations = setVariationArray(payload)
      const currentInfoVariation = await request.products.getVariationsByProduct({id: payload.product.id})
      const toDelete = setDeleteVariations({current: currentInfoVariation, variations: variations})
      const updateResponse = await request.products.updateBatchProduct({...payload.product,
            company: payload.company, 
            variations: variations,
            authId: payload.auth.authId, 
            authName: payload.auth.authName,
            deleted: toDelete,
            identities: payload.identities,
            currentInfoVariations: currentInfoVariation
        })
      return updateResponse;
  } 

  return validationResponse;
}

const deleteProductById = async(request, payload)=>{
    const deleteResponse = await request.products.deleteProductInformationById(payload);
    return deleteResponse
}

const getIdentities = async(request, payload)=>{
    const identities = await request.products.getIdentitiesByCompany(payload)
    return identities;
}

const getFilterIdentities = async(request, payload)=>{    
    const identities = await request.products.getFilterIdentities(payload)
    return identities
}

const getIdentitiesDescriptions = async(request, payload)=>{
    const descriptions = await request.products.getIdentitiesDescriptions(payload)
    return descriptions
}

const updateIdentityDescriptions = async(request, payload)=>{
    var response = productValidation.validationIdentityDescription(payload)
    if(response.response){
        response = await request.products.updateIdentitiesDescription(payload)
    }
    return response 
}

const createProductInformation = async(request, payload)=>{
    const validationResponse = productValidation.validationProductBeforeToSave(payload); 
    if(validationResponse.response){
        const variations = setVariationArray(payload)
        const createResponse = await request.products.createBatchProduct({...payload.product,
            company: payload.company, 
            variations: variations,
            authId: payload.auth.authId,
            authName: payload.auth.authName,
            identities: payload.identities
        })

        return createResponse;
 
    }  
    return validationResponse;
}

const getProductsForCombo = async(request, company)=>{
    const productsForCombo = await request.products.getProductsForCombo(company)
    return productsForCombo
}

const setVariationArray =(payload)=>{

    /******** here we create the variation Array *********/
    const variations = []

    variations.push( 
            payload.variations.items.map(item=> {
                const variationCode = item.data.code.trim() === ""?

                    (payload.company+
                        ((Math.random()*1000)+700).toString().replace(".","")).toUpperCase():
                    
                    item.data.code.toUpperCase()

                return {
                    id            : item.id,
                    ItemCondition : item.data.ItemCondition ,
                    basePrice     : Number(item.data.basePrice) ,
                    code          : variationCode ,
                    colour_size   : (Number(payload.product.hasVari)===1?item.data.colour_size.toUpperCase():"" ),
                    hex           : (Number(payload.product.hasVari)===1?item.data.hex:"" ),
                    name          : (Number(payload.product.hasVari)===1?item.data.name.toUpperCase():"" ),
                    price         : Number(item.data.price),
                    cost          : Number(item.data.cost) ,
                    quantity      : Number(item.data.quantity),
                    supplier      : item.data.supplier?item.data.supplier.toUpperCase():"",
                    type          : (Number(payload.product.hasVari)===1?item.data.type:"" ), 
                    value         : (Number(payload.product.hasVari)===1?item.data.value.toUpperCase():"" ) 
                }
            } )
    )
    return variations[0];
}

const setDeleteVariations=(payload)=>{
    const ToDelete = []
    payload.current.forEach(current=>{
        const wasDeleted = payload.variations.find(variation => variation.id === current.id)
        if (wasDeleted === undefined) {
            ToDelete.push(current)
        }
    })

    return ToDelete;
}

const getVariationByProduct = (request, payload) =>{
    const variation = request.products.getVariationsByProduct(payload)
    return variation;
}

const productService = {

    getProductsByCategory: getProductsByCategory,
    getProductsByInput: getProductsByInput,
    getProductsList: getProductsList,
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProductById: deleteProductById,
    getIdentities: getIdentities,
    getFilterIdentities: getFilterIdentities,
    getIdentitiesDescriptions: getIdentitiesDescriptions,
    updateIdentityDescriptions: updateIdentityDescriptions,
    createProductInformation: createProductInformation,
    getProductsForCombo: getProductsForCombo,
    getVariationByProduct: getVariationByProduct

}


export default productService;