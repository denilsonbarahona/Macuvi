const notification = require("../services/notifications.node");
const catchs = require("../../catchs/process/catchs.process.node");

exports.setNewNotification = async function(data) {
  for (let y=0; y<data.length; y++) {
    const response = await notification.setNotification({
      company: data[y].data.AccountsReceivableCompanyId,
      msj: "La cuenta pode cobrar de: "+
        data[y].data.AccountsReceivableCustomer.Name+
        " a llegado a su fecha limite.",
      type: "Cuenta por cobrar",
      date: new Date().getFullYear().toString()+"-"+
        (new Date().getMonth()+1).toString()+"-"+
        (new Date().getDate()).toString(),
    });

    if (!response.result) {
      await catchs.setCatch({document: "Notifications",
        message: response.msj});
    }
  }
};
