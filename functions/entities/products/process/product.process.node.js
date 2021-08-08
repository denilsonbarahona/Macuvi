const products = require("../services/products.node");
const catchs = require("../../catchs/process/catchs.process.node");

exports.setNewVariationCode = async function(data) {
  const get = await products.getProductInformation({id: data.product});
  if (get.result) {
    const response = await products.setNewVariationCode({...data,
      company: get.data.productCompanyId});
    if (!response.result) {
      await catchs.setCatch({document: "VariationsCode",
        message: "Error adding variationCode: "+response.msj});
    }
  } else {
    await catchs.setCatch({document: "Products",
      message: "Error trying to retrieve data: "+get.msj});
  }
};

exports.updateVariationCode = async function(data) {
  const get = await products.getVariationCode({variation: data.variation});
  if (get[0].result) {
    const response = await products.updateVariationCode({id: get[0].id,
      code: data.code});
    if (!response.result) {
      await catchs.setCatch({document: "VariationsCode",
        message: "Error updating variationCode: "+response.msj});
    }
  } else {
    await catchs.setCatch({document: "VariationsCode",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};

exports.deleteVariationCode = async function(data) {
  const get = await products.getVariationCode({variation: data.variation});
  if (get[0].result) {
    const response = await products.deleteVariationCode({id: get[0].id});
    if (!response.result) {
      await catchs.setCatch({document: "VariationsCode",
        message: "Error deleting variationCode: "+response.msj});
    }
  } else {
    await catchs.setCatch({document: "VariationsCode",
      message: "Error trying to retrieve data: "+get[0].msj});
  }
};
