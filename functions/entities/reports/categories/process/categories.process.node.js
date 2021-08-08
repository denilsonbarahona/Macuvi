const categories = require("../services/categories.node");
const catchs = require("../../../catchs/process/catchs.process.node");
const util = require("../../util.process.node");

exports.addCategoryReport = async function(data) {
  for (let i=0; i < data.invoice.products.length; i++) {
    const profit = util.getProductProfit({invoice: {
      billingGlobalDiscountRef: data.invoice.billingGlobalDiscountRef,
      product: data.invoice.products[i],
    }});

    const get = await categories.getCategoryReport({invoice: {
      billingCompanyId: data.invoice.billingCompanyId,
      product: data.invoice.products[i],
    }});

    if (get[0].result) {
      if (![undefined, ""].includes(get[0].id)) {
        const categoryResponse =
         await categories.setCategorySales({invoice: {
           billingDate: data.invoice.billingDate,
           product: data.invoice.products[i],
         },
         sales: get[0],
         profit: profit});
        if (!categoryResponse.result) {
          await catchs.setCatch({document: "CompanyCategorySalesReport",
            message: categoryResponse.msj+" setting sales"});
        }
      }
    } else {
      await catchs.setCatch({document: "CompanyCategorySalesReport",
        message: "Error trying to retrieve data: "+get[0].msj});
    }
  }
};

exports.unDoneCategorySales = async function(data) {
  for (let i=0; i < data.invoice.products.length; i++) {
    const profit = util.getProductProfit({invoice: {
      billingGlobalDiscountRef: data.invoice.billingGlobalDiscountRef,
      product: data.invoice.products[i],
    }});

    const get = await categories.getCategoryReport({invoice: {
      billingCompanyId: data.invoice.billingCompanyId,
      product: data.invoice.products[i],
    }});

    if (get[0].result) {
      if (![undefined, ""].includes(get[0].id)) {
        const categoryResponse =
         await categories.unDoneCategorySales({invoice: {
           product: data.invoice.products[i],
         },
         sales: get[0],
         profit: profit});
        if (!categoryResponse.result) {
          await catchs.setCatch({document: "CompanyCategorySalesReport",
            message: categoryResponse.msj+" undoing"});
        }
      }
    } else {
      await catchs.setCatch({document: "CompanyCategorySalesReport",
        message: "Error trying to retrieve data: "+get[0].msj});
    }
  }
};

exports.setCategoryReport = async function(data) {
  const set = await categories.setCategoryReport(data);
  if (!set.result) {
    await catchs.setCatch({document: "CompanyCategorySalesReport",
      message: set.msj+" setting"});
  }
};
