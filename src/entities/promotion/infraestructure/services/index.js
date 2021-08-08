import firebase from '../../../../Service/firebase/firebase.service';

const getProductPromotion    = async(product)=>{
    const productPromotion = await firebase.firestore().collection("Promotions")
            .where("PromotionState","==",1)
            .where("PromotionCompanyId","==",product.company)
            .get().then(res=>{
                var AllPromotion = []
                res.docs.forEach(dataSnapshot=>{
                    if
                    (
                        (
                            new Date(dataSnapshot.data().PromotionStartDate.replaceAll("-","/")).getTime() <= new Date().getTime() &&
                            new Date(dataSnapshot.data().PromotionEndingDate.replaceAll("-","/")).getTime() >= new Date().getTime()
                        )
                        || dataSnapshot.data().PromotionStartDate === ""
                    )
                    {
                        for(let i=0; i < dataSnapshot.data().PromotionProducts.length; i++){
                            if( dataSnapshot.data().PromotionProducts[i].value === product.id )
                            {
                                AllPromotion.push({id: dataSnapshot.id , data:dataSnapshot.data()}) 
                                break;
                            }
                        }   
                    }
                })

                return AllPromotion;
            })
            .catch(()=>{ return [[]] });    
    return productPromotion;
}

const getPromotionsAvailable = async(payload)=>{

    const PromotionsAvailable = await firebase.firestore().collection("Promotions")
            .where("PromotionState","==",1)
            .where("PromotionCompanyId","==",payload.company)
            .get()
            .then(res=>{
                let promotions = []
                promotions.push( res.docs.map((dataSnapShot)=>{
                                        return { id: dataSnapShot.id , data: dataSnapShot.data() }
                                    }) 
                                )
                return promotions
            })
            .catch(()=>{ return false })
                                    
    return (PromotionsAvailable !== false)?PromotionsAvailable[0]:[]
}

const setNewPromotions       = async(payload)=>{

    let initDate = (new Date(payload.date.init).getFullYear()+"-"+(new Date(payload.date.init).getMonth() + 1)+"-"+( new Date(payload.date.init).getDate()) ).toString()
    let endDate  = (new Date(payload.date.end).getFullYear()+"-"+(new Date(payload.date.end).getMonth() + 1)+"-"+(new Date(payload.date.end).getDate()) ).toString()

    let products = []
    for(let i =0; i < payload.withPromotion.length; i++){
        products.push({ value : payload.withPromotion[i].value, label: payload.withPromotion[i].label })
    }

    const promotionsResponse = await firebase.firestore().collection("Promotions")
            .add({
                PromotionName: payload.name.toUpperCase()        ,
                PromotionAmount: Number(payload.promotionAmount)   ,
                PromotionProducts: products                          ,
                PromotionRewardPriceEnable: (payload.discount === true)?1:0 ,
                PromotionRewardProductEnable: (payload.off === true)?1:0 ,
                PromotionRewardPricePercentageOff: (payload.discount  === true )?Number(payload.percentaje):0 ,
                PromotionRewardFreeProducts: (payload.off === true )?Number(payload.free)      :0 ,
                PromotionStartTime: (payload.life === true )?new Date(initDate).getTime():0, 
                PromotionStartDate: (payload.life === true )?initDate:"",
                PromotionEndingTime: (payload.life === true )?new Date(endDate).getTime():0,
                PromotionEndingDate: (payload.life === true )?endDate :"",
                PromotionState: 1 ,
                PromotionCompanyId: payload.company
            })
            .then( ()=>{ return true })
            .catch(()=>{ return false })

    return promotionsResponse
}

const deletePromotion        = async(payload)=>{
    const deleteResponse  = await firebase.firestore().collection("Promotions").doc(payload.id)
                                .delete()
                                .then(()=>{ return  {result: true  , msj:"La promoción se la eliminado de forma correcta"} })
                                .catch(()=>{ return {result: false , msj:"Error al eliminar la promoción"} })
    return deleteResponse
}

const getPromotionById       = async(payload)=>{
    const promotion  = await firebase.firestore().collection("Promotions").doc(payload.id).get();
    return promotion.data()
}

const updatePromotion        = async(payload)=>{

    let initDate = (new Date(payload.date.init).getFullYear()+"-"+(new Date(payload.date.init).getMonth() + 1)+"-"+( new Date(payload.date.init).getDate()) ).toString()
    let endDate  = (new Date(payload.date.end).getFullYear()+"-"+(new Date(payload.date.end).getMonth() + 1)+"-"+(new Date(payload.date.end).getDate()) ).toString()

    let products = []
    for(let i =0; i < payload.withPromotion.length; i++){
        products.push({ value : payload.withPromotion[i].value, label: payload.withPromotion[i].label })
    }


    const updateResponse = await firebase.firestore().collection("Promotions").doc(payload.id)
                            .update({
                                PromotionName: payload.name.toUpperCase()        ,
                                PromotionAmount: Number(payload.promotionAmount)   ,
                                PromotionProducts: products                          ,
                                PromotionRewardPriceEnable: (payload.discount === true )?1:0 ,
                                PromotionRewardProductEnable: (payload.off === true )?1:0 ,
                                PromotionRewardPricePercentageOff: (payload.discount  === true )?Number(payload.percentaje):0 ,
                                PromotionRewardFreeProducts: (payload.off === true )?Number(payload.free)      :0 ,
                                PromotionStartTime: (payload.life === true )?new Date(initDate).getTime():0,
                                PromotionStartDate: (payload.life === true )?initDate:"",
                                PromotionEndingDate: (payload.life === true )?endDate :"", 
                                PromotionEndingTime: (payload.life === true )?new Date(endDate).getTime():0,                                           
                                PromotionCompanyId: payload.company
                            })
                            .then( ()=>{ return true })
                            .catch(()=>{ return false })

    return updateResponse
}

const promotion_services = {
    getProductPromotion   : getProductPromotion   ,
    getPromotionsAvailable: getPromotionsAvailable,
    setNewPromotions      : setNewPromotions      ,
    deletePromotion       : deletePromotion       ,
    getPromotionById      : getPromotionById      ,
    updatePromotion       : updatePromotion
}   

export default promotion_services;

