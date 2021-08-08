import * as profileActions from '../actions/profile.actions';

const initialState = {
    payload        : []  ,
    getProfiles    : true, 
    profileResponse: {show: false, response: false, msj:""}
}


const profile_reducer = (state = initialState, action) =>{
    switch( action.type ){        
        case profileActions.SHOW_PROFILE_RESPONSE: return {...state, profileResponse: {show: true, response: action.payload.result, msj: action.payload.msj}}
        case profileActions.SHOW_PROFILES        : return {...state, payload: action.payload, getProfiles: false}
        default: return state
    }
}

export default profile_reducer