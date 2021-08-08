import * as reportActions    from '../actions/report.actions';
import * as uiActions        from '../../../ui/core/actions/ui.actions';
import * as dashboardActions from '../../../ui/core/actions/dashboard.actions';
import reportServices        from '../services/report.services';
 
const getGridDailyReport = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_GRID_DAILY_REPORT){
        dispatch(uiActions.setLoadingButton(true))
        const reportGridDaily = await reportServices.getGridDailyReport(request, action.payload)
        action.payload.updateReportState(reportGridDaily)
        dispatch(reportActions.showReportResult())
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getIncomesChart   = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_INCOMES_CHART_REPORT){
        dispatch(uiActions.setLoadingButton(true))
        const reportResult = await reportServices.getIncomesChartReport(request, action.payload)        
        action.payload.updateReportState(reportResult)
        dispatch(reportActions.showReportResult())
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getProductSalesChart = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_PRODUCTS_SALES_REPORT){
        dispatch(uiActions.setLoading(true))
        const reportResult = await reportServices.getProductsSaleChartReport(request, action.payload)
        action.payload.UpdateshowReport(reportResult)
        dispatch(uiActions.setLoading(false))
    }
}

const getSoldProductDashboard = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.SOLD_PRODUCT_DASHBOARD){
        dispatch(dashboardActions.loadingWeeklyProducts(true))
        const weekReport = await reportServices.getWeekReport(request, action.payload)
        action.payload.ChangeReportState(weekReport)
        dispatch(dashboardActions.loadingWeeklyProducts(false))
    }
}

const getDailySalesDashBoard = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.DAILY_SALES){
        dispatch(dashboardActions.dailySales(true))
        const dailyReport = await reportServices.getDailySalesReport(request, action.payload)
        action.payload.updateSetReportState(dailyReport)
        dispatch(dashboardActions.dailySales(false))
    }
    
}

const getDailyProductSalesDashboard =(request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === reportActions.PRODUCTS_DAILY_SALES){
        dispatch(dashboardActions.productsDailySales(true))
        const productsDailyReport = await reportServices.getDailyProductsSale(request, action.payload)        
        action.payload.updateSetReportState(productsDailyReport)
        dispatch(dashboardActions.productsDailySales(false))
    }
}

const getDailyIncomeSales = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.DAILY_INCOME_SALES){
        dispatch(dashboardActions.dailyIncomeSales(true))
        const incomeResponse = await reportServices.getDailyIncomeSales(request, action.payload)
        action.payload.updateSetReportState(incomeResponse)
        dispatch(dashboardActions.dailyIncomeSales(false))
    }
}

const getCurrentBalance = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_CURRENT_BALANCE){
        dispatch(dashboardActions.currentBalance(true))
        const currentBalance = await reportServices.getCurrentBalance(request, action.payload)
        action.payload.updateSetReportState(currentBalance)    
        dispatch(dashboardActions.currentBalance(false))
    }
}

const getQuarterIncomes  = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_QUATER_INCOME){
        dispatch(dashboardActions.getQuarterIncomes(true))
        const quaterIncome = await reportServices.getQuaterIncomes(request, action.payload)
        action.payload.updateSetReportState(quaterIncome)
        dispatch(dashboardActions.getQuarterIncomes(false))
    }
}

const getTopProductsSales = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_TOP_PRODUCTS_SALES){
        dispatch(dashboardActions.getTopProductsSales(true))
        const topProducts = await reportServices.getTopProductsSales(request, action.payload)
        action.payload.updateSetReportState(topProducts)
        dispatch(dashboardActions.getTopProductsSales(false))
    }
}

const getTopCategoriesSales = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_TOP_CATEGORIES_SALES){
        dispatch(dashboardActions.getCategoriesSales(true))
        const topCategories = await reportServices.getTopCategoriesSales(request, action.payload)
        action.payload.updateSetReportState(topCategories)
        dispatch(dashboardActions.getCategoriesSales(false))
    }
}

const getTopTransactions = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_TOP_TRANSACTIONS){
        dispatch(dashboardActions.getTopTransaction(true))
        const transactions = await reportServices.getTopTransactions(request, action.payload)
        action.payload.fillTransactions(transactions)
        dispatch(dashboardActions.getTopTransaction(false))
    }
}

const getRecentActivities = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === reportActions.GET_RECENT_ACTIVITIES){
        dispatch(dashboardActions.getRecentActivities(true))
        const recentActivities = await reportServices.getRecentActivities(request, action.payload)
        action.payload.fillActivities(recentActivities)
        dispatch(dashboardActions.getRecentActivities(false))
    }
}

const getTransactionsByDate = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if (action.type === reportActions.GET_TRANSACTIONS_BY_DATE) {
        dispatch(uiActions.setLoadingButton(true))
        const transactions = await reportServices.getTransactionsByDate(request, action.payload)
        action.payload.fillTransactions(transactions)
        dispatch(reportActions.showReportResult())
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getActivitiesByDate = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if (action.type === reportActions.GET_ACTIVITIES_BY_DATE) {
        dispatch(uiActions.setLoadingButton(true))
        const activities = await reportServices.getActivitiesByDate(request, action.payload)
        action.payload.fillActivities(activities)
        dispatch(reportActions.showReportResult())
        dispatch(uiActions.setLoadingButton(false))
    }
}

const reportMiddleWare = [ getGridDailyReport      , getIncomesChart , getProductSalesChart , 
                           getSoldProductDashboard , getDailySalesDashBoard, getDailyProductSalesDashboard,
                           getDailyIncomeSales     , getCurrentBalance, getQuarterIncomes ,
                           getTopProductsSales     , getTopCategoriesSales, getTopTransactions,
                           getRecentActivities     , getTransactionsByDate, getActivitiesByDate
                        ]

export default reportMiddleWare;