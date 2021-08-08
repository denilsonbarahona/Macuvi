import firebase from '../../../../Service/firebase/firebase.service';

const recordInvoice = async payload =>{
    
    const invoice = firebase.firestore().collection("Billing").doc();
    const cDocRef = firebase.firestore().collection("Companies").doc(payload.jsonInvoice.billingCompanyId)

    const success = await firebase.firestore().runTransaction(transaction=>{
        return transaction.get(cDocRef).then(res=>{
            const correlative = (res.data().CompanyCorrelative || 0 ) + 1;
            payload.jsonInvoice.billingCorrelative = correlative;
            
            payload.products.forEach(product=>{
                if (product.productType.toUpperCase().trim() !== "SERVICIO") {
                    var stockTotal = 0;
                    const productRef = firebase.firestore().collection("Products").doc(product.id)
                    product.ProductVariations.forEach(item=>{
                        stockTotal += Number(item.variation_quantity_invoice)
                        const variation_doc = firebase.firestore().collection("Products").doc(product.id)
                            .collection("productVariations").doc(item.id);
                        const decrement = firebase.firestore.FieldValue.increment(-1 * item.variation_quantity_invoice);
                        transaction.update(variation_doc, { quantity: decrement } )
                    })
                    const decrementProduct = firebase.firestore.FieldValue.increment(-1* stockTotal)
                    transaction.update(productRef,{productQuantity: decrementProduct});
                }
                
            })

            transaction.update(cDocRef, {CompanyCorrelative: correlative} ); 
            transaction.set(invoice, payload.jsonInvoice)
        })     
    })
    .then(()=>{ return { result: true , id: invoice.id }  })
    .catch(()=>{ return { result: false , msj:"Error en el servidor al realizar la facturación de la venta" }})

    return success;
}

const getInvoiceToPrint = async (invoiceId) =>{
    const doc = await firebase.firestore().collection("Billing").doc(invoiceId)
                                    .get().then(res=>{ return res.data() })
    /** json del product */
    let products = []
    for(let i=0; i < doc.billingProducts.length; i++){

        let variations_ = []
        for(let y=0; y < doc.billingProducts[i].ProductVariations.length; y++){
            variations_.push({
                name     : doc.billingProducts[i].ProductVariations[y].name  ,
                price    : doc.billingProducts[i].ProductVariations[y].invoice_price ,
                quantity : doc.billingProducts[i].ProductVariations[y].variation_quantity_invoice 
            })
        }

        products.push({
            name             : doc.billingProducts[i].productName ,
            discount         : doc.billingProducts[i].ProductDiscount,
            promoDicount     : doc.billingProducts[i].ProductPromoDiscount,
            isDiscountApplied: doc.billingProducts[i].ProductDiscountIsapplied,
            isPromoApplied   : doc.billingProducts[i].ProductPromoIsapplied,
            subTotal         : doc.billingProducts[i].ProductSubTotal,
            total            : doc.billingProducts[i].ProductTotal ,
            hasVariations    : doc.billingProducts[i].productHasVariations,
            pQuantity        : doc.billingProducts[i].productQuantity,
            variations       : variations_ 
        })
    }

    const invoice = {        
        InvoicesalesType: doc.billinSaleType,
        exoneratedCertificatedNumber: doc.billingCertificateNumber,
        exoneratedPurchaseNumber: doc.billingExoneratedOrderNumber,
        exoneratedSAGNumber: doc.billingExoneratedSAGNumber,
        companyAddress: doc.billingCompanyAddress,
        companyCAI: doc.billingCompanyCAI,
        companyValidRange: doc.billingCompanyInvoiceRange,
        companyName: doc.billingCompanyName,
        companyPhone: doc.billingCompanyPhone,
        companyEmail: doc.billingCompanyEmail,
        companyRTN: doc.billingCompanyRTN,
        companyLimitDateInvoice: doc.billingLimitDate,
        invoiceNumber: doc.billingCompanyInvoiceRange.init.split("-")[0]+"-"+ 
                       doc.billingCompanyInvoiceRange.init.split("-")[1]+"-"+ 
                       doc.billingCompanyInvoiceRange.init.split("-")[2]+"-"+ 
                       "00000000".substring(0,"00000000".length - doc.billingCorrelative.toString().length)+doc.billingCorrelative.toString(),
        invoiceCreatedBy: doc.billingCreatedBy,
        invoiceCustomer: doc.billingCustomer,
        invoiceChange: doc.billingCustomerMoneyChange,
        invoiceDate: doc.billingDate.replaceAll("-","/"),
        invoiceFreeTax: doc.billingFreeTaxAmount,
        invoiceDiscount: doc.billingGlobalDiscount ,
        invoiceIsExonerated: doc.billingIsExonerated,
        invoicePaymentMethod: doc.billingPayingMethod.label,
        invoiceState: doc.billingState,
        invoiceSubTotal: doc.billingSubTotal,
        invoiceTax: doc.billingTax,
        invoiceTotal: doc.billingTotal,
        invoiceTotalToWord: doc.billingTotalInWords,
        invoiceProducts: products
    }       
    return invoice
}

const getInvoicesList = async (params) =>{
    var table_invoices   = []    
    var size_result      = 0;
    var invoices 
    const chunk_invoices = []

    if(params.customer ===""){
       invoices = await firebase.firestore().collection("Billing")
                                    .where("billingCompanyId","==",params.company)
                                    .where("billingTime",">=",new Date(params.from).getTime())
                                    .where("billingTime","<=",new Date(params.until).getTime())
                                    .orderBy("billingTime","desc")
                                    .orderBy("billingCorrelative","desc")
                                    .get()
    }else{
        invoices = await firebase.firestore().collection("Billing")
                                    .where("billingCompanyId","==",params.company)
                                    .where("billingTime",">=",new Date(params.from).getTime())
                                    .where("billingTime","<=",new Date(params.until).getTime())                                             
                                    .where("billingCustomer.value","==",  params.customer.value)
                                    .orderBy("billingTime","desc")
                                    .orderBy("billingCorrelative","desc")
                                    .get()
    }
     
    table_invoices.push(
        invoices.docs.map(dataSnapShot=>{
            const _invoice = { id               : dataSnapShot.id , 
                               invoice_number   : dataSnapShot.data().billingCompanyInvoiceRange.init.split("-")[0]+"-"+
                                                  dataSnapShot.data().billingCompanyInvoiceRange.init.split("-")[1]+"-"+
                                                  dataSnapShot.data().billingCompanyInvoiceRange.init.split("-")[2]+"-"+
                                                  "00000000".substring(0,"00000000".length - dataSnapShot.data().billingCorrelative.toString().length)+dataSnapShot.data().billingCorrelative.toString() ,
                                invioce_date    : new Date(dataSnapShot.data().billingDate.replaceAll("-","/")).toLocaleDateString(),
                                invoice_customer: dataSnapShot.data().billingCustomer ,
                                invoice_total   : dataSnapShot.data().billingTotal    ,
                                invoice_state   : ([undefined,"",1].includes(dataSnapShot.data().billingState)?"Facturado": "Anulado" ),
                                invoice_products: dataSnapShot.data().billingProducts
                            }
            return _invoice;
        })
    )
    
    size_result = table_invoices[0].length;

    while(table_invoices[0].length > 0){
        chunk_invoices.push( table_invoices[0].splice(0, params.length) )
    }
    
    return {invoices: chunk_invoices, size: size_result};
}

const cancelInvoice = async(invoiceid)=>{
    
    const batch = firebase.firestore().batch();
    const invoiceRef = firebase.firestore().collection("Billing").doc(invoiceid)
    const data = await invoiceRef.get().then(res=>{ return res.data() })
    batch.update(invoiceRef, {billingState: 0} )

    data.billingProducts.forEach((item)=>{
        if (item.productType.toUpperCase().trim() !== "SERVICIO") {
            var stockTotal = 0;
            const productRef = firebase.firestore().collection("Products").doc(item.id)
    
            item.ProductVariations.forEach((variation)=>{
                stockTotal += Number(variation.variation_quantity_invoice)
                const variation_doc = firebase.firestore().collection("Products").doc(item.id)
                            .collection("productVariations").doc(variation.id);
    
                const increment = firebase.firestore.FieldValue.increment(variation.variation_quantity_invoice);
                batch.update(variation_doc, { quantity: increment } )
            })
    
            const IncremetProduct = firebase.firestore.FieldValue.increment( Number(stockTotal) )
            batch.update(productRef, {productQuantity: IncremetProduct} )
        }        
    })
    
    const response = await batch.commit()
        .then(()=>{ return true })
        .catch(()=>{ return false })

    return response;  
}


const invoice_services = { 
    recordInvoice     : recordInvoice      , 
    getInvoiceToPrint : getInvoiceToPrint  ,
    getInvoicesList   : getInvoicesList    ,
    cancelInvoice     : cancelInvoice
}


export default invoice_services;