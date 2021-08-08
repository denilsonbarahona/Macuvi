import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useParams }     from 'react-router';
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading         from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }    from '../../../ui/core/selector/ui.selector';
import { getTaxes }      from '../../../taxes/core/selector/taxes.selector';
import { getCookie  }    from '../../../../cookies/selectors/cookie.selector'; 
import { GetTaxById, 
         UpdateTax }     from '../../core/actions/taxes.actions';
import { loadCookie }    from '../../../../cookies/actions/cookie.actions';
 
const EditTax =()=>{

    const [taxState, setTaxState] = useState({name: "", tax:"", required:["name", "tax"],
        greater: [{key1: "tax", greatherThan:-1, errordescription:"El valor del impuesto tiene que ser mayor o igual a cero."}] })

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)    
    const taxes = useSelector(getTaxes)  
    const params = useParams();
    const loading  = useSelector(getLoading)

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        dispatch(GetTaxById({id: params.id}))
    },[dispatch,params.id])

    const onChangeState = (e)=>{
        setTaxState(()=>({...taxState, [e.target.id]: e.target.value }))
    }

    const onSetTaxForEdit=(tax)=>{ 
        setTaxState(()=>({...taxState, name:tax.data.TaxName, tax: tax.data.Tax }))
    }

    window.onSetTaxForEdit = onSetTaxForEdit

    const onClickUpdateTax =()=>{
        dispatch(UpdateTax({...taxState,name:taxState.name.trim(), id: params.id }))
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="7" sub=""></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Editar impuesto </h2>
                        <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                            <button style={{display:(loading.button)?"":"none" }}  
                                    className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                        Actualizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }} type="button" 
                                    className="button w-40 bg-theme-1 text-white mt-5"
                                    onClick={onClickUpdateTax}>Actualizar impuesto</button>
                         
                        </div>                                                                       
                    </div>
                    <div className="box p-5 mt-5"> 
                        <div className="intro-y col-span-12 lg:col-span-6">
                            <div className="intro-y p-5">
                            {(loading.loading)
                                ?<div ><UiLoading loading={loading.loading}></UiLoading></div>
                                :<>
                                    {taxes.taxReponse.show_response
                                        ?<div className={ taxes.taxReponse.response?
                                                "p-2 gap-4 gap-y-3 font-medium text-theme-9":
                                                "p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                            { taxes.taxReponse.msj }
                                        </div>
                                        :<></> }                                             
                                    <div>
                                        <label>Nombre del impuesto</label>
                                        <input id="name" value={taxState.name} onChange={onChangeState} 
                                            className="input w-full border mt-2"  placeholder="Nombre del impuesto: ISV(15%)"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>Impuesto</label>
                                        <input id="tax" type="number" min="0" value={taxState.tax} onChange={onChangeState} 
                                            className="input w-full border mt-2"  placeholder="Impuesto gravado: 15"/>
                                    </div>
                                </>}  
                            </div>
                        </div>
                    </div>
                </div>
            </div>                                    
        </>
    )
}

export default EditTax;