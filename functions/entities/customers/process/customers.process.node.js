const customer = require("../services/customers.node");
const catchs = require("../../catchs/process/catchs.process.node");

exports.addPayment = async function(data) {
  const get = await customer.getActiveAccountReceivable(data);
  if (get[0].result) {
    const paymentResponse =
      await customer.setPayment({...data, account: get[0]});
    if (!paymentResponse.result) {
      await catchs.setCatch({document: "AccountsReceivable",
        message: paymentResponse.data});
    }
  } else {
    await catchs.setCatch({document: "AccountsReceivable",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};
