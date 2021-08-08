import * as promoActions  from '../actions/promotion.actions';
import * as uiActions     from '../../../ui/core/actions/ui.actions';
import productServices    from '../../../products/core/services/product.service';
import promotionServices  from '../services/promotion.service';


const getProductsForPromotion = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === promoActions.GET_PRODUCT_FOR_WITH_PROMOTION){
            const productsCombo = await productServices.getProductsForCombo(request, action.payload.company)
            const withPromotion = await promotionServices.getProductsForPromotion(request, productsCombo, action.payload.company)            
            dispatch(promoActions.showProductsForPromotion(withPromotion))
        }
}

const setNewPromotion         = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === promoActions.SET_NEW_PROMOTION){
            dispatch(uiActions.setLoadingButton(true))
            const settingResponse = await promotionServices.setNewPromotion(request , action.payload)
            if(settingResponse.result){
                const productsCombo = await productServices.getProductsForCombo(request, action.payload.company)
                const withPromotion = await promotionServices.getProductsForPromotion(request, productsCombo, action.payload.company)
                dispatch(promoActions.showProductsForPromotion(withPromotion))
                action.payload.resetState()
            }
            dispatch(promoActions.showPromotionSettingResponse(settingResponse))
            dispatch(uiActions.setLoadingButton(false))
        }
}

const getPromotionsAvailable  = (request)=>({dispatch})=>next=>async(action)=>{
       next(action)

       if(action.type === promoActions.GET_PROMOTIONS_AVAILABLE){
           dispatch(uiActions.setLoading(true))
           const promotions = await promotionServices.getPromotionsAvailable(request,action.payload)
           dispatch(promoActions.showPromotionsAvailable(promotions))
           dispatch(uiActions.setLoading(false))
       }
}

const deletePromotion         = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === promoActions.DELETE_PROMOTION){
            dispatch(uiActions.setLoadingButtonPopUp(true))
            const deleteResponse = await promotionServices.deletePromotion(request, action.payload)
            if(deleteResponse.result){
                const promotions = await promotionServices.getPromotionsAvailable(request, action.payload)
                let searchSize = (promotions.array.length >0)?(promotions.array.length-1):0
                if(searchSize < window.promotionPage){                                       
                    action.payload.setPager(searchSize)
                }
                dispatch(promoActions.showPromotionsAvailable(promotions))
           }
            dispatch(promoActions.showDeletePromotionResponse(deleteResponse))
            dispatch(uiActions.setLoadingButtonPopUp(false))
        }
}

const getPromotionById        = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === promoActions.GET_PROMOTION_BY_ID){
        dispatch(uiActions.setLoading(true))
        const promotion = await promotionServices.getPromotionsById(request, action.payload)
        action.payload.setCurrentPromotionDate(promotion)
        dispatch(promoActions.showPromotionForEdit())
        dispatch(uiActions.setLoading(false))
    }
}

const updatePromotion         = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === promoActions.UPDATE_PROMOTION){
        dispatch(uiActions.setLoadingButton(true))
        const promotion = await promotionServices.updatePromotion(request, action.payload)
        dispatch(promoActions.showUpdatePromotionResponse(promotion))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const promotionMiddleWare = [getProductsForPromotion, setNewPromotion  , getPromotionsAvailable, 
                             deletePromotion        , getPromotionById , updatePromotion]

export default promotionMiddleWare;