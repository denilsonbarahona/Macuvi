const {admin} = require("../../../../firebaseInitialized/initialized.node");

exports.getCategoryReport = async function(data) {
  const response = admin.firestore()
      .collection("CompanyCategorySalesReport")
      .where("categorySalesReportCompanyId", "==",
          data.invoice.billingCompanyId)
      .where("categorySalesReportCategoryId", "==",
          data.invoice.product.productCategory.id)
      .get()
      .then((res)=>{
        const categories=[];
        categories.push(res.docs.map((dataSnapShot)=>{
          return {id: dataSnapShot.id,
            data: dataSnapShot.data(),
            result: true};
        }));
        return !categories[0].length?
          [{id: "", data: "", result: true}]:
          categories[0];
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

exports.setCategorySales = async function(data) {
  const response = await admin.firestore()
      .collection("CompanyCategorySalesReport").doc(data.sales.id)
      .update({
        categorySalesReportLastSales: data.invoice.billingDate,
        categorySalesReportSalesAmount:
          Number(data.sales.data.categorySalesReportSalesAmount)+
          Number(data.invoice.product.productQuantity),
        categorySalesReportProfit:
          Number(data.sales.data.categorySalesReportProfit)+
          Number(data.profit),
      }).then(()=>{
        return {
          data: "",
          result: true,
        };
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

exports.unDoneCategorySales = async function(data) {
  const unDoneResponse = await admin.firestore()
      .collection("CompanyCategorySalesReport").doc(data.sales.id)
      .update({
        categorySalesReportSalesAmount:
          Number(data.sales.data.categorySalesReportSalesAmount)-
          Number(data.invoice.product.productQuantity),
        categorySalesReportProfit:
          Number(data.sales.data.categorySalesReportProfit)-
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

exports.setCategoryReport = async function(data) {
  const setsResponse = await admin.firestore()
      .collection("CompanyCategorySalesReport")
      .add({
        categorySalesReportCompanyId: data.category.data.categoryCompanyId,
        categorySalesReportCategoryId: data.category.id,
        categorySalesReportCategoryName: data.category.data.categoryName,
        categorySalesReportLastSales: null,
        categorySalesReportSalesAmount: 0,
        categorySalesReportProfit: 0,
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
