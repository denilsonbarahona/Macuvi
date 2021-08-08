const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.getProductInformation = async function(data) {
  const response = await admin.firestore()
      .collection("Products").doc(data.id)
      .get()
      .then((res)=>{
        return {data: res.data(), result: true};
      })
      .catch((e)=>{
        return {
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.setNewVariationCode = async function(data) {
  const response = await admin.firestore()
      .collection("VariationsCode")
      .add({
        VariationCompany: data.company,
        VariationProduct: data.product,
        VariationCode: data.code,
        Variation: data.variation,
      })
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.deleteVariationCode = async function(data) {
  const response = await admin.firestore()
      .collection("VariationsCode").doc(data.id)
      .delete()
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.updateVariationCode = async function(data) {
  const response = await admin.firestore()
      .collection("VariationsCode").doc(data.id)
      .update({
        VariationCode: data.code,
      })
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.getVariationCode = async function(data) {
  const variationCode = await admin.firestore()
      .collection("VariationsCode")
      .where("Variation", "==", data.variation)
      .get()
      .then((res)=>{
        const variation = [];
        variation.push(res.docs.map((dataSnapshot)=>{
          return {id: dataSnapshot.id, result: true};
        }));
        return !variation[0].length?[{id: "", result: true}]:variation[0];
      })
      .catch((e)=>{
        return [{
          id: "",
          msj: e.message,
          result: false,
        }];
      });
  return variationCode;
};
