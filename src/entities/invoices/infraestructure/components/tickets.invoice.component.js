import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../products/core/selectors/products.selectors';
import { getInvoice  } from '../../core/selector/invoice.selector';
import { getDiscount } from '../../../discount/core/selector/discount.selector';
import { getCustomer } from '../../../customers/core/selector/customer.selector';
import { getCookie } from '../../../../cookies/selectors/cookie.selector';
import { getLoading } from '../../../ui/core/selector/ui.selector'; 
import { getPOS } from '../../../pos/core/selector/pos.selector'; 
import { loadChangeVariationPopUp,
         calculateGlobalDiscount ,
         setRecordInvoice,
         exonerateInvoice,
         removeItemFromInvoice,
         calculatePriceWithFee } from '../../core/actions/invoice.actions';
import { getCustomers } from '../../../customers/core/actions/customer.action';
import { findGlobalDiscount } from '../../../discount/core/actions/discount.actions';
import { getPOSCombox } from '../../../pos/core/actions/posActions';
import TicketPopUp from './ticket.invoce.popup.component';
import ChangePopUp from './ticket.changes.popup.component';
import TicketErrorPopUp from './ticket.error.popup.component';
import Select from 'react-select';

const Ticket =()=>{

    const invoice = useSelector(getInvoice);
    const discount = useSelector(getDiscount);
    const customers = useSelector(getCustomer);
    const cookie = useSelector(getCookie);
    const loading = useSelector(getLoading);  
    const products = useSelector(getProducts);    
    const pos = useSelector(getPOS);  

    const dispatch  = useDispatch();
    const headerTicketState = {
        customer          : {value:"0",RTN:"",label:"SIN NOMBRE"} , 
        paymentMethod     : {value:"1", label: "EFECTIVO", type: "Efectivo", fee:0 },        
        saleType          : "1" ,
        sellTaxOff        : "NO", 
        buyTaxOffNumber   : ""  , 
        SAG               : ""  , 
        proofRegistration : ""
    }
    const [setHeaderTicketState, updateHeaderTicketState] = useState(headerTicketState);    
    /** find POS for the company */
    useEffect(()=>{ 
        if(!cookie.find && pos.getPOS){            
            dispatch(getPOSCombox( {company :  cookie.cookie.login.companyId } ))
        }
    },[dispatch, pos.getPOS, cookie.find, cookie.cookie.login.companyId])

    /**  find global discount */
    useEffect(()=>{
        if(!cookie.find && !discount.loaded)
            dispatch(findGlobalDiscount(cookie.cookie.login.companyId));
    },[dispatch, cookie.cookie.login.companyId, cookie.find, discount.loaded])

    /** find customers **/
    useEffect(()=>{
        if(!cookie.find)
            dispatch(getCustomers(cookie.cookie.login.companyId))  
    },[dispatch, cookie.cookie.login.companyId, cookie.find])

    /** show feather */
    useEffect(()=>{
        var invoice_item = document.getElementsByClassName("invoice-item")
        if(invoice_item.length>0){
            window.feather.replace();
        }
    })

    /**show delete popup */
    useEffect(()=>{
        if(invoice.showPopUpError){
            window.showModal("#delete-modal-preview") 
            invoice.showPopUpError = false
        }
    },[invoice.showPopUpError, invoice])
    
    /** print invoice */
    useEffect(()=>{
   
        if(invoice.invoiceToPrintId !== "false"){     
            window.hideModal("#cash-modal")    
            window.location.href="/admin/view-invoice/"+invoice.invoiceToPrintId
        }
    },[invoice.invoiceToPrintId ])

    
    const changeDiscount =(e)=>{
        dispatch(calculateGlobalDiscount({ invoice    : invoice.payload ,  
                                           discount   : e.target[e.target.selectedIndex].text.split("%")[0] ,

                                           discountref: { discount: e.target[e.target.selectedIndex].text.split("%")[0] , 
                                                          label   : e.target[e.target.selectedIndex].text               , 
                                                          value   : e.target.value } ,
                                           isExonerated: invoice.isExonerated
                                        }))      
    }



    const NewInvoice = ()=>{
        dispatch(
                setRecordInvoice({ 
                    ticketDetail: setHeaderTicketState , 
                    ticketProducts: invoice.payload , 
                    ticketTotal: invoice.total, 
                    identities: [undefined, ""].includes(products.identities)?[]:products.identities.trim().split("\n"),
                    cookie : cookie.cookie }) )
    }
    
    function onHeaderTicketChange(e){
        e.persist()
        var payment 
        if (e.target.id ==="paymentMethod") {           
           var item = e.target.options[e.target.selectedIndex]
           var type = ""
           switch(item.value){
               case "1": type = "Efectivo"  
                        break;
               case "2": type = "Credito"   
                        break;  
               case "3": type = "Transferencia"
                        break;
               default : type = item.text
           }           
           let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
           let discountOptions       = document.getElementById("Discount").options;
   
           let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                               label   : discountOptions[discountSelectedIndex].text               , 
                               value   : discountOptions[discountSelectedIndex].value }

          payment = { value: e.target.value , label: item.text, type : type , fee: item.getAttribute("fee") }
          dispatch(calculatePriceWithFee({
                invoice: invoice.payload,
                payment: payment,
                isExonerated: invoice.isExonerated,
                gldiscount: discount.globalDicount, 
                discountRef: discountref
            }))
        } 
        
        if(e.target.id === "sellTaxOff") {
            let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
            let discountOptions       = document.getElementById("Discount").options;
    
            let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                                label   : discountOptions[discountSelectedIndex].text               , 
                                value   : discountOptions[discountSelectedIndex].value }
    
            dispatch(exonerateInvoice({invoice: invoice.payload , 
                isExonerated: invoice.isExonerated, 
                gblDiscount: discount.globalDicount, 
                discountRef: discountref }))
        }

        updateHeaderTicketState(()=>({...setHeaderTicketState, 
            [e.target.id]: ( (e.target.id ==="paymentMethod")
                ?payment
                :e.target.value 
            ) } ))              
    }

    function onCustomerChange(e){
        updateHeaderTicketState(()=>({...setHeaderTicketState, "customer": e}))
    }

    const removeItem =(productId)=>{
        let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
        let discountOptions = document.getElementById("Discount").options;

        let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0], 
                            label: discountOptions[discountSelectedIndex].text, 
                            value: discountOptions[discountSelectedIndex].value }

        dispatch(removeItemFromInvoice({
            invoice: invoice.payload, 
            discountRef: discountref,
            gldiscount: discount.globalDicount, 
            change: invoice.change, 
            isExonerated: invoice.isExonerated,
            product: productId
        }))
    }


    return( <div className="col-span-12 lg:col-span-4">
                
                <TicketPopUp></TicketPopUp>
                <ChangePopUp headerDetail={setHeaderTicketState}></ChangePopUp>                
                <TicketErrorPopUp></TicketErrorPopUp>

                <div className="intro-y pr-1">
                    <div className="box p-2">
                        <div className="pos__tabs nav-tabs justify-center flex"> 
                            <div data-toggle="tab" 
                                 data-target="#ticket" 
                                 className="cursor-pointer flex-1 py-2 rounded-md text-center active">Factura</div> 
                            <div data-toggle="tab" 
                                 data-target="#details" 
                                 className="cursor-pointer flex-1 py-2 rounded-md text-center">Detalle</div> 
                        </div>
                    </div>
                </div>
                
                <div className="tab-content">
                    <div className="tab-content__pane active" id="ticket">
                        <div className="pos__ticket box p-2 mt-5">  
                            { invoice.payload.map((products , index)=>(
                                <div key={index} className="grid grid-cols-12">
                                    <div onClick={()=>{ removeItem(products.productId) }} className="col-span-12 cursor-pointer xl:col-span-1 flex items-center ">
                                        <i data-feather="trash" className="w-4 h-4 text-gray-600 ml-2" />
                                    </div>
                                    <div  data-toggle="modal" 
                                         onClick={()=>{dispatch(loadChangeVariationPopUp(products))}} 
                                         data-target="#update-ticket-modal" 
                                         className="col-span-12 xl:col-span-11 p-2 hover:bg-gray-200 bg-white ease-in-out rounded-md cursor-pointer" >
                                        
                                        <div className="invoice-item  flex items-center transition duration-300">                                        
                                            <div className="pos__ticket__item-name truncate mr-1">{products.productName}</div>
                                            <div className="text-gray-600">x {products.productoQuantity}</div>
                                            <i data-feather="edit" className="w-4 h-4 text-gray-600 ml-2" />                                         
                                            <div className="ml-auto text-xs text-theme-6">
                                                { (products.discountIsApplied===1 || products.promotionIsApplied===1)
                                                    ?"-L "+String(Number( ( (products.discountIsApplied===1)
                                                                                ?products.discountTotal
                                                                                :0) + 
                                                                        ( (products.promotionIsApplied===1)
                                                                                ?products.promoDiscount
                                                                                :0) 
                                                                        ).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))
                                                    :""}
                                            </div>
                                            <div className="ml-auto font-medium">L {Number(products.productTotal).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                                        </div> 
                                        {(Number(products.hasVariations) !== 0)
                                            ?<div className="invoice-item flex items-center transition duration-300">                                      
                                                    { products.variations.map((variation, _index)=>(
                                                            <div key={_index} className="text-gray-600 text-xs whitespace-nowrap mt-0.5">
                                                                {variation.variationName} x ({String( variation.variationQuantity )});    
                                                            </div>   
                                                        )) }
                                                </div>
                                            :<></>}                                         
                                        <div>
                                            { (products.productDiscount.length > 1 || products.promoCounter>0)
                                                ?(<div className="text-theme-11 text-xs whitespace-nowrap mt-0.5">
                                                    Click para ver descuentos o promociones
                                                </div>)
                                                :(<></>)}                                        
                                        </div>                                   
                                    </div>  
                                </div> ))}                         
                        </div>

                        <div className="box p-5 mt-5">
                            
                            { (invoice.total.sub_total !== undefined && invoice.payload.length)
                                    ?( <>
                                            <div className="flex">
                                                <div className="mr-auto">Subtotal</div>
                                                <div className="font-medium">L { Number(invoice.total.sub_total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</div>
                                            </div>
                                            <div>
                                                <div className="flex mt-4">
                                                    <div className="mr-auto">Descuento</div>
                                                </div>
                                                <div className="flex mt-2  ml-2">                                                                                                                              
                                                    <select id="Discount" onChange={changeDiscount} 
                                                            className="input border mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5">
                                                        <option key={-1} value="" >0%</option>{
                                                            discount.payload.map((discount , index)=>(
                                                                <option key={index} value={discount.id} >{ discount.data.DiscountPercentage }% - {discount.data.DiscountName}</option>  
                                                            ))
                                                        }                                                                                                                                 
                                                    </select> 
                                                    <div className="font-medium text-theme-6">-L { Number(invoice.total.discount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</div>
                                                </div>
                                            </div>                                        
                                            <div>                                                                            
                                                <div className="flex mt-4">
                                                    <div className="mr-auto">Impuestos</div>                           
                                                </div>  
                                                { Object.keys(invoice.total.tax).map((index)=>(
                                                        <div key={index} className="flex mt-2  ml-2">                            
                                                            <div className="mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5">{ ((index === "0")?"Exento de impuesto":" Impuesto "+String(index)+"%") }</div>
                                                            <div className="font-medium">L { (index === "0" )?Number(invoice.total.tax[index].taxed).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"):Number(invoice.total.tax[index].calculate).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }</div>                            
                                                        </div>
                                                    ))}
                                                                            
                                            </div>
                                            <div className="flex mt-4 pt-4 border-t border-gray-200 dark:border-dark-5">
                                                <div className="mr-auto font-medium text-base">Total</div>
                                                <div className="font-medium text-base">L {Number(invoice.total.total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                                            </div>                                        
                                        </>)
                                    :(<></>) }                        
                        </div>

                        <div className="box p-5 mt-5">
                            <div style={{display: (invoice.payload.length>0)?"":"none" }}>
                                <div className="text-gray-600">Forma de Pago</div>                        
                                <div className="mt-2"> 
                                    <select id="paymentMethod" 
                                            value ={setHeaderTicketState.paymentMethod.value} 
                                            onChange={onHeaderTicketChange} 
                                            className="input border mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full">
                                        <option fee="0" value="1">EFECTIVO</option>
                                        <option fee="0" value="2">VENTA AL CREDITO</option>
                                        <option fee="0" value="3">TRANSFERENCIA BANCARIA</option>
                                        {pos.payload.map((item, index)=>(
                                            <option key={index} fee={item.data.PosFee} value={item.id}>{item.data.PosName}</option>
                                        ))}
                                    </select> 
                                </div>
                            </div>
                            {(cookie.cookie.company !== undefined && invoice.payload.length > 0 && cookie.cookie.company.CompanyDeliverySale === 1)
                                ?(<div className="mt-5">
                                        <div className="text-gray-600">Tipo de venta</div>                        
                                        <div className="mt-2"> 
                                            <select id="saleType" value={setHeaderTicketState.saleType} 
                                                    onChange={onHeaderTicketChange} 
                                                    className="input border mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full">
                                                <option value="1">VENTA PRESENCIAL</option>
                                                <option value="2">VENTA A DOMICILIO</option>
                                            </select> 
                                        </div>
                                    </div>)
                                :(<></>)}                                                       
                        </div>
                                               
                        { (invoice.payload.length>0)
                            ?( <div className="flex mt-5">
                                    <button 
                                        onClick={()=>window.location.reload()}
                                        className="button w-32 border border-gray-400 dark:border-dark-5 text-gray-600">
                                        Limpiar factura
                                    </button>
                                    <>
                                        <button style={{display:(loading.button)?"":"none" }} 
                                                className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                                    Facturando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img> </button>

                                        {cookie.cookie.company.CompanyEndingDocs
                                            ?<button style={{display:(loading.button)?"none":"" }} onClick={ NewInvoice } 
                                                className="button w-32 text-white bg-theme-1 shadow-md ml-auto">Facturar</button>
                                            :<button 
                                                 className="button w-32 border border-gray-400 text-gray-600 ml-auto">
                                                 Facturar
                                             </button> }
                                    </>                                    
                               </div>)
                            :(<></>) }                        
                    </div>
                    <div className="tab-content__pane" id="details">

                        <div className="box p-5 mt-5">
                            <div className="items-center border-b border-gray-200 dark:border-dark-5 py-5">
                                <div >
                                    <div className="text-gray-600">Cliente</div>                        
                                    <div className="mt-2"> 
                                        <Select id="customer"
                                            onChange={onCustomerChange}
                                            value={setHeaderTicketState.customer}
                                            className="mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full"
                                            options={customers.payload} />
                                    </div>
                                </div> 
                            </div>
                            <div className="items-center py-5">
                                
                                    <div className="text-gray-600">Venta exonerada</div>
                                    <div className="mt-2"> 
                                        <select id="sellTaxOff" value={setHeaderTicketState.sellTaxOff} 
                                                onChange={onHeaderTicketChange} 
                                                className="input border mr-auto text-gray-600 text-xs whitespace-nowrap mt-0.5 w-full">
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select> 
                                    </div>
                            </div>
                        </div>

                        <div className="box p-5 mt-5">
                            {(setHeaderTicketState.sellTaxOff==="SI")
                                ?(<div>
                                    <div className="text-gray-600">Información de la exoneración</div>
                                    <div className="w-full mt-5 relative text-gray-700">
                                        <input type="text" id="buyTaxOffNumber" onChange={onHeaderTicketChange} 
                                                className="input input--lg w-full bg-gray-200 pr-10 placeholder-theme-13"
                                                placeholder="Orden de compra exenta" />                            
                                    </div>
                                    <div className="w-full mt-5 relative text-gray-700">
                                        <input type="text" id="SAG" onChange={onHeaderTicketChange} 
                                               className="input input--lg w-full bg-gray-200 pr-10 placeholder-theme-13" 
                                               placeholder="SAG" />                            
                                    </div>
                                    <div className="w-full mt-5 relative text-gray-700">
                                        <input type="text" id="proofRegistration" onChange={onHeaderTicketChange} 
                                               className="input input--lg w-full bg-gray-200 pr-10 placeholder-theme-13" 
                                               placeholder="Constancia de registro" />                            
                                    </div>                                
                                </div>)
                                :(<></>)}                        
                        </div>
                        
                    </div>
                </div>
            </div> )
}

export default Ticket;
