import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCustomer }                  from '../../../customers/core/selector/customer.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { setAccountReceivableConfNotification,
         getAccountReceivableConf }     from '../../core/actions/customer.action';
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';

const AccountReceivableConf=()=>{

    const [accountReceivableNotification, setAccountReceivableNotification] = useState({days: "", required:["days"], id:"",
                                                                                        greater: [
                                                                                            {key1: "days", greatherThan:0, errordescription:"La cantidad de días tiene que ser mayor a cero."}                                                                                            
                                                                                        ] })
    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)    
    const customers= useSelector(getCustomer)  
    const loading  = useSelector(getLoading)
 

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{        
        if(!cookie.find){
            dispatch(getAccountReceivableConf({company: cookie.cookie.login.companyId }))           
        }
    },[cookie.find, dispatch, cookie.cookie.login.companyId])

    const onChange =(e)=>{
        setAccountReceivableNotification({...accountReceivableNotification, [e.target.name]: e.target.value })
    }

    const updateReceivableNotifications=()=>{
        dispatch(setAccountReceivableConfNotification({company: cookie.cookie.login.companyId, ...accountReceivableNotification}))
    }

    const updateReceivableNotificationsState=(state)=>{        
        setAccountReceivableNotification({...accountReceivableNotification, "days": state.data.ConfigurationDays, id: state.id})
    }

    window.updateReceivableNotificationsState = updateReceivableNotificationsState

    return (<>
                <MobileMenu></MobileMenu>
                <div  className="flex">
                    <SideMenu code="7" sub="30"></SideMenu> 
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> Configuración de cuentas por cobrar</h2>                                                                       
                        </div>
                        <div className="box p-5 mt-5"> 
                            <div className="intro-y col-span-12 lg:col-span-6">
                                {(cookie.find || loading.loading)
                                    ?<div className="mb-10"><UiLoading loading={loading.loading}></UiLoading></div>
                                    :<div className="intro-y p-5">
                                        {customers.accountReceivableResponse.show
                                            ?<div className={customers.accountReceivableResponse.response
                                                                ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                                                :"p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                                {customers.accountReceivableResponse.msj}
                                            </div>
                                            :<></> }
                                                                    
                                        <div>
                                            <label>Días limites para cancelar cuentas por cobrar</label>
                                            <input id="days"  name="days" type="number"
                                                onChange={onChange}                                            
                                                value={accountReceivableNotification.days}
                                                className="input w-full border mt-2"  placeholder="Cantidad de días"/>
                                        </div>
                                        <button style={{display:(loading.button)?"":"none" }}  
                                            className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                                Actualizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                        <button style={{display:(loading.button)?"none":"" }} type="button" 
                                                className="button w-40 bg-theme-1 text-white mt-5"
                                                onClick={()=>{ updateReceivableNotifications() }}
                                        >Actualizar</button>
                                    </div> }                                
                            </div>
                        </div>                       
                    </div>
                </div>
            </>)
}

export default AccountReceivableConf;