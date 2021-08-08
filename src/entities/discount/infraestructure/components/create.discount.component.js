import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import SideMenu                       from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu                     from '../../../menu/infraestructure/components/mobile_menu.component';
import Header                         from '../../../header/infraestructure/components/header.component';
import UiLoading                      from '../../../ui/infraestructure/components/ui.loading.component';
import Select                         from 'react-select';
import { getLoading }                 from '../../../ui/core/selector/ui.selector';
import { getCookie  }                 from '../../../../cookies/selectors/cookie.selector'; 
import { getDiscount }                from '../../core/selector/discount.selector';
import { loadCookie }                 from '../../../../cookies/actions/cookie.actions';
import { setProductsWithDiscount,
         setNewDiscount }             from '../../core/actions/discount.actions';


const NewDiscount =()=>{

    const dispatch      = useDispatch();
    const cookie        = useSelector(getCookie);  
    const loading       = useSelector(getLoading);
    const disct_reducer = useSelector(getDiscount);
    const datePicker = document.getElementById("datepicker");
    const [discount, setDiscount] = useState({ name      : ""   , percentaje:""   , all:true, 
                                               products  : false, categories:false, withDiscount:[],
                                               life      : false,
                                               required  : ["name","percentaje"]  ,
                                               onRequired: { keys:["all","products","categories"], value:"true" } })

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])

    const onChangeDiscount =(e) =>{
        if(["name","percentaje"].includes(e.target.id) ){
            setDiscount({...discount, [e.target.id]: e.target.value })        
        }else if(["all","products","categories"].includes(e.target.id)){
            setDiscount({...discount,withDiscount:[] ,all:false, products:false, categories:false, [e.target.id]: e.target.checked })
            
            dispatch( setProductsWithDiscount({ company: cookie.cookie.login.companyId , 
                                                type: e.target.id }) )
        }else if(["life"].includes(e.target.id)){
            setDiscount({...discount, [e.target.id]: e.target.checked })        
        }        
    }

    const onChangeWithDiscount=(e)=>{    
        setDiscount({...discount, "withDiscount": e })   
    }

    const resetState = () =>{
        setDiscount({   name      : ""     , percentaje :""    , all :true, 
                        products  : false  , categories :false , withDiscount :[],
                        life      : false  ,
                        required  : ["name","percentaje"]  ,
                        onRequired: { keys:["all","products","categories"], value:"true" } 
                    })
    }

    return (<>
                <MobileMenu></MobileMenu>
                <div  className="flex">
                    <SideMenu code="5" sub="17"></SideMenu> 
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> Nuevo descuento </h2> 
                            <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 

                                <button style={{display:(loading.button)?"":"none" }}  
                                        className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto">
                                            Guardando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button>
                                <button style={{display:(loading.button)?"none":"" }}
                                     onClick={()=>{ dispatch( setNewDiscount({...discount, company: cookie.cookie.login.companyId ,
                                                                                date:{init: window.startDate, end: window.finishDate} ,
                                                                                resetState: resetState
                                                                            }) ) }} 
                                     className="button w-40 bg-theme-1 text-white mt-5">Guardar descuento</button>
                            </div>                                                                      
                        </div>
                        <div className="box p-5 mt-5"> 
                            <div className="intro-y col-span-12 lg:col-span-6">
                                {(cookie.find)
                                    ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                                    :<div className="intro-y p-5">
                                        {(disct_reducer.discountResponse.show)
                                            ?<div className={(disct_reducer.discountResponse.response)
                                                                ?"p-2 gap-4 gap-y-3 font-medium text-theme-9":
                                                                "p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                                {disct_reducer.discountResponse.msj}
                                            </div>
                                            :<></> } 
                                        <div>
                                            <div> 
                                                <label> Nombre del descuento </label> 
                                                <input type="text" name="name"  
                                                       onChange={onChangeDiscount}
                                                       id="name"   value={discount.name}  
                                                       className="input w-full border mt-2" placeholder="Nombre del descuento" /> 
                                            </div>
                                            <div className="mt-5"> 
                                                <label> Porcentaje del descuento </label> 
                                                <input type="number"   name="percentaje"  
                                                       onChange={onChangeDiscount}
                                                       id="percentaje" value={discount.percentaje}
                                                       className="input w-full border mt-2" placeholder="Porcentaje del descuento" /> 
                                            </div> 
                                            <div className="mt-5"> 
                                                <label>Aplicar en</label>
                                                <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                    <input  type="radio" className="input border mr-2" 
                                                            id="all" name="vertical_radio_button"
                                                            onChange={onChangeDiscount}
                                                            checked={discount.all} /> 

                                                      <label className="cursor-pointer select-none" 
                                                             htmlFor="all">Todos los productos</label> 
                                                </div>
                                                <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                    <input type="radio"  className="input border mr-2" 
                                                           id="products" name="vertical_radio_button" 
                                                           onChange={onChangeDiscount}
                                                           checked={discount.products}  /> 

                                                    <label className="cursor-pointer select-none" 
                                                           htmlFor="products">Uno o más productos</label> 
                                                </div>
                                                <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                    <input type="radio" className="input border mr-2" 
                                                           id="categories" name="vertical_radio_button" 
                                                           onChange={onChangeDiscount}
                                                           checked={discount.categories}  /> 
                                                           
                                                    <label className="cursor-pointer select-none" 
                                                           htmlFor="categories">Una o más categorías</label> 
                                                </div>
                                            </div>
                                            <div className="mt-5"> 
                                                <label> Seleccionar </label> 
                                                <Select id="withDiscount" 
                                                        isMulti
                                                        onChange={onChangeWithDiscount}
                                                        value={discount.withDiscount}
                                                        isDisabled={discount.all}
                                                        isLoading={disct_reducer.loaded}   
                                                        options={disct_reducer.setWithDiscount}
                                                        className="mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full"/> 
                                            </div>
                                            <div className="mt-5"> 
                                                <label>Duración</label>
                                                <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2 ml-5"> 
                                                    <input type="checkbox" value={discount.life} 
                                                            onChange={onChangeDiscount}
                                                            className="input border mr-2" id="life" />
                                                    
                                                    <label className="cursor-pointer select-none" 
                                                            htmlFor="life">Limitar la disponibilidad por fecha</label> 
                                                </div>                                             
                                            </div>
                                            <div style={{display:(discount.life)?"":"none" }} className="mt-5"> 
                                                <input  data-daterange="true" id="datepicker" className="datepicker input w-full border block mx-auto mt-2"/>                                            
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

export default NewDiscount;
