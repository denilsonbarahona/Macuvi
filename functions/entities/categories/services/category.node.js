const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.decreaseCategoryCounter = async function(data) {
  const batch = admin.firestore().batch();
  const decrement = admin.firestore.FieldValue.increment(-1);
  const cDocRef = admin.firestore().collection("Categories").doc(data.id);
  batch.update(cDocRef, {categoryProducts: decrement});
  const response = await batch.commit()
      .then(()=>{
        return {msj: "", result: true};
      })
      .catch((e)=>{
        return {msj: e.message, result: true};
      });
  return response;
};

exports.incrementCategoryCounter = async function(data) {
  const batch = admin.firestore().batch();
  const increment = admin.firestore.FieldValue.increment(1);
  const cDocRef = admin.firestore().collection("Categories").doc(data.id);
  batch.update(cDocRef, {categoryProducts: increment});
  const response = await batch.commit()
      .then(()=>{
        return {msj: "", result: true};
      })
      .catch((e)=>{
        return {msj: e.message, result: true};
      });
  return response;
};
