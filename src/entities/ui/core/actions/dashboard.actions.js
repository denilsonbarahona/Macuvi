export const LOADING_WEEKLY_PRODUCTS  = '[ui] loading weekly products sales';
export const DAILY_SALES              = '[ui] loading daily sales';
export const PRODUCTS_DAILY_SALES     = '[ui] loading products daily sales';
export const DAILY_INCOME_SALES       = '[ui] daily incomes sales';
export const CURRENT_BALANCE          = '[ui] current balance';
export const GET_QUARTER_INCOMES      = '[ui] get quarter incomes';
export const GET_TOP_PRODUCTS_SALES   = '[ui] get top products sales';
export const GET_TOP_CATEGORIES_SALES = '[ui] get top categories sales';
export const GET_TOP_TRANSACTIONS     = '[ui] get top transactions';
export const GET_RECENT_ACTIVITIES    = '[ui] get recent activities';

export const loadingWeeklyProducts = (loading)=>({
    type    : LOADING_WEEKLY_PRODUCTS ,
    payload : loading
})

export const dailySales = (loading)=>({
    type    : DAILY_SALES  ,
    payload : loading
})

export const productsDailySales=(loading)=>({
    type    : PRODUCTS_DAILY_SALES ,
    payload : loading
})

export const dailyIncomeSales = (loading)=>({
    type    : DAILY_INCOME_SALES ,
    payload : loading
})

export const currentBalance = (loading)=>({
    type    : CURRENT_BALANCE ,
    payload : loading
})

export const getQuarterIncomes = (loading)=>({
    type    : GET_QUARTER_INCOMES ,
    payload : loading
})

export const getTopProductsSales =(loading)=>({
    type    : GET_TOP_PRODUCTS_SALES ,
    payload : loading
})

export const getCategoriesSales = (loading)=>({
    type    : GET_TOP_CATEGORIES_SALES ,
    payload : loading
})

export const getTopTransaction = (loading)=>({
    type    : GET_TOP_TRANSACTIONS ,
    payload : loading
})

export const getRecentActivities = (loading)=>({
    type    : GET_RECENT_ACTIVITIES,
    payload : loading
})