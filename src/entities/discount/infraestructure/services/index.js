import firebase from '../../../../Service/firebase/firebase.service';

const getGlobalDiscounts = async(company)=>{
    const discounts = await firebase.firestore().collection("Discount")
        .where("DiscountCompanyId","==",company)
        .where("DiscountState","==",1)
        .where("DiscountAllProducts","==",1)
        .get().then(res=>{
            var Alldiscounts=[]
            Alldiscounts.push(res.docs.map(dataSnapshot=>{
                                const discount_ = {id: dataSnapshot.id , data: dataSnapshot.data()}

                                return discount_
                            }))
            return Alldiscounts;
        })    
                             
    return discounts[0];
}

const getProductDiscounts = async(product)=>{
    const productDiscount = await firebase.firestore().collection("Discount")
            .where("DiscountState","==", 1)
            .where("DiscountCompanyId","==",product.company)
            .where("DiscountAllProducts","==",0)
            .get().then(res=>{
                var Alldiscounts = [{id: "0" , data:{}}]
                res.docs.forEach(dataSnapshot=>{  
                    if
                    ( 
                        ( 
                            new Date(dataSnapshot.data().DiscountStartDate.replaceAll("-","/")).getTime() <= new Date().getTime() &&
                            new Date(dataSnapshot.data().DiscountEndDate.replaceAll("-","/")  ).getTime() >= new Date().getTime()
                        )
                        || 
                        (dataSnapshot.data().DiscountEndDate ==="")
                    ){                        
                        for(let i=0; i < dataSnapshot.data().DiscountItemsGroup.length; i++){
                            if
                            ( 
                                (dataSnapshot.data().DiscountItemsGroup[i].value === product.id && 
                                    dataSnapshot.data().DiscountItemsGroup[i].type ==="product" )
                                    ||
                                (dataSnapshot.data().DiscountItemsGroup[i].value === product.category.id && 
                                    dataSnapshot.data().DiscountItemsGroup[i].type ==="category")
                            ){
                                Alldiscounts.push({id: dataSnapshot.id , data:dataSnapshot.data()}) 
                                break;
                            }
                        }                                                                                                                                                               
                    }                                                                        
                })
                                
                return Alldiscounts;
            })
    return productDiscount
} 

const setDiscount        = async(discount)=>{

    let initDate = (new Date(discount.date.init).getFullYear()+"-"+(new Date(discount.date.init).getMonth() + 1)+"-"+( new Date(discount.date.init).getDate()) ).toString()
    let endDate  = (new Date(discount.date.end).getFullYear()+"-"+(new Date(discount.date.end).getMonth() + 1)+"-"+(new Date(discount.date.end).getDate()) ).toString()

    const discountResponse = await firebase.firestore().collection("Discount")
                                        .add({  
                                            DiscountName        :   discount.name.toUpperCase()                        ,
                                            DiscountPercentage  :   discount.percentaje                                ,
                                            DiscountItemsGroup  :  (discount.all  === true )?[]:discount.withDiscount  ,           
                                            DiscountStartDate   :  (discount.life === true )?initDate:""               ,
                                            DiscountStartTime   :  (discount.life === true )?new Date(initDate).getTime():0,
                                            DiscountEndDate     :  (discount.life === true )?endDate :""               ,
                                            DiscountEndTime     :  (discount.life === true )?new Date(endDate).getTime():0,
                                            DiscountAllProducts :   discount.all?1:0                                   ,
                                            DiscountInProducts  :   discount.products?1:0                              ,
                                            DiscountInCategories:   discount.categories?1:0                            ,
                                            DiscountState       :   1                                                  ,
                                            DiscountCompanyId   :   discount.company
                                        })
                                        .then( ()=>{ return true  })
                                        .catch(()=>{ return false })
    return discountResponse
}

const getDiscounts       = async(payload)=>{
    const discounts = await firebase.firestore().collection("Discount")
                                    .where("DiscountCompanyId","==",payload.company)
                                    .where("DiscountState","==",1)
                                    .get().then(res=>{
                                        var allDiscounts = []
                                        allDiscounts.push(res.docs.map(dataSnapshot=>{
                                            const discount_ = { id: dataSnapshot.id , data: dataSnapshot.data() }
                                            return discount_
                                        }))
                                        return allDiscounts;
                                    })
    return discounts[0]
}

const deleteDiscount     = async(payload)=>{
    const deleteResponse = await firebase.firestore().collection("Discount").doc(payload.id)
                                    .delete() 
                                    .then(()=>{ return  {result: true  , msj:"El descuento se la eliminado de forma correcta"} })
                                    .catch(()=>{ return {result: false , msj:"Error al eliminar el descuento"} })
    return deleteResponse
}

const getDiscountById    = async(payload)=>{
    const discount  = await firebase.firestore().collection("Discount").doc(payload.id).get()

    return discount.data()
}

const updateDiscount     = async(discount)=>{

    let initDate = (new Date(discount.date.init).getFullYear()+"-"+(new Date(discount.date.init).getMonth() + 1)+"-"+( new Date(discount.date.init).getDate()) ).toString()
    let endDate  = (new Date(discount.date.end).getFullYear()+"-"+(new Date(discount.date.end).getMonth() + 1)+"-"+(new Date(discount.date.end).getDate()) ).toString()

    const response = await firebase.firestore().collection("Discount").doc(discount.id)
                                    .update({
                                        DiscountName        :   discount.name.toUpperCase()                        ,
                                        DiscountPercentage  :   discount.percentaje                                ,
                                        DiscountItemsGroup  :  (discount.all  === true )?[]:discount.withDiscount  ,           
                                        DiscountStartDate   :  (discount.life === true )?initDate:""               ,
                                        DiscountStartTime   :  (discount.life === true )?new Date(initDate).getTime():0,
                                        DiscountEndDate     :  (discount.life === true )?endDate :""               ,
                                        DiscountEndTime     :  (discount.life === true )?new Date(endDate).getTime():0,
                                        DiscountAllProducts :   discount.all?1:0                                   ,
                                        DiscountInProducts  :   discount.products?1:0                              ,
                                        DiscountInCategories:   discount.categories?1:0                            ,                                                                        
                                        DiscountCompanyId   :   discount.company
                                    })
                                    .then(()=> { return true })
                                    .catch(()=>{ return false   })
    return response
}

const discount_services = {
    
    getGlobalDiscounts  : getGlobalDiscounts  ,
    getProductDiscounts : getProductDiscounts ,
    setDiscount         : setDiscount         ,
    getDiscounts        : getDiscounts        ,
    deleteDiscount      : deleteDiscount      ,
    getDiscountById     : getDiscountById     ,
    updateDiscount
}


export default discount_services;