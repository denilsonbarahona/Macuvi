const sales = require("../services/sales.node");
const catchs = require("../../../catchs/process/catchs.process.node");
const util = require("../../util.process.node");

exports.addSales = async function(data) {
  const profit = util.getProfit({...data});
  const get = await sales.getSalesReport(data);
  if (get[0].result) {
    if (![undefined, ""].includes(get[0].id)) {
      const increaseSalesResponse =
        await sales.setIncreaseSales({...data, sales: get[0], profit: profit});
      if (!increaseSalesResponse.result) {
        await catchs.setCatch({document: "CompanySalesReport",
          message: increaseSalesResponse.data});
      }
    } else {
      const setSalesResponse =
        await sales.setSales({...data, sales: get[0], profit: profit});
      if (!setSalesResponse.result) {
        await catchs.setCatch({document: "CompanySalesReport",
          message: setSalesResponse.data});
      }
    }
  } else {
    await catchs.setCatch({document: "CompanySalesReport",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};

exports.unDoneSales = async function(data) {
  const profit = util.getProfit({...data});
  const get = await sales.getSalesReport(data);
  if (get[0].result) {
    if (![undefined, ""].includes(get[0].id)) {
      const increaseSalesResponse =
        await sales.unDoneSales({...data, sales: get[0], profit: profit});
      if (!increaseSalesResponse.result) {
        await catchs.setCatch({document: "CompanySalesReport",
          message: increaseSalesResponse.data});
      }
    }
  } else {
    await catchs.setCatch({document: "CompanySalesReport",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};
