const products = require("../services/product.node");
const catchs = require("../../../catchs/process/catchs.process.node");
const util = require("../../util.process.node");

exports.addProductReport = async function(data) {
  for (let i=0; i < data.invoice.products.length; i++) {
    const profit = util.getProductProfit({invoice: {
      billingGlobalDiscountRef: data.invoice.billingGlobalDiscountRef,
      product: data.invoice.products[i],
    }});

    const get = await products.getProductsReport({invoice: {
      billingCompanyId: data.invoice.billingCompanyId,
      product: data.invoice.products[i],
    }});

    if (get[0].result) {
      if (![undefined, ""].includes(get[0].id)) {
        const productResponse =
         await products.setProductsSales({invoice: {
           billingDate: data.invoice.billingDate,
           product: data.invoice.products[i],
         },
         sales: get[0],
         profit: profit});
        if (!productResponse.result) {
          await catchs.setCatch({document: "CompanyProductSalesReport",
            message: productResponse.msj+" setting sales"});
        }
      }
    } else {
      await catchs.setCatch({document: "CompanyProductSalesReport",
        message: "Error trying to retrieve data: "+get[0].msj});
    }
  }
};

exports.unDoneProductSales = async function(data) {
  for (let i=0; i < data.invoice.products.length; i++) {
    const profit = util.getProductProfit({invoice: {
      billingGlobalDiscountRef: data.invoice.billingGlobalDiscountRef,
      product: data.invoice.products[i],
    }});

    const get = await products.getProductsReport({invoice: {
      billingCompanyId: data.invoice.billingCompanyId,
      product: data.invoice.products[i],
    }});

    if (get[0].result) {
      if (![undefined, ""].includes(get[0].id)) {
        const productResponse =
         await products.unDoneProductsSales({invoice: {
           product: data.invoice.products[i],
         },
         sales: get[0],
         profit: profit});
        if (!productResponse.result) {
          await catchs.setCatch({document: "CompanyProductSalesReport",
            message: productResponse.msj+" undoing"});
        }
      }
    } else {
      await catchs.setCatch({document: "CompanyProductSalesReport",
        message: "Error trying to retrieve data: "+get[0].msj});
    }
  }
};

exports.setProductReport = async function(data) {
  const set = await products.setProductReport(data);
  if (!set.result) {
    await catchs.setCatch({document: "CompanyProductSalesReport",
      message: set.msj+" setting"});
  }
};
