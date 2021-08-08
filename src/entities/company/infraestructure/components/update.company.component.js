import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import SideMenu                       from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu                     from '../../../menu/infraestructure/components/mobile_menu.component';
import Header                         from '../../../header/infraestructure/components/header.component';
import UiLoading                      from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                 from '../../../ui/core/selector/ui.selector';
import { getCookie  }                 from '../../../../cookies/selectors/cookie.selector'; 
import { getCompany }                 from '../../core/selector/company.selector';
import { loadCookie }                 from '../../../../cookies/actions/cookie.actions'; 
import { getCompanyInformationById,
         updateCompanyInformation }   from '../../core/actions/company.action';

const UpdateCompany=()=>{

    const dispatch = useDispatch();
    const [showFormToUpdate, setShowFormToUpdate] = useState(false);
    const [companyState, setCompanyState] = useState({ name: "" ,delivery: "0"  , RTN: "", CAI: "", address: "", city: "" ,
                                                       email: "",phone: "" , docs: {ending: "", init: ""}, 
                                                       required: ["name","delivery","RTN","CAI","address","city","email","phone"] })
    const loading = useSelector(getLoading); 
    const cookie = useSelector(getCookie);  
    const company = useSelector(getCompany);
    const datePicker = document.getElementById("datepicker");

    useEffect(()=>{
        if(window.setDateFilters !== undefined){
            if(window.dateSetted === undefined){
                window.setDateFilters();
                window.feather.replace();
            }            
        }  
    },[datePicker])

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getCompanyInformationById({id:cookie.cookie.login.companyId }))
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])
       
    const onShowCompanyState =(company)=>{
        window.startDate  = (company.CompanyEndingDate==="")?undefined:company.CompanyEndingDate         
        setCompanyState({ ...companyState,
                name: company.CompanyName || "", 
                delivery: company.CompanyDeliverySale || "0", 
                RTN: company.CompanyRTN || "",
                CAI: company.CompanyCAI || "", 
                address: company.CompanyAddress || "", 
                city: company.CompanyCity || "",
                email: company.CompanyEmail || "", 
                phone: company.CompanyPhone || "",  
                docs: { ending: company.CompanyEndingDocs || "",  init: company.CompanyInitDocs || "" }  })
        setShowFormToUpdate(true)

    }
    
    window.onShowCompanyState = onShowCompanyState

    const onFormChange=(e)=>{
        if(["ending","init"].includes(e.target.name)){
            setCompanyState({...companyState, docs: {...companyState.docs, [e.target.name]: e.target.value} });
        }else{
            setCompanyState({...companyState, [e.target.name]: e.target.value });
        }        
    }

    const updateCompany=()=>{
        dispatch(updateCompanyInformation({...companyState,
                date: { ending: window.startDate}, 
                id: cookie.cookie.login.companyId,
                cookie: cookie.cookie
            }))
    }

    return (<>
                <MobileMenu></MobileMenu>
                <div  className="flex">
                    <SideMenu code="7" sub="31"></SideMenu> 
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> Información sobre: {companyState.name}</h2>
                            <div>
                                <button style={{display:(loading.button)?"":"none" }}  
                                        className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto">
                                                Actualizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button>
                                <button style={{display:(loading.button)?"none":"" }} type="button" 
                                        onClick={()=>{ updateCompany() }}
                                        className={"button w-40 bg-theme-1 text-white mt-5"}>Actualizar empresa</button>
                    </div>                                                                       
                        </div>
                        <div className="box p-5 mt-5"> 
                            <div className="intro-y col-span-12 lg:col-span-6">
                                {(!showFormToUpdate)
                                    ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                                    :<div className="intro-y p-5">
                                        {(company.companyResponse.show)
                                            ?<div className={(company.companyResponse.response)
                                                                ?"p-2 gap-4 gap-y-3 font-medium text-theme-9":
                                                                "p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                                {company.companyResponse.msj}
                                            </div>
                                            :<></> }                                     
                                        <div>  
                                            <div className="text-xs text-gray-600 mt-2 mb-5">Los campos con <span className="text-theme-6">(*)</span> son obligatorios.</div>                                          
                                            <div> 
                                                <label>Nombre o Razón social <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="name" value={companyState.name} 
                                                        onChange={onFormChange}
                                                    className={(company.companyResponse.emptyFields.find(f=> f==="name") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"} 
                                                    placeholder="Nombre o Razón social" /> 
                                            </div>  
                                            <div className="mt-5">
                                                <label>¿Se hacen entregas a domicilio? <span className="text-theme-6">*</span></label>
                                                <select name="delivery" 
                                                        onChange={onFormChange} 
                                                        value={companyState.delivery} 
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="delivery") !== undefined )
                                                                    ?"input w-full border border-theme-6 mr-auto whitespace-nowrap mt-0.5 "
                                                                    :"input border mr-auto whitespace-nowrap mt-0.5 w-full"} >
                                                    <option value="1">SI</option>
                                                    <option value="0">NO</option>
                                                </select>
                                            </div>
                                            <div className="mt-5"> 
                                                <label>R.T.N <span className="text-theme-6">*</span></label> 
                                                <input type="number" name="RTN" value={companyState.RTN} 
                                                        onChange={onFormChange}
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="RTN") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"} 
                                                        placeholder="R.T.N" /> 
                                            </div>                                      
                                            <div className="mt-5"> 
                                                <label>C.A.I <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="CAI" value={companyState.CAI} 
                                                    onChange={onFormChange}
                                                    className={(company.companyResponse.emptyFields.find(f=> f==="CAI") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"} 
                                                    placeholder="C.A.I" /> 
                                            </div>                                                                                                                            
                                            <div className="mt-5"> 
                                                <label>Dirección de la empresa <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="address" value={companyState.address} 
                                                        onChange={onFormChange}
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="address") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"} 
                                                        placeholder="Dirección de la empresa" /> 
                                            </div>                                        
                                            <div className="mt-5"> 
                                                <label>Ciudad <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="city" value={companyState.city} 
                                                        onChange={onFormChange}
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="city") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"} 
                                                        placeholder="Ciudad" /> 
                                            </div> 
                                            <div className="mt-5"> 
                                                <label>Correo electrónico <span className="text-theme-6">*</span></label> 
                                                <input type="text" name="email" value={companyState.email} 
                                                        onChange={onFormChange}
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="email") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"}
                                                        placeholder="Correo electrónico" /> 
                                            </div>                                        
                                            <div className="mt-5"> 
                                                <label>Número telefónico <span className="text-theme-6">*</span></label> 
                                                <input type="number" name="phone" value={companyState.phone} 
                                                        onChange={onFormChange}
                                                        className={(company.companyResponse.emptyFields.find(f=> f==="phone") !== undefined )
                                                                    ?"input w-full border border-theme-6 mt-2"
                                                                    :"input w-full border mt-2"}
                                                        placeholder="Número telefónico" /> 
                                            </div>   
                                            <div className="mt-5">
                                                <label>Rango de facturación </label>                                                 
                                                <div className="grid grid-cols-12 gap-5 mt-2">
                                                    <div className="col-span-12 xl:col-span-4">
                                                        <label>Desde </label> 
                                                        <input type="text" name="init" value={companyState.docs.init} 
                                                                onChange={onFormChange}
                                                                className="input w-full border mt-2" placeholder="Formato: 000-000-01-00000000" /> 
                                                    </div>    
                                                    <div className="col-span-12 xl:col-span-4">
                                                        <label>Hasta </label> 
                                                        <input type="text" name="ending" value={companyState.docs.ending} 
                                                                onChange={onFormChange}
                                                                className="input w-full border mt-2" placeholder="Formato: 000-000-01-00000000" /> 
                                                    </div>    
                                                    <div className="col-span-12 xl:col-span-4">
                                                        <label>Fecha de vencimiento </label> 
                                                        <div className="relative w-full mx-auto mt-2">
                                                            <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 border text-gray-600 dark:bg-dark-1 dark:border-dark-4"> 
                                                                <i data-feather="calendar" className="w-4 h-4"></i> 
                                                            </div> 
                                                            <input type="text" id="datepicker" 
                                                                className="datepicker w-full input pl-12 border" 
                                                                data-single-mode="true"/>
                                                        </div> 
                                                    </div>    
                                                </div>                                                
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

export default UpdateCompany;