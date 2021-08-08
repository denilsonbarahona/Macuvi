import * as discountActions from '../actions/discount.actions';
import * as uiActions       from '../../../ui/core/actions/ui.actions';
import categoryServices     from '../../../categories/core/services/category.service';
import productServices      from '../../../products/core/services/product.service';
import discountRequest      from '../services/discounts.requests';

const findDiscountActions     = (requests)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === discountActions.FIND_GLOBAL_DISCOUNT){         
       var globalDiscounts = await discountRequest.findGlobalDiscounts(action.payload , requests);
       dispatch(discountActions.showGlobalDiscount(globalDiscounts))
    }
}

const setNewDiscount          = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === discountActions.SET_DISCOUNT){
        dispatch(uiActions.setLoadingButton(true))
        var discountResponse = await discountRequest.setNewDiscount(request, action.payload);
        dispatch(discountActions.showSetDiscountResponse(discountResponse))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const SetProductsWithDiscount = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === discountActions.SET_PRODUCTS_WITH_DISCOUNT){
        let withDiscount = [] 
        if(action.payload.type ==="categories"){
            withDiscount = await categoryServices.getCategoriesForDiscount(request,action.payload.company)             
        }else if(action.payload.type ==="products") {
            withDiscount = await productServices.getProductsForCombo(request, action.payload.company)
        }else {
            withDiscount = []
        } 
        dispatch( discountActions.showProductsWithDiscount(withDiscount) )
    }
}

const getDiscounts            = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === discountActions.GET_DISCOUNTS){
            dispatch(uiActions.setLoading(true))
            const discounts = await discountRequest.getDiscounts(request, action.payload)
            dispatch(discountActions.showDiscounts(discounts))
            dispatch(uiActions.setLoading(false))
        }
}

const deleteDiscount          = (request)=>({dispatch})=>next=>async(action)=>{
       next(action)
       if(action.type === discountActions.DELETE_DISCOUNT){
           dispatch(uiActions.setLoadingButtonPopUp(true))
           const deleteResponse = await discountRequest.deleteDiscount(request, action.payload)
           if(deleteResponse.result){
                const discounts = await discountRequest.getDiscounts(request, action.payload)
                let searchSize = (discounts.array.length >0)?(discounts.array.length-1):0
                if(searchSize < window.discountPage){                                       
                    action.payload.setPager(searchSize)
                }
                dispatch(discountActions.showDiscounts(discounts))
           }
           dispatch(discountActions.showDeleteDiscount(deleteResponse))
           dispatch(uiActions.setLoadingButtonPopUp(false))
       }
} 

const getDiscountById         = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === discountActions.GET_DISCOUNT_BY_ID){
            dispatch(uiActions.setLoading(true))
            const discount = await discountRequest.getDiscountById(request, action.payload)     
            let withDiscount = [] 
            if(discount.DiscountInCategories===1){
                withDiscount = await categoryServices.getCategoriesForDiscount(request,discount.DiscountCompanyId)             
            }else if(discount.DiscountInProducts ===1) {
                withDiscount = await productServices.getProductsForCombo(request, discount.DiscountCompanyId)
            }else {
                withDiscount = []
            } 
            dispatch( discountActions.showProductsWithDiscount(withDiscount) )       
            window.setCurrentDiscountData(discount)
            dispatch(discountActions.showDiscountForEdit())
            dispatch(uiActions.setLoading(false))
        }
}

const updateDiscount        = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === discountActions.UPDATE_DISCOUNT){
            dispatch(uiActions.setLoadingButton(true))
            const updateResponse = await discountRequest.updateDiscount(request, action.payload)
            dispatch(discountActions.showUpdateResponse(updateResponse))
            dispatch(uiActions.setLoadingButton(false))
        }
}


const discountMiddleWare = [ findDiscountActions    , setNewDiscount, 
                             SetProductsWithDiscount, getDiscounts  , 
                             deleteDiscount         , getDiscountById,
                             updateDiscount ];

export default discountMiddleWare;