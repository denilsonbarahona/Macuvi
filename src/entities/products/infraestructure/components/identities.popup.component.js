import React                        from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetIdentities }            from '../../core/actions/products.actions';
import { getProducts }              from '../../core/selectors/products.selectors';

const IdentitiesPopUp=()=>{

    const dispatch = useDispatch()
    const products = useSelector(getProducts)   

    const onIdentityChange =(e)=>{
        dispatch(SetIdentities(e.target.value))
    }
   
    return( <div className="modal" id="identities-modal">
                <div className="modal__content">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base mr-auto">Ingrese los identificadores</h2>
                    </div>
                    <div className="p-5 grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12">
                            <label>Identificadores</label>
                            <textarea onChange={onIdentityChange} value={products.identities} className="input w-full border mt-2 flex-1" rows="25" placeholder="Identificadores"></textarea>
                        </div>
                    </div>
                    <div className="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                        <button type="button" data-dismiss="modal" className="button w-32 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1">Cerrar</button>                            
                    </div>
                </div>
            </div>)
}

export default IdentitiesPopUp;