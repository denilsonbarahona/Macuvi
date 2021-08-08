import { React,useEffect } from 'react';
import { useLocation }              from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getLogin   }               from '../../core/selectors/login.selector';
import { getLoading }               from '../../../ui/core/selector/ui.selector';  
import { activateAccount  }         from '../../core/actions/login.actions';
import UiLoading                    from '../../../ui/infraestructure/components/ui.loading.component';
import queryString                  from 'query-string';


const ActivateAccount =()=>{

    const dispatch = useDispatch() 
    const login    = useSelector(getLogin)    
    const ui       = useSelector(getLoading)
    const location = useLocation();
 
    useEffect(()=>{
        dispatch(activateAccount({permission: queryString.parse( location.search ) }))
    },[dispatch, location.search])

    return ( <div className="body login">
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
                            <div className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-4/5">                                
                                {(ui.loading)
                                    ?<UiLoading loading={ui.loading}></UiLoading>
                                    :<>
                                        {login.response.response    
                                            ?<>
                                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                                    ¡Verificación completa! 
                                                </h2>                                
                                                <br/>                                                                           
                                                <div className="intro-x mt-4">
                                                    <div className="intro-x mt-2 text-gray-500 justify-start justify-end">
                                                        Tu cuenta ya esta activada, continua con la pagina de inicio de sesión e inicia con el nombre de usuario y contraseña que estableciste en el registro de tu cuenta. 
                                                    </div>
                                                </div>
                                                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">                                    
                                                    <button onClick={()=>{  window.location.href="/" }} 
                                                            className="button button--lg w-full text-white bg-theme-1 xl:mr-3 align-top text-center">                                    
                                                        Iniciar sesión
                                                    </button>                                    
                                                </div>
                                             </>
                                            :<div className="intro-x flex text-gray-700 text-xs sm:text-sm mt-4 text-theme-6">
                                                <span>{login.response.msj}</span>
                                            </div> }                                           
                                    </> }                                                                                         
                            </div>
                        </div>
                        {/* END: Login Form */}
                    </div>
                </div>
            </div> )
}


export default ActivateAccount;