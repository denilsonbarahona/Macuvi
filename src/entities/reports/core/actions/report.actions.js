export const GET_GRID_DAILY_REPORT     = '[report] get daily grid report';
export const SHOW_REPORT_RESULT        = '[report] show report result';
export const GET_INCOMES_CHART_REPORT  = '[report] get incomes chart report';
export const GET_PRODUCTS_SALES_REPORT = '[report] get products sales report';
export const SOLD_PRODUCT_DASHBOARD    = '[report] getting sold product dashboard';
export const DAILY_SALES               = '[report] getting daily sales dashboard';
export const PRODUCTS_DAILY_SALES      = '[report] products daily sales dashboard';
export const DAILY_INCOME_SALES        = '[report] daily income sale dashboard';
export const GET_CURRENT_BALANCE       = '[report] get current balance dashboard';
export const GET_QUATER_INCOME         = '[report] get quater income';
export const GET_TOP_PRODUCTS_SALES    = '[report] get top products sales';
export const GET_TOP_CATEGORIES_SALES  = '[report] get top categories sales';
export const GET_TOP_TRANSACTIONS      = '[report] get top transactions';
export const GET_RECENT_ACTIVITIES     = '[report] get recent activities';
export const GET_TRANSACTIONS_BY_DATE  = '[report] get transacions by date';
export const GET_ACTIVITIES_BY_DATE    = '[report] get activities by date';

export const getDailyReportGrid =(payload)=>({
    type    : GET_GRID_DAILY_REPORT ,
    payload : payload
})

export const showReportResult = ()=>({
    type    : SHOW_REPORT_RESULT  
})

export const getIncomesReport   = (payload)=>({
    type    : GET_INCOMES_CHART_REPORT ,
    payload : payload
})

export const getProductsSalesReport = (payload)=>({
    type    : GET_PRODUCTS_SALES_REPORT , 
    payload : payload
})

export const gettingSoldProductDashboard = (payload)=>({
    type   : SOLD_PRODUCT_DASHBOARD ,
    payload: payload
})

export const gettingDailySales = (payload)=>({
    type    : DAILY_SALES ,
    payload : payload
})

export const gettingDailyProductsSales = (payload)=>({
    type    : PRODUCTS_DAILY_SALES ,
    payload : payload
})

export const dailyIncomeSale  = (payload) =>({
    type    : DAILY_INCOME_SALES ,
    payload : payload
})

export const getCurrentBalance = (payload)=>({
    type    : GET_CURRENT_BALANCE ,
    payload : payload
})

export const getQuaterIncome = (payload) =>({
    type    : GET_QUATER_INCOME ,
    payload : payload
})

export const getTopProductsSales = (payload)=>({
    type    : GET_TOP_PRODUCTS_SALES ,
    payload : payload
})

export const getTopCategoriesSales = (payload)=>({
    type    : GET_TOP_CATEGORIES_SALES ,
    payload : payload
})

export const getTopTransaction = (payload)=>({
    type    : GET_TOP_TRANSACTIONS ,
    payload : payload
})

export const getRecentActivities = (payload)=>({
    type    : GET_RECENT_ACTIVITIES ,
    payload : payload
})

export const getTransactionsByDate = (payload)=>({
    type: GET_TRANSACTIONS_BY_DATE ,
    payload: payload
})

export const getActivitiesByDate = (payload)=>({
    type: GET_ACTIVITIES_BY_DATE ,
    payload: payload
})