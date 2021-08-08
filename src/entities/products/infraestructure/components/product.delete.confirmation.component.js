import { React }                    from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading }               from '../../../ui/core/selector/ui.selector';
import { getProducts }              from '../../core/selectors/products.selectors';
import { DeleteProduct }            from '../../core/actions/products.actions';

const DeleteProductConfirmation =(props)=>{

    const dispatch = useDispatch();
    const loading  = useSelector(getLoading);
    const products = useSelector(getProducts);

    const onDeleteProduct =()=>{
        
        dispatch(DeleteProduct({
            ...props.state,
            id: props.state.idDelete.id,
            authId: props.state.auth,
            authName: props.state.authName,
            company: props.state.company,
            name: props.state.idDelete.name,
            categoryDecrement: props.state.idDelete.category
        }))
    }

    return (
        <>
             <div>                
                    <div className="modal" id="delete-product">
                        <div className="modal__content">
                            <div className="p-5 text-center"> <i data-feather="x-circle" className="w-16 h-16 text-theme-6 mx-auto mt-3" />
                                    {(products.DeleteResponse.show_response)
                                        ?<> <div className={(products.DeleteResponse.response)
                                                               ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                                               :"p-2 gap-4 gap-y-3 font-medium text-theme-6" }>
                                               { products.DeleteResponse.msj }
                                            </div>  
                                        </>
                                        :<></>}                                
                                                                     
                                <div className="text-gray-600 mt-2">¿Está seguro que quiere eliminar este producto?</div>
                            </div>
                        <div className="px-5 pb-8 text-center"> 
                            <button type="button" data-dismiss="modal" className="button w-40 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1">Cancelar</button> 
                            <>
                                <button  style={{display:(loading.button)?"":"none" }} type="button" className="button w-40 mt-5 text-white bg-theme-6 inline-flex items-center ml-auto">
                                        Eliminando 
                                        <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button> 
                                <button  style={{display:(loading.button)?"none":"" }} onClick={onDeleteProduct} type="button" className="button w-40 border bg-theme-6 text-white mr-1">Eliminar </button> 
                            </>                            
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DeleteProductConfirmation;