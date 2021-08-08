import {React, useState}           from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBalance } from '../../core/actions/balance.actions';
import { getLoading }    from '../../../ui/core/selector/ui.selector'; 

const InitBalanceForm =(cookies)=>{
         
    const dispatch = useDispatch()
    const [cash, setCash]    = useState(0)
    const [error, setError]  = useState(false)
    const loading  = useSelector(getLoading);

    const onChangeCash =(e)=>{
        setCash(e.target.value)
    }

    const onSubmitCreateBalance =()=>{
        if(cash>0){
            setError(false)
            dispatch(createBalance({ auth: cookies.cookies.login.id, authName: cookies.cookies.login.name, 
                                     companyId: cookies.cookies.login.companyId, initBalance: cash}))
        }else{
            setError(true)
        }
    }

    return (
        <div className="intro-y col-span-12 lg:col-span-6">
            <div className="intro-y p-5">
                {(error || cookies.cookies.balance.show_error)
                    ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">
                       {(error)
                            ?"Para crear el balance de caja se tiene que agregar un valor de efectivo mayor a cero. "
                            :cookies.cookies.balance.error} 
                     </div>
                    :<></>}


                <div>
                    <label>Ingresa la cantidad de dinero con la que se realizara la apertura de caja.</label>
                    <input onChange={onChangeCash} type="Number" className="input w-full border mt-2"  value={cash} placeholder="Cantidad de apertura"/>
                </div>
                <button style={{display:(loading.button)?"":"none" }}  className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Aperturando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                <button style={{display:(loading.button)?"none":"" }}  type="button"  
                        onClick={onSubmitCreateBalance}
                        className={(cash>0)?"button w-32 bg-theme-1 text-white mt-5":"button w-32 bg-theme-2  mt-5"}
                >Aperturar caja</button>
            </div>
        </div>
    )
}

export default InitBalanceForm