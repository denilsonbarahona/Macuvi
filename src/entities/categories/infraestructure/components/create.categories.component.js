import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../header/infraestructure/components/header.component';
import MobileMenu from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu from '../../../menu/infraestructure/components/side_menu.component';
import { getLoading } from '../../../ui/core/selector/ui.selector';
import { loadCookie } from '../../../../cookies/actions/cookie.actions';
import { createCategory_ } from '../../core/actions/category.actions'
import { getCategory } from '../../core/selector/category.selectors';
import { getCookie  } from '../../../../cookies/selectors/cookie.selector'; 

const CreateCategory =()=>{

    const [categoryState, setCategoryState] = useState({name: "" })
    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)    
    const category = useSelector(getCategory)  
    const loading  = useSelector(getLoading)

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    })

    const onChangeCategory = (e)=>{
        setCategoryState(()=>({...categoryState, [e.target.id]: e.target.value }))
    }

    const onClickCreateNewCategory =()=>{
        dispatch(createCategory_({...categoryState, 
            company: cookie.cookie.login.companyId,
            resetCategoryState: resetCategoryState}))
    }

    const resetCategoryState = ()=>{
        setCategoryState({name:""})
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="3" sub="10"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Nueva Categoría </h2>  
                        <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                            <button style={{display:(loading.button)?"":"none" }}  
                                    className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                        Registrando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }} type="button" 
                                    className="button w-40 bg-theme-1 text-white mt-5"
                                    onClick={onClickCreateNewCategory}>Registrar categoria</button>
                         
                        </div>                                                                     
                    </div>
                    <div className="box p-5 mt-5"> 
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <div className="intro-y p-5">
                                <div className="p-2 gap-4 gap-y-3 font-medium text-theme-6"> 
                                    {(category.fail)
                                         ?category.msj 
                                        :""}
                                </div>  
                                <div className="p-2 gap-4 gap-y-3 font-medium text-theme-9"> 
                                    {(category.success)
                                        ?category.msj
                                        :""}   
                                </div>                                
                                <div>
                                    <label>Nombre de la categoría</label>
                                    <input id="name" value={categoryState.name} onChange={onChangeCategory} 
                                           className="input w-full border mt-2"  placeholder="Categoría"/>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>                                    
        </>
    )
}

export default CreateCategory;