import { React, useEffect } from 'react';
import { useParams  }  from 'react-router-dom'
import { useDispatch, useSelector }   from 'react-redux';
import SideMenu       from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu     from '../../../menu/infraestructure/components/mobile_menu.component';
import Header         from '../../../header/infraestructure/components/header.component';
import UiLoading      from '../../../ui/infraestructure/components/ui.loading.component';
import InvoicePrinted from './invoice.print.component'
import ReactDOMServer from 'react-dom/server';
import { getInvoice } from '../../core/selector/invoice.selector';
import { getInvoiceToPrint } from '../../core/actions/invoice.actions';
import { getLoading } from '../../../ui/core/selector/ui.selector';
import CancelInvoice  from './cancel.invoice.popup.component';

const ViewInvoice =()=>{

    const invoice  = useSelector(getInvoice)
    const loading  = useSelector(getLoading);
    const params   = useParams();
    const dispatch = useDispatch();    

   useEffect(()=>{
     if(!invoice.invoiceFindToPrint){
       window.setMenu()
       if(window.feather !== undefined)
         window.feather.replace();
       }
       return ()=>{
         window.setDateFilters();
       }
    },[invoice.invoiceFindToPrint])

    useEffect(()=>{
       dispatch(getInvoiceToPrint(params.id))
    },[dispatch, params.id])


    const handlePrintInvoice =()=>{

        const content = ReactDOMServer.renderToString(
            <InvoicePrinted invoice={{...invoice.invoiceToPrint }} />
        )

        let iFrame = document.getElementById("invoice").contentWindow;
            iFrame.document.open();
            iFrame.document.write(content);
            iFrame.document.close();
            iFrame.focus();
            iFrame.print();     
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div  className="flex">
                <SideMenu></SideMenu> 
                <div className="content">
                    <Header></Header>
                    <CancelInvoice id={params.id}></CancelInvoice>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Imprimir factura </h2>                        
                        <div className="w-full sm:w-auto flex mt-4 sm:mt-0">                            
                            <button onClick={handlePrintInvoice} className="button text-white bg-theme-1 shadow-md mr-2">
                                Imprimir
                            </button>
                        </div>
                    </div>
                    <div className="intro-y box overflow-hidden mt-5">
                        {(loading.loading)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)}                        
                        
                        {(!invoice.invoiceFindToPrint)
                            ?(<>                             
                                <div className="border-b border-gray-200 dark:border-dark-5 text-center sm:text-left">                                
                                    <div className="px-5 py-10 sm:px-20 sm:py-20"> 
                                        {(loading.button)
                                            ?(<> <div className="text-theme-6 mt-2 font-semibold text-xl">La factura se está anulando, por favor espere.</div> </>)
                                            :(<></>)}   
                                        {(invoice.canceled.state && !loading.button)
                                            ?(<><div className={(invoice.canceled.success!==0)?"text-theme-43 mt-2 font-semibold text-xl":"text-theme-6 mt-2 font-semibold text-xl"}>{invoice.canceled.msj}</div></>)
                                            :(<></>)}    
                                                                             
                                        <div className="flex flex-col sm:flex-row items-center mt-8">                                            
                                            <div className="text-theme-1 font-semibold text-3xl mr-auto">FACTURA</div>
                                            <div className="w-full sm:w-auto flex mt-4 sm:mt-0">     
                                                <div style={{display:(loading.button)?"":"none" }} 
                                                    className="button cursor-pointer w-32 text-white bg-theme-6 inline-flex items-center"> Anulando 
                                                    <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                                </div>
                                                <div style={{display:(loading.button)?"none":"" }} 
                                                    data-toggle="modal" data-target="#cancel-invoice-modal" 
                                                    className="button cursor-pointer w-32 text-white bg-theme-6 items-center">Anular factura</div>
                                            </div>                                            
                                        </div>                                        
                                        <div className="mt-2"> Número de factura <span className="font-medium"># { invoice.invoiceToPrint.invoiceNumber}</span> </div>
                                        <div className="mt-1">{ new Date( invoice.invoiceToPrint.invoiceDate).toLocaleDateString() }</div>
                                        <div className="mt-1 text-theme-1">{ ( invoice.invoiceToPrint.invoiceState ===1)?"Facturado":"Anulado" }</div>                                
                                    </div>
                                    <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20">
                                        <div>
                                            <div className="text-base text-gray-600">Detalle del cliente</div>                                            
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">{invoice.invoiceToPrint.invoiceCustomer.label}</div>

                                            <div className="text-base text-gray-600 mt-5">Tipo de venta</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">{invoice.invoiceToPrint.invoicePaymentMethod}</div>
                                        </div> 
                                        <div className="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                                            <div className="text-base text-gray-600">Emitido por</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">{invoice.invoiceToPrint.invoiceCreatedBy}</div>  
                                            
                                            <div className="text-base text-gray-600 mt-5">Cambio para el cliente</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">L { Number(invoice.invoiceToPrint.invoiceChange).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</div>                                 
                                        </div>
                                    </div> 
                                </div>
                                <div className="px-5 sm:px-16 py-10 sm:py-20">
                                    <div className="overflow-x-auto">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="border-b-2 whitespace-nowrap">DESCRIPCIÓN</th>
                                                    <th className="border-b-2 whitespace-nowrap">CANTIDAD</th>
                                                    <th className="border-b-2 whitespace-nowrap">PRECIO</th>                                            
                                                    <th className="border-b-2 whitespace-nowrap">DESCUENTOS Y PROMOCIONES</th>
                                                    <th className="border-b-2 whitespace-nowrap">SUBTOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { invoice.invoiceToPrint.invoiceProducts.map((item, index)=>(
                                                    <tr key={index}>
                                                        <td  className="border-b">
                                                            <div className="font-medium whitespace-nowrap">{item.name}</div>
                                                            {(item.hasVariations !== 0)
                                                                ? item.variations.map((item_var, index_)=>(
                                                                    <div key={index_} className="text-gray-600 flex text-xs whitespace-nowrap">{item_var.name}</div> ))                                                                
                                                                :<></>}                                                            
                                                        </td>                                             
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                             
                                                            {item.variations.map((item_var, index_)=>(
                                                                    <div key={index_} className="text-gray-600 flex text-xs whitespace-nowrap">{item_var.quantity}</div> ))}                                                                              
                                                            
                                                        </td>                                                
                                                        <td className="text-right border-b dark:border-dark-5 w-32">      
                                                            {item.variations.map((item_var, index_)=>(
                                                                    <div key={index_} className="text-gray-600 flex text-xs whitespace-nowrap">L {Number(item_var.price).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </div> ))}                                                                                                                                
                                                        </td> 
                                                        <td className="text-right border-b text-theme-6 w-32">
                                                            { (item.isDiscountApplied===1 || item.isPromoApplied===1)
                                                                ?"-L "+String(Number( ( (item.isDiscountApplied===1)
                                                                                            ?item.discount
                                                                                            :0) + 
                                                                                    ( (item.isPromoApplied===1)
                                                                                            ?item.promoDicount
                                                                                            :0) 
                                                                                    ).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                                                                :"-L 0.00"}
                                                        </td>
                                                        <td className="text-right border-b text-theme-1 w-32 font-medium text-base">L {Number(item.total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                    </tr> ))}
                                            
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Subtotal</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L { Number(invoice.invoiceToPrint.invoiceSubTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Descuento</td>
                                                    <td className="text-right border-b text-theme-6 w-32 font-medium">-L { Number(invoice.invoiceToPrint.invoiceDiscount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Importe exonerado</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L { (invoice.invoiceToPrint.invoiceIsExonerated !== 1 )
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Importe exento</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L { (invoice.invoiceToPrint.invoiceIsExonerated ===1 || invoice.invoiceToPrint.invoiceTax[0] === undefined) 
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTax[0].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Importe gravado 15%</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L { (invoice.invoiceToPrint.invoiceTax[15] === undefined)
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTax[15].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Importe gravado 18%</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L {(invoice.invoiceToPrint.invoiceTax[18] === undefined)
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTax[18].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Isv(15%)</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L  { (invoice.invoiceToPrint.invoiceTax[15] === undefined)
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTax[15].calculate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b dark:border-dark-5 w-32">Isv(18%)</td>
                                                    <td className="text-right border-b dark:border-dark-5 w-32 font-medium">L { (invoice.invoiceToPrint.invoiceTax[18] === undefined)
                                                                                                                                    ?"0.00"
                                                                                                                                    :Number(invoice.invoiceToPrint.invoiceTax[18].calculate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="text-right border-b font-medium text-base w-32">Total</td>
                                                    <td className="text-right border-b text-theme-1 w-32 font-medium text-base">L {Number(invoice.invoiceToPrint.invoiceTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} </td>
                                                </tr>


                                            </tbody>
                                        </table>
                                        <iframe
                                            id="invoice"
                                            style={{display:"none"}}  
                                            title="invoice"/> 
                                    </div> 
                                </div>   
                            </>)
                            :(<></>)}                    
                    </div>
                </div>
            </div>
        </>)
}

export default ViewInvoice;