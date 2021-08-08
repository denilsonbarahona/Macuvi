import React,{useEffect, useState}             from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin   }               from '../../core/selectors/login.selector';
import { getLoading }               from '../../../ui/core/selector/ui.selector';  
import { requestChangePassword  }   from '../../core/actions/login.actions';


const RequestChangePassword =()=>{

    const login    = useSelector(getLogin)
    const ui       = useSelector(getLoading)
    const dispatch = useDispatch() 
    const [requestState, setRequestState]=useState({email:"", required:["email"]})

    const onChangeState =(e)=>{
        setRequestState({...requestState, [e.target.id]: e.target.value })
    }

    const onClickRequest=()=>{
        dispatch(requestChangePassword({...requestState}))
    }

    useEffect(()=>{    
        if(login.response.response){
            window.location.href="/request/notify/"+requestState.email
        }
    },[login.response.response, requestState.email])

    return(
        <div className="body login">
            <div className="container sm:px-10">
                <div className="block xl:grid grid-cols-2 gap-4">
                    {/* BEGIN: Login Info */}
                    <div className="hidden xl:flex flex-col min-h-screen">
                        <div className="-intro-x flex items-center pt-5">
                            <img alt="macuvi logo" className="w-10" src="/assets/images/macuvi.svg" />
                            <span className="text-white text-lg"> Mac<span className="font-medium">uvi</span> </span>
                        </div>
                        <div className="my-auto">
                            <img alt="Midone Tailwind HTML Admin Template" className="-intro-x w-1/2 -mt-16" src="/assets/images/illustration.svg" />
                                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                    Unos pocos clicks más   
                                    <br />
                                    para entrar a tu cuenta.
                                </div>
                            <div className="-intro-x mt-5 text-lg text-white dark:text-gray-500">Administra tu información desde un solo lugar</div>
                        </div>
                    </div>
                    {/* END: Login Info */}
                    {/* BEGIN: Login Form */}
                    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                        <div className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                            <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                Obtener ayuda para iniciar sesión
                            </h2>
                            <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">Ingresa el correo electrónico asociado a tu cuenta para poder cambiar tu contraseña</div>
                            <br/>   
                            
                            {login.response.show
                                ?<div 
                                    className={ login.response.response
                                                    ?"intro-x flex text-gray-700 text-xs sm:text-sm mt-4"
                                                    :"intro-x flex text-gray-700 text-xs sm:text-sm mt-4 text-theme-6"}>                                
                                    <span>{(login.response.msj)}</span> 
                                 </div>
                                :<></> }
                                    
                            <div className="intro-x mt-8">
                                <input type="text" value={requestState.email} 
                                        onChange={onChangeState} 
                                        id="email" className="intro-x login__input input input--lg border border-gray-300 block" 
                                        placeholder="Correo electrónico" />                                
                            </div>
                            <div className="intro-x flex text-gray-700 dark:text-gray-600 text-xs sm:text-sm mt-4">                                
                                <a href="/">¿Ya tienes cuenta?</a> 
                            </div>
                            <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                <>
                                    <button style={{display: !ui.button?"none":""}} 
                                        className="button  button--lg w-full xl:w-36 xl:mr-3 align-top mb-2 text-white bg-theme-1 inline-flex items-center ml-auto">                                    
                                        Solicitando <img className="h-5 xl:ml-6 ml-20" alt="" src="/assets/images/white.gif"></img>
                                    </button>
                                    <button style={{display: !ui.button?"":"none"}} onClick={()=>{ onClickRequest() }} 
                                            className="button button--lg w-full xl:w-36 text-white bg-theme-1 xl:mr-3 align-top text-center">                                    
                                        Continuar
                                    </button>
                                </>
                                
                                <button onClick={()=>{  window.location.href="/sign-up" }} 
                                        className="button button--lg w-full xl:w-36 text-gray-700 border border-gray-300 mt-3 xl:mt-0 align-top">
                                                Crear cuenta
                                </button>
                            </div>
                            <div className="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left">
                                    Al crear la cuenta aceptas nuestros
                                    <br />
                                <a href="/" className="text-theme-1 dark:text-theme-10">términos y condiciones</a> así como las <a href="/" className="text-theme-1 dark:text-theme-10" >políticas de privacidad</a> 
                            </div>
                        </div>
                    </div>
                    {/* END: Login Form */}
                </div>
            </div>
        </div>
    )
}

export default RequestChangePassword;

