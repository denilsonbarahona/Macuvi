const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.setNotification = async function(data) {
  const response = await admin.firestore()
      .collection("Notifications")
      .add({
        NotificationCompany: data.company,
        NotificationMsj: data.msj,
        NotificationType: data.type,
        NotificationDate: data.date,
        NotificationTime: new Date(data.date).getTime(),
        NotificationState: 1,
      })
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          data: e.message,
          result: false,
        };
      });
  return response;
};
