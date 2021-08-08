import React,{useEffect, useState}  from 'react';
import { useLocation }              from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin   }               from '../../core/selectors/login.selector';
import { getLoading }               from '../../../ui/core/selector/ui.selector';  
import { securityLevelValidator ,
         changePasswordlogin  }     from '../../core/actions/login.actions';
import queryString                  from 'query-string';


const ChangePassword =()=>{

    const dispatch = useDispatch()
    const login    = useSelector(getLogin)
    const ui       = useSelector(getLoading)    
    const location = useLocation()
    const [loginState, updateLoginState] = useState({ password:"" , confirm: "", 
                                                      required:["password","confirm"],
                                                      compare :[{ key1:"password",key2:"confirm", errordescription:"Las contraseñas no son iguales." }]})

    function onChange (e){ 
        updateLoginState({...loginState,[e.target.id]: e.target.value })
        if(e.target.id ==="password"){
            dispatch(securityLevelValidator(e.target.value))
        }
    }    
    
    useEffect(()=>{    
        if(login.response.response){
            window.location.href="/"
        }
    },[login.response.response])

    const onClickChangePassword = ()=>{
        var permission = queryString.parse( location.search ) 
        dispatch(changePasswordlogin({...loginState, permission:permission}))
    }

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
                        <div className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-96">
                            <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                Restablecer contraseña
                            </h2>
                            <div className="intro-x mt-2 text-gray-500 xl:hidden text-center">Unos pocos clicks más para entrar a tu cuenta. Administra tu cuenta desde un solo lugar</div>
                            <br/>
                            {login.response.show
                                ?<div 
                                    className={login.response.response 
                                                ?"intro-x flex text-theme-9 text-xs sm:text-sm mt-4"
                                                :"intro-x flex text-gray-700 text-xs sm:text-sm mt-4 text-theme-6" }>                                
                                    <span>{login.response.msj}</span> 
                                 </div>
                                :<></> } 
                            
                            <div style={{color:"red"}} className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">                                
                                <span>{(login.error.msj)}</span> 
                            </div>         
                            <div className="intro-x mt-8">
                                <div className="mt-3"> 
                                    <input  type="password" id="password" 
                                            className={(login.response.emptyFields.find(f=> f==="password") !== undefined )
                                                            ?"login__input input input--lg border border-gray-300 block mt-4 border-theme-6"
                                                            :"login__input input input--lg border border-gray-300 block mt-4" }
                                            onChange={ onChange } 
                                            placeholder="Contraseña" />
                                    <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="password") !== undefined )?"Este campo es obligatorio.":"" }</div>
                                </div>
                                <div className="intro-x w-full grid grid-cols-12 gap-4 h-1 mt-3">
                                    <div className={(login.securityLevel.securityLevel===0)?"col-span-3 h-full rounded bg-gray-200 dark:bg-dark-2":"col-span-3 h-full rounded bg-theme-9"} />
                                    <div className={(login.securityLevel.securityLevel<2)?"col-span-3 h-full rounded bg-gray-200 dark:bg-dark-2":"col-span-3 h-full rounded bg-theme-9"} />
                                    <div className={(login.securityLevel.securityLevel<3)?"col-span-3 h-full rounded bg-gray-200 dark:bg-dark-2":"col-span-3 h-full rounded bg-theme-9"} />
                                    <div className={(login.securityLevel.securityLevel<4)?"col-span-3 h-full rounded bg-gray-200 dark:bg-dark-2":"col-span-3 h-full rounded bg-theme-9"} />
                                </div>
                                <div className="mt-3"> 
                                    <input type="password" id="confirm" 
                                        className={(login.response.emptyFields.find(f=> f==="confirm") !== undefined )
                                                            ?"login__input input input--lg border border-gray-300 block mt-4 border-theme-6"
                                                            :"login__input input input--lg border border-gray-300 block mt-4"          
                                            }
                                        onChange={onChange } placeholder="Confirmar contraseña" />
                                    <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="confirm") !== undefined )?"Este campo es obligatorio.":"" }</div>
                                </div>
                            </div>
                            <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                <button style={{display: !ui.button?"none":""}} 
                                    className="button button--lg w-full xl:mr-3 align-top text-white bg-theme-1 inline-flex items-center ml-auto text-center">                                    
                                    Reestableciendo contraseña  <img className="h-5 xl:ml-6 ml-20" alt="" src="/assets/images/white.gif"></img>
                                </button>
                                <button style={{display: !ui.button?"":"none"}} onClick={()=>{ onClickChangePassword() }} 
                                        className="button button--lg w-full text-white bg-theme-1 xl:mr-3 align-top text-center">                                    
                                    Restablecer contraseña
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

export default ChangePassword;