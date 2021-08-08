import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import SideMenu                       from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu                     from '../../../menu/infraestructure/components/mobile_menu.component';
import Header                         from '../../../header/infraestructure/components/header.component';
import UiLoading                      from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                 from '../../../ui/core/selector/ui.selector';
import { loadCookie }                 from '../../../../cookies/actions/cookie.actions';
import { getCustomer }                from '../../core/selector/customer.selector';
import { getCookie  }                 from '../../../../cookies/selectors/cookie.selector'; 
import { setCustomer }         from '../../core/actions/customer.action';


const NewCustomer=()=>{

    const dispatch = useDispatch();
    const [customerForm, setCustomerForm] = useState({ name:"", rtn:"", dni:"", email:"", phone:"" ,
                                               required:["name","dni"]    
                                            })
    const loading   = useSelector(getLoading);
    const customers = useSelector(getCustomer);
    const cookie    = useSelector(getCookie);  

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    const onsetCustomerForm =()=>{
        setCustomerForm({...customerForm, name:"", rtn:"", dni:"", email:"", phone:"" }) 
    }

    const onFormChange=(e)=>{
        setCustomerForm({...customerForm, [e.target.name]: e.target.value, onsetCustomerForm: onsetCustomerForm });
    }

    return (<>
                <MobileMenu></MobileMenu>
                <div  className="flex">
                    <SideMenu code="4" sub="14"></SideMenu> 
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> Nuevo cliente </h2>     
                            <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                                <button style={{display:(loading.button)?"":"none" }}  
                                        className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto">
                                                Registrando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button>
                                <button style={{display:(loading.button)?"none":"" }} type="button" 
                                        onClick={()=>{ dispatch(setCustomer({...customerForm, company:cookie.cookie.login.companyId})) }}
                                        className={"button w-40 bg-theme-1 text-white mt-5"}>Registrar cliente</button>
                            </div>                                                                  
                        </div>
                        <div className="box p-5 mt-5"> 
                            <div className="intro-y col-span-12 lg:col-span-6">
                                {(cookie.find)
                                    ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                                    :<div className="intro-y p-5">
                                        {(customers.SetResponse.show)
                                            ?<div className={(customers.SetResponse.response)
                                                                ?"p-2 gap-4 gap-y-3 font-medium text-theme-9":
                                                                "p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                                {customers.SetResponse.msj}
                                            </div>
                                            :<></> }                                     
                                        <div>
                                            <div className="text-xs text-gray-600 mt-2 mb-5">Los campos con <span className="text-theme-6">(*)</span> son obligatorios.</div>
                                            <div> 
                                                <label>Nombre completo <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="name" value={customerForm.name} 
                                                        onChange={onFormChange}
                                                    className="input w-full border mt-2" placeholder="Nombre completo" /> 
                                            </div>  
                                            <div className="mt-5"> 
                                                <label>D.N.I <span className="text-theme-6">*</span></label> 
                                                <input type="number" name="dni" value={customerForm.dni} 
                                                        onChange={onFormChange}
                                                        className="input w-full border mt-2" placeholder="D.N.I" /> 
                                            </div>                                      
                                            <div className="mt-5"> 
                                                <label>R.T.N</label> 
                                                <input type="number" name="rtn" value={customerForm.rtn} 
                                                    onChange={onFormChange}
                                                    className="input w-full border mt-2" placeholder="R.T.N" /> 
                                            </div>                                                                                                                            
                                            <div className="mt-5"> 
                                                <label>Correo electrónico</label> 
                                                <input type="text" name="email" value={customerForm.email} 
                                                        onChange={onFormChange}
                                                        className="input w-full border mt-2" placeholder="Correo electrónico" /> 
                                            </div>                                        
                                            <div className="mt-5"> 
                                                <label>Número de teléfono</label> 
                                                <input type="number" name="phone" value={customerForm.phone} 
                                                        onChange={onFormChange}
                                                        className="input w-full border mt-2" placeholder="Número de teléfono" /> 
                                            </div>                                        
                                        </div>  
                                       
                                    </div>
                                }                                                                
                            </div>
                        </div>                       
                    </div>
                </div>
            </>)
}

export default NewCustomer;