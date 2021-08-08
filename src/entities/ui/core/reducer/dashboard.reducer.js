import * as dashboardActions from '../actions/dashboard.actions';

const initState = {
    weeklyProducts : false,
    dailySales     : false,
    productsDailySales: false,
    dailyIncome    : false ,
    currentBalance : false ,
    quaterIncomes  : false ,
    topProducts    : false ,
    topCategories  : false ,
    topTransactions: false ,
    recentActivities: false
}

const dashboardReducer = (state = initState, action)=>{

    switch (action.type){
        case dashboardActions.LOADING_WEEKLY_PRODUCTS :  return {...state, weeklyProducts: action.payload }
        case dashboardActions.DAILY_SALES             :  return {...state, dailySales    : action.payload }    
        case dashboardActions.PRODUCTS_DAILY_SALES    :  return {...state, productsDailySales: action.payload} 
        case dashboardActions.DAILY_INCOME_SALES      :  return {...state, dailyIncome   : action.payload}
        case dashboardActions.CURRENT_BALANCE         :  return {...state, currentBalance: action.payload} 
        case dashboardActions.GET_QUARTER_INCOMES     :  return {...state, quaterIncomes : action.payload}
        case dashboardActions.GET_TOP_PRODUCTS_SALES  :  return {...state, topProducts   : action.payload}
        case dashboardActions.GET_TOP_CATEGORIES_SALES:  return {...state, topCategories : action.payload}
        case dashboardActions.GET_TOP_TRANSACTIONS    :  return {...state, topTransactions: action.payload}
        case dashboardActions.GET_RECENT_ACTIVITIES   :  return {...state, recentActivities: action.payload}
        default: return state
    }
}

export default dashboardReducer