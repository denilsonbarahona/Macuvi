import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useParams }                    from 'react-router';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector';
import { getPOS }                       from '../../core/selector/pos.selector'; 
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import { getPOSBYID, updatePOS  }       from '../../core/actions/posActions';

const UpdatePOS =()=>{

    const [posState, setPosState] = useState({name: "" , percentage:"", 
                                              required:["name","percentage"],
                                              greater : [ {key1: "percentage", greatherThan:-1, errordescription:"El porcentaje tiene que ser mayor o igual a cero."}, ] })
    const dispatch = useDispatch();
    const params   = useParams();
    const cookie   = useSelector(getCookie);   
    const POS      = useSelector(getPOS);     
    const loading  = useSelector(getLoading);

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        dispatch(getPOSBYID({id: params.id, onSetPOSState: onSetPOSState}))
    },[dispatch, params.id])

    const onChangeState = (e)=>{
        setPosState(()=>({...posState, [e.target.id]: e.target.value }))
    }

    const onUpdatePOSClick =()=>{
        dispatch(updatePOS({...posState, id: params.id ,company:  cookie.cookie.login.companyId}))        
    }

    const onSetPOSState =(POSData)=>{

        setPosState({   name    : POSData.PosName , percentage: POSData.PosFee, 
                        required:["name","percentage"],
                        greater : [ {key1: "percentage", greatherThan:+1, errordescription:"El porcentaje tiene que ser mayor o igual a cero."}, ] } ) 
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="7" sub=""></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Actualizar POS </h2>     
                        <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                            <button style={{display:(loading.button)?"":"none" }}  
                                    className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                        Actualizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                            </button>
                            <button style={{display:(loading.button)?"none":"" }} 
                                    type="button" 
                                    className="button w-40 bg-theme-1 text-white mt-5"
                                    onClick={ onUpdatePOSClick }>
                                        Actualizar POS
                            </button>
                        </div>                                                                  
                    </div>
                    <div className="box p-5 mt-5"> 
                        <div className="intro-y col-span-12 lg:col-span-6">
                        {(loading.loading) 
                            ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                            :<div className="intro-y p-5">
                                {(POS.posResponse.show)
                                    ?<div className={(POS.posResponse.response)
                                                        ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                                        :"p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                        { POS.posResponse.msj }
                                     </div> 
                                    :<></> }                                                              
                                <div>
                                    <label>Nombre para el POS</label>
                                    <input id="name" value={posState.name} onChange={onChangeState} 
                                        className="input w-full border mt-2"  placeholder="Nombre"/>
                                </div>
                                <div className="mt-2">
                                    <label>Porcentaje de cobro del POS</label>
                                    <input id="percentage" value={posState.percentage} onChange={onChangeState} 
                                        type="number"
                                        className="input w-full border mt-2"  placeholder="Porcentaje"/>
                                    <div className="text-xs text-gray-600 mt-2">El porcentaje de cobro se aumentará automáticamente al valor de la factura. Si el porcentaje de cobro del POS es absorbido por el comercio se tiene que ingresar “0” como valor de cobro.</div>
                                </div>                                
                            </div>}                            
                        </div>
                    </div>
                </div>
            </div>                                    
        </>
    )
}

export default UpdatePOS;