const catchs = require("../services/catchs.node");

exports.setCatch = async function(data) {
  await catchs.setCatch(data);
};
