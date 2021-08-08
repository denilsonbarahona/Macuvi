import * as TaxesAction from '../actions/taxes.actions'

const initialState = {
    payload: []  ,
    getTaxes: true, 
    taxReponse: {show_response: false, response: false, msj:""} 
}

const taxes_reducer =(state = initialState, action)=>{
   
    switch(action.type){
        case TaxesAction.SHOW_TAXES : return {...state, payload: action.payload, getTaxes: false } 
        case TaxesAction.RESET_FIND_TAXES: return {...state , getTaxes: true}
        case TaxesAction.SHOW_TAXES_RESPONSE: return {...state, taxReponse: {show_response: true, response: action.payload.result, msj:  action.payload.msj } }
        default: return state
    }
}

export default taxes_reducer;