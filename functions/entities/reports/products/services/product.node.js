const {admin} = require("../../../../firebaseInitialized/initialized.node");

exports.getProductsReport = async function(data) {
  const response = admin.firestore()
      .collection("CompanyProductSalesReport")
      .where("ProductSalesReportCompanyId", "==", data.invoice.billingCompanyId)
      .where("ProductSalesReportProductId", "==", data.invoice.product.id)
      .get()
      .then((res)=>{
        const products=[];
        products.push(res.docs.map((dataSnapShot)=>{
          return {id: dataSnapShot.id,
            data: dataSnapShot.data(),
            result: true};
        }));
        return !products[0].length?
          [{id: "", data: "", result: true}]:
          products[0];
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

exports.setProductsSales = async function(data) {
  const response = await admin.firestore()
      .collection("CompanyProductSalesReport").doc(data.sales.id)
      .update({
        ProductSalesReportLastSale: data.invoice.billingDate,
        ProductSalesReportSalesAmount:
          Number(data.sales.data.ProductSalesReportSalesAmount)+
          Number(data.invoice.product.productQuantity),
        ProductSalesReportProfit:
          Number(data.sales.data.ProductSalesReportProfit)+
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

exports.unDoneProductsSales = async function(data) {
  const unDoneResponse = await admin.firestore()
      .collection("CompanyProductSalesReport").doc(data.sales.id)
      .update({
        ProductSalesReportSalesAmount:
          Number(data.sales.data.ProductSalesReportSalesAmount)-
          Number(data.invoice.product.productQuantity),
        ProductSalesReportProfit:
          Number(data.sales.data.ProductSalesReportProfit)-
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

exports.setProductReport = async function(data) {
  const setsResponse = await admin.firestore()
      .collection("CompanyProductSalesReport")
      .add({
        ProductSalesReportCompanyId: data.product.data.productCompanyId,
        ProductSalesReportProductId: data.product.id,
        ProductSalesReportProductImg: data.product.data.productImg,
        ProductSalesReportProductName: data.product.data.productName,
        ProductSalesReportProductCategory:
          data.product.data.productCategory.label,
        ProductSalesReportLastSale: null,
        ProductSalesReportSalesAmount: 0,
        ProductSalesReportProfit: 0,
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
