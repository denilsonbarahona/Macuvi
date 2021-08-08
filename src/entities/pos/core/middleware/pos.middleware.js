import * as POSActions  from '../actions/posActions';
import * as uiActions   from '../../../ui/core/actions/ui.actions';
import posServices      from '../services/pos.services'; 

const setPOS = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === POSActions.SET_NEW_POS){
            dispatch(uiActions.setLoadingButton(true))
            const setPOSResponse = await posServices.setNewPOS(request, action.payload)    
            if(setPOSResponse.result){
                action.payload.onSetPOSState()
            }        
            dispatch(POSActions.showPOSResponse(setPOSResponse))
            dispatch(uiActions.setLoadingButton(false))
        }
}

const getPOSList = (request)=>({dispatch})=>next=>async(action)=>{
        next(action)
        if(action.type === POSActions.GET_POS){
            dispatch(uiActions.setLoading(true))
            const POSResponse = await posServices.getPOSList(request, action.payload)
            dispatch(POSActions.showPOSList(POSResponse))
            dispatch(uiActions.setLoading(false))
        }
}

const deletePOS = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === POSActions.DELETE_POS){
        dispatch(uiActions.setLoadingButtonPopUp(true))
        const deleteResponse = await posServices.deletePOS(request, action.payload)
        if(deleteResponse.result){
            const POSResponse = await posServices.getPOSList(request, action.payload)
            let searchSize = (POSResponse.array.length >0)?(POSResponse.array.length-1):0
            if(searchSize < window.posPage){                                       
                action.payload.setPager(searchSize)
            }
            dispatch(POSActions.showPOSList(POSResponse))
        }
        dispatch(POSActions.showPOSResponse(deleteResponse))
        dispatch(uiActions.setLoadingButtonPopUp(false))
    }
}

const getPOSToUpdate = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)
    
    if(action.type === POSActions.GET_POS_BY_ID){
        dispatch(uiActions.setLoading(true))        
        const posById = await posServices.getPOSByID(request, action.payload)
        action.payload.onSetPOSState(posById)        
        dispatch(uiActions.setLoading(false))
    }
}

const updatePOS = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === POSActions.UPDATE_POS_BY_ID){
        dispatch(uiActions.setLoadingButton(true))
        const updateResponse = await posServices.updatePOS(request, action.payload)
        dispatch(POSActions.showPOSResponse(updateResponse))
        dispatch(uiActions.setLoadingButton(false))
    }
}

const getComboxPOS = (request)=>({dispatch})=>next=>async(action)=>{
    next(action);
    if(action.type === POSActions.GET_POS_COMBOX) {
        const POSResponse = await posServices.getPOSCombo(request, action.payload);
        dispatch(POSActions.showPOSList(POSResponse))
    }
}

const POSMiddleware = [setPOS, getPOSList, 
        deletePOS, getPOSToUpdate, 
        updatePOS, getComboxPOS]

export default POSMiddleware;