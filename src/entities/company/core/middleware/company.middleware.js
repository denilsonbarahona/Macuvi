import * as companyActions from '../actions/company.action';
import * as uiActions from '../../../ui/core/actions/ui.actions';
import * as cookieActions from '../../../../cookies/actions/cookie.actions';
import companyService from '../services/company.services';

const updateCompany = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === companyActions.UPDATE_COMPANY_INFORMATION){
        dispatch(uiActions.setLoadingButton(true))
        const updateResponse = await companyService.updateCompanyById(request, action.payload)
        if (updateResponse.result) {
          const company = await companyService.getCompanyById(request, action.payload)
          action.payload.cookie.company = company
          dispatch( cookieActions.saveCookie(JSON.stringify({ ...action.payload.cookie }) ) )
        }
        dispatch(companyActions.showCompanyUpdateResponse(updateResponse))
        dispatch(uiActions.setLoadingButton(false))
    }

}

const getCompanyInformation = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    if(action.type === companyActions.GET_COMPANY_INFORMATION_BY_ID){
        dispatch(uiActions.setLoading(true))
        const company = await companyService.getCompanyById(request, action.payload)
        window.onShowCompanyState(company)
        dispatch(uiActions.setLoading(false))
    }
}

const companyMiddleWare = [updateCompany, getCompanyInformation]

export default companyMiddleWare;
