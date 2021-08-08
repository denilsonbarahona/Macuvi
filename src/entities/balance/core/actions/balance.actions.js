export const GET_BALANCE    = '[balance] get balance';
export const CHECK_BALANCE  = '[balance] check balance';
export const SHOW_BALANCE   = '[balance] show balance';
export const SHOW_INCOMES_EXPENSES = '[balance] show income / expense';
export const CREATE_BALANCE = '[balance] create balance';
export const CLOSE_BALANCE  = '[balance] close balance';
export const SHOW_ERROR_BALANCE = '[balance] show error balance';
export const CREATE_EXPENSE = '[balance] create expense';
export const SHOW_SUCCESS_MESSAGE = '[balance] show success message';
export const CREATE_INCOME = '[balance] create income';

export const getBalance = payload =>({
    type    : GET_BALANCE,
    payload : payload    
})

export const showBalance = payload =>({
    type    : SHOW_BALANCE,
    payload : payload
})

export const showIncomeExpense = payload =>({
    type    : SHOW_INCOMES_EXPENSES,
    payload : payload
})

export const createBalance = payload =>({
    type    : CREATE_BALANCE ,
    payload : payload
})

export const closeBalance = payload =>({
    type    : CLOSE_BALANCE ,
    payload : payload
})

export const showErrorBalance = payload =>({
    type    : SHOW_ERROR_BALANCE ,
    payload : payload    
})

export const createExpense = payload =>({
    type    : CREATE_EXPENSE ,
    payload : payload    
})

export const showSuccessMessage = () =>({
    type    : SHOW_SUCCESS_MESSAGE 
})

export const createIncome = payload =>({
    type    : CREATE_INCOME ,
    payload : payload        
})