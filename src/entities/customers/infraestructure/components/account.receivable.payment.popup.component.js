import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetPaymentToReceivable } from '../../core/actions/customer.action';
import { loadCookie } from '../../../../cookies/actions/cookie.actions';
import { getCustomer } from '../../core/selector/customer.selector';
import { getLoading } from '../../../ui/core/selector/ui.selector';
import { getCookie  } from '../../../../cookies/selectors/cookie.selector'; 

const PaymentPopUp =(state)=>{
    
    const dispatch = useDispatch();
    const [paymentForm, setPaymentForm] = useState({ type: "Efectivo", pay: 0, required: ["type"   , "pay" ]   })
    const customer = useSelector(getCustomer);  
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie) 

    if(cookie.find){
        dispatch(loadCookie())           
    }
    
    useEffect(()=>{
        if(customer.ChangePayReceivable){
            setPaymentForm({ type    :"Efectivo", pay:0 , required:["type"   , "pay" ]   })
        }
    },[customer.ChangePayReceivable])

    const onChangetPaymentForm=(e)=>{
        setPaymentForm(({...paymentForm, [e.target.name]: e.target.value }))
    }
    
    const setPayment =()=>{
        dispatch(SetPaymentToReceivable({id: state.state.id, ...paymentForm,
            company:cookie.cookie.login.companyId,
            auth:cookie.cookie.login.id}))
    }

    return (
            <div className="modal" id="payment-modal">
                <div className="modal__content">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base mr-auto">Abonar a cuenta</h2> 
                    </div>
                    {(customer.updateResponse.show)
                        ?<div className={(customer.updateResponse.response)
                                            ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                            :"p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                            {customer.updateResponse.msj}
                        </div>
                        :<></>}   
                    <div className="p-5 grid grid-cols-12 gap-4 gap-y-3">
                        <div className="col-span-12 sm:col-span-12"> 
                            <label>Forma de pago</label> 
                            <select className="input w-full border mt-2 flex-1"
                                    onChange={onChangetPaymentForm}
                                    name="type" value={paymentForm.type}>
                                <option value="Efectivo">Efectivo</option>
                                <option value="NoEfectivo">Tarjeta/Deposito</option> 
                            </select> 
                        </div>
                        <div className="col-span-12 sm:col-span-12"> 
                            <label>Monto del abono</label> 
                            <input type="number"
                                    name="pay" 
                                    onChange={onChangetPaymentForm}
                                    value={paymentForm.pay}
                                    className="input w-full border mt-2 flex-1" placeholder="Monto del abono" /> 
                        </div>                       
                    </div>
                    <div className="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5"> 
                        <button type="button" data-dismiss="modal" className="button w-32 border text-gray-700 dark:border-dark-5 dark:text-gray-300 mr-1">Cancelar</button> 
                        <button style={{display:(loading.button)?"":"none" }}   
                                type="button" className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto">
                                    Abonando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button> 
                        <button style={{display:(loading.button)?"none":"" }} 
                                onClick={()=>{ setPayment() }}
                                type="button" className="button w-32 bg-theme-1 text-white">Abonar</button> 
                    </div>
                </div>
            </div>

        )
}

export default PaymentPopUp;