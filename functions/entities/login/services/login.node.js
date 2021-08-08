const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.verify = async function(params) {
  const response = await admin.auth()
      .updateUser(params.uid, {
        emailVerified: true,
      })
      .then(()=>{
        return 1;
      })
      .catch(()=>{
        return 0;
      });
  return response;
};

exports.delete = async function(params) {
  const response = admin.auth()
      .deleteUser(params.uid)
      .then(()=>{
        return 1;
      }).catch(()=>{
        return 0;
      });
  return response;
};
