/******** THIS CONST HAS THE APP MENU PERMISSIÓN ***********/  

export const permission = {

    /********* in-out ****/
    newSales             : true , 
    newExpense           : true ,
    newIncome            : true ,      
    cashclosing          : true ,
    invoices             : true ,
    /*********products ***/
    newProduct           : true , 
    listProduct          : true , 
    newCategory          : true , 
    categories           : true ,
    identitiesList       : true ,
    /*********customer ***/
    newCustomer          : true ,    
    listCustomers        : true ,    
    accountReceivable    : true ,
    /*********promo discounts ***/ 
   // newPromoDiscount     : true ,   
   // viewPromoDiscount    : true , 
    newDiscount          : true ,
    newPromotion         : true ,
    discountList         : true ,
    promotionList        : true ,
    /*********report ***/    
    DailySalesDetails    : true ,
    //graphSales           : true , 
    //graphCategories      : true ,
    graphIncomes         : true ,
    graphProduct         : true , 
    transactions         : true ,
    activities           : true ,
    /*********config */    
    newLogin             : true ,    
    listAuths            : true ,
    newPOS               : true ,    
    POS                  : true ,
    newTax               : true ,
    getTax               : true ,
    updatenotification   : true ,
    bussinesConfig       : true 
    //barCode              : true , 
    //identityProduct      : true ,
    //searchProductIdentity: true 
}

export const getEmptyPermission = ()=>{
    Object.keys(permission).forEach(key=>{
        permission[key] = false
    })

    return permission
}
 