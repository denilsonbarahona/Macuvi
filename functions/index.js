const functions = require("firebase-functions");
const emails = require("./entities/send-email/services/send.email.node");
const login = require("./entities/login/services/login.node");
const balance = require("./entities/balance/process/balance.process.node");
const customer = require("./entities/customers/process/customers.process.node");
const sales = require("./entities/reports/sales/process/sales.process.node");
const products =
  require("./entities/reports/products/process/product.process.node");
const categories =
  require("./entities/reports/categories/process/categories.process.node");
const accounts =
  require("./entities/accounts/process/accounts-receivable.process.node");
const productVariation =
  require("./entities/products/process/product.process.node");
const categoryNode =
  require("./entities/categories/process/category.process.node");

exports.invitation = functions.firestore.document("PreLogin/{PreLoginId}")
    .onCreate((doc)=>{
      const auth = doc.data();
      emails.sendInvitation(auth);
    });

exports.verify = functions.https.onCall(async (data, context)=>{
  const response = await login.verify({uid: context.auth.uid});
  return response;
});

exports.deleteUser = functions.https.onCall(async (data, context)=>{
  const response = await login.delete({uid: data.uid});
  return response;
});

exports.billed = functions.firestore.document("Billing/{BillingId}")
    .onCreate(async (doc)=>{
      if (Number(doc.data().billingPayingMethod.value)===1) {
        await balance.addIncome({invoice: doc.data()});
      }
      await sales.addSales({invoice: doc.data()});
      await products.addProductReport({
        invoice: {
          billingDate: doc.data().billingDate,
          products: doc.data().billingProducts,
          billingGlobalDiscountRef: doc.data().billingGlobalDiscountRef,
          billingCompanyId: doc.data().billingCompanyId,
        }});
      await categories.addCategoryReport({
        invoice: {
          billingDate: doc.data().billingDate,
          products: doc.data().billingProducts,
          billingGlobalDiscountRef: doc.data().billingGlobalDiscountRef,
          billingCompanyId: doc.data().billingCompanyId,
        }});
    });

exports.canceled = functions.firestore.document("Billing/{BillingId}")
    .onUpdate(async (doc)=>{
      if (doc.after.data().billingState !== doc.before.data().billingState &&
          doc.after.data().billingState === 0) {
        if (Number(doc.after.data().billingPayingMethod.value)===1) {
          await balance.cancelIncome({invoice: doc.after.data()});
        }
        if (Number(doc.after.data().billingPayingMethod.value)===2) {
          await customer.addPayment({invoice: doc.after.data()});
        }
        await sales.unDoneSales({invoice: doc.after.data()});
        await products.unDoneProductSales({
          invoice: {
            billingDate: doc.after.data().billingDate,
            products: doc.after.data().billingProducts,
            billingGlobalDiscountRef: doc.after.data().billingGlobalDiscountRef,
            billingCompanyId: doc.after.data().billingCompanyId,
          }});
        await categories.unDoneCategorySales({
          invoice: {
            billingDate: doc.after.data().billingDate,
            products: doc.after.data().billingProducts,
            billingGlobalDiscountRef: doc.after.data().billingGlobalDiscountRef,
            billingCompanyId: doc.after.data().billingCompanyId,
          }});
      }
    });

exports.product = functions.firestore.document("Products/{ProductsId}")
    .onCreate(async (doc)=>{
      await products.setProductReport({
        product: {id: doc.id, data: doc.data()}});
    });

exports.categories = functions.firestore.document("Categories/{CategoriesId}")
    .onCreate(async (doc)=>{
      await categories.setCategoryReport({
        category: {id: doc.id, data: doc.data()}});
    });

exports.overdue = functions.pubsub.schedule("every 24 hours")
    .timeZone("America/Guatemala").onRun( async (context) =>{
      await accounts.getAccountsNotifications();
    });

exports.updateVariation = functions.firestore
    .document("Products/{ProductsId}/productVariations/{productVariationsId}")
    .onUpdate(async (doc)=>{
      const references = doc.after.ref.path.split("/");
      if (doc.after.data().code !== doc.before.data().code) {
        await productVariation.updateVariationCode({code: doc.after.data().code,
          variation: references[3],
        });
      }
    });

exports.updateProduct = functions.firestore.document("Products/{ProductsId}")
    .onUpdate(async (doc)=>{
      if (doc.after.data().productCategory.id !==
        doc.before.data().productCategory.id) {
        await categoryNode
            .decrementCategoryCounter({
              id: doc.before.data().productCategory.id,
            });
        await categoryNode
            .incrementCategoryCounter({
              id: doc.after.data().productCategory.id,
            });
      }
    });

exports.variation = functions.firestore
    .document("Products/{ProductsId}/productVariations/{productVariationsId}")
    .onCreate(async (doc)=>{
      const references = doc.ref.path.split("/");
      await productVariation.setNewVariationCode({product: references[1],
        code: doc.data().code,
        variation: references[3],
      });
    });

exports.deleteVariation = functions.firestore
    .document("Products/{ProductsId}/productVariations/{productVariationsId}")
    .onDelete(async (doc)=>{
      const references = doc.ref.path.split("/");
      await productVariation.deleteVariationCode({variation: references[3]});
    });
