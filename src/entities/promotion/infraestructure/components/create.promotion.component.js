import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import SideMenu                       from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu                     from '../../../menu/infraestructure/components/mobile_menu.component';
import Header                         from '../../../header/infraestructure/components/header.component';
import UiLoading                      from '../../../ui/infraestructure/components/ui.loading.component';
import Select                         from 'react-select';
import { getLoading }                 from '../../../ui/core/selector/ui.selector';
import { getCookie  }                 from '../../../../cookies/selectors/cookie.selector'; 
import { getPromotion }               from '../../core/selector/promotion.selector';
import { loadCookie }                 from '../../../../cookies/actions/cookie.actions';
import { SetNewPromotion ,
         getProductsForPromotion }    from '../../core/actions/promotion.actions';

const NewPromotion=()=>{

    const dispatch = useDispatch();
    const [PromoState, setPromoState] = useState({  name:""      , promotionAmount:"", withPromotion:[], discount: true, 
                                                    percentaje:"", off: false , free: "", life:false ,
                                                    required  : ["name","promotionAmount"]  })
    const datePicker = document.getElementById("datepicker");
    const cookie = useSelector(getCookie);  
    const promotion = useSelector(getPromotion);
    const loading = useSelector(getLoading);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getProductsForPromotion({company: cookie.cookie.login.companyId}))
        }
    },[dispatch, cookie.cookie.login.companyId, cookie.find])

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])

    const onChangePromotion = (e) =>{   
        if( ["discount", "off"].includes(e.target.id) ){
            setPromoState({...PromoState,discount: false , off: false ,[e.target.id]: e.target.checked })
        }else if(["life"].includes(e.target.id)){
            setPromoState({...PromoState ,[e.target.id]: e.target.checked })
        } else{
            setPromoState({...PromoState, [e.target.id]: e.target.value })
        }
    }

    const onSelectedProducts = (e)=>{
        setPromoState({...PromoState, "withPromotion": e })
    }

    const resetState = ()=>{
        setPromoState({  name      : "", promotionAmount  : "", withPromotion:[], discount: true, 
                         percentaje: "", off: false , free: "", life:false ,
                         required  : ["name","promotionAmount"]   })
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div  className="flex">
                <SideMenu code="5" sub="18"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Nueva promoción </h2> 
                        <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 

                            <button style={{display:(loading.button)?"":"none" }}  
                                    className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto">
                                        Guardando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                            </button>
                            <button style={{display:(loading.button)?"none":"" }}
                                    onClick={()=>{ dispatch( SetNewPromotion({...PromoState, company: cookie.cookie.login.companyId ,
                                                                                date:{init: window.startDate, end: window.finishDate} ,
                                                                                resetState: resetState
                                                                            }) ) }} 
                                    className="button w-40 bg-theme-1 text-white mt-5">Guardar promoción</button>
                        </div>                                                                      
                    </div>
                    <div className="box p-5 mt-5"> 
                        <div className="intro-y col-span-12 lg:col-span-6">
                            {(cookie.find)
                                ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                                :<div className="intro-y p-5">
                                    {(promotion.showPromotionResponse.show)
                                            ?<div className={(promotion.showPromotionResponse.response)
                                                                ?"p-2 gap-4 gap-y-3 font-medium text-theme-9":
                                                                "p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                                {promotion.showPromotionResponse.msj}
                                            </div>
                                            :<></> } 
                                    <div>
                                        <div> 
                                            <label> Nombre de la promoción </label> 
                                            <input type="text" name="name" id="name"  
                                                value={PromoState.name}   
                                                onChange={onChangePromotion}
                                                className="input w-full border mt-2" placeholder="Nombre de la promoción" /> 
                                        </div>
                                        <div className="mt-5"> 
                                            <label> Cantidad en promoción </label> 
                                            <input type="number"   name="promotionAmount"  
                                                    id="promotionAmount" 
                                                    onChange={onChangePromotion}
                                                    value={PromoState.promotionAmount}
                                                    className="input w-full border mt-2" placeholder="Cantidad en promoción" /> 
                                             <div className="text-xs text-gray-600 mt-2">Se refiere a la cantidad de ítems del mismo producto que el cliente tiene que comprar para adquirir la promoción.</div>
                                        </div>
                                        <div className="mt-5"> 
                                            <label> Productos en promoción </label> 
                                            <Select id="withPromotion" 
                                                    isMulti
                                                    onChange={onSelectedProducts}
                                                    value={PromoState.withPromotion}                                                
                                                    isLoading={!promotion.showPromotions}    
                                                    options={promotion.withPromotion}
                                                    isOptionDisabled={(option) => option.isdisabled}
                                                    className="mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full"/> 
                                        </div>
                                        <div className="mt-5"> 
                                            <label>Recompensa</label> 
                                            <div className="grid grid-cols-10 gap-5 mt-4 ml-5">
                                                <div className="col-span-10 xl:col-span-5">
                                                    <div>
                                                        <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                            <input  type="radio" className="input border mr-2" 
                                                                    checked={PromoState.discount}
                                                                    onChange={onChangePromotion}
                                                                    id="discount" name="row_radio_button"  /> 

                                                            <label className="cursor-pointer select-none"                                                                 
                                                                    htmlFor="discount">Rebaja de precio (Porcentaje)</label> 
                                                        </div>
                                                        <input  type="number" id="percentaje" name="percentaje" 
                                                                value={PromoState.percentaje}
                                                                readOnly={!PromoState.discount}
                                                                onChange={onChangePromotion}
                                                                className={(PromoState.discount)
                                                                                ?"input w-full border mt-2"
                                                                                :"input w-full border mt-2 bg-gray-100 cursor-not-allowed" } 
                                                                placeholder="Descuento en porcentaje"  />
                                                    </div>
                                                </div>
                                                <div className="col-span-10 xl:col-span-5">
                                                    <div>
                                                        <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                            <input  type="radio" className="input border mr-2" 
                                                                    checked={PromoState.off}
                                                                    onChange={onChangePromotion}
                                                                    id="off" name="row_radio_button"  /> 

                                                            <label className="cursor-pointer select-none" 
                                                                    htmlFor="off">Producto gratis</label> 
                                                        </div>
                                                        <input type="number" id="free" name="free" 
                                                                value={PromoState.free}
                                                                onChange={onChangePromotion}
                                                                readOnly={!PromoState.off}
                                                                className={(PromoState.off)
                                                                            ?"input w-full border mt-2"                                                                        
                                                                            :"input w-full border mt-2 bg-gray-100 cursor-not-allowed"
                                                                            } 
                                                                placeholder="Cantidad gratis"  />
                                                    </div>
                                                </div>
                                            </div>                                                                                       
                                        </div>
                                        <div className="mt-5"> 
                                            <label>Duración</label>
                                            <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2 ml-5"> 
                                                <input  type="checkbox" name="life"
                                                        checked={PromoState.life}
                                                        onChange={onChangePromotion}
                                                        className="input border mr-2" id="life" />
                                                
                                                <label className="cursor-pointer select-none" 
                                                        htmlFor="life">Limitar la disponibilidad por fecha</label> 
                                            </div>                                             
                                        </div>
                                        <div style={{display:(PromoState.life)?"":"none" }}  className="mt-5"> 
                                            <input  data-daterange="true" id="datepicker" className="datepicker input w-full border block mx-auto mt-2"/>                                            
                                        </div>
                                    </div>                                    
                                </div> }
                                    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewPromotion;