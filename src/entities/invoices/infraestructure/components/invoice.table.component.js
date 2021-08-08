import { React, useEffect } from 'react';
import { useDispatch }      from 'react-redux';
import { getProductsInInvoice } from '../../core/actions/invoice.actions';               
import ViewInvoiceProduct   from './view.invoice.popup.product.component';

const InvoiceTable=(invoices)=>{
   
    const dispatch = useDispatch();

    useEffect(()=>{       
       window.feather.replace();    
    })

    return(
            <div id="invoiceTable" className="grid grid-cols-12 gap-6 mt-5">
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                            
                    <div className="hidden md:block mx-auto text-gray-600">{invoices.invoices.size} facturas como resultado de la búsqueda</div>                            
                </div>
                <ViewInvoiceProduct></ViewInvoiceProduct>
                {(invoices.invoices.invoices[invoices.invoices.page] !== undefined)
                    ?(  <>
                            {/* BEGIN: Data List */}
                             <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                                <table className="table table-report -mt-2">
                                    <thead>
                                        <tr>
                                            <th className="whitespace-nowrap">FACTURA</th>
                                            <th className="whitespace-nowrap">FECHA</th>
                                            <th className="whitespace-nowrap">CLIENTE</th>
                                            <th className="whitespace-nowrap">TOTAL DE FACTURA</th>
                                            <th className="text-center whitespace-nowrap">ESTADO</th>
                                            <th className="whitespace-nowrap">ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {invoices.invoices.invoices[invoices.invoices.page].map((invoice , index)=>(
                                        <tr key={index} className="intro-x">
                                            <td> {invoice.invoice_number} </td>
                                            <td className="W-40"> {invoice.invioce_date} </td>
                                            <td>
                                                {(invoice.invoice_customer !== "")
                                                    ?(invoice.invoice_customer.label.split("-").length>1)
                                                        ?<> <div className="font-medium whitespace-nowrap">{invoice.invoice_customer.label.split("-")[1]}</div> 
                                                            <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">{invoice.invoice_customer.label.split("-")[0]}</div></>
                                                        :<div className="font-medium whitespace-nowrap">{invoice.invoice_customer.label.split("-")[0]}</div>
                                                    :"Factura sin nombre"}
                                                
                                            </td>
                                            <td className="w-40"> L {Number(invoice.invoice_total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</td>
                                            <td className="w-40">
                                                <div className={(invoice.invoice_state==="Anulado")?"flex items-center justify-center text-theme-6":"flex items-center justify-center text-theme-9"}>
                                                     {(invoice.invoice_state==="Anulado")
                                                        ?<i data-feather="x-square" className="w-4 h-4 mr-2" />
                                                        :<i data-feather="check-square" className="w-4 h-4 mr-2" />}
                                                      {invoice.invoice_state}                                                      
                                                </div>
                                            </td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <div onClick={()=>{invoices.invoices.fnViewInvoice(invoice.id)}} className="flex items-center mr-3 cursor-pointer"> <i data-feather="eye" className="w-4 h-4 mr-1" /> Visualizar </div>
                                                    <div onClick={()=>{dispatch(getProductsInInvoice(invoice.invoice_products))}} data-toggle="modal"  data-target="#product-invoice-modal" className="flex items-center text-theme-11 cursor-pointer" > <i data-feather="arrow-up-right" className="w-4 h-4 mr-1" /> Productos </div>
                                                </div>
                                            </td>
                                        </tr> )) }
                                </tbody>
                                </table>
                            </div>
                            {/* END: Data List */}
                            {/* BEGIN: Pagination */}
                            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                                <ul className="pagination">
                                    <li onClick={()=>{ invoices.invoices.fnChangePage(0) }}> <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                                    <li onClick={()=>{ if(invoices.invoices.page > 0) 
                                                         invoices.invoices.fnChangePage(invoices.invoices.page-1) }}> 
                                        <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> </li>  
                                    {invoices.invoices.invoices.map((chunk , index)=>(
                                        <li key={index} onClick={()=>{ invoices.invoices.fnChangePage(index) }} >
                                            <div  className={(index === invoices.invoices.page)
                                                            ?"pagination__link pagination__link--active cursor-pointer"
                                                            :"pagination__link cursor-pointer"} >
                                                {index+1}
                                            </div> </li>))}                                 
                                    <li onClick={()=>{ if(invoices.invoices.page < invoices.invoices.invoices.length -1)
                                                            invoices.invoices.fnChangePage(invoices.invoices.page+1) }}> 
                                        <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> </li>
                                    <li onClick={()=>{ invoices.invoices.fnChangePage(invoices.invoices.invoices.length -1 ) }} > <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div> </li>
                                </ul>                   
                            </div>
                            {/* END: Pagination */}
                        </>)
                    :(<></>) }               
            </div>
    )
}

export default InvoiceTable;