const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp(functions.config().firebase);
}

module.exports.admin = admin;
