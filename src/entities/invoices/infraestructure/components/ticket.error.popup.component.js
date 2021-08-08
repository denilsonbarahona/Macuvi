import { React } from 'react'
import { useSelector }  from 'react-redux';
import { getInvoice  }  from '../../core/selector/invoice.selector'  

const TicketErrorPopUp=()=>{
  
    const invoice = useSelector(getInvoice)

    return( <div className="modal" id="delete-modal-preview">
                <div className="modal__content">
                    <div className="p-5 text-center"> <i data-feather="x-circle" className="w-16 h-16 text-theme-6 mx-auto mt-3" />
                        <div className="text-3xl mt-5">Error</div>
                        <div className="text-gray-600 mt-2">{invoice.popUpError}</div>
                    </div>                    
                </div>
            </div> )
}

export default TicketErrorPopUp;