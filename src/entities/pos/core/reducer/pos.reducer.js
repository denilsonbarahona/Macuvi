import * as posActions from '../actions/posActions';

const initialState = {
    payload    : [] ,
    getPOS     : true ,
    posResponse: {show: false, response: false, msj:""}
}

const pos_reducer = (state = initialState , action)=>{
    switch(action.type){
        case posActions.SHOW_POS_RESPONSE: return {...state, posResponse: {show: true, response: action.payload.result, msj: action.payload.msj}}
        case posActions.SHOW_POS_LIST    : return {...state, payload: action.payload}
        default: return state
    }
}

export default pos_reducer;