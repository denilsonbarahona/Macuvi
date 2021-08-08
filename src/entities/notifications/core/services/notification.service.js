import {convertToMonth} from './util' 

const getNotifications = async(request, payload)=>{
    const notifications = await request.notification.getNotifications(payload)
    return notifications;
}

const getLast50Notifications = async(request, payload) =>{
    const notifications = await request.notification.getLast50Notifications(payload)
    for (let i=0; i < notifications.length; i++) {
        
        const day = new Date(notifications[i].data.NotificationDate).getDate();
        const month = convertToMonth(new Date(notifications[i].data.NotificationDate).getMonth() );
        const year = new Date(notifications[i].data.NotificationDate).getFullYear();
        
        notifications[i].data.NotificationDate = day.toString()+' '+month+' '+year.toString()
    }
    return notifications;
}

const setNotificationAsReaded = async(request, payload) =>{
    const updateResponse = await request.notification.setNotificationAsReaded(payload)
    return updateResponse
}

const notificationResponse = {
    getNotifications: getNotifications,
    getLast50Notifications: getLast50Notifications,
    setNotificationAsReaded: setNotificationAsReaded
}

export default notificationResponse;