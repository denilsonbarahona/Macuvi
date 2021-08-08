const {admin} = require("../../../firebaseInitialized/initialized.node");
const dayjs = require("dayjs");

exports.getAccountsReceivableTime = async function() {
  const response = await admin.firestore()
      .collection("AccountsReceivableConfiguration")
      .get()
      .then((res)=>{
        const notifications = [];
        notifications.push(res.docs.map((dataSnapShot)=>{
          return dataSnapShot.data();
        }));
        return !notifications[0].length?
          [{result: true, data: []}]:
          [{result: true, data: notifications[0]}];
      })
      .catch((e)=>{
        return {
          data: {},
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.getAccountsByCompany = async function(data) {
  const response = await admin.firestore()
      .collection("AccountsReceivable")
      .where("AccountsReceivableCompanyId", "==", data.company)
      .where("AccountsReceivableState", "==", 1)
      .get()
      .then((res)=>{
        const accounts = [];
        res.docs.forEach((item)=>{
          const currentTime = new Date().getTime();
          const compareDate = dayjs(item.data().AccountsReceivableDate)
              .add(data.days, "day").format("MM/DD/YYYY");
          const accountTime = new Date(compareDate).getTime();

          if (currentTime>accountTime) {
            accounts.push({data: item.data()});
          }
        });

        return !accounts.length?
          {data: [], result: true}:
          {data: accounts, result: true};
      })
      .catch((e)=>{
        return {
          data: [],
          msj: e.message,
          result: false,
        };
      });
  return response;
};
