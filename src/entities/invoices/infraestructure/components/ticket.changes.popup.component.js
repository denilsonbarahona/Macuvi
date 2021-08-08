import { React , useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getProducts } from '../../../products/core/selectors/products.selectors';
import { getInvoice  } from '../../core/selector/invoice.selector';
import { getCookie } from '../../../../cookies/selectors/cookie.selector';
import { getLoading } from '../../../ui/core/selector/ui.selector';
import { setRecordInvoiceWithCash } from '../../core/actions/invoice.actions';

const ChangePopUp =(headerDetail)=>{

    const cashState = { cash: 0 }    
    const invoice = useSelector(getInvoice);   
    const cookie = useSelector(getCookie);
    const loading = useSelector(getLoading);   
    const products = useSelector(getProducts);       
    const dispatch  = useDispatch();

    const [setCashState, updateCashState] = useState(cashState)

    const onCashChange =(e)=>{
        if(Number(e.target.value) >= 0){
            updateCashState(()=>({cash: e.target.value }))
        }        
    }

    const setInvoice = ()=>{
        dispatch(setRecordInvoiceWithCash( { ticketDetail: headerDetail.headerDetail , 
            ticketProducts: invoice.payload, 
            ticketTotal: invoice.total, 
            cookie: cookie.cookie, 
            identities: [undefined, ""].includes(products.identities)?[]:products.identities.trim().split("\n"),
            ticketCashinTicket: setCashState } ))
    }

    return (
        <div className="modal" id="cash-modal">
            <div className="modal__content">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                    <h2 className="font-medium text-base mr-auto">Ingresa la cantidad de efectivo que esta recibiendo por parte del cliente.</h2>
                </div>
                <div className="p-5 gap-4 gap-y-3 font-medium text-theme-6">
                    { (invoice.errorCashPopUp)
                        ?invoice.cashPopUpError
                        :""}
                </div>

                <div className="p-5 grid grid-cols-12 gap-4 gap-y-3">
                    <div className="col-span-12">
                        <label>efectivo</label>
                        <div className="flex mt-2 flex-1">
                            <input type="number" onChange={onCashChange} value={setCashState.cash} id="cash" min="0" className="input w-full border text-center" placeholder="Efectivo recibido"  />
                        </div>                        
                    </div>
                </div>

                <div className="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                    <button type="button" data-dismiss="modal" className="button w-32 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1">Cerrar</button>
                    <>
                        <button style={{display:(loading.button)?"":"none" }} className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Facturando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img> </button>
                        <button style={{display:(loading.button)?"none":"" }} type="button" onClick={()=>{ setInvoice() }} className="button w-24 bg-theme-1 text-white">Facturar</button>                            
                    </>                    
                </div>
            </div>
        </div>
    )
}

export default ChangePopUp;