const {admin} = require("../../../firebaseInitialized/initialized.node");

exports.getActiveAccountReceivable = async function(data) {
  const response = await admin.firestore()
      .collection("AccountsReceivable")
      .where("AccountsReceivableCompanyId", "==", data.invoice.billingCompanyId)
      .where("AccountsReceivableCustomer.id", "==",
          data.invoice.billingCustomer.value)
      .where("AccountsReceivableState", "==", 1)
      .get()
      .then((res)=>{
        const accounts = [];
        accounts.push(res.docs.map((dataSnapShot)=>{
          return {id: dataSnapShot.id,
            data: dataSnapShot.data(),
            result: true};
        }));
        return !accounts[0].length?
          [{id: "", data: "", result: true}]:
          accounts[0];
      })
      .catch((e)=>{
        return {
          id: "",
          data: {},
          msj: e.message,
          result: false,
        };
      });
  return response;
};

exports.setPayment = async function(data) {
  const payments = data.account.data.AccountsReceivablePaymentsDetail;
  const AccountTotal =
    Number(data.account.data.AccountsReceivableTotalDebt)-
    Number(data.invoice.billingTotal);

  payments.push({
    date: data.invoice.billingDate,
    value: data.invoice.billingTotal,
  });
  const updateResponse = await admin.firestore()
      .collection("AccountsReceivable").doc(data.account.id)
      .update({
        AccountsReceivableTotalDebt: AccountTotal,
        AccountsReceivablePayments:
          Number(data.account.data.AccountsReceivablePayments)+
          Number(data.invoice.billingTotal),
        AccountsReceivablePaymentsDetail: payments,
        AccountsReceivableState: (Number(AccountTotal) <= 0)?1:0,
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
