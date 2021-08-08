import { React }                    from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLoading }               from '../../../ui/core/selector/ui.selector';
import { getCategory }              from '../../core/selector/category.selectors';
import { deleteCategoryById }       from '../../core/actions/category.actions';

const DeleteConfirmation =(props)=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getLoading)
    const category = useSelector(getCategory);

    const onConfirmationDelete =()=>{        
        dispatch(deleteCategoryById(props.state))
    }

    return (
        <>
             <div>                
                    <div className="modal" id="delete-category">
                        <div className="modal__content">
                            <div className="p-5 text-center"> <i data-feather="x-circle" className="w-16 h-16 text-theme-6 mx-auto mt-3" />                                
                                {(category.deleteResponse.response !== undefined)
                                    ?<> 
                                        {(category.deleteResponse.response)
                                            ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-9">
                                                {category.deleteResponse.msj}
                                             </div>
                                            :<div className="p-2 gap-4 gap-y-3 font-medium text-theme-9">
                                                {category.deleteResponse.msj}
                                             </div>}   
                                     </>
                                    :<></>}                                 
                                <div className="text-gray-600 mt-2">¿Estás seguro que quieres eliminar esta categoría?</div>
                            </div>
                        <div className="px-5 pb-8 text-center"> 
                            <button type="button" data-dismiss="modal" className="button w-40 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1">Cancelar</button> 
                            <>
                                <button style={{display:(loading.button)?"":"none" }} type="button" className="button w-40 mt-5 text-white bg-theme-6 inline-flex items-center ml-auto">
                                        Eliminando 
                                        <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button> 
                                <button style={{display:(loading.button)?"none":"" }} onClick={onConfirmationDelete}  type="button" className="button w-40 border bg-theme-6 text-white mr-1">Eliminar </button> 
                            </>                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteConfirmation;