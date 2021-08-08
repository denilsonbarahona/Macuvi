
import firebase from '../../../../Service/firebase/firebase.service';
import Resizer  from 'react-image-file-resizer';

const getCounterProductAvailableByCategory = async(category, company)=>{
    /**HERE WE ARE GOINT TO RECIVE THE CATEGORY ID AND THE COMPANY ID
     * WITH THAT WERE ARE GOING TO GET ALL THE PRODUCTS AND THE THEN WE ARE GOING TO CHECK 
     * IF THE PRODUCTS HAS QUANTITIES IN STOCK GREATHER THAN 0
     * WHEN THEY HAVE QUANTITIES > 0 WE INCREASE THE COUNTER PLUS 1 
    */
    const products = await firebase.firestore().collection("Products")
                                    .where("productCategory.id","==",category)
                                    .where("productCompanyId","==",company)
                                    .get().then(res=>{  
                                        return res.docs.length
                                    })
    return products;
}

const getProductsAvailableByCategory = async(category, company)=>{

    //const productsOutput = []
    var   product = []
    var response 
    if(category ==="blank"){
        response = await firebase.firestore().collection("Products").where("productCompanyId","==",company).get()
    }else {
        response = await firebase.firestore().collection("Products").where("productCategory.id","==",category).where("productCompanyId","==",company).get()
    }
  

    product.push(
        response.docs.map(dataSnapShot=>{
            const product = { product: { id    : dataSnapShot.id                      , ref          : dataSnapShot.ref                         , 
                                        type   : dataSnapShot.data().productType      , name         : dataSnapShot.data().productName          , 
                                        img    : dataSnapShot.data().productImg       , hasVariations: dataSnapShot.data().productHasVariations , 
                                        tax    : dataSnapShot.data().productTax       , isTaxIncluded: dataSnapShot.data().productTaxIncluded   ,
                                        company: dataSnapShot.data().productCompanyId , category     : dataSnapShot.data().productCategory      ,
                                        multiplePrice: dataSnapShot.data().productMultiplePrices, 
                                        cost   : dataSnapShot.data().productCost         
                                     } 
                            }
            
            return product;
        })
    )
   return product[0];

}

const getProductList = async(payload)=>{
    const productsArray = []
    let foundedByInput = []
    let products = []
    let size = 0
    let response    
        
    /******* HERE WE MAKE A SEARCH BY THE CATEGORY ID, IF THE CATEGORY ID IS BLANK THE GET ALL THE PRODUCTS OF THE COMPANY */
    if(payload.category ==="blank"){
        response = await firebase.firestore().collection("Products").where("productCompanyId","==",payload.company).get()
    }else {
        response = await firebase.firestore().collection("Products").where("productCategory.id","==",payload.category).where("productCompanyId","==",payload.company).get()
    }
  
    /**************** HERE WE ASSIGN THE PRODUCT ARRAY RESULT OF THE FIREBASE QUERY TO AN ARRAY ****************/
    products.push( response.docs.map(dataSnapShot=>{
        const product = {id: dataSnapShot.id, 
                        ref: dataSnapShot.ref,
                        name: dataSnapShot.data().productName,
                        img: dataSnapShot.data().productImg,
                        categoryName : dataSnapShot.data().productCategory.label,
                        stock: dataSnapShot.data().productQuantity, 
                        categoryId: dataSnapShot.data().productCategory.id }
        return product;
    }) )
    
    /**************** THIS FOR IS TO GET ALL THE VARIATIONS INFORMATION THEN SUM THE CURRENT STOCK FOR EACH VARIATION
     *                 THE RESULT OF THE SUM IS ASSIGENED AS TO THE ARRAY products AS THE CURRENT STOCK OF EACH PRODUCT
     *  ****************/
     
    for(let i=0; i < products[0].length; i++){
        /*********************** IF THE USER IS MAKING A SEARCH BY NAME  
         *                         WE COMPARE THE PRODUCT NAME WITH THE INPUT GIVEN BY THE USE 
         *                           IF IT MATCH WE MAKE A PUSH TO THE ARRAY foundedByInput WHERE WE STORE THE PRODUCTS THAT 
         *                           MATCH WITH THE INPUT
         * *******************/
        if(payload.description.trim()!==""){
            if(products[0][i].name.includes( payload.description.trim().toUpperCase() )){
                foundedByInput.push(products[0][i])
            }
        }
    }
    
    if(payload.typeSearch ==="3"){
        products[0] = foundedByInput
    }

    size = products[0].length;

    /************** HERE WE MAKE A SPLICE OF 25 THAT HELP US TO MAKE THE PAGINATION EACH PAGE WILL HAVE 25 ROWS ***********/
    while(products[0].length > 0){
        productsArray.push(products[0].splice(0, 25))
    }
    return {array: productsArray, size: size}
}

const getProductsForCombo = async(company)=>{
    const productos_ = await firebase.firestore().collection("Products")
            .where("productCompanyId","==", company) 
            .get().then(res=>{
                var products= []
                products.push(     res.docs.map(dataSnapShot=>{
                                        const product = { value : dataSnapShot.id , label : dataSnapShot.data().productName, type : "product" }
                                        return product;
                                    })
                                )

                return products;
            })    
    return productos_[0];
}

const getProductById = async(product)=>{
    const productVariations = []
    const response = await firebase.firestore().collection("Products").doc(product).get()
                            .then((res)=>{ return {id: res.id, data: res.data(),ref: res.ref ,response: true }})
                            .catch(()=>{ return {id:"", data:{}, response: false}})

    const variations = await response.ref.collection("productVariations").get() 

    productVariations.push(
        variations.docs.map(snapShot=>{
            const variation = {id: snapShot.id , data: snapShot.data()}
            return variation
        })
    )
        
    response.data["productVariations"] = productVariations[0]
    return response;
}

const uploadPhoto = async(payload)=>{
    let photoLink
    const uri       = await new Promise((resolve)=>{ Resizer.imageFileResizer(payload.file, 300,300,'JPEG',100,0, async(uri)=>{resolve(uri)},'base64', 200, 200, ) }) 
    var deleteItems = await firebase.storage.ref("images/"+payload.company+"/"+payload.folder).listAll();        
    
    if(deleteItems.items.length>0)
        deleteItems.items.map(async(ref)=>{ await ref.delete() }) 

                      await firebase.storage.ref(`images/${payload.company}/${payload.folder}/${payload.file.name}`).putString(uri, 'data_url')
    photoLink       = await firebase.storage.ref("images/"+payload.company+"/"+payload.folder).child(payload.file.name).getDownloadURL()
    return photoLink;
}

const updateBatchProduct= async(payload)=>{
    var batch = firebase.firestore().batch();
    var photoLink;
    var priceChanges ="";
    var quantityChanges ="";
    var deleted ="";
    var created = "";
    const MultilplePirces = [...new Set(payload.variations.map(item => item.price))]
    const product = firebase.firestore().collection("Products").doc(payload.id)

    if (payload.file.name !== undefined) {            
        photoLink = await uploadPhoto(payload);
    } else {            
        photoLink = payload.photo
    }

    var stockTotal = 0;
    payload.variations.forEach(variation=>{
        stockTotal += Number(variation.quantity)
        const current = payload.currentInfoVariations.find(current => current.id === variation.id)
        if (current !== undefined) {
          
            if(Number( current.data.price ) !== Number( variation.price) ) {
              priceChanges += variation.value+" nuevo precio: "+variation.price.toString()+" ";
            }

            if (Number(current.data.quantity) !== Number(variation.quantity)) {
              quantityChanges += variation.value+" nuevo inventario: "+variation.quantity.toString()+" "; 
            }
 
            batch.update(current.ref, {
                 ItemCondition : variation.ItemCondition ,
                 basePrice     : variation.basePrice ,
                 code          : variation.code ,
                 colour_size   : variation.colour_size,
                 hex           : variation.hex,
                 name          : variation.name,
                 price         : variation.price,
                 cost          : variation.cost ,
                 quantity      : variation.quantity,                                    
                 supplier      : variation.supplier,
                 type          : variation.type, 
                 value         : variation.value
            })
 
        } else {
          created += variation.value.toLowerCase()+", cantidad: "+variation.quantity.toString()+" ";
          const createVariation = product.collection("productVariations").doc();
 
          batch.set(createVariation, {
              ItemCondition : variation.ItemCondition ,
              basePrice     : variation.basePrice ,
              code          : variation.code ,
              colour_size   : variation.colour_size,
              hex           : variation.hex, 
              name          : variation.name,
              price         : variation.price,
              cost          : variation.cost ,
              quantity      : variation.quantity,
              supplier      : variation.supplier,
              type          : variation.type,
              value         : variation.value
          })

        }
     })  

    batch.update(product,{
        productCategory      : payload.category,
        productHasVariations : Number(payload.hasVari),
        productImg           : photoLink,
        productQuantity     : stockTotal,
        productMultiplePrices: MultilplePirces.length>1?1:0,
        productName          : payload.name.toUpperCase(),
        productTax           : payload.tax,
        productTaxIncluded   : payload.include,
        productType          : payload.type.toUpperCase() 
    })

    payload.deleted.forEach(variation=>{
        deleted += variation.data.value.toLowerCase()+" ";  
        batch.delete(variation.ref)
    })

    
    const current_datetime = new Date()
    const formatted_date   = current_datetime.getFullYear()+"-"+(current_datetime.getMonth() + 1)+"-"+current_datetime.getDate()

    var Arrayidentities = []
    if(payload.identities !== undefined && payload.identities !==""){ 
        Arrayidentities = payload.identities.trim().split("\n")
    }

    const executeInsertIdentities = []
    Arrayidentities.forEach(identity=>{
        executeInsertIdentities.push( 
            firebase.firestore().collection("ProductsIdentity").add({
                ProductIdentity                 : identity,
                ProductIdentityBillingSellingId : "",
                ProductIdentitySellingDate      : "",
                ProductsIdentityCompanyId       : payload.company,
                ProductsIdentityDescription     : payload.name.toUpperCase(),
                ProductsIdentityProductId       : payload.id,
                ProductsIdentityDate            : formatted_date,
                ProductsIdentityTime            : new Date().getTime()   
            })
        )
    })

    const date = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()
    const hour = new Date().getHours().toString()+': '+new Date().getMinutes().toString()
    /**** activity for creation variation */
    if (created.trim() !== "") {
        const creation = firebase.firestore().collection("Activities").doc();
    
        batch.set(creation, {
            activityAuth: payload.authId ,
            activityAuthName: payload.authName,
            activityCompany: payload.company,
            activityDate: date,
            activityDescription: "Ha creado las siguientes variaciones: "+created.toString(), 
            activityHours: hour,
            activityTime: new Date().getTime()  
        })    
    }
    /*** activity for updated price */
    if (priceChanges.trim() !== "") {

        let descriptionPrice ="";
        if(!Number(payload.hasVari))
            descriptionPrice = ", con el nuevo precio "+product.variations[0].price.toString();
        else
            descriptionPrice = ", en las siguientes variaciones: "+priceChanges.toString();
    
        const updatePrice = firebase.firestore().collection("Activities").doc();
        batch.set(updatePrice, {
            activityAuth: payload.authId ,
            activityAuthName: payload.authName,
            activityCompany: payload.company,
            activityDate: date,
            activityDescription: "Ha modificado el precio del producto: "+payload.name.toLowerCase()+descriptionPrice , 
            activityHours: hour,
            activityTime: new Date().getTime()  
        })    
    }
    
    /*** activity for updated quantity */
    if (quantityChanges.trim() !== "") {

        let descriptionQuantity =""; 
        if(!Number(payload.hasVari))
            descriptionQuantity = ", con una cantidad en inventario de "+payload.variations[0].quantity.toString();
        else
            descriptionQuantity = ", en las siguientes variaciones: "+quantityChanges.toString();
    
        const updatequantity = firebase.firestore().collection("Activities").doc();
        batch.set(updatequantity, {
            activityAuth: payload.authId ,
            activityAuthName: payload.authName,
            activityCompany: payload.company,
            activityDate: date,
            activityDescription:  "Ha modificado la cantidad en inventario del producto: "+payload.name.toLowerCase()+descriptionQuantity , 
            activityHours: hour,
            activityTime: new Date().getTime()  
        })
    
    }
    
    /*** activity for delete */
    if (deleted.trim() !== "") {
        const deletedActivity = firebase.firestore().collection("Activities").doc();
        batch.set(deletedActivity, {
            activityAuth: payload.authId ,
            activityAuthName: payload.authName,
            activityCompany: payload.company,
            activityDate: date,
            activityDescription: "Ha eliminado para el producto: "+payload.name.toLowerCase()+", la(s) siguiente(s) variaciones: "+deleted, 
            activityHours: hour,
            activityTime: new Date().getTime()  
        })    
    }
    await Promise.all(executeInsertIdentities);
    const response = await batch.commit()
        .then(()=>{ return {response: true, msj:"Actualización realizada de forma correcta"} })
        .catch(()=>{ return {response: false, msj:"Error al realizar la actualización del producto"} })

    return response

}

const deleteProductInformationById = async(payload)=>{

    /********** FIRST WE GET THE ALL THE VARIATIONS INSIDE THIS PRODUCT **********/
    const variations = await firebase.firestore().collection("Products").doc(payload.id).collection("productVariations").get()
        .then((res)=>{
            var variations = []
            variations.push( res.docs.map(dataSnapShot=>{ return { ref: dataSnapShot.ref } }) )
            return variations
        }).catch(()=>{ return false })

    const batch = firebase.firestore().batch();
    /****** IF THERE WAS NOT ERROR GETTING THE PRODUCT INFORMATION  WE MAKE A LOOP TO DELETE ALL VARIATIONS INSIDE THAT PRODUCT ******/
    if( variations[0] !== false ) {
        variations[0].forEach(item=>{
            /** batch for delete variation */
           batch.delete(item.ref)
        }) 
        /** batch for delete product */
        const pDocRef = firebase.firestore().collection("Products").doc(payload.id);
        batch.delete(pDocRef)
        /** batch for reducer category */        
        const catDocRef = firebase.firestore().collection("Categories").doc(payload.categoryDecrement)
        const decrement = firebase.firestore.FieldValue.increment(-1);
        batch.update(catDocRef, {categoryProducts: decrement })

        /** batch for create the activity */
        const date = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()
        const hour = new Date().getHours().toString()+': '+new Date().getMinutes().toString()

        const deletedActivity = firebase.firestore().collection("Activities").doc();
        batch.set(deletedActivity, {
            activityAuth: payload.authId ,
            activityAuthName: payload.authName,
            activityCompany: payload.company,
            activityDate: date,
            activityDescription: "Ha eliminado el producto: "+payload.name.toLowerCase(),
            activityHours: hour,
            activityTime: new Date().getTime()  
        }) 
    }
    const response = await batch.commit()
        .then(()=>{ return true })
        .catch(()=>{ return false })

    return response;
}

const getIdentitiesByCompany = async(payload)=>{
    const identitiesArray  = [] 
    var   size             = 0
    var identites = await firebase.firestore().collection("ProductsIdentity")
                                .where("ProductsIdentityCompanyId","==",payload.company).get()
                                .then(res=>{
                                    const ident = []
                                    ident.push( res.docs.map(dataSnapShot=>{
                                            return { id: dataSnapShot.id, data: dataSnapShot.data()}
                                        }) )
                                    return ident;
                                })

    size = identites[0].length;
    while(identites[0].length > 0){
        identitiesArray.push(identites[0].splice(0, 25))
    }
    return {array: identitiesArray, size: size}
}

const getFilterIdentities = async(payload)=>{
   
    const identitiesArray  = [] 
    var   size             = 0
    var identites          = []

    if(payload.filter ==="1"){
       identites = await firebase.firestore().collection("ProductsIdentity")
                                    .where("ProductsIdentityCompanyId","==",payload.company)
                                    .where("ProductIdentity","==",payload.identity).get()
                                    .then(res=>{
                                        const ident = []
                                        ident.push( res.docs.map(dataSnapShot=>{
                                                return { id: dataSnapShot.id, data: dataSnapShot.data()}
                                            }) )
                                        return ident;
                                    })
    }else if(payload.filter ==="2"){
        identites = await firebase.firestore().collection("ProductsIdentity")
                                    .where("ProductsIdentityCompanyId","==",payload.company)
                                    .where("ProductsIdentityDescription","==",payload.description).get()
                                    .then(res=>{
                                        const ident = []
                                        ident.push( res.docs.map(dataSnapShot=>{
                                                return { id: dataSnapShot.id, data: dataSnapShot.data()}
                                            }) )
                                        return ident;
                                    })
    }else {
        identites = await firebase.firestore().collection("ProductsIdentity")
                                    .where("ProductsIdentityCompanyId","==",payload.company).get()
                                    .then(res=>{
                                        const ident = []
                                        ident.push( res.docs.map(dataSnapShot=>{
                                                return { id: dataSnapShot.id, data: dataSnapShot.data()}
                                            }) )
                                        return ident;
                                    })
    }
    
    size = identites[0].length;
    while(identites[0].length > 0){
        identitiesArray.push(identites[0].splice(0, 25))
    }
    return {array: identitiesArray, size: size}
}

const getIdentitiesDescriptions = async(payload)=>{
    let UniquesIdentities = []
    var identities = await firebase.firestore().collection("ProductsIdentity")
                    .where("ProductsIdentityCompanyId","==",payload.company)
                    .orderBy("ProductsIdentityTime","desc").get()
                    .then(res=>{
                        const ident = []
                        ident.push( res.docs.map(dataSnapShot=>{
                                return {description: dataSnapShot.data().ProductsIdentityDescription}
                            }) )
                        return ident;
                    })

    if(identities[0] !== undefined){
        UniquesIdentities = [...new Set(identities[0].map(item => item.description))]
    }

    return UniquesIdentities
}

const updateIdentitiesDescription = async(payload)=>{
    
   const response = await firebase.firestore().collection("ProductsIdentity").doc(payload.id)
                                .update({
                                    ProductsIdentityDescription: payload.identity_description
                                })
                                .then(()=>{ return true })
                                .catch(()=>{ return false })
    if(response){
       return { response: true, msj: "Actualización realizada correctamente" }
    }else{
       return { response: false, msj: "Error al momento de hacer la actualización de la descripción"}
    }
}

const getVariationsByProduct = async(payload)=>{
    const variations = await firebase.firestore().collection("Products").doc(payload.id).collection("productVariations").get()
    .then(res=>{
        var variations = []
        variations.push( res.docs.map(dataSnapShot=>{
            return { id: dataSnapShot.id, data: dataSnapShot.data(), ref: dataSnapShot.ref}
        }) )
        return variations[0]
    }).catch(()=>{ return [] });

    return variations;
}

const setActivity = async(payload)=>{
    const date = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()
    const hour = new Date().getHours().toString()+': '+new Date().getMinutes().toString()
    await firebase.firestore().collection("Activities")
            .add({
                activityAuth: payload.authId ,
                activityAuthName: payload.authName,
                activityCompany: payload.company,
                activityDate: date,
                activityDescription: payload.description, 
                activityHours: hour,
                activityTime: new Date(date).getTime()
            })
}

const setIdentitiesAsSold = async(payload)=>{
    const date =  new Date().getFullYear().toString()+"-"+(new Date().getMonth() + 1).toString()+"-"+new Date().getDate().toString()
    const identities = await firebase.firestore().collection("ProductsIdentity")
        .where("ProductsIdentityCompanyId", "==", payload.company)
        .where("ProductIdentity", "in", payload.identities)
        .get().then(res=>{
            res.docs.map(identity=>{
                return identity.ref.update({
                    ProductIdentityBillingSellingId: payload.billing,
                    ProductIdentitySellingDate: date
                })
                .then(()=>{ return true })
                .catch(()=>{ return false })
            })
        })

    return identities;
} 

const createBatchProduct = async(payload)=>{
    var batch = firebase.firestore().batch();
        payload.folder = payload.company+((Math.random()*1000)+700).toString().replace(".","").toUpperCase()
    var photoLink = await uploadPhoto(payload);
    const MultilplePirces = [...new Set(payload.variations.map(item => item.price))]
    const product = firebase.firestore().collection("Products").doc()

    var stockTotal = 0;
    payload.variations.forEach(variation=>{
        const itemsVariation = product.collection("productVariations").doc();
        stockTotal += Number(variation.quantity)
        batch.set(itemsVariation, {
            ItemCondition: variation.ItemCondition ,
            basePrice: variation.basePrice ,
            code: variation.code ,
            colour_size: variation.colour_size,
            hex: variation.hex, 
            name: variation.name,
            price: variation.price,
            cost: variation.cost ,
            quantity: variation.quantity,
            supplier: variation.supplier,
            type: variation.type,
            value: variation.value
        })
    })

    batch.set(product, {
        productCategory: payload.category, 
        productHasVariations: Number(payload.hasVari) ,
        productImg: photoLink,
        productMultiplePrices: MultilplePirces.length>1?1:0,
        productName: payload.name.toUpperCase(),
        productTax: payload.tax,
        productQuantity: stockTotal,
        productImgFolderRef: payload.folder,
        productTaxIncluded: payload.include,
        productType: payload.type.toUpperCase() ,
        productCompanyId: payload.company
    })

    const current_datetime = new Date()
    const formatted_date   = current_datetime.getFullYear()+"-"+(current_datetime.getMonth() + 1)+"-"+current_datetime.getDate()

    var Arrayidentities = []
    if(payload.identities !== undefined && payload.identities !==""){ 
        Arrayidentities = payload.identities.trim().split("\n")
    }

    const executeInsertIdentities = []
    Arrayidentities.forEach(identity=>{
        executeInsertIdentities.push( 
            firebase.firestore().collection("ProductsIdentity").add({
                ProductIdentity                 : identity,
                ProductIdentityBillingSellingId : "",
                ProductIdentitySellingDate      : "",
                ProductsIdentityCompanyId       : payload.company,
                ProductsIdentityDescription     : payload.name.toUpperCase(),
                ProductsIdentityProductId       : payload.id,
                ProductsIdentityDate            : formatted_date,
                ProductsIdentityTime            : new Date().getTime()   
            })
        )
    })

    const date = new Date().getFullYear().toString()+'-'+(new Date().getMonth()+1).toString()+'-'+new Date().getDate().toString()
    const hour = new Date().getHours().toString()+': '+new Date().getMinutes().toString()
    const activity = firebase.firestore().collection("Activities").doc();

    batch.set(activity, {
        activityAuth: payload.authId ,
        activityAuthName: payload.authName,
        activityCompany: payload.company,
        activityDate: date,
        activityDescription: "Ha creado el producto "+payload.name.toLowerCase()+" con una cantidad en inventario de "+stockTotal.toString(), 
        activityHours: hour,
        activityTime: new Date().getTime()  
    })

    const categoryRef = firebase.firestore().collection("Categories").doc(payload.category.id)
    const increment = firebase.firestore.FieldValue.increment(1);
    batch.update(categoryRef,{ categoryProducts: increment })
    
    await Promise.all(executeInsertIdentities);
    const response = await batch.commit()
        .then(()=>{ return {response: true, msj:"El producto se ha registrado de forma correcta"} })
        .catch(()=>{ return {response: false, msj:"Error al realizar el registro del producto"} })

    return response;
}

const getVariationBarCodeByInput = async(payload)=>{
    const BarCodeProduct = await firebase.firestore().collection("VariationsCode")
        .where("VariationCompany", "==", payload.company)
        .where("VariationCode","==", payload.input.toString().toUpperCase())
        .get()
        .then((res)=>{
            const variations = []
            variations.push(res.docs.map((dataSnapShot)=>{
                return {data: dataSnapShot.data()}
            }))
            return variations[0];
        })
        .catch(()=>{ return [] });
    return BarCodeProduct;
}

const product_services = {

    getCounterProductAvailableByCategory: getCounterProductAvailableByCategory,
    getProductsAvailableByCategory: getProductsAvailableByCategory,
    getProductList: getProductList,
    getProductById: getProductById ,
    deleteProductInformationById: deleteProductInformationById,
    getIdentitiesByCompany: getIdentitiesByCompany,
    getFilterIdentities: getFilterIdentities,
    getIdentitiesDescriptions: getIdentitiesDescriptions,
    updateIdentitiesDescription: updateIdentitiesDescription, 

    getVariationsByProduct: getVariationsByProduct,
    setActivity: setActivity,
    getProductsForCombo: getProductsForCombo,
    setIdentitiesAsSold: setIdentitiesAsSold ,

    createBatchProduct: createBatchProduct,
    updateBatchProduct: updateBatchProduct,
    getVariationBarCodeByInput: getVariationBarCodeByInput
}

export default product_services;