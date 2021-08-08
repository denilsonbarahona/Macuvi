import * as balanceActions from '../actions/balance.actions';
import * as uiActions        from '../../../ui/core/actions/ui.actions';
import balanceServices     from '../services/balance.services';

const getBalance = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        
        if(action.type === balanceActions.GET_BALANCE){
            dispatch(uiActions.setLoading(true))
            const balance = await balanceServices.getBalance(request, action.payload.company, action.payload.auth );            
            dispatch(balanceActions.showBalance(balance))            
            dispatch(uiActions.setLoading(false))
        }
}

const createBalance = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        if(action.type === balanceActions.CREATE_BALANCE){
            dispatch(uiActions.setLoadingButton(true))
            const success = await balanceServices.createBalance(request, action.payload);     
            if(success){
                const balance = await balanceServices.getBalance(request, action.payload.companyId, action.payload.auth ); 
                dispatch(balanceActions.showBalance(balance))                  
            } else {
                dispatch(balanceActions.showErrorBalance("Error al realizar la apertura del balance"))
            }                                  
            dispatch(uiActions.setLoadingButton(false))
        }
}

const closeBalance = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        
        if(action.type === balanceActions.CLOSE_BALANCE){
            dispatch(uiActions.setLoadingButton(true))
            const success = await balanceServices.closeBalance(request, action.payload);
            if(success){
                dispatch(balanceActions.showBalance([]))                  
            }else{
                dispatch(balanceActions.showErrorBalance("Error la realizar el cierre del balance"))
            }
            dispatch(uiActions.setLoadingButton(false))
        }
}

const createExpense = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);

        if(action.type === balanceActions.CREATE_EXPENSE){
            dispatch(uiActions.setLoadingButton(true))
            const success = await balanceServices.createExpense(request , action.payload);            
            if(success.result){
                dispatch(balanceActions.showSuccessMessage())
            }else{
                if(success.emptyFields.length > 0){
                    dispatch(balanceActions.showErrorBalance("Para registrar el gasto se tiene que ingresar toda la información."))
                }else{
                    dispatch(balanceActions.showErrorBalance(success.msj))
                }
            }
            dispatch(uiActions.setLoadingButton(false))
        }
}

const createIncome = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);

        if(action.type === balanceActions.CREATE_INCOME){
            dispatch(uiActions.setLoadingButton(true))
            const success = await balanceServices.createIncome(request , action.payload);            
            if(success.result){
                dispatch(balanceActions.showSuccessMessage())
            }else{
                if(success.emptyFields.length > 0){
                    dispatch(balanceActions.showErrorBalance("Para registrar el ingreso de dinero se tiene que ingresar toda la información."))
                }else{
                    dispatch(balanceActions.showErrorBalance(success.msj))
                }
            }
            dispatch(uiActions.setLoadingButton(false))
        }
}


const balanceMiddleWare = [ getBalance, createBalance , closeBalance, createExpense, createIncome]

export default balanceMiddleWare;
