const {admin} = require("../../../../firebaseInitialized/initialized.node");

exports.getSalesReport = async function(data) {
  const response = await admin.firestore()
      .collection("CompanySalesReport")
      .where("SalesReportCompanyId", "==", data.invoice.billingCompanyId)
      .where("SalesReportSalesDate", "==", data.invoice.billingDate)
      .get()
      .then((res)=>{
        const sales = [];
        sales.push(res.docs.map((dataSnapShot)=>{
          return {id: dataSnapShot.id,
            data: dataSnapShot.data(),
            result: true};
        }));
        return !sales[0].length?
          [{id: "", data: "", result: true}]:
          sales[0];
      })
      .catch((e)=>{
        return {
          id: "",
          data: {},
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.setIncreaseSales = async function(data) {
  const updateResponse = await admin.firestore()
      .collection("CompanySalesReport").doc(data.sales.id)
      .update({
        SalesReportAmount: Number(data.sales.data.SalesReportAmount)+1,
        SalesReportDeliverySalesAmount:
          Number(data.sales.data.SalesReportDeliverySalesAmount)+
          Number(data.invoice.billinSaleType)===2?1:0,
        SalesReportInSituSalesAmount:
          Number(data.sales.data.SalesReportInSituSalesAmount)+
          Number(data.invoice.billinSaleType)===1?1:0,
        SalesReportMoneyAmount:
          Number(data.sales.data.SalesReportMoneyAmount)+
          Number(data.invoice.billingTotal),
        SalesReportProfitDay:
          Number(data.sales.data.SalesReportProfitDay)+
          Number(data.profit),
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
  return updateResponse;
};

exports.setSales = async function(data) {
  const setsResponse = await admin.firestore()
      .collection("CompanySalesReport")
      .add({
        SalesReportCompanyId: data.invoice.billingCompanyId,
        SalesReportSalesDate: data.invoice.billingDate,
        SalesReportAmount: 1,
        SalesReportDeliverySalesAmount:
          Number(data.invoice.billinSaleType)===2?1:0,
        SalesReportInSituSalesAmount:
          Number(data.invoice.billinSaleType)===1?1:0,
        SalesReportMoneyAmount: Number(data.invoice.billingTotal),
        SalesReportProfitDay: Number(data.profit),
        SalesReportSalesTime: new Date(data.invoice.billingDate).getTime(),
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
  return setsResponse;
};

exports.unDoneSales = async function(data) {
  const unDoneResponse = await admin.firestore()
      .collection("CompanySalesReport").doc(data.sales.id)
      .update({
        SalesReportAmount: Number(data.sales.data.SalesReportAmount)-1,
        SalesReportDeliverySalesAmount:
          Number(data.sales.data.SalesReportDeliverySalesAmount)-
          Number(data.invoice.billinSaleType)===2?1:0,
        SalesReportInSituSalesAmount:
          Number(data.sales.data.SalesReportInSituSalesAmount)-
          Number(data.invoice.billinSaleType)===1?1:0,
        SalesReportMoneyAmount:
          Number(data.sales.data.SalesReportMoneyAmount)-
          Number(data.invoice.billingTotal),
        SalesReportProfitDay:
          Number(data.sales.data.SalesReportProfitDay)-
          Number(data.profit),
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
  return unDoneResponse;
};
