import * as invoiceActions   from '../actions/invoice.actions';
import * as productActions   from '../../../products/core/actions/products.actions';
import * as discotuntActions from '../../../discount/core/actions/discount.actions';
import * as uiActions        from '../../../ui/core/actions/ui.actions';
import  invoiceService       from '../services/invoice.service';
import  discountService      from '../../../discount/core/services/discounts.requests';
import  promotionService     from '../../../promotion/core/services/promotion.service';
import  customerService      from '../../../customers/core/services/customers.request';


const addToInvoice =(request)=>({dispatch})=>next=>async(action)=>{
        next(action);

        if(action.type === invoiceActions.ADD_TO_INVOICE){  

            const response = invoiceService.addToInvoiceServiceValidation(action.payload.state, 
               action.payload.product, "add", 
               action.payload.product.type)        
   
           if(!response.result){
                dispatch(productActions.ShowErrorVariationsPopUp({msj: response.msj, emptyFields: response.emptyFields}))                
           }else{          
                dispatch(uiActions.setLoadingButtonPopUp(true))   
                  
                const discount          = await discountService.getProductDiscount(action.payload.product, request); 
                const promotion         = await promotionService.getProductPromotion(action.payload.product, request);
                const VaritionToInvoice = invoiceService.getVariationToAddInInvoice(action.payload);                           
                const invoice           = invoiceService.addToInvoice(VaritionToInvoice,action.payload.invoice, discount, promotion); 
                const invoiceWithpromo  = invoiceService.calculatePromotion(invoice, VaritionToInvoice, promotion[0])                         
                const totals            = invoiceService.getInvoiceTotal(invoiceWithpromo, action.payload.gldiscount,  action.payload.discountRef , action.payload.isExonerated);                                         

                dispatch(invoiceActions.addedToInvoice(invoiceWithpromo))      
                dispatch(invoiceActions.showInvoiceTotal(totals)) 
                dispatch(uiActions.setLoadingButtonPopUp(false))                   
           }
        }
}

const updateVariationInvoice =()=>({dispatch})=>next=>async(action)=>{
     next(action);

     if(action.type === invoiceActions.UPDATE_VARIATION_POPUP)
     {   
          const response = invoiceService.addToInvoiceServiceValidation(action.payload.state,
               action.payload.change,
               "update",
               action.payload.change.productType)                    
          if(!response.result){
              dispatch(invoiceActions.showErrorVariationPopUp({msj: response.msj, emptyFields: response.emptyFields}))
          }else{ 
               const invoice           = invoiceService.changeVariationInInvoice(action.payload.state, action.payload.invoice)              
               const variationChange   = invoiceService.getVariationFromInvoceState(action.payload.state.variation,  action.payload.change)            
               const invoiceWithpromo  = invoiceService.calculatePromotion(invoice, variationChange , action.payload.change.productPromotion[0])
               const totals            = invoiceService.getInvoiceTotal(invoiceWithpromo, action.payload.gldiscount,  action.payload.discountRef ,action.payload.isExonerated);   
               
               dispatch(invoiceActions.addedToInvoice(invoiceWithpromo))                  
               dispatch(invoiceActions.showInvoiceTotal(totals)) 
          }
     }
}

const calculatedGlobalDiscount=()=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.CALCULATE_GLOBAL_DISCOUNT){          
          const totals = invoiceService.getInvoiceTotal(action.payload.invoice, 
               action.payload.discount, 
               action.payload.discountref, 
               action.payload.isExonerated)

          dispatch(invoiceActions.showInvoiceTotal(totals))
          dispatch(discotuntActions.setGlobalDiscount(action.payload.discount))
     }
}

const applyPromotion=()=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.APPLY_PROMOTION){

       const invoice = invoiceService.applyPromotion(action.payload.product, action.payload.invoice);
       const totals  = invoiceService.getInvoiceTotal(invoice, action.payload.gblDiscount, action.payload.discountRef , action.payload.isExonerated);  
       
       dispatch(invoiceActions.addedToInvoice(invoice))                  
       dispatch(invoiceActions.showInvoiceTotal(totals)) 
     }
}

const applyProductDiscount=()=>({dispatch})=>next=>async(action)=>{
     next(action)

     if(action.type === invoiceActions.APPLY_DISCOUNT){
          
          const invoice = invoiceService.applyProductDiscount(action.payload.product, action.payload.invoice, action.payload.discount)
          const totals  = invoiceService.getInvoiceTotal(invoice, action.payload.gblDiscount, action.payload.discountRef, action.payload.isExonerated);  
     
          dispatch(invoiceActions.addedToInvoice(invoice))                  
          dispatch(invoiceActions.showInvoiceTotal(totals)) 
     }
}

const recordInvoice =(request)=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.RECORD_INVOICE){
          /** when create the invoice first we have to do the following things 
           * 1. check if the information of the invoice is corrected
           * 2. check if the customer is making a purchase with cash
           *        if the purchase is with cash we have to show the pop up to make the store specify the cash the customer is getting to the sales person
           * 3. after that we dispatch the needed events to show the ui actions to the user
           * 4. then we create a new credit in the active account receivable of the user when
           *      the invoice is making with credit
           *     
           * 5. if it is success we decrement the stock for the product
           * 6. if it success we create the record of the invoice in the database
           * 7. if we find exeptions we show it to the user
          */
          const result  = invoiceService.validateInvoice(action.payload.ticketDetail)
          if(!result.result){               
               dispatch(invoiceActions.showTicketError(result.msj))
          }else{
               if(action.payload.ticketDetail.paymentMethod.value==="1"){                  
                    window.showModal("#cash-modal") 
               }else{           
                    dispatch(uiActions.setLoadingButton(true))         
                    let accountReceivableSuccess = true

                    if (Number(action.payload.ticketDetail.paymentMethod.value) === 2) {                         
                         let current_datetime = new Date()
                         let formatted_date = current_datetime.getFullYear()+"-"+(current_datetime.getMonth() + 1)+"-"+current_datetime.getDate()
                         accountReceivableSuccess = await customerService.setCreditFroAccountReceivable
                              ( request, {
                                   company: action.payload.cookie.login.companyId,
                                   customer: action.payload.ticketDetail.customer,
                                   date: formatted_date,
                                   total: action.payload.ticketTotal.total 
                               } )
                    }

                    if (accountReceivableSuccess) {

                         const products = invoiceService.createJsonProductInvoice(action.payload.ticketProducts)
                         const response = await invoiceService.createJsonInvoice(action.payload, products , 
                              action.payload.cookie, 0, 
                              request)   
                         if (response.result) {
                              if (action.payload.identities.length) {
                                   await invoiceService.setIdentitiesInSell(request,{
                                        identities: action.payload.identities,
                                        billing: response.id,
                                        company: action.payload.cookie.login.companyId 
                                   })
                              }                              
                              dispatch(invoiceActions.redirectToPrint(response.id))
                         } else {
                              dispatch(invoiceActions.showTicketError( response.msj ))
                         }       
                         dispatch(uiActions.setLoadingButton(false))  
          
                    }else{
                         dispatch(invoiceActions.showTicketError("Error al realizar la facturación verifique su conexión a internet e intente nuevamente"))
                         dispatch(uiActions.setLoadingButton(false))         
                    }                    
               }               
          }
     }
}

const recordInvoiceWithCash =(request)=>({dispatch})=>next=>async(action)=>{
      next(action);
      
      if(action.type === invoiceActions.RECORD_INVOICE_WITH_CASH){
           if(Number(action.payload.ticketCashinTicket.cash).toFixed(2) < Number( action.payload.ticketTotal.total ).toFixed(2) ){
               dispatch(invoiceActions.showCashPopUpError("El efectivo ingresado es menor al total de la factura"))
           }else {
               dispatch(uiActions.setLoadingButton(true))    
               const products = invoiceService.createJsonProductInvoice(action.payload.ticketProducts)
               const response = await invoiceService.createJsonInvoice( action.payload, products,
                         action.payload.cookie, 
                         Number(action.payload.ticketCashinTicket.cash) - Number( action.payload.ticketTotal.total ), 
                         request)
               if (response.result) {
                    if( action.payload.identities.length ) {
                         await invoiceService.setIdentitiesInSell(request,{
                              identities: action.payload.identities,
                              billing: response.id,
                              company: action.payload.cookie.login.companyId 
                         })
                    }                    
                    dispatch(invoiceActions.redirectToPrint(response.id))
               } else {
                    dispatch(invoiceActions.showCashPopUpError(response.msj))
                    //dispatch(invoiceActions.showTicketError( response.msj ))
               }       
               dispatch(uiActions.setLoadingButton(false))                               
           }          
      }
}

const getInvoiceToPrint = (request)=>({dispatch})=>next=>async(action)=>{
     next(action);

     if(action.type === invoiceActions.GET_INVOICE_TO_PRINT){
         dispatch(uiActions.setLoading(true))
         const invoice = await invoiceService.getInvoiceToPrint(action.payload, request)
         dispatch(invoiceActions.showInvoiceToPrint({invoice:invoice, 
                                                     canceled:  {state: false , msj: "", success: 0 } }))
         dispatch(uiActions.setLoading(false))
     }
}

const setExoneratedInvoice = ()=>({dispatch})=>next=>async(action)=>{
     next(action);

     if(action.type === invoiceActions.EXONERATE_INVOICE){           
          const totals  = invoiceService.getInvoiceTotal(action.payload.invoice, action.payload.gblDiscount, action.payload.discountRef, true)
          dispatch(invoiceActions.showInvoiceTotal(totals))
          dispatch(invoiceActions.setExoneratedInvoice(true))
     }
}

const getInvoicesList =(request)=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.GET_INVOICES_LIST){    
          dispatch(uiActions.setLoadingButton(true))       
          const invoices = await invoiceService.getInvoicesList(request,action.payload)     
          dispatch( invoiceActions.showInvoicesList(invoices) )
          dispatch(uiActions.setLoadingButton(false)) 
     }
}

const cleanUp =()=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.INIT_CLEAN_UP){
          dispatch(invoiceActions.cleanUp())
     }
}

const getProductInInvoice =()=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.GET_PRODUCTS_IN_INVOICE){             
          dispatch(invoiceActions.showProductsInInvoice(action.payload))
     }
}

const cancelInvoice =(request)=>({dispatch})=>next=>async(action)=>{
     next(action);
     if(action.type === invoiceActions.CANCEL_INVOICE){
        let message = ""
        dispatch(uiActions.setLoadingButton(true))   
        const canceled_response = await  invoiceService.cancelInvoice(request, action.payload)    
         
        if (canceled_response) {
           message = "La factura ha sido anulada con éxito."
        } else {
           message = "Error al anular la factura, es necesario realizar una corrección manual de inventario."
        }
        const invoice = await invoiceService.getInvoiceToPrint(action.payload, request)
        dispatch(invoiceActions.showInvoiceToPrint({ invoice:invoice , 
                                                     canceled: {state: true , msj: message, success: canceled_response } }))   
        dispatch(uiActions.setLoadingButton(false))        
     }
}

const removeItemFromInvoice =()=>({dispatch})=>next=>async(action)=>{
   next(action);
   if (action.type === invoiceActions.REMOVE_ITEM_FROM_INVOICE) {

     const newInvoice = action.payload.invoice.filter(item=> item.productId !== action.payload.product)
     const totals = invoiceService.getInvoiceTotal(newInvoice, 
          action.payload.gldiscount,  
          action.payload.discountRef,
          action.payload.isExonerated);   
     dispatch(invoiceActions.addedToInvoice(newInvoice))                  
     dispatch(invoiceActions.showInvoiceTotal(totals))  
   }
}

const calculatePriceWithFees = ()=>({dispatch})=>next=>async(action)=>{
     next(action);
     
     if (action.type === invoiceActions.CALCULATE_PRICE_WITH_FEE) {
        const invoice = invoiceService.setNewPriceWithFees(action.payload)
        const totals = invoiceService.getInvoiceTotal(invoice, 
           action.payload.gldiscount,  
           action.payload.discountRef,
           action.payload.isExonerated);   
                    
        dispatch(invoiceActions.showInvoiceTotal(totals))   
     }
}

const invoiceMiddleWare =  [ addToInvoice, updateVariationInvoice , calculatedGlobalDiscount, 
                             applyPromotion, applyProductDiscount , recordInvoice , 
                             recordInvoiceWithCash, getInvoiceToPrint , setExoneratedInvoice ,
                             getInvoicesList, cleanUp, getProductInInvoice ,
                             cancelInvoice, removeItemFromInvoice, calculatePriceWithFees
                         ]

export default invoiceMiddleWare;