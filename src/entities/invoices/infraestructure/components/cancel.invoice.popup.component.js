import {React}           from 'react';
import { useDispatch }    from 'react-redux';
import { cancelInvoice } from '../../core/actions/invoice.actions';

const CancelInvoice=(invoice)=>{

    const dispatch = useDispatch();

    const cancel_invoice =()=>{
        dispatch(cancelInvoice(invoice.id))
        window.hideModal("#cancel-invoice-modal")
    }

    return (
        <div className="modal" id="cancel-invoice-modal">
            <div className="modal__content">
                <div className="p-5 text-center">
                    <i data-feather="x-circle" className="w-16 h-16 text-theme-6 mx-auto mt-3" /> 
                    <div className="text-3xl mt-5">¿Seguro?</div>
                    <div className="text-gray-600 mt-2">¿Esta seguro que desea anular esta factura? Este proceso no se puede revertir.</div>                    
                </div>
                <div className="px-5 pb-8 text-center">
                    <button type="button" data-dismiss="modal" className="button w-24 border text-gray-700 mr-1">Cancelar</button>
                    <button onClick={cancel_invoice} type="button" className="button w-24 bg-theme-6 text-white">Anular</button>
                </div>
            </div>
        </div>)
}

export default CancelInvoice