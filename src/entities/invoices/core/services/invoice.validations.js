import validationsService  from '../../../../validation/validation';


const addToInvoiceValidator = (invoiceState, product, addToInvoiceType, productType)=>{    
 
    /*****
     * HERE WE VALIDATE ALL THE ITEMS HAVE TO BE VAILDATED BEFORE ADD A PRODUCT TO AN INVOICE
     */ 
    /** HERE WE VALIDATE THE REQUIRED FIELDS */
    const Requiredvalidation   = validationsService.requiredValidation(invoiceState)    
    if(!Requiredvalidation.validated){        
       return { result: false, msj:"",emptyFields:Requiredvalidation.emptyFields}
    }

    /*** HERE WE VALIDATE THE FIELD THAT HAS TO BE GREATHER THAN 0 */
   const greatherThanValidation = validationsService.GreatherThan(invoiceState);
   if (!greatherThanValidation.validated) {
       return { result: false, msj:greatherThanValidation.exeptionMsj,  emptyFields:Requiredvalidation.emptyFields}
    }

    /*** HERE WE CHECK THAT THE CURRENT STOCK IS GREATER THAN THEN QUANTITY THE CUSTOMER IS GOING TO TAKE 
     * WHEN  addToInvoiceType = ADD
     */
    if (addToInvoiceType ==="add") {
        const variationToAdd = product.variations.find(variation=> variation.id === invoiceState.variationId)
        if (Number(invoiceState.quantityInInvoice) > Number(variationToAdd.data.quantity) && productType === "PRODUCTO") {
          return { result: false,
                   msj: "Se esta intentando facturar una cantidad mayor a la que se tiene en inventario para esta variación del producto.",
                   emptyFields: Requiredvalidation.emptyFields}
        }
    } else {
        const variationToAdd = product.variations.find(variation=> variation.variationId === invoiceState.variation )

        if (Number(invoiceState.quantityVariation) > Number(variationToAdd.variationStock) && productType === "PRODUCTO") {
            return { result: false,
                msj: "Se esta intentando facturar una cantidad mayor a la que se tiene en inventario para esta variación del producto.",
                emptyFields: Requiredvalidation.emptyFields}
        }
    }
    
    
    return { result: true, msj:"" , emptyFields:[]}
}


const invoiceValidation = (invoiceDetailState)=>{
    /**
     * HERE WE VALIDATE ALL THE THINGS THAT HAVE TO BE VALIDATED BEFORE SAVE THE INVOICE IN FIREBASE
     */
    if(invoiceDetailState.paymentMethod.value === "2" && invoiceDetailState.customer.value ==="0"){
        return { result : false,  msj:"Para hacer una venta al crédito se tiene que facturar con el nombre del cliente", emptyFields:[]}
    }

    if(invoiceDetailState.sellTaxOff ==="SI" && (invoiceDetailState.buyTaxOffNumber==="" || invoiceDetailState.SAG ==="" || invoiceDetailState.proofRegistration ==="" ) ){
        return { result : false,  msj:"Para hacer una venta exonerada se debe de ingresar la información relacionada a la exoneración ", emptyFields:[]}
    }

    return { result : true,  msj:"", emptyFields:[]}
}

const invoiceValidator = {
    addToInvoiceValidator: addToInvoiceValidator ,
    invoiceValidation    : invoiceValidation
}




export default invoiceValidator;