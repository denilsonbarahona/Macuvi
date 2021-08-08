import React,{useState}                         from 'react';
import { useDispatch, useSelector }             from 'react-redux';
import { loadSignUp, securityLevelValidator }   from '../../core/actions/login.actions';
import { getLogin }                             from '../../core/selectors/login.selector';
import { getLoading }                           from '../../../ui/core/selector/ui.selector';

const initialSignUpState = {
                            name:"", company:"",email:"",password:"",repeatpassword:"",
                            required:["name","company","email","password","repeatpassword"],
                            compare :[{ key1:"password",key2:"repeatpassword", errordescription:"Las contraseñas no son iguales." }]
                        }

const SignUp =()=>{

    const [SignUp, updateSignUpState] = useState(initialSignUpState)
    const dispatch = useDispatch()
    const login    = useSelector(getLogin)
    const loading  = useSelector(getLoading)
   
    function onChange(e){
        e.persist()
        updateSignUpState(()=>({ ...SignUp, [e.target.id]: e.target.value }))

        if(e.target.id ==="password"){
            dispatch(securityLevelValidator(e.target.value))
        }
    }  

    const resetFormState = ()=>{
        updateSignUpState({...SignUp,name:"", company:"",email:"",password:"",repeatpassword:""})
    }

    return(
        <div className="body login">
            <div className="container sm:px-10">
                <div className="block xl:grid grid-cols-2 gap-4">
                {/* BEGIN: Register Info */}
                <div className="hidden xl:flex flex-col min-h-screen">
                    <div className="-intro-x flex items-center pt-5">
                        <img alt="macuvi logo" className="w-10" src="/assets/images/macuvi.svg" />
                        <span className="text-white text-lg"> Mac<span className="font-medium">uvi</span> </span>
                    </div>
                    <div className="my-auto">
                        <img alt="macuvi logo" className="-intro-x w-1/2 -mt-16" src="/assets/images/illustration.svg" />
                            <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                                Unos pocos clicks más   
                                <br />
                                para entrar a tu cuenta.
                            </div>
                        <div className="-intro-x mt-5 text-lg text-white dark:text-gray-500">Administra tu información desde un solo lugar</div>
                    </div>
                </div>
                {/* END: Register Info */}
                {/* BEGIN: Register Form */}
                <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                    <div className="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-96">
                        <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                            Registrarse 
                        </h2>
                        <div className="intro-x mt-2 text-gray-500 dark:text-gray-500 xl:hidden text-center">Unos pocos clicks más para entrar a tu cuenta. Administra tu cuenta desde un solo lugar</div>
                        {login.response.show
                            ?<div className={login.response.response
                                                ?"intro-x flex text-theme-9 text-xs sm:text-sm mt-4"
                                                :"intro-x flex text-xs sm:text-sm mt-4 text-theme-6"}>                                
                                    <span>{(login.response.msj)}</span> 
                             </div>
                            :<></>}
                          
                        <div className="intro-x mt-8">
                            <div className="mt-3"> 
                                <input type="text" id="name" 
                                        value={SignUp.name}
                                       className={(login.response.emptyFields.find(f=> f==="name") !== undefined )
                                                        ?"input w-full border border-theme-6 mt-2"
                                                        :"login__input input input--lg border border-gray-300 block mt-4" } 
                                       onChange={ onChange } 
                                       placeholder="Nombre y apellido" />
                                <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="name") !== undefined )?"Este campo es obligatorio.":"" }</div>
                            </div>
                            <div className="mt-3"> 
                                <input  type="text" id="company" 
                                        value={SignUp.company}
                                        className={(login.response.emptyFields.find(f=> f==="company") !== undefined )
                                                        ?"input w-full border border-theme-6 mt-2"
                                                        :"login__input input input--lg border border-gray-300 block mt-4" } 
                                        onChange={onChange } 
                                        placeholder="Empresa" />
                                <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="company") !== undefined )?"Este campo es obligatorio.":"" }</div>
                            </div>
                            <div className="mt-3">
                                <input type="text" id="email"
                                        value={SignUp.email} 
                                       className={(login.response.emptyFields.find(f=> f==="email") !== undefined )
                                                    ?"input w-full border border-theme-6 mt-2"
                                                    :"login__input input input--lg border border-gray-300 block mt-4"} 
                                       onChange={ onChange } 
                                       placeholder="Correo electrónico" />
                                <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="email") !== undefined )?"Este campo es obligatorio.":"" }</div>
                            </div>
                            <div className="mt-3"> 
                                <input  type="password" id="password"
                                        value={SignUp.password} 
                                        className={(login.response.emptyFields.find(f=> f==="password") !== undefined )
                                                        ?"input w-full border border-theme-6 mt-2"
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
                            {/*}<span className="intro-x text-theme-6 block mt-2 text-xs sm:text-sm">La contraseña debe tener un mínimo de 8 caracteres</span> {*/}
                            <div className="mt-3"> 
                                <input type="password" id="repeatpassword"
                                        value={SignUp.repeatpassword} 
                                       className={(login.response.emptyFields.find(f=> f==="repeatpassword") !== undefined )
                                                        ?"input w-full border border-theme-6 mt-2"
                                                        :"login__input input input--lg border border-gray-300 block mt-4"          
                                        }
                                       onChange={onChange } placeholder="Confirmar contraseña" />
                                <div className="text-theme-6 mt-2">{(login.response.emptyFields.find(f=> f==="repeatpassword") !== undefined )?"Este campo es obligatorio.":"" }</div>
                            </div>
                        </div>
                        <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                            <button style={{display:!loading.loading?"none":""}}
                                    className="button  button--lg w-full xl:w-34 inline-block xl:mr-3 align-top mb-2 text-white bg-theme-1 inline-flex ">                                        
                                        Creando cuenta <img className="h-5 xl:ml-6 ml-20" alt="" src="/assets/images/white.gif"></img> 
                            </button>
                            <button style={{display:!loading.loading?"":"none" }} 
                                            onClick={()=>{ dispatch(loadSignUp({...SignUp, resetFormState:resetFormState})) }} className="button button--lg w-full xl:w-34 text-white bg-theme-1 xl:mr-3 align-top mb-3">Registrarse</button>
                            <button onClick={()=>{ window.location.href="/" }} className="button button--lg w-full xl:w-34 text-gray-700 border border-gray-300 dark:border-dark-5 dark:text-gray-300 mt-3 xl:mt-0 align-top">Entrar</button>
                            {/*}<br/><br/>
                            <button className="button button--lg w-full xl:w-33 flex items-center justify-center bg-theme-32 text-white"> Facebook </button>
                            <br/>
                                    <button className="button button--lg w-full xl:w-33 flex items-center justify-center bg-theme-6 text-white"> Google </button>{*/}
                        </div>
                        <div className="intro-x mt-10 xl:mt-24 text-gray-700 dark:text-gray-600 text-center xl:text-left">
                                Al crear la cuenta aceptas nuestros
                                <br />
                            <a href="/" className="text-theme-1 dark:text-theme-10">términos y condiciones</a> así como las <a href="/" className="text-theme-1 dark:text-theme-10" >políticas de privacidad</a> 
                        </div>
                    </div>                    
                </div>
                {/* END: Register Form */}
                </div>
            </div>
        </div>
    )
}


export default SignUp