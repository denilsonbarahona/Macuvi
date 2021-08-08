const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.getBalance = async function(data) {
  const response = await admin.firestore()
      .collection("CashBalance")
      .where("CashBalanceAuthId", "==", data.invoice.billingUserId)
      .where("CashBalanceState", "==", 1)
      .where("CashBalanceCompanyId", "==", data.invoice.billingCompanyId)
      .get()
      .then((res)=>{
        const balance = [];
        balance.push(res.docs.map((dataSnapshot)=>{
          return {id: dataSnapshot.id, data: dataSnapshot.data(), result: true};
        }));
        return !balance[0].length?[{id: "", data: "", result: true}]:balance[0];
      })
      .catch((e)=>{
        return [{
          id: "",
          data: {},
          msj: e.message,
          result: false,
        }];
      });
  return response;
};

exports.setIncome = async function(data) {
  /**   HERE WE GET THE CURRENT INVOICE NUMBER CREATED FOR THE USER***/
  const invoiceNumber =
        data.invoice.billingCompanyInvoiceRange.init.split("-")[0]+"-"+
        data.invoice.billingCompanyInvoiceRange.init.split("-")[1]+"-"+
        data.invoice.billingCompanyInvoiceRange.init.split("-")[2]+"-"+
        "00000000".
            substring(0, "00000000".length -
            data.invoice
                .billingCorrelative.toString().length)+
            data.invoice.billingCorrelative.toString();
  /**    HERE WE SET THE INCOME AND
   * INVOICE VAR TO THE PUSH THE INFORMATION
   * RELEVANT FOR THE REPORT */
  const income = data.balance.data.CashBalancesIncomesDetail;
  const invoice = data.balance.data.CashBalancesInvoices;

  income.push({
    date: data.invoice.billingDate,
    description: "VENTA DE PRODUCTO SEGÚN FACTURA "+invoiceNumber,
    value: data.invoice.billingTotal,
  });
  invoice.push({
    date: data.invoice.billingDate,
    invoice: invoiceNumber,
    value: data.invoice.billingTotal,
  });
  /**    HERE WE MAKE THE UPDATE TO
   * THE FIREBASE DOCUMENT**/
  const updateResponse = await admin.firestore()
      .collection("CashBalance").doc(data.balance.id)
      .update({
        CashBalanceFinalBalanceCash:
          Number(data.balance.data.CashBalanceFinalBalanceCash)+
          Number(data.invoice.billingTotal),
        CashBalanceMoneyIncome:
          Number(data.balance.data.CashBalanceMoneyIncome)+
          Number(data.invoice.billingTotal),
        CashBalancesIncomesDetail: income,
        CashBalancesInvoices: invoice,
      })
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          data: e.message,
          result: false,
        };
      });
  return updateResponse;
};

exports.setExpense = async function(data) {
  /**   HERE WE GET THE CURRENT INVOICE NUMBER CANCELED FOR THE USER***/
  const invoiceNumber =
        data.invoice.billingCompanyInvoiceRange.init.split("-")[0]+"-"+
        data.invoice.billingCompanyInvoiceRange.init.split("-")[1]+"-"+
        data.invoice.billingCompanyInvoiceRange.init.split("-")[2]+"-"+
        "00000000".
            substring(0, "00000000".length -
            data.invoice
                .billingCorrelative.toString().length)+
            data.invoice.billingCorrelative.toString();
  /**    HERE WE SET THE EXPENSE AND
   * INVOICE VAR TO THE PUSH THE INFORMATION
   * RELEVANT FOR THE REPORT */
  const expense = data.balance.data.CashBalancesExpensesDetail;

  expense.push({
    date: data.invoice.billingDate,
    description: "ANULACIÓN DE FACTURA N° "+invoiceNumber,
    value: data.invoice.billingTotal,
  });
  /**    HERE WE MAKE THE UPDATE TO
   * THE FIREBASE DOCUMENT**/
  const updateResponse = await admin.firestore()
      .collection("CashBalance").doc(data.balance.id)
      .update({
        CashBalanceFinalBalanceCash:
          Number(data.balance.data.CashBalanceFinalBalanceCash)-
          Number(data.invoice.billingTotal),
        CashBalanceMoneyExpenses:
          Number(data.balance.data.CashBalanceMoneyExpenses)+
          Number(data.invoice.billingTotal),
        CashBalancesExpensesDetail: expense,
      })
      .then(()=>{
        return {
          data: "",
          result: true,
        };
      })
      .catch((e)=>{
        return {
          data: e.message,
          result: false,
        };
      });
  return updateResponse;
};
