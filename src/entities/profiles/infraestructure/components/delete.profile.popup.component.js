import { React }                    from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading }               from '../../../ui/core/selector/ui.selector';
import { getProfile }               from '../../core/selector/profile.selector';
import { deleteProfile }            from '../../core/actions/profile.actions';

const DeleteProfileConfirmation = (props)=>{

    const dispatch = useDispatch();
    const loading  = useSelector(getLoading);
    const profile  = useSelector(getProfile);

    const onConfirmationDelete =()=>{
        dispatch(deleteProfile({    id      : props.state.idDelete.id ,
                                    uid     : props.state.idDelete.uid,
                                    isMaster: props.state.idDelete.isMaster, 
                                    filter  : props.state.filter      ,
                                    company : props.state.company     ,
                                    setPager: props.state.setPager
                                }))
    }

    return (
        <div>
            <div className="modal" id="delete-profile">
                <div className="modal__content">
                        <div className="p-5 text-center"> <i data-feather="x-circle" className="w-16 h-16 text-theme-6 mx-auto mt-3" />
                                {(profile.profileResponse.show)
                                    ?<> <div className={(profile.profileResponse.response)
                                                            ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                                            :"p-2 gap-4 gap-y-3 font-medium text-theme-6" }>
                                            { profile.profileResponse.msj }
                                        </div>  
                                    </>
                                    :<></>}                                
                                                                    
                            <div className="text-gray-600 mt-2">??Esta seguro que quiere eliminar la informaci??n de este perfil?</div>
                        </div>
                    <div className="px-5 pb-8 text-center"> 
                        <button type="button" data-dismiss="modal" className="button w-40 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1">Cancelar</button> 
                        <>
                            <button  style={{display:(loading.buttonPopUp)?"":"none" }} type="button" className="button w-40 mt-5 text-white bg-theme-6 inline-flex items-center ml-auto">
                                    Eliminando 
                                    <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                            </button> 
                            <button  style={{display:(loading.buttonPopUp)?"none":"" }} 
                                        onClick={()=>{ onConfirmationDelete() }} 
                                        type="button" className="button w-40 border bg-theme-6 text-white mr-1">Eliminar </button> 
                        </>                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProfileConfirmation;