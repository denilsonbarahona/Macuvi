import * as productAction    from '../actions/products.actions';
import * as uiActions        from '../../../ui/core/actions/ui.actions';
import * as categoriesAction from '../../../categories/core/actions/category.actions';
import * as taxesAction      from '../../../taxes/core/actions/taxes.actions';
import * as cookieAction     from '../../../../cookies/actions/cookie.actions';
import productServices       from '../services/product.service';

const loadProductsMiddleWare = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.GET_PRODUCTS){
            dispatch(productAction.CleanProductsPayload())
            dispatch(uiActions.setProductsLoading(true) ) 
            dispatch(categoriesAction.setCategortSelected({categories: action.payload.categories, selected: action.payload.category }))           
            const products =  await productServices.getProductsByCategory(request,action.payload.category,action.payload.company).then(res=>{return res});
            dispatch(uiActions.setProductsLoading(false) )
            window.moveProductGrid(0)
            dispatch(productAction.ShowProductsByCategory(products))            
        }
}

const showVariationsPopUp = ()=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.LOAD_VARIATIONS_POPUP){
            dispatch(productAction.ShowVariationsPopUp(action.payload))
        }
}

const getVariationsByProductId = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === productAction.GET_VARIATIONS_BY_PRODUCT){
        dispatch(uiActions.setLoadingProductToTicket(true))
        const variations = await productServices.getVariationByProduct(request, action.payload)
        window.setProductsVariations(variations)
        dispatch(uiActions.setLoadingProductToTicket(false)) 
    }
}

const getProductsByInput =(request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.GET_PRODUCTS_BY_INPUT){
            dispatch(uiActions.setProductsLoading(true) )                    
            const products = await productServices.getProductsByInput(request,{grid:action.payload.products, 
                input: action.payload.input, 
                company: action.payload.company})    
            dispatch(uiActions.setProductsLoading(false) )  
            window.moveProductGrid(0)
           
            dispatch(productAction.ShowProductsFilter(products))
        }
}

const getProductsList =(request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.GET_PRODUCTS_LIST){            
            dispatch(uiActions.setLoading(true))
            const products = await productServices.getProductsList(request, action.payload)
            let searchSize = (products.array.length >0)?(products.array.length-1):0
            if(searchSize < window.ProductPage){                                       
                action.payload.setPager(searchSize)
             }
            dispatch(productAction.ShowProductsList(products))
            dispatch(uiActions.setLoading(false))
        }
}

const getProductById =(request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === productAction.GET_PRODUCT_BY_ID){
            dispatch(uiActions.setLoading(true))           
            const product = await productServices.getProductById(request, action.payload.id) 
            action.payload.onSetProductState(product)
            dispatch(productAction.ShowProductById())
            dispatch(uiActions.setLoading(false))
        }
}

const resetEditProductState=()=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === productAction.RESET_STATE_EDIT_PRODUCT){
            dispatch(cookieAction.resetCookie())
            dispatch(categoriesAction.resetFindCategory())
            dispatch(taxesAction.ResetFindTaxed())
        }
}

const updateProductInformation =(request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === productAction.UPDATE_PRODUCT_INFORMATION){            
            dispatch(uiActions.setLoadingButton(true))
            const response = await productServices.updateProduct(request, action.payload)  
            dispatch(productAction.ShowUpdateResponse(response))      
            dispatch(uiActions.setLoadingButton(false))
        }
}

const deleteProduct = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === productAction.DELETE_PRODUCT){
        dispatch(uiActions.setLoadingButton(true))
        const response = await productServices.deleteProductById(request, action.payload)            
        if(response){ 
            const products = await productServices.getProductsList(request, action.payload) 
            let searchSize = (products.array.length >0)?(products.array.length-1):0
            if(searchSize < window.ProductPage){                                       
                action.payload.setPager(searchSize)
            }

            dispatch(productAction.ShowProductsList(products))
            dispatch(productAction.ShowDeleteResponse({response:true, msj:"El producto se ha eliminado de forma correcta"}))
            dispatch(uiActions.setLoadingButton(false))
        }else{
            dispatch(productAction.ShowDeleteResponse({response:false, msj:"Error al realizar la eliminación del producto"}))
            dispatch(uiActions.setLoadingButton(false))
        }
    }
}

const getIdentities = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.GET_IDENTITIES){
            dispatch(uiActions.setLoading(true))
            const identities = await productServices.getIdentities(request, action.payload)            
            dispatch(productAction.ShowIdentities(identities))
            dispatch(uiActions.setLoading(false))
        }
}

const getIdentitiesByFilter = (request) =>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.FILTER_IDENTITY){            
            dispatch(uiActions.setLoadingButton(true))
            const identities = await productServices.getFilterIdentities(request, action.payload)
            dispatch(productAction.ShowIdentities(identities))
            dispatch(uiActions.setLoadingButton(false))
        }
}

const getIdentitiesDescriptions = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.GET_IDENTITIES_DESCRIPTIONS){
            const uniques = await productServices.getIdentitiesDescriptions(request, action.payload)
            dispatch(productAction.ShowIdentitiesDescriptions(uniques))
        }
}

const updateIdentityDescription = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === productAction.UPDATE_IDENTITY_DESCRIPTION){
            dispatch(uiActions.setLoadingButtonPopUp(true))            
            const response =  await productServices.updateIdentityDescriptions(request, action.payload)
            if(response.response){
                var description = ""
                if(action.payload.filter ==="2"){
                    description = action.payload.identity_description
                }else{
                    description = action.payload.description
                }
                const identities = await productServices.getFilterIdentities(request,{...action.payload, "description":description})
                const uniques    = await productServices.getIdentitiesDescriptions(request, action.payload)
                dispatch(productAction.ShowIdentitiesDescriptions(uniques))
                dispatch(productAction.ShowIdentities(identities))
            }
            dispatch(productAction.ShowIdentityDescriptionResponse(response))
            dispatch(uiActions.setLoadingButtonPopUp(false))
        }
}

const createProductInformation = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if (action.type === productAction.CREATE_PRODUCT_INFORMATION) {            
            dispatch(uiActions.setLoadingButton(true))
            const response = await productServices.createProductInformation(request, action.payload)  
            dispatch(productAction.ShowCreateProductResponse(response))      
            dispatch(uiActions.setLoadingButton(false))
            if (response.response) {
                action.payload.setNewState()
                dispatch(productAction.SetIdentities(""))
            }            
        }
}

const productsMiddleWare =  [ loadProductsMiddleWare   , showVariationsPopUp, getProductsByInput   , 
                              getProductsList          , getProductById     , resetEditProductState, 
                              updateProductInformation , deleteProduct      , getIdentities        , 
                              getIdentitiesByFilter    , getIdentitiesDescriptions                 ,
                              updateIdentityDescription, createProductInformation, getVariationsByProductId
                            ]

export default productsMiddleWare;