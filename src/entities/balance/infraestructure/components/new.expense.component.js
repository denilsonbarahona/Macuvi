import { React, useState, useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading         from '../../../ui/infraestructure/components/ui.loading.component';
import InitBalanceForm   from './create.balance.form.component'
import { loadCookie }    from '../../../../cookies/actions/cookie.actions';
import { getBalance, 
         createExpense } from '../../core/actions/balance.actions';
import { getBalance_}    from '../../core/selector/balance.selector';
import { getLoading }    from '../../../ui/core/selector/ui.selector';
import { getCookie  }    from '../../../../cookies/selectors/cookie.selector'; 


const CreateExpense =()=>{
    const initial = { description: "", value: 0,  
                      required: ["description","value"],
                      greater : [
                            {key1: "value", greatherThan:0, errordescription:"El precio del gasto tiene que ser mayor a cero"}
                        ]
                    }

    const dispatch = useDispatch()
    const [expense, setExpense] = useState(initial)
    const cookie   = useSelector(getCookie)  
    const balance  = useSelector(getBalance_);    
    const loading  = useSelector(getLoading);

    if(cookie.find){
        dispatch(loadCookie())           
    }
    
    useEffect(()=>{
        if(balance.check && !cookie.find && !loading.loading){
            dispatch(getBalance({company:cookie.cookie.login.companyId, auth:cookie.cookie.login.id}))
        }        
    })

    const onchangeFormState =(e)=>{
        setExpense(()=>({ ...expense, [e.target.id]: e.target.value }))
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="2" sub="2"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Salida de caja </h2>                                                                       
                    </div>
                    <div className="box p-5 mt-5">  
                        {(loading.loading)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)} 
                        {(balance.payload.length > 0)
                            ?<div>
                                <div className="intro-y col-span-12 lg:col-span-6">
                                    <div className="intro-y p-5">
                                        {(balance.show_error)
                                            ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-6"> {balance.error}  </div> 
                                            :<></>}
                                        {(balance.success)
                                            ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-9"> Se ha registrado el gasto de forma exitosa. </div> 
                                            :<></>}                                        
                                        <div>
                                            <label>Descripción del gasto.</label>
                                            <input type="text" id="description" onChange={onchangeFormState} value={expense.description} className="input w-full border mt-2"  placeholder="Descripción de la salida del dinero"/>
                                        </div>
                                        <div className="mt-3">
                                            <label>Salida de dinero (Monto).</label>
                                            <input type="Number" id="value" onChange={onchangeFormState} value={expense.value}  className="input w-full border mt-2"  placeholder="Monto del dinero"/>
                                        </div>
                                        <button style={{display:(loading.button)?"":"none" }}  
                                                className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Guardando 
                                                    <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                        </button>
                                        <button style={{display:(loading.button)?"none":"" }}  type="button"  
                                                onClick={()=>{ 
                                                        dispatch( createExpense({ ...expense, 
                                                                                  company : cookie.cookie.login.companyId, 
                                                                                  auth    : cookie.cookie.login.id
                                                                                }) ) }}        
                                                className={ "button w-32 bg-theme-1 text-white mt-5"}>Guardar gasto</button>
                                    </div>
                                </div>
                             </div>
                            :<>
                                {(!loading.loading)
                                    ? <>
                                        <div className="p-2 gap-4 gap-y-3 font-medium text-theme-11">
                                            {"Antes de registras la salida de dinero es necesario realizar la apertura de caja."} 
                                        </div>
                                        <InitBalanceForm cookies={{...cookie.cookie, balance: balance}}></InitBalanceForm>
                                     </>
                                    :<></>}                               
                            </>}
                        
                    </div>
                </div>
            </div>            
        </>
    )
}

export default CreateExpense;

