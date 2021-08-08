import * as notificationActions from '../actions/notification.actions';

const initialState = {
    payload : []  ,
    notificationResponse: {show: false, response: false, msj:""} 
}

const notification_reducer =(state = initialState, action)=>{
    switch(action.type){        
        case notificationActions.SHOW_NOTIFICATION_RESPONSE: return {...state, notificationResponse:{ show: true, response: action.payload.result, msj: action.payload.msj}}
        default:  return state;
    }
}


export default notification_reducer;
