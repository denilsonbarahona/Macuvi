const category = require("../services/category.node");
const catchs = require("../../catchs/process/catchs.process.node");

exports.decrementCategoryCounter = async function(data) {
  const response = await category.decreaseCategoryCounter(data);
  if (!response.result) {
    await catchs.setCatch({document: "Categories",
      message: "Error decreasing category counter: "+response.msj});
  }
};

exports.incrementCategoryCounter = async function(data) {
  const response = await category.incrementCategoryCounter(data);
  if (!response.result) {
    await catchs.setCatch({document: "Categories",
      message: "Error increasing category counter: "+response.msj});
  }
};
