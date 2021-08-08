import * as notificationActions from '../actions/notification.actions';
import * as uiActions           from '../../../ui/core/actions/ui.actions';
import notificationServices     from '../services/notification.service';

const getNotifications =(request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === notificationActions.GET_NOTIFICATIONS){
        dispatch(uiActions.getHeaderLoading(true))
        const notifications = await notificationServices.getNotifications(request, action.payload)
        action.payload.setNotificationState(notifications)
        dispatch(uiActions.getHeaderLoading(false))
    }
}

const getLastNotifications = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if(action.type === notificationActions.GET_LAST_NOTIFICATIONS) {
        dispatch(uiActions.setLoading(true))
        const notifications = await notificationServices.getLast50Notifications(request, action.payload)
        window.setNotificationState(notifications);
        dispatch(uiActions.setLoading(false))
    }
}

const setNotificationAsRaded = (request)=>({dispatch})=>next=>async(action)=>{
    next(action)

    if (action.type === notificationActions.SET_NOTIFICATION_AS_READED) {        
        const setAsReadedResponse = await notificationServices.setNotificationAsReaded(request, action.payload)
        if (setAsReadedResponse.result) {
            const notifications = await notificationServices.getLast50Notifications(request, action.payload)
            window.setNotificationState(notifications);
        }else{
            dispatch(notificationActions.showNotificationResponse(setAsReadedResponse))
        }
    }
}

const notificationMiddleWare = [getNotifications, getLastNotifications, setNotificationAsRaded]

export default notificationMiddleWare