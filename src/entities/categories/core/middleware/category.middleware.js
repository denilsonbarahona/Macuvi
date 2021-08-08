import * as categoriesActions from '../actions/category.actions';
import * as productsActions   from '../../../products/core/actions/products.actions';
import categoryServices       from '../services/category.service';
import * as uiActions         from '../../../ui/core/actions/ui.actions';

const LoadCategoriesMiddleware =(requests)=>({dispatch})=>next=>async(action)=>{
        next(action);

        if(action.type === categoriesActions.GET_CATEGORIES){
            dispatch(uiActions.setCategoryLoading(true))   
            dispatch(productsActions.LoadProductsByCategory({category:"blank",company:action.payload, categories:[]}))                     
            const categories = await categoryServices.getCategoriesInTicket(requests,action.payload).then(res=>{ return res })           
            dispatch(categoriesActions.ShowCategories(categories))  
            dispatch(uiActions.setCategoryLoading(false))                                 
        }
}

const SetCategorySelected = ()=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === categoriesActions.SET_CATEGORY_SELECTED){
            const categories = await categoryServices.getSelectedCategory(action.payload.categories, action.payload.selected)            
            dispatch(categoriesActions.ShowCategories(categories))
        }
}

const CreateCategory =(request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === categoriesActions.CREATE_CATEGORY){
            if(action.payload.name.trim() !== ""){
                dispatch(categoriesActions.stateBeforeSubmit())
                dispatch(uiActions.setLoadingButton(true))
                const response = await categoryServices.createCategory(request,action.payload)
                if(response){
                    dispatch(categoriesActions.formReponse({response: true , msj: "Se ha registrado la categoría de forma exitosa."}))
                    action.payload.resetCategoryState()
                }else{
                    dispatch(categoriesActions.formReponse({response: false, msj: "Error del servidor al intentar registrar la categoría "}))
                }                
            }else {                
                dispatch(categoriesActions.formReponse({response: false, msj:"Se tiene que ingresar el nombre de la categoría."}))
            }
            dispatch(uiActions.setLoadingButton(false))
        }
}

const GetCategories = (request) =>({dispatch})=>next=>async(action)=>{
       next(action);
       if(action.type === categoriesActions.GET_TABLE_CATEGORIES){
            dispatch(uiActions.setLoading(true))
            const categories = await categoryServices.getCategoriesTable(request, action.payload)
            dispatch(categoriesActions.ShowCategories(categories))  
            dispatch(uiActions.setLoading(false))
       }
}

const GetCategoryById = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === categoriesActions.GET_CATEGORY_BY_ID){
        dispatch(uiActions.setLoading(true))        
        const category = await categoryServices.getCategoryById(request, action.payload.id);        
        window.setCategoryForUdate(category)
        dispatch(uiActions.setLoading(false))        
    }
}

const UpdateCategoryById = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === categoriesActions.UPDATE_CATEGORY_BY_ID){
        dispatch(uiActions.setLoadingButton(true))
        const response = await categoryServices.updateCategoryById(request, action.payload)
        dispatch(categoriesActions.updateCategoryByIdResponse(response))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const DeleteCategoryById =(request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === categoriesActions.DELETE_CATEGORY_BY_ID){
        dispatch(uiActions.setLoadingButton(true))  
        const response = await categoryServices.deleteCategoryById(request, action.payload.idDelete)        
        if(response){
            const categories = await categoryServices.getCategoriesTable(request, action.payload.company)
            dispatch(categoriesActions.ShowCategories(categories))  
            dispatch(categoriesActions.deleteCategoryResponse({response: true , msj: "La categoría se ha eliminado de forma correcta"}))
            dispatch(uiActions.setLoadingButton(false))
        }else {              
            dispatch(categoriesActions.deleteCategoryResponse({response: false , msj: "Error en el servidor al momento de eliminar la categoría"}))
            dispatch(uiActions.setLoadingButton(false))
        }
    }
}

const GetCategoryList = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(categoriesActions.GET_CATEGORIES_LIST === action.type){
            const response =  await categoryServices.getCategoryList(request, action.payload)
            dispatch(categoriesActions.showCategoriesList(response))
        }
}

const categoriesMiddleware  = [ LoadCategoriesMiddleware, SetCategorySelected, 
                                CreateCategory          , GetCategories      , 
                                GetCategoryById         , UpdateCategoryById , 
                                DeleteCategoryById      , GetCategoryList   
                            ]

export default categoriesMiddleware;