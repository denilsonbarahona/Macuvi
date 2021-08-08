import invoiceValidations from './invoice.validations';
import NumberToWords from './invoice.total.toWords';

/****************** INNER FUNCTIONS ******************** */

/****** HERE WE CALCULATE THE INDIVIDUAL PRICE FOR EACH PRODUCT IN THE INVOICE******/
const calculateProductInvoicePrice = (Invoice) => {
    for(let i = 0; i < Invoice.length; i++){        
        Invoice[i].productTotal = 0
        for(let y=0; y <Invoice[i].variations.length;y++) {            
            Invoice[i].productTotal += ( Invoice[i].variations[y].variationBasePrice  * Invoice[i].variations[y].variationQuantity )
        }
        if(Invoice[i].promotionIsApplied === 1){
            Invoice[i].productTotal = Invoice[i].productTotal - Invoice[i].promoDiscount 
        }

        if(Invoice[i].discountIsApplied === 1){
            Invoice[i].discountTotal = Invoice[i].productTotal * ( Invoice[i].discountPercentageSelected /100)
            Invoice[i].productTotal  = Invoice[i].productTotal -  Invoice[i].discountTotal                        
        }

        Invoice[i].productUnChangedTotal = Invoice[i].productTotal
    }

    return Invoice
}

/******* HERE WE CALCULATE INDIVIDUAL THE BASE PRICE OF EACH PRODUCT IN THE INVOICE *****/
const calculatedBasePrice = (TaxInclude, Tax, Price) => {
    var basePrice = 0;
    if(TaxInclude){
        basePrice = (Number(Price) / ( (Number(Tax)/100)+1) )
    }else{
        basePrice = Number(Price)
    } 
    return basePrice;
}

/****** HERE WE PUSH THE ADDED VARIATION TO THE INVOICE*****/
const pushVariationToArray = (invoiceState) => {
    return { 
                variationId: invoiceState.variations.id , 
                variationCode: invoiceState.variations.code,
                variationCost: invoiceState.variations.cost,
                variationCondition: invoiceState.variations.ItemCondition,
                variationType: invoiceState.variations.type,
                variationName: invoiceState.variations.value + 
                    ((invoiceState.variations.colour_size === "")
                        ?""
                        :" - "+invoiceState.variations.colour_size)
                    +( (invoiceState.variations.ItemCondition.value !== "NEW")
                            ?" - ("+invoiceState.variations.ItemCondition.label+")"
                            :"" ),
                variationQuantity: Number(invoiceState.quantity),
                variationStock: invoiceState.variations.quantity ,
                variationPrice: Number(invoiceState.variations.price ) ,
                variationUnchangedPrice: Number(invoiceState.variations.price ) ,
                variationBasePrice: calculatedBasePrice(invoiceState.product.isTaxIncluded, invoiceState.product.tax.value, invoiceState.variations.price) 
            }
}

/***************************************/

/******* HERE WE CALCULATE THE PROMOTION PRICE OF THE PRODUCT IN THE INVOICE ******* */
const calculatePromotion = (invoice, changeState, PromoState) => {
   
    if(PromoState !== undefined){
        
        for(let i=0; i < invoice.length; i++){
            if(invoice[i].productId === changeState.product.id){
    
                var PurchaseCounter          = 0;
                var PurchasePromoCounter     = 0;
                var PromoCounter             = 0;
                var startPromoCounter        = false;
                var startPurcahseCounter     = true;
                var PromoDiscount            = 0;
                var PromoCounterDiff         = 0;
                invoice[i].promoDiscount     = 0;
                invoice[i].promoCounter      = 0;

                for(let y=1; y<= invoice[i].productoQuantity;y++)
                {                    
                    /**HERE WE CHECK IF THE AMOUNT OF ITEMS WE ARE SELLLING ARE EQUAL AT THE AMOUNT OF ITEMS THAT TRIGGER A PROMOTION **/  
                    if(PurchaseCounter === Number(PromoState.data.PromotionAmount) ){
                        startPurcahseCounter = false;
                        startPromoCounter    = true;
                        PurchaseCounter = -1;
                    }
    
                    /** IF THE PROMOTION WAS TRIGGER WE COUNT THE NUMBER OF ITEMS THAT ARE GOING TO BE SELLING AS A PROMOTION **/
                    if(startPromoCounter){
                        PromoCounter++;
                        PurchasePromoCounter++;
                    }
    
                    /** HERE WE COUNT THE AMOUNT OF ITEMS THAT ARE GOING TO BE SELLING AS A NORMAL PRINCE **/
                    if(startPurcahseCounter){
                        PurchaseCounter++
                    }
    
                    /** HERE WE CHECK IF THE HAVE ALREADY REACH THE AMOUNT OF ITEMS THAT ARE GOING TO BE SELLING AS A PROMOTION **/
                    if(PurchasePromoCounter === Number(PromoState.data.PromotionRewardFreeProducts || PromoState.data.PromotionRewardProductEnable ===0)){
                        startPurcahseCounter = true;
                        startPromoCounter    = false;
                        PurchasePromoCounter = 0;
                        PurchaseCounter      = 0;
                    }                
                }            
    
                PromoCounterDiff = PromoCounter - invoice[i].promoCounter
                var basePrice
                if(PromoState.data.PromotionRewardProductEnable ===0){
                    basePrice =  calculatedBasePrice(changeState.product.isTaxIncluded, changeState.product.tax.value, changeState.variations.price);
                    PromoDiscount =  ( basePrice * ( Number(PromoState.data.PromotionRewardPricePercentageOff) / 100) )                    
                }else {
                    basePrice =  calculatedBasePrice(changeState.product.isTaxIncluded, changeState.product.tax.value, changeState.variations.price);                    
                    PromoDiscount =  basePrice                    
                }
                
                /******** WE SET THE PROMO COUNTER  ***************/
                invoice[i].promoCounter  = PromoCounter;
                /******** HERE WE SUMS THE PROMO DISCOUNT PRICE  ****/                
                invoice[i].promoDiscount += ( PromoDiscount * PromoCounterDiff );                
            }
        }

    }    
    invoice = calculateProductInvoicePrice(invoice)
    return invoice   
}

/******** HERE WE VALIDATE THE INVOICE INFORMATION BEFORE ADDING THE PRODUCT TO THE INVOICE STATE**********/
const addToInvoiceServiceValidation = (invoiceState, product, addToInvoiceType, productType) => {
    const invoiceValidation = invoiceValidations.addToInvoiceValidator(invoiceState, product, addToInvoiceType, productType );    
    return invoiceValidation;
}


const getVariationToAddInInvoice = (invoiceState) => {
 
    var ToAddInInvoice = { product: invoiceState.product , variations: {}, quantity: invoiceState.state.quantityInInvoice };
    const variation = invoiceState.product.variations.find(variation => variation.id === invoiceState.state.variationId);
    ToAddInInvoice.variations = {...variation.data, id: variation.id};

    return ToAddInInvoice;
}

/****** HERE WE ADD THE SELECTED PRODUCTS TO THE CURRENT INVOICE STATE******* */
const addToInvoice = (productState, _invoice, product_discount, product_promotion) => {
    /** IF VARIATION EXIST REPLACE QUANTITY IF VARIATION NOT EXIST BUT PRODUCT EXIST WE MAKE A PUSH FOR VARIATION **/
    /** formato: [{ productId:""  , productName:"" , productoQuantity:"",productTax:"", 
     *              taxIncluded:"", productTotal:"", hasVariations:"", 
     *              productPromotion: [] , discount : [] , promoDiscount : "" , 
     *              promoCounter  : "", purchasedWithPromo:"", promoCounterEnable:"",purchasedWithPromoCouter:"" ,promoIsApply:"" ,
     *              productImg    : "", productCost : "" , productCategory: "" ,multiplePrice:"",
     *              variations:[{ variationId:"" , variationName:"", variationQuantity:"" , variationPrice:"", variationBasePrice:"" , variationStock:""}] }] */
    var invoice = _invoice; 
    
    const productInInvoice = invoice.find(product=> product.productId === productState.product.id)
    if (productInInvoice !== undefined) {
      const variationInInvoice = productInInvoice.variations
          .find(variation => variation.variationId === productState.variations.id);

      if (variationInInvoice !== undefined) {
        variationInInvoice.variationQuantity = Number(productState.quantity);
      } else {
        productInInvoice.variations.push( pushVariationToArray(productState) );
      }

      var productQuantity = 0;
      productInInvoice.variations.forEach(variation=>{
          productQuantity+= Number(variation.variationQuantity);
      })

      productInInvoice.productoQuantity = productQuantity;
    } else {
        invoice.push ({
            productId: productState.product.id, 
            productName: productState.product.name, 
            productoQuantity: Number(productState.quantity),
            taxIncluded: productState.product.isTaxIncluded,
            productTax: productState.product.tax, 
            hasVariations: Number(productState.product.hasVariations),
            productDiscount: product_discount,    
            productPromotion: product_promotion,
            productImg: productState.product.img,
            productMultiplePrice: productState.product.multiplePrice , 
            productType: productState.product.type,
            productCategory: productState.product.category,
            discountSelected: "0",
            discountPercentageSelected: 0,
            promotionIsApplied: 0,
            discountIsApplied: 0,
            promoDiscount: 0,
            discountTotal: 0,
            promoCounter: 0,  
            productTotal: 0, 
            productUnChangedTotal: 0,
            variations:[ pushVariationToArray(productState) ] 
        })
    }

    return invoice   
}

/***** HERE WE GET THE TOTALS, TAXES AND SUBTOTALS IN THE INVOICE ****/
const getInvoiceTotal = (invoice_products, global_discount, global_discount_ref, exonerate) => {
    /** THIS FUNCTIONS CALCULATE THE TAX, DISCOUNT , SUB TOTAL AND TOTAL FOR THE INVOICE THAT IS GOING TO BE PRINTED **/
    /** format: [{ productId:"", productName:"", productoQuantity:"",productTax:"", taxIncluded:"" productTotal:"", variations:[{ variationId:"" , variationName:"", variationQuantity:"" , variationPrice:"" }] }] */

    /*INVOICE SUB TOTAL IS GOING TO GET CALCULATED BY THE SUM OF ALL PRODUCT TOTAL*/
    /*INVOICE TAX IS GOING TO BE CALCULATED WITH THE KEY OF THE TAX*/
    /*INVOICE TOTAL IS GOING TO BE SUB TOTAL + TAX TOTAL*/
    var sub_total = 0;
    var taxes = {};
    var taxTotal = 0;    
    for(let i=0; i < invoice_products.length; i++){        
        var taxValue                = (exonerate)?0:invoice_products[i].productTax.value
        var itemCalculated          = Number(invoice_products[i].productTotal) * ( (taxValue)/100 )
        var itemCalculatedDiscount  = itemCalculated * (Number(global_discount) / 100)
        var itemTaxed               = Number(invoice_products[i].productTotal)
        var itemTaxedDiscount       = itemTaxed * (Number(global_discount) / 100)
        
        sub_total+=Number(invoice_products[i].productTotal);
        taxTotal += (itemCalculated - itemCalculatedDiscount)
        taxes[taxValue] = { 
                            calculate: ( (taxes[taxValue])===undefined )
                                            ?(itemCalculated - itemCalculatedDiscount )
                                            :Number(taxes[taxValue].calculate)+(itemCalculated - itemCalculatedDiscount), 
                            taxed    : ( (taxes[taxValue])===undefined )
                                            ?(itemTaxed - itemTaxedDiscount)
                                            :Number(taxes[taxValue].taxed)+(itemTaxed - itemTaxedDiscount)
                        }
    }
    var discount = sub_total * (Number(global_discount) / 100)

    return {sub_total: sub_total, 
        tax: taxes, 
        total: (sub_total+ taxTotal) - discount, 
        discount: discount, 
        discountref: global_discount_ref }
}

/****** HERE WE SET NEW INFORMATION FOR THE VARIATIONS IN THE INVOICES *******/
const changeVariationInInvoice = (changeState, _invoice) => {
    for(let i=0; i<_invoice.length; i++){
        var productQuantity = 0;
        for(let y=0; y<_invoice[i].variations.length;y++){
            if(_invoice[i].variations[y].variationId === changeState.variation){
                _invoice[i].variations[y].variationQuantity  = Number(changeState.quantityVariation)
                _invoice[i].variations[y].variationBasePrice = Number(changeState.variationPrice)
                _invoice[i].variations[y].variationPrice     = Number(changeState.variationPrice) * ( (Number(_invoice[i].productTax.value)/100)+1 ) 
            }
            productQuantity+=Number(_invoice[i].variations[y].variationQuantity)
        }
        _invoice[i].productoQuantity = productQuantity;
    }
    _invoice = calculateProductInvoicePrice(_invoice)
    return _invoice
}

const getVariationFromInvoceState = (variation , invoiceState) => {
    
    var variationResponse 
    for(let y = 0; y < invoiceState.variations.length; y++ )
    {
        if(invoiceState.variations[y].variationId === variation){
            variationResponse = { product   : { id           : invoiceState.productId    , 
                                                isTaxIncluded: invoiceState.taxIncluded  , 
                                                tax          : invoiceState.productTax    },                                                
                                  variations: {price: invoiceState.variations[y].variationPrice } }
        }
    }
    return variationResponse; 
}

/******* HERE WE APPLY THE PROMOTIONS CALCULATED FOR EACH PRODUCTS *****/
const applyPromotion = (productState, invoiceState) => {
    
    for(let i=0; i < invoiceState.length; i++){
        if(invoiceState[i].productId === productState.productId){
            if(invoiceState[i].promotionIsApplied === 1){
                invoiceState[i].promotionIsApplied=0
                invoiceState[i].productTotal = invoiceState[i].productTotal + invoiceState[i].promoDiscount 
            }else{
                invoiceState[i].promotionIsApplied=1
                invoiceState[i].productTotal = invoiceState[i].productTotal - invoiceState[i].promoDiscount 
            }            
        }
    }

    return invoiceState;
}

/********** HERE WE APPLY THE DISCOUNTS CALCULATED FOR EACH PRODUCTS *********/
const applyProductDiscount = (productState, invoiceState, discountId) => {
    /*** HERE WE GET THE FOLLOWS PARAMETERS THE CURRENT PRODUCT STATE, THE CURRENT INVOICE STATE , THE DISCOUNT ID  */
    for(let i=0; i < invoiceState.length; i++){
        /** HERE WE CHECK IF THE PRODUCT ID WE ARE CHANGING IS IN THE CURRENT INVOICE STATE ***/
        if(productState.productId === invoiceState[i].productId){

            for(let y=0; y < invoiceState[i].productDiscount.length; y++){
                /*** IF THE SELECTED DISCOUNT ID IS WITHIN THE DISCOUNTS AVAILABLE FOR THE PRODUCT WE SET THE DISCOUNT CONFIG */
                if(discountId !== "0" && discountId === invoiceState[i].productDiscount[y].id ){
                   invoiceState[i].productTotal = invoiceState[i].productUnChangedTotal
                   var  percentage = Number( invoiceState[i].productDiscount[y].data.DiscountPercentage )
                        invoiceState[i].discountPercentageSelected = percentage;
                        invoiceState[i].discountSelected  = discountId
                        invoiceState[i].discountTotal     = invoiceState[i].productTotal * ( percentage /100)
                        invoiceState[i].productTotal      = invoiceState[i].productTotal -  invoiceState[i].discountTotal
                        invoiceState[i].discountIsApplied = 1;
                }else if(discountId ==="0"){
                        invoiceState[i].discountPercentageSelected = 0;
                        invoiceState[i].discountSelected  = "0"
                        invoiceState[i].productTotal      = invoiceState[i].productTotal +  invoiceState[i].discountTotal
                        invoiceState[i].productUnChangedTotal = invoiceState[i].productTotal
                        invoiceState[i].discountTotal     =  0
                        invoiceState[i].discountIsApplied =  0
                }
            }
        }
    }

    return invoiceState
}

/***********  HERE WE CREATE THE JSON THAT WILL BE SAVED IN THE DATABASE **********/
const createJsonInvoice = async (invoiceState, products, cookie , cash , request) => {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear()+"-"+(current_datetime.getMonth() + 1)+"-"+current_datetime.getDate()

    var jsonData = 
    {
        billingCompanyAddress:  cookie.company.CompanyAddress,
        billingCompanyRTN:  cookie.company.CompanyRTN,
        billingCompanyName:  cookie.company.CompanyName,
        billingCompanyEmail:  cookie.company.CompanyEmail,
        billingCompanyPhone:  cookie.company.CompanyPhone,
        billingCompanyCAI:  cookie.company.CompanyCAI,
        billingIsExonerated:  (invoiceState.ticketDetail.sellTaxOff ==="SI")?1:0,
        billingExoneratedOrderNumber:  invoiceState.ticketDetail.buyTaxOffNumber,
        billingExoneratedSAGNumber:  invoiceState.ticketDetail.SAG,
        billingCertificateNumber:  invoiceState.ticketDetail.proofRegistration,   
        billingCorrelative:  0, 
        billingCompanyInvoiceRange:  { "init": cookie.company.CompanyInitDocs, end: cookie.company.CompanyEndingDocs},
        billingLimitDate:  cookie.company.CompanyEndingDate,
        billingCreatedBy:  cookie.login.name,
        billingDate:  formatted_date,
        billingState:  1/** active invoice*/,
        billingCustomer:  invoiceState.ticketDetail.customer,
        billingPayingMethod:  invoiceState.ticketDetail.paymentMethod,
        billinSaleType:  ( (cookie.company.CompanyDeliverySale === 1)  
                                            ?invoiceState.ticketDetail.saleType
                                            : 0 ),
        billingGlobalDiscount:  invoiceState.ticketTotal.discount,
        billingGlobalDiscountRef:  invoiceState.ticketTotal.discountref,
        billingFreeTaxAmount:  ((invoiceState.ticketTotal.tax[0] === undefined)
                                            ?0
                                            :invoiceState.ticketTotal.tax[0].taxed ),
        billingTax:  invoiceState.ticketTotal.tax,
        billingSubTotal:  invoiceState.ticketTotal.sub_total,
        billingTotal:  invoiceState.ticketTotal.total,
        billingTotalInWords:  NumberToWords(invoiceState.ticketTotal.total),
        billingUserId:  cookie.login.id,
        billingCompanyId:  cookie.login.companyId,
        billingProducts:  products,
        billingTime:  new Date().getTime(),
        billingCustomerMoneyChange:  cash
    }
    
    const result = await request.invoice.recordInvoice({jsonInvoice: jsonData, products: products})
    return result
}

/*************** HERE WE CREATE THE JSON THAT WILL STORAGE THE PRODUCT INFORMATION FOR EACH INVOICE 
 *                  THAT WILL BE SAVED IN THE DATABASE
 *  *****************/
const createJsonProductInvoice = (products) => {
    var jsonProduct = []

    products.forEach(product => {
        var product_discount = []

        const discount = product.productDiscount.find(pdiscount => pdiscount.id === product.discountSelected);
        if (discount !== undefined) {
            product_discount = {  discount:  (discount.data.DiscountPercentage===undefined)?"0":discount.data.DiscountPercentage,  
                    label:  (discount.data.DiscountName === undefined)?"":discount.data.DiscountName, 
                    type:  ( (discount.data.DiscountInProducts === 1)?"product" :"category" ), 
                    value:  discount.id 
                }
        }
        

        var variations_ = []
        for(let y=0; y<product.variations.length; y++){
            const tax = (Number(product.productTax.value)/100)+1
            variations_.push({
                name         : product.variations[y].variationName,
                id           : product.variations[y].variationId,
                invoice_price: product.variations[y].variationBasePrice, 
                price        : product.variations[y].variationPrice,
                variation_current_stock: product.variations[y].variationStock,
                variation_quantity_invoice: product.variations[y].variationQuantity,
                code         : product.variations[y].variationCode,
                condition    : product.variations[y].variationCondition,
                cost         : (product.variations[y].variationCost)/tax
            })
        }

        jsonProduct.push({
            id                      : product.productId                                                 , 
            productHasVariations    : product.hasVariations                                             ,
            productHasMultiplePrices: product.productMultiplePrice                                      ,
            productImg              : product.productImg                                                , 
            productName             : product.productName                                               , 
            productType             : product.productType                                               ,
            productQuantity         : product.productoQuantity                                          , 
            productCategory         : product.productCategory                                           ,
            DiscountSelectedItems   : product_discount                                                  ,                           
            productPromo            :(product.productPromotion.length>0)? 
                                        [{  id            : product.productPromotion[0].id              ,      
                                            name          : product.productPromotion[0].data.PromotionName                      , 
                                            triggerPromo  : product.productPromotion[0].data.PromotionAmount                    ,
                                            amountReward  : product.productPromotion[0].data.PromotionRewardFreeProducts        , 
                                            discountReward: product.productPromotion[0].data.PromotionRewardPricePercentageOff  ,
                                            productReward : product.productPromotion[0].data.PromotionRewardProductEnable       ,                                                             
                                            promoQuantity : product.promoCounter                        
                                        }]: []                                                           ,
            productTaxPercentage     : product.productTax.value                                          , 
            ProductSubTotal          : product.productTotal                                              ,
            ProductTotal             : product.productTotal                                              ,
            ProductDiscount          : product.discountTotal                                             ,
            ProductPromoDiscount     : product.promoDiscount                                             ,
            ProductPromoCounter      : product.promoCounter                                              ,
            ProductPurchasedWithPromo: (product.promotionIsApplied === 1)?product.promoCounter: 0        ,
            ProductDiscountIsapplied : product.discountIsApplied                                         ,
            ProductPromoIsapplied    : product.promotionIsApplied                                        ,                            
            ProductVariations        : variations_
        })
    });
    
    return jsonProduct;
}

/********* HERE WE VALIDATE THE INVOICE BEFORE SAVE */
const validateInvoice = (invoiceDetail)=>{
    const result = invoiceValidations.invoiceValidation(invoiceDetail)
    return result;
}

/**** HERE WE GET THE INVOICE INFORMATION THAT WILL BE PRINTED *****/
const getInvoiceToPrint = async (invoiceId, request) => {
   return await request.invoice.getInvoiceToPrint(invoiceId)
}

const getInvoicesList = async (request, params) =>{
    return await request.invoice.getInvoicesList(params);
}

const cancelInvoice = async (request, invoiceId)=>{
    const cancel_response = await request.invoice.cancelInvoice(invoiceId)
    return cancel_response
}

const setIdentitiesInSell = async (request, payload)=>{

    const response = await request.products.setIdentitiesAsSold(payload)

    return response
}

const setNewPriceWithFees = ( payload)=>{
    
    payload.invoice.forEach(item=>{
        item.variations.forEach((variation)=>{
            variation.variationPrice = variation.variationUnchangedPrice * ((Number(payload.payment.fee)/100)+1)
            variation.variationBasePrice = calculatedBasePrice(item.taxIncluded, 
                item.productTax.value,
                variation.variationPrice);
        });
        item.promoDiscount = item.promoDiscount * ((Number(payload.payment.fee)/100)+1)
        item.discountTotal = item.discountTotal * ((Number(payload.payment.fee)/100)+1) 
    })

    const invoice = calculateProductInvoicePrice(payload.invoice)

    return invoice
}

const invoiceModel = {
    addToInvoiceServiceValidation: addToInvoiceServiceValidation,
    getVariationToAddInInvoice: getVariationToAddInInvoice,
    addToInvoice: addToInvoice ,
    getInvoiceTotal: getInvoiceTotal,
    changeVariationInInvoice: changeVariationInInvoice,
    calculatePromotion: calculatePromotion,
    getVariationFromInvoceState: getVariationFromInvoceState,
    applyPromotion: applyPromotion,
    applyProductDiscount: applyProductDiscount,
    createJsonInvoice: createJsonInvoice,
    createJsonProductInvoice: createJsonProductInvoice,
    validateInvoice: validateInvoice,
    getInvoiceToPrint: getInvoiceToPrint,
    getInvoicesList: getInvoicesList,
    cancelInvoice: cancelInvoice,
    setIdentitiesInSell: setIdentitiesInSell,
    setNewPriceWithFees: setNewPriceWithFees
}


export default invoiceModel;
