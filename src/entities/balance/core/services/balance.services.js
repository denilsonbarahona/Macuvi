import balanceValidator from './balance.validator';

const getBalance = async(request, company, auth)=>{   
    return await request.balance.getBalance(company, auth)
}

const createBalance = async(request, params)=>{
    return await request.balance.createBalance(params);
}

const closeBalance = async(request, balanceId)=>{
    return await request.balance.closeBalance(balanceId);
}

const createExpense = async(request, params)=>{
    
    const validator = balanceValidator.IncomeExpenseValidator(params);
    if(validator.result){
        const balance = await request.balance.getBalance(params.company , params.auth);        
        return {result: await request.balance.createExpense(balance[0].id, params.description , params.value), msj:""};
    }
    return validator
}

const createIncome = async(request, params)=>{
    
    const validator = balanceValidator.IncomeExpenseValidator(params);
    if(validator.result){
        const balance = await request.balance.getBalance(params.company , params.auth);        
        return {result: await request.balance.createIncome({id   :balance[0].id, description:params.description , 
                                                            value:params.value , setInvoice :false , invoice:{} }), msj:""};
    }
    return validator
}

const checkServices = {
    getBalance     : getBalance    ,
    createBalance  : createBalance ,
    closeBalance   : closeBalance  ,
    createExpense  : createExpense ,
    createIncome   : createIncome
}


export default checkServices;