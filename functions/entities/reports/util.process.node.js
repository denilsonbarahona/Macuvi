exports.getProfit = function(data) {
  let profit= 0;
  let percentage= 0;
  const productsSize= data.invoice.billingProducts.length;

  if (data.invoice.billingGlobalDiscountRef.discount !== undefined) {
    percentage = Number(data.invoice.billingGlobalDiscountRef.discount);
  }

  for (let i=0; i < productsSize; i++) {
    const discount =
      Number(data.invoice.billingProducts[i].ProductTotal)*
        (percentage/100);

    let variationProfit = 0;
    const variationSize=
      data.invoice.billingProducts[i].ProductVariations.length;
    for (let y=0; y < variationSize; y++) {
      const cost =
        Number(data.invoice.billingProducts[i].
            ProductVariations[y].cost)*
        Number(data.invoice.billingProducts[i].ProductVariations[y].
            variation_quantity_invoice);

      const income =
        Number(data.invoice.billingProducts[i].
            ProductVariations[y].invoice_price)*
        Number(data.invoice.billingProducts[i].ProductVariations[y].
            variation_quantity_invoice);
      variationProfit += (income-cost);
    }

    profit += (variationProfit - discount);
  }

  return profit;
};

exports.getProductProfit = function(data) {
  let profit= 0;
  let percentage= 0;

  if (data.invoice.billingGlobalDiscountRef.discount !== undefined) {
    percentage = Number(data.invoice.billingGlobalDiscountRef.discount);
  }

  const discount =
    Number(data.invoice.product.ProductTotal)*(percentage/100);

  let variationProfit = 0;
  const variationSize=data.invoice.product.ProductVariations.length;
  for (let y=0; y < variationSize; y++) {
    const cost =
      Number(data.invoice.product.ProductVariations[y].cost)*
      Number(data.invoice.product.ProductVariations[y].
          variation_quantity_invoice);

    const income =
      Number(data.invoice.product.ProductVariations[y].invoice_price)*
      Number(data.invoice.product.ProductVariations[y].
          variation_quantity_invoice);
    variationProfit += (income-cost);
  }

  profit += (variationProfit - discount);

  return profit;
};
