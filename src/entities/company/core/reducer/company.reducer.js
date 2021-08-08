import * as companyActions from '../actions/company.action';

const initialState = {
    companyResponse: {show:false, response:false,msj:"", emptyFields:[]}
}

const companyReducer = (state = initialState, action)=>{
    switch(action.type){
        case companyActions.SHOW_COMPANY_UPDATE_RESPONSE: return {...state, companyResponse: {show    : true, 
                                                                                              response: action.payload.result, 
                                                                                              msj     : action.payload.msj ,
                                                                                              emptyFields: action.payload.emptyFields
                                                                                            } }
        default : return state;
    }
}

export default companyReducer;