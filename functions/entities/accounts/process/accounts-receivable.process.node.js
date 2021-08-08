const accounts = require("../services/accounts-receivable.node");
const catchs = require("../../catchs/process/catchs.process.node");
const notifications =
  require("../../notifications/process/notifications.process.node");

exports.getAccountsNotifications = async function() {
  const get = await accounts.getAccountsReceivableTime();
  if (get[0].result) {
    setOverdueAccounts(get[0].data);
  } else {
    await catchs.setCatch({document: "AccountsReceivableConfiguration",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};

const setOverdueAccounts = async (data) => {
  for (let i=0; i < data.length; i++) {
    const get = await accounts.getAccountsByCompany({
      company: data[i].ConfigurationCompany,
      days: data[i].ConfigurationDays,
    });

    if (get.result) {
      notifications.setNewNotification(get.data);
    } else {
      await catchs.setCatch({document: "AccountsReceivable",
        message: "Error trying to retrieve data: "+get.msj});
    }
  }
};
