import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import DeleteConfirmation from '../../../categories/infraestructure/components/category.delete.confirmation.component';
import UiLoading         from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }    from '../../../ui/core/selector/ui.selector';
import { loadCookie }    from '../../../../cookies/actions/cookie.actions';
import { getCookie  }    from '../../../../cookies/selectors/cookie.selector'; 
import { getCategory }   from '../../core/selector/category.selectors';
import { getCategoriesTable } from '../../core/actions/category.actions';


const ListCategory =()=>{

    const dispatch   = useDispatch();
    const [page, setPage] = useState(0)
    const [idDelete , setIdDelete] = useState("")
    const loading    = useSelector(getLoading);
    const categories = useSelector(getCategory);
    const cookie     = useSelector(getCookie);    

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }

        if(!loading.loading && !cookie.find && categories.find){
            dispatch(getCategoriesTable(cookie.cookie.login.companyId))            
        }
        
        if(categories.payload.chunk !== undefined){
            window.feather.replace()
        }
    })

    const onClickEdit =(id)=>{
        window.location.href = '/admin/update-category/'+id
    }

    const onClickDelete =(id)=>{
        window.showModal("#delete-category")
        setIdDelete(id)
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="3" sub="11"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Listado de Categorías </h2>                                                                       
                    </div>  
                    {(loading.loading)
                        ?<UiLoading loading={loading.loading}></UiLoading>  
                        :<div className="grid grid-cols-12 gap-6 mt-5">
                            {(cookie.cookie.login !== undefined)
                                ?<DeleteConfirmation state = {{idDelete: idDelete, company: cookie.cookie.login.companyId}}></DeleteConfirmation>
                                :<></>}
                            
                            <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                            
                                <div className="hidden md:block mx-auto text-gray-600">{categories.payload.size} categorías como resultado de la búsqueda</div>                            
                            </div>                                                                                                     
                                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                                    <table className="table table-report -mt-2">
                                        <thead>
                                            <tr>
                                                <th className="whitespace-nowrap">NOMBRE DE LA CATEGORÍA</th> 
                                                <th className="whitespace-nowrap">ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.payload.chunk !== undefined && categories.payload.chunk[page] !== undefined && 
                                             categories.payload.chunk[page].map((item, index)=>(
                                                <tr key={index} className="intro-x">
                                                    <td className="W-40"> {item.name} </td>                                                       
                                                    <td className="table-report__action w-56">
                                                        <div className="flex justify-center items-center">
                                                            <div onClick={()=>{ onClickEdit(item.id)   }} className="flex items-center mr-3 cursor-pointer"> <i data-feather="eye" className="w-4 h-4 mr-1" /> Visualizar </div> 
                                                            <div onClick={()=>{ onClickDelete(item.id) }} className="flex items-center mr-3 cursor-pointer text-theme-6"> <i data-feather="trash-2" className="w-4 h-4 mr-1" /> Eliminar </div>                                                                                                                             
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) }                                                                                                    
                                        </tbody>
                                    </table>
                                </div>
                                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                                    <ul className="pagination">
                                        <li onClick={()=>{ setPage(0)}} > <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                                        <li onClick={()=>{ if(page > 0) 
                                                              setPage(page -1) }} > 
                                            <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> </li>  
                                                                                            
                                            {categories.payload.chunk !== undefined && categories.payload.chunk[page] !== undefined && 
                                             categories.payload.chunk.map((item , index)=>(
                                                <li  key={index} onClick={()=>{ setPage(index) }} >
                                                    <div className={(index === page)
                                                            ?"pagination__link pagination__link--active cursor-pointer"
                                                            :"pagination__link cursor-pointer"} >
                                                        { index +1 }
                                                    </div></li>))}
                                        
                                        <li onClick={()=>{ if(page < categories.payload.chunk.length -1) 
                                                             setPage(page +1) }}> 
                                            <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> </li>
                                        <li onClick={()=>{ setPage(categories.payload.chunk.length -1)}}  > <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div> </li>
                                    </ul>                   
                                </div>                                           
                        </div>}                                        
                </div>
            </div>                                    
        </>
    )
}

export default ListCategory;