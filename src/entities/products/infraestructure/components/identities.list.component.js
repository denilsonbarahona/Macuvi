import { React,  useEffect, useState }      from 'react';
import { useDispatch, useSelector    }      from 'react-redux';
import Header                               from '../../../header/infraestructure/components/header.component';
import MobileMenu                           from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                             from '../../../menu/infraestructure/components/side_menu.component';
import TableIdentities                      from '../../../products/infraestructure/components/identities.table.component';
import { GetIdentities,
         FilterIdentity,
         GetIdentitiesDescriptions,
         UpdateIdentityDescription }        from '../../../products/core/actions/products.actions';
import { loadCookie  }                      from '../../../../cookies/actions/cookie.actions';
import { getProducts }                      from '../../core/selectors/products.selectors';
import { getLoading  }                      from '../../../ui/core/selector/ui.selector';
import { getCookie   }                      from '../../../../cookies/selectors/cookie.selector';


const IdentitiesList =()=>{

    const dispatch = useDispatch();
    const [Page, SetPage] = useState(0)
    const [findMethod, setFindMethod] = useState("0")
    const [filter, setFilter]         = useState({identity:"", description:"blank"})
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie);
    const product  = useSelector(getProducts);

    useEffect(()=>{
        dispatch(loadCookie())      
    },[dispatch])
    
    useEffect(()=>{
        if(product.getIdentitiesList && !cookie.find && !loading.loading ){
            dispatch(GetIdentities({company:cookie.cookie.login.companyId }))
        }
    },[dispatch, product.getIdentitiesList, cookie.find, loading.loading, cookie.cookie.login.companyId])

    useEffect(()=>{
        if(product.getDescriptions && !cookie.find && product.getIdentitiesList && !loading.loading ){
            dispatch(GetIdentitiesDescriptions({company:cookie.cookie.login.companyId }))
        }
    },[dispatch, product.getDescriptions, product.getIdentitiesList, cookie.find, loading.loading, cookie.cookie.login.companyId])

    const onChangeFindMethod=(e)=>{
        setFindMethod(e.target.value)
    }

    const onFilterChange=(e)=>{     
        if(e.target.name ==="description"){
            if(e.target.value !== "blank"){
                setFilter(()=>({...filter , [e.target.name]: e.target.value}))
            }
        }else{
            setFilter(()=>({...filter , [e.target.name]: e.target.value}))            
        }
    }

    const updateIdentityDescription=(payload)=>{
        dispatch(UpdateIdentityDescription({ ...payload , company : cookie.cookie.login.companyId, filter : findMethod ,
                                             identity: filter.identity, description : filter.description}))
    }

    return (
        <div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="3" sub="12"></SideMenu>
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"><b>Lista de identificadores</b></h2>                                                                       
                        </div>  
                        {(cookie.cookie.login !== undefined)
                            ?  <div className="flex intro-y mb-10 mt-10">                            
                                    <div className="relative w-9/12 text-gray-700 dark:text-gray-300"> 
                                            <div className="w-max mb-5 relative text-gray-700">    
                                                <select name="findBy"                                                 
                                                        onChange={onChangeFindMethod}
                                                        value={findMethod}
                                                        className="input border mr-auto whitespace-nowrap mt-0.5">
                                                    <option key="0" value="0">Buscar todos</option> 
                                                    <option key="1" value="1">Buscar por identificador</option> 
                                                    <option key="2" value="2">Buscar por descripción</option> 
                                                </select> 
                                            </div>   
                                            {(findMethod ==="2")
                                                ?<select name="description" 
                                                            onChange={onFilterChange}
                                                            value={filter.description}
                                                            className="input border whitespace-nowrap mt-0.5 mr-5">
                                                    <option key="1" value="blank">Seleccionar la descripción</option> 
                                                    {(product.identitiesDescriptions.map((item, index)=>(
                                                        <option key={index} value={item}>{item}</option> 
                                                    ))) }                                                    
                                                 </select>

                                                :<input type="text" 
                                                        name="identity" 
                                                        onChange={onFilterChange}
                                                        value={filter.identity}
                                                        className="input w-52 box placeholder-theme-13 w-90 mr-5" 
                                                        placeholder="Ingrese el identificar del producto" />}
                                            <>                                            
                                                <button style={{display:(loading.button)?"":"none" }}  className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                                <button style={{display:(loading.button)?"none":"" }}  
                                                        onClick={()=>{
                                                                        dispatch
                                                                        (
                                                                            FilterIdentity(
                                                                                { 
                                                                                    company     : cookie.cookie.login.companyId, 
                                                                                    filter      : findMethod ,
                                                                                    identity    : filter.identity ,
                                                                                    description : filter.description
                                                                                }
                                                                             )
                                                                         ) }} 
                                                        type="button" 
                                                        className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                                            </>                                                                        
                                    </div>                                           
                                </div>
                            :  <></> }                   
                        <TableIdentities payload={{...product.payload             ,  
                                                 updateIdentityResponse   : product.updateIdentityResponse, 
                                                 updateIdentityDescription: updateIdentityDescription,                                               
                                                 SetPage         : SetPage        ,
                                                 Page            : Page           ,                                               
                                                 loading         : loading }}></TableIdentities> 
                    </div>
                </div>
        </div>)
}

export default IdentitiesList;

