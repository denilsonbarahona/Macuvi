import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import DeleteReceivableConfirmation     from '../../infraestructure/components/accounts.receivable.delete.popup.component';
import ReceivableTable                  from '../../../customers/infraestructure/components/accounts.receivable.table.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { getCustomer }                  from '../../../customers/core/selector/customer.selector';
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import { GetAccountsReceivable }        from '../../core/actions/customer.action';

const AccountsRecivableList=()=>{

    const dispatch                 = useDispatch();
    const [page    , setPage]      = useState((window.ReceivablePage === undefined)?0:window.ReceivablePage)
    const [filter  , setFilter]    = useState({findBy:"0", value:"", event:"load"});
    const [idDelete, setIdDelete]  = useState("");
    const loading                  = useSelector(getLoading);    
    const cookie                   = useSelector(getCookie);
    const customers                = useSelector(getCustomer);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(customers.getAccountsReceivable && !cookie.find){
            dispatch(GetAccountsReceivable({ filter : {type: filter.findBy, value: filter.value, event:"load"} ,
                                             company: cookie.cookie.login.companyId ,
                                             setPager : setPager }))
        }
    },[cookie.find, dispatch, customers.getAccountsReceivable, cookie.cookie.login.companyId, filter.findBy, filter.value])    

    const setPager=(index)=>{
        window.ReceivablePage = index;
        setPage(index)
    }

    const onDeleteReceivable=(id)=>{
        window.showModal("#delete-receivable");
        setIdDelete(id)
    }

    const onShowReceivable=(id)=>{
     window.location.href ="/admin/view-receivabe/"+id+"/"+cookie.cookie.company.CompanyName 
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="4" sub="16"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Listado de cuentas por cobrar </h2>                                                                       
                    </div> 
                    {(cookie.cookie.login !== undefined)
                        ? <div className="flex intro-y mb-10 mt-10">
                            <div className="relative w-9/12 text-gray-700 dark:text-gray-300">
                                <DeleteReceivableConfirmation state={{idDelete : idDelete, 
                                                                      company  : cookie.cookie.login.companyId, 
                                                                      filter   : {type: filter.findBy, value: filter.value} ,
                                                                      setPager : setPager}} ></DeleteReceivableConfirmation>
                                <div className="w-max mb-5 relative text-gray-700">    
                                    <select name="findBy"
                                            value={filter.findBy}
                                            onChange={(e)=>{setFilter({...filter, "findBy":e.target.value, "value":""})}}  
                                            className="input border mr-auto whitespace-nowrap mt-0.5">
                                        <option key="0" value="0">Buscar todos</option> 
                                        <option key="1" value="1">Buscar por DNI</option> 
                                        <option key="2" value="2">Buscar por nombre</option> 
                                    </select> 
                                </div> 
                                <input type="text" 
                                        name="filter"  
                                        value={filter.value}
                                        onChange={(e)=>{setFilter({...filter, "value":e.target.value})}} 
                                        className="input w-52 box placeholder-theme-13 w-90 mr-5" 
                                        placeholder="Ingrese el valor de la búsqueda" />
                                <>                                            
                                    <button style={{display:(loading.button)?"":"none" }}  
                                            className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                    <button style={{display:(loading.button)?"none":"" }}  
                                            onClick={()=>{ dispatch(GetAccountsReceivable({ filter  : {type: filter.findBy, value: filter.value} ,
                                                                                            company : cookie.cookie.login.companyId ,
                                                                                            setPager: setPager ,
                                                                                            event   : "click"
                                                                                        })) } } 
                                            type="button" 
                                            className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                                </> 
                            </div>
                         </div>
                        :<></>}
                    {(loading.loading)
                        ?<UiLoading loading={loading.loading}></UiLoading> 
                        :<ReceivableTable props ={{...customers.payload, 
                                                   setPager          : setPager ,
                                                   page              : page,
                                                   onDeleteReceivable: onDeleteReceivable,
                                                   onShowReceivable  : onShowReceivable
                                                 }} ></ReceivableTable>}
                </div>
            </div>
        </>
    )
}

export default AccountsRecivableList;

 