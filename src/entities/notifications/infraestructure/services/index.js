import firebase from '../../../../Service/firebase/firebase.service';

const getNotifications = async(payload)=>{
    const notifications = await firebase.firestore().collection("Notifications")
            .where("NotificationCompany","==",payload.company)
            .where("NotificationState","==",1).get()
            .then(res=>{
                let Notifications = []
                    Notifications.push(res.docs.map(dataSnapShot=>{
                        return {id: dataSnapShot.id , data: dataSnapShot.data()}
                    }))

                return Notifications[0]; })
            .catch(()=>{ return [] })
    return notifications;
}

const getLast50Notifications = async(payload)=>{
    const notificatios = await firebase.firestore().collection("Notifications")
        .where("NotificationCompany","==",payload.company)
        .orderBy("NotificationState", "desc")
        .orderBy("NotificationTime", "desc").get()
        .then(res=>{
            let Notifications = []
            Notifications.push(res.docs.map(dataSnapShot=>{
                return {id: dataSnapShot.id, data: dataSnapShot.data()}
            }))
            return Notifications[0];
        })
        .catch(()=>{ return [] })
    return notificatios;
}

const setNotificationAsReaded = (payload)=> {
    const updateResponse = firebase.firestore().collection("Notifications").doc(payload.id)
        .update({
            NotificationState: 0
        })
        .then(()=>{ return { result: true, msj:""}})
        .catch(()=>{ return { result: false, msj:"Error al identificar la notificación como leída"}})
    
    return updateResponse;
}

const NotificationService = {
    getNotifications: getNotifications, 
    getLast50Notifications: getLast50Notifications,
    setNotificationAsReaded: setNotificationAsReaded
}

export default NotificationService