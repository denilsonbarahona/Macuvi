import {React} from 'react';

const UpdateIdentityPopUp =(props)=>{
    return (<>
                <div>                    
                    <div className="modal" id="update-identity-popup">
                        <div className="modal__content">
                            <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                                <h2 className="font-medium text-base mr-auto">Actualizar identificador</h2> 
                            </div>

                            <div className={ (props.payload.updateIdentityResponse.response)
                                                ?"p-5 gap-4 gap-y-3 font-medium text-theme-9"
                                                :"p-5 gap-4 gap-y-3 font-medium text-theme-6" }>
                                { (props.payload.updateIdentityResponse.show_response)
                                    ?props.payload.updateIdentityResponse.msj
                                    :""}
                            </div>
                            <div className="p-5 grid grid-cols-12 gap-4 gap-y-3">
                                <div className="col-span-12"> 
                                    <label>Descripción</label> 
                                    <input  type="text" 
                                            onChange={props.payload.onChangePopUpDescription}
                                            name="identity_description"
                                            value={props.payload.identity_description}
                                            className="input w-full border mt-2 flex-1" 
                                            placeholder="Descripción del identificador" /> 
                                </div>                            
                            </div>
                            <div className="px-3 py-3 text-right border-t border-gray-200"> 
                                <button type="button" data-dismiss="modal" className="button w-32 border text-gray-700 mr-1">Cancelar</button>                                 
                                <>                                                                              
                                    <button style={{display:(props.payload.buttonPopUp)?"":"none" }}  className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Actualizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                    <button style={{display:(props.payload.buttonPopUp)?"none":"" }}  
                                            onClick={()=>{  props.payload.updateIdentityDescription(props.payload) }} 
                                            type="button" 
                                            className="button w-32 bg-theme-1 text-white">Actualizar</button>
                                </>   
                            </div>
                        </div>
                    </div>
                </div>
            </>)
}


export default UpdateIdentityPopUp;