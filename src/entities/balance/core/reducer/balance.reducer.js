import * as balanceActions from '../actions/balance.actions';

const balanceState = {
    payload : []      ,
    success : false   ,     
    check   : true    ,    
    incomeExpense: [] ,
    show_error: false ,
    error     : ""    
}

const balance_reduer = (state = balanceState, action)=>{
    switch(action.type){
        case balanceActions.SHOW_BALANCE: return { payload: action.payload, success: false, incomeExpense: [], check:false, show_error: false, error:"" }
        case balanceActions.SHOW_INCOMES_EXPENSES: return { payload: state.payload, success: false, incomeExpense: action.payload, check:state.check, show_error: false, error:""}
        case balanceActions.SHOW_ERROR_BALANCE: return { payload: state.payload, success: false, 
                                                         incomeExpense: state.incomeExpense, check:state.check, show_error: true, error:action.payload}
        case balanceActions.SHOW_SUCCESS_MESSAGE: return { payload: state.payload, success: true, 
                                                            incomeExpense: state.incomeExpense, check:state.check, show_error: false, error:""}
        default: return state
    }
}

export default balance_reduer;