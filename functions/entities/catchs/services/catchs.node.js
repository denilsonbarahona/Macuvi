const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.setCatch = async function(data) {
  const response = await admin.firestore()
      .collection("Catches")
      .add({
        document: data.document,
        message: data.message,
        date: new Date(),
      });
  return response;
};
