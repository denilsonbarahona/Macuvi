import * as TaxesAction from '../actions/taxes.actions';
import * as uiActions   from '../../../ui/core/actions/ui.actions';
import Taxes            from '../services/taxes.service';

const getTaxes =(request)=>({dispatch})=>next=>async(action)=>{
    next(action);

    if(action.type === TaxesAction.GET_TAXES){
        const response = await Taxes.getTaxes(request,action.payload)
        dispatch(TaxesAction.ShowTaxes(response))
    }
}

const setNewTax =(request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if (action.type === TaxesAction.SET_NEW_TAX) {
        dispatch(uiActions.setLoadingButton(true))
        const response = await Taxes.setNewTax(request, action.payload)
        if (response.result) {
            window.onResetTax()
        }
        dispatch(TaxesAction.ShowTaxesResponse(response))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getTableTaxes = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if (action.type === TaxesAction.GET_TABLE_TAXES) {
        dispatch(uiActions.setLoading(true))        
        const taxes = await Taxes.getTableTaxes(request, action.payload)
        window.setTaxesList(taxes)
        dispatch(uiActions.setLoading(false))
    }
}

const deleteTax = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);

    if (action.type === TaxesAction.DELETE_TAX) {
        dispatch(uiActions.setLoadingButtonPopUp(true))
        const deleteResponse = await Taxes.deleteTax(request, action.payload)
        if (deleteResponse.result) {
            const taxes = await Taxes.getTableTaxes(request, action.payload)
            window.setTaxesList(taxes)
        }
        dispatch(TaxesAction.ShowTaxesResponse(deleteResponse))
        dispatch(uiActions.setLoadingButtonPopUp(false))
    }
}

const getTaxesById = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);

    if (action.type === TaxesAction.GET_TAX_BY_ID) {
        dispatch(uiActions.setLoading(true));
        const tax = await Taxes.getTaxById(request, action.payload);
        window.onSetTaxForEdit(tax);
        dispatch(uiActions.setLoading(false))
    }
}

const updatTax = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);

    if (action.type === TaxesAction.UPDATE_TAX) {
        dispatch(uiActions.setLoadingButton(true))
        const updateTax = await Taxes.updateTax(request, action.payload)
        dispatch(TaxesAction.ShowTaxesResponse(updateTax))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const TaxesMiddleWare = [getTaxes, setNewTax, getTableTaxes, deleteTax, getTaxesById, updatTax]

export default TaxesMiddleWare;
