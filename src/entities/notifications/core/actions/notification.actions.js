export const GET_NOTIFICATIONS = '[notification] get notifications';
export const GET_LAST_NOTIFICATIONS = '[notification] get last notification';
export const SET_NOTIFICATION_AS_READED = '[notification] set notification as readed';
export const SHOW_NOTIFICATION_RESPONSE = '[notification] show notification response';

export const getNotifications =(payload)=>({
    type     : GET_NOTIFICATIONS ,
    payload  : payload
})

export const getLastNotifications = (payload) =>({
    type: GET_LAST_NOTIFICATIONS,
    payload: payload
})

export const setNotificationAsReaded = (payload) =>({
    type: SET_NOTIFICATION_AS_READED ,
    payload: payload
})

export const showNotificationResponse = (payload) =>({
    type: SHOW_NOTIFICATION_RESPONSE, 
    payload: payload
})