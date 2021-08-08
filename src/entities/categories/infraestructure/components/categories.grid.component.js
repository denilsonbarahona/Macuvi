import { React, useEffect }         from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadCategories }           from '../../core/actions/category.actions';
import { LoadProductsByCategory }   from '../../../products/core/actions/products.actions';
import { loadCookie }               from '../../../../cookies/actions/cookie.actions';
import { getLoading }               from '../../../ui/core/selector/ui.selector';
import { getCategory }              from '../../core/selector/category.selectors';
import { getCookie  }               from '../../../../cookies/selectors/cookie.selector'; 
import UiLoading                    from '../../../ui/infraestructure/components/ui.loading.component';

const GridCategories =()=>{

    const dispatch   = useDispatch()
    const categories = useSelector(getCategory)
    const loading    = useSelector(getLoading)    
    const cookie     = useSelector(getCookie);  

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
        
        if(!loading.loading && categories.find && !cookie.find){
            dispatch(LoadCategories(cookie.cookie.login.companyId))
        }
    })

    return( <>
                <UiLoading loading={loading.loadingCategory}></UiLoading>
                <div className="grid grid-cols-12 gap-5 mt-5">                
                    {categories.payload.map((category,index)=>
                            <div onClick={()=>{ dispatch(LoadProductsByCategory({category:category.id,company:cookie.cookie.login.companyId, categories: categories.payload}))}} 
                                 key={index} 
                                 className={((category.selected)? "bg-theme-1 ":"")+"col-span-12 sm:col-span-4 xxl:col-span-3 box p-5 cursor-pointer zoom-in"} >
                                <div className={((category.selected)?"text-white ":"" )+"font-medium text-base"}>{category.name}</div>
                                <div className={((category.selected)?"text-theme-25 ":"")+"text-gray-600"}>{category.counter} Productos</div>
                            </div>)}            
                </div>
            </>)}


export default GridCategories;
