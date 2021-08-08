const balance = require("../services/balance.node");
const catchs = require("../../catchs/process/catchs.process.node");

exports.addIncome = async function(data) {
  const get = await balance.getBalance(data);
  if (get[0].result) {
    const incomeResponse = await balance.setIncome({...data, balance: get[0]});
    if (!incomeResponse.result) {
      await catchs.setCatch({document: "CashBalance",
        message: incomeResponse.data});
    }
  } else {
    await catchs.setCatch({document: "CashBalance",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};

exports.cancelIncome = async function(data) {
  const get = await balance.getBalance(data);
  if (![undefined, ""].includes(get[0].id)) {
    const expenseResponse =
      await balance.setExpense({...data, balance: get[0]});
    if (!expenseResponse.result) {
      await catchs.setCatch({document: "CashBalance",
        message: expenseResponse.data});
    }
  } else {
    await catchs.setCatch({document: "CashBalance",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};
