import * as customerActions from '../actions/customer.action'
import * as uiActions       from '../../../ui/core/actions/ui.actions';
import customerServices     from '../services/customers.request'; 


const getCustomersCombox        = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);

    if(action.type === customerActions.GET_CUSTOMERS){
        const customers = await customerServices.getCustomersCombo(action.payload, request)
        dispatch(customerActions.showCustomers(customers))
    }
}

const setCustomer               = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === customerActions.SET_CUSTOMER){
            dispatch(uiActions.setLoadingButton(true))
            const customer = await customerServices.setCustomers(request, action.payload)
            dispatch(customerActions.showSetCustomerResponse(customer))
            if(customer.result){
                action.payload.onsetCustomerForm()
            }                
            dispatch(uiActions.setLoadingButton(false))
        }
}

const getFilterCustomer         = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === customerActions.GET_FILTER_CUSTOMERS){            
            if(action.payload.filter.type !== "0"){
                dispatch(uiActions.setLoadingButton(true))
            }else{
                dispatch(uiActions.setLoading(true))
            }
            
            const customers = await customerServices.getFilterCustomers(request, action.payload)
            let searchSize = (customers.array.length >0)?(customers.array.length-1):0
            if(searchSize < window.CustomersPage){                                       
                action.payload.setPager(searchSize)
            }

            dispatch(customerActions.showCustomers(customers))
            if(action.payload.filter.type !== "0"){
                dispatch(uiActions.setLoadingButton(false))
            }else{
                dispatch(uiActions.setLoading(false))
            }
        }
}

const deleteCustomer            = (request) =>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === customerActions.DELETE_CUSTOMER_BY_ID){
            dispatch(uiActions.setLoadingButtonPopUp(true))
            const customerResponse = await customerServices.deleteCustomer(request, action.payload)
            if(customerResponse.result){
                const customers = await customerServices.getFilterCustomers(request, action.payload)
                let searchSize  = (customers.array.length >0)?(customers.array.length-1):0
                if(searchSize < window.CustomersPage){                                       
                    action.payload.setPager(searchSize)
                }
                dispatch(customerActions.showCustomers(customers))
            }
                
            dispatch(customerActions.ShowDeleteCustomerResponse(customerResponse))
            dispatch(uiActions.setLoadingButtonPopUp(false))
        }
}

const getCustomerById           = (request) =>({dispatch})=>next=>async(action)=>{
        next(action);

        if(action.type === customerActions.GET_CUSTOMER_BY_ID){
           dispatch(uiActions.setLoading(true))
           const customer = await customerServices.getCustomerById(request, action.payload)           
           window.setCustomerChangeState(customer)
           dispatch(uiActions.setLoading(false))
        }
}

const updateCustomer            = (request)=>({dispatch})=>next=>async(action)=>{
      next(action)

      if(action.type === customerActions.UPDATE_CUSTOMER){
          dispatch(uiActions.setLoadingButton(true))
          const updateResponse = await customerServices.updateCustomer(request, action.payload)
          dispatch(customerActions.ShowUpdateCustomerResponse(updateResponse))
          dispatch(uiActions.setLoadingButton(false))
      }
}

const getAccountsReceivable     = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === customerActions.GET_ACCOUNTS_RECEIVABLE){

            if(action.payload.filter.event ==="load"){
                dispatch(uiActions.setLoading(true))
            }else{
                dispatch(uiActions.setLoadingButton(true))
            }
             
            const accounts = await customerServices.getAccountsReceivable(request,action.payload)
            let searchSize = (accounts.array.length >0)?(accounts.array.length-1):0
            if(searchSize < window.ReceivablePage){                                       
                action.payload.setPager(searchSize)
            }

            dispatch(customerActions.ShowAccountsReceivanle(accounts))
            dispatch(uiActions.setLoading(false))
            
            if(action.payload.filter.event ==="load"){
                dispatch(uiActions.setLoading(false))
            }else{
                dispatch(uiActions.setLoadingButton(false))
            }
             
        }   
}

const deleteAccountsReceivable  = (request)=>({dispatch})=>next=>async(action)=>{
       next(action)

       if(action.type === customerActions.DELETE_ACCOUNTS_RECEIVABLE){
            dispatch(uiActions.setLoadingButtonPopUp(true))
            const receivableDelete = await customerServices.deleteAccountReceivable(request , action.payload)
            if(receivableDelete.result){
                const accounts = await customerServices.getAccountsReceivable(request, action.payload)
                let searchSize = (accounts.array.length >0)?(accounts.array.length-1):0
                if(searchSize < window.ReceivablePage){                                       
                    action.payload.setPager(searchSize)
                }
                dispatch(customerActions.ShowAccountsReceivanle(accounts))
            }
            dispatch(customerActions.ShowDeleteCustomerResponse(receivableDelete))
            dispatch(uiActions.setLoadingButtonPopUp(false))
       }
}

const getReceivableById         = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)

        if(action.type === customerActions.GET_ACCOUNT_RECEIVABLE_BY_ID){
            dispatch(uiActions.setLoading(true))
            const receivable = await customerServices.getReceivableById(request, action.payload)
            dispatch(customerActions.ShowAccountReceivableById(receivable))
            dispatch(uiActions.setLoading(false))
        }
}

const setPaymentToReceivable    = (request)=>({dispatch})=>next=>async(action)=>{
        next(action);
        
        if(action.type === customerActions.SET_PAYMENT_TO_RECEIVABLE){
            dispatch(customerActions.SetChangePaymentStateForm(false))
            dispatch(uiActions.setLoadingButton(true))
            const setPaymentResponse = await customerServices.setPayment(request, action.payload)
            
            if(setPaymentResponse.result){                
                 const receivable = await customerServices.getReceivableById(request, action.payload)     
                 dispatch(customerActions.ShowAccountReceivableById(receivable))      
            }
            dispatch(customerActions.SetChangePaymentStateForm(true))
            dispatch(customerActions.ShowUpdateCustomerResponse(setPaymentResponse))
            dispatch(uiActions.setLoadingButton(false))
        }
} 

const setAccountReceivableNofitifactionConf =(request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === customerActions.SET_ACCOUNT_RECEIVABLE_CONF){
        dispatch(uiActions.setLoadingButton(true))
        const setNotificationResponse = await customerServices.AccountReceivableNotificationConfig(request, action.payload)
        dispatch(customerActions.setAccountReceivableResponse(setNotificationResponse))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getAccountReceivableNotificationConf = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === customerActions.GET_ACCOUNT_RECIEVABLE_CONF){
        dispatch(uiActions.setLoading(true))
        const getNotificationResponse = await customerServices.getAccountReceivableNotificationConf(request, action.payload)        
        window.updateReceivableNotificationsState(getNotificationResponse)
        dispatch(uiActions.setLoading(false))
    }
}

const customerMiddleware = [ getCustomersCombox   , setCustomer             , getFilterCustomer , 
                             deleteCustomer       , getCustomerById         , updateCustomer    ,
                             getAccountsReceivable, deleteAccountsReceivable, getReceivableById ,
                             setPaymentToReceivable, setAccountReceivableNofitifactionConf,
                             getAccountReceivableNotificationConf
                           ]

export default customerMiddleware;

