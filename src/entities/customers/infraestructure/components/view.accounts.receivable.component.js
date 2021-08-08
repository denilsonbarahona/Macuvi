import { React , useState, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import { useParams }                   from 'react-router-dom';

import ReactDOMServer                  from 'react-dom/server';
import Header                          from '../../../header/infraestructure/components/header.component';
import MobileMenu                      from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                        from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import PrintPayment                    from './account.payment.print.support.component';
import ReceivableMovementTablePopUp    from './accounts.receivable.table.popup';
import PaymentPopUp                    from './account.receivable.payment.popup.component';
import { getCustomer }                 from '../../core/selector/customer.selector';
import { getLoading }                  from '../../../ui/core/selector/ui.selector';
import { GetAccountsReceivableById }   from '../../core/actions/customer.action';

const ViewReceivable =()=>{

    const dispatch                      = useDispatch(); 
    const params                        = useParams();
    const customer                      = useSelector(getCustomer);  
    const loading                       = useSelector(getLoading);
    const [paramsPopUp, setParamsPopUp] = useState({detail :[] , type:"" })
    const [isloading  , setIsLoading]   = useState(false)

    useEffect(()=>{           
        dispatch(GetAccountsReceivableById({id: params.id}))
    },[dispatch, params.id])

    const showDebitCreditsPopUp=(detail, type)=>{
        setParamsPopUp({detail:detail, type:type, company: params.company,
                name:customer.receivable.AccountsReceivableCustomer.Name})
        window.showModal("#receivable-modal")
    }

    const onClickChangePrintState=(prop)=>{     
        setIsLoading(true)

        const content = ReactDOMServer.renderToString(
                                                        <PrintPayment state={{company  :params.company, pay :prop.pay ,
                                                                                        day      :prop.day      , name:customer.receivable.AccountsReceivableCustomer.Name, 
                                                                                        reference:prop.reference
                                                                            }} /> )
        
        let iFrame = document.getElementById("printPayment").contentWindow;
            iFrame.document.open();
            iFrame.document.write(content);
            iFrame.document.close();
            iFrame.focus();
            iFrame.print();  

        setIsLoading(false)   
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu ></SideMenu>
                <div className="content">
                    <Header></Header>
                    { (!customer.ChangeCustomerState) 
                        ?<></>
                        :<div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> 
                                 Cuentas por cobrar a { customer.receivable.AccountsReceivableCustomer.Name  }                            
                            </h2>  
                            <div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                                <div  onClick={()=>{ window.showModal("#payment-modal") }} className="button text-white bg-theme-1 shadow-md mr-2">Abonar a cuenta</div>
                            </div>
                         </div>  }                       
                    <div className="box p-5 mt-5">  
                        { (!customer.ChangeCustomerState)
                            ?<div className="mb-10"><UiLoading loading={loading.loading}></UiLoading></div>
                            :<div>
                                
                                <iframe  
                                    id="printPayment"  
                                    style={{display:"none"}} 
                                    title="printPayment"/> 

                                <ReceivableMovementTablePopUp state={{...paramsPopUp, loading: isloading ,onClickChangePrintState:onClickChangePrintState}}></ReceivableMovementTablePopUp>
                                <PaymentPopUp state={{id: params.id }}></PaymentPopUp>
                                <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20">
                                    <div>
                                        <div className="text-base text-gray-600">Fecha de inicio de la cuenta por cobrar</div>                                            
                                        <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                            { new Date(customer.receivable.AccountsReceivableDate.replaceAll("-","/")).toLocaleDateString() }
                                        </div>

                                        <div className="text-base text-gray-600 mt-5">Estado</div>
                                        <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                            { (customer.receivable.AccountsReceivableState ===1)
                                                ?"Activa"
                                                :"Pago completado"}
                                        </div>
                                    </div> 
                                    <div className="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                                        <div className="text-base text-gray-600">Nombre del cliente</div>
                                        <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                            { customer.receivable.AccountsReceivableCustomer.Name }
                                        </div>                                              
                                        <div className="text-base text-gray-600 mt-5">Total a cobrar</div>
                                        <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                            L { Number(customer.receivable.AccountsReceivableTotalDebt).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                        </div>                                 
                                    </div>
                                </div>
                                <div className="px-5 sm:px-16 py-10 sm:py-20">
                                    <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b-2 whitespace-nowrap"><div className="font-bold">DETALLE</div></th> 
                                                        <th className="border-b-2 whitespace-nowrap"></th>  
                                                        <th className="border-b-2 whitespace-nowrap"></th>     
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="font-medium whitespace-nowrap">Créditos</div>                                                                                     
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap"> 
                                                                L { Number(customer.receivable.AccountsReceivableCredit).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                                            </div>                                                                                                                                             
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div  
                                                                onClick={()=>{ showDebitCreditsPopUp(customer.receivable.AccountsReceivableCreditDetail, "credit") }}
                                                                className="text-gray-600 flex cursor-pointer whitespace-nowrap font-bold">Detalle
                                                            </div>                                                                                                                                                                                                 
                                                        </td>
                                                    </tr>   
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="font-medium whitespace-nowrap">Abonos</div>                                                                                     
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">
                                                                L { Number(customer.receivable.AccountsReceivablePayments).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                                            </div>                                                                                                                                                                                                 
                                                        </td>                                                
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div 
                                                                onClick={()=>{  showDebitCreditsPopUp(customer.receivable.AccountsReceivablePaymentsDetail,"payments") }}
                                                                className="text-gray-600 flex cursor-pointer whitespace-nowrap font-bold">Detalle
                                                            </div>                                                                                                                                                                                                 
                                                        </td>
                                                    </tr>  
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="whitespace-nowrap font-bold">Balance final</div>                                                                                     
                                                        </td>
                                                        <td colSpan="2" className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">
                                                                L { Number(customer.receivable.AccountsReceivableTotalDebt).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                                            </div>                                                                                                                                             
                                                        </td>
                                                    </tr>                                 
                                                </tbody>
                                            </table>
                                    </div>
                                </div>
                            </div>
                        }

                        
                    </div>
                </div>
            </div>
        </>
    )
}


export default ViewReceivable;