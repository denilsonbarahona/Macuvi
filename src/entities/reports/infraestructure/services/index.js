import firebase from '../../../../Service/firebase/firebase.service';


const getDailyReport        = async (payload)=>{
    
    let billingDate = ( new Date(payload.date).getFullYear()+"-"+
                        ( new Date(payload.date).getMonth() + 1)+"-"+
                        ( new Date(payload.date).getDate()) 
                      ).toString()

    const daily = await firebase.firestore().collection("Billing")
                             .where("billingDate","==",billingDate)
                             .where("billingCompanyId","==",payload.company)
                             .where("billingState","==",1)
                             .get()
                             .then(res=>{
                                 let billed = []
                                 billed.push(
                                     res.docs.map((dataSnapShot)=>{
                                         return {id: dataSnapShot.id, data: dataSnapShot.data()}
                                     })
                                 )
                                 return billed
                              })
                             .catch(()=>{ return false })
    
    return (daily === false)?[]:daily[0]
}

const getDailyReportByUi    = async(payload)=>{
    let billingDate = ( new Date(payload.date).getFullYear()+"-"+
                        ( new Date(payload.date).getMonth() + 1)+"-"+
                        ( new Date(payload.date).getDate()) 
                      ).toString()

    const daily = await firebase.firestore().collection("Billing")
                             .where("billingDate","==",billingDate)
                             .where("billingCompanyId","==",payload.company)
                             .where("billingUserId","==",payload.uid)
                             .where("billingState","==",1)
                             .get()
                             .then(res=>{
                                 let billed = []
                                 billed.push(
                                     res.docs.map((dataSnapShot)=>{
                                         return {id: dataSnapShot.id, data: dataSnapShot.data()}
                                     })
                                 )
                                 return billed
                              })
                             .catch(()=>{ return false })
    
    return (daily === false)?[]:daily[0]
}
 
const getWeekProductSales   = async(payload)=>{
    
    let initTime = new Date(payload.date.init).getTime()
    let endTime  = new Date(payload.date.end).getTime()
    
    const week = await firebase.firestore().collection("Billing")
                            .where("billingState","==",1)
                            .where("billingCompanyId","==",payload.company)
                            .where("billingTime",">",initTime)
                            .where("billingTime","<=",endTime)
                            .get()
                            .then(res=>{
                                let billed = []
                                billed.push(
                                    res.docs.map(dataSnapShot=>{
                                        return {id: dataSnapShot.id, data: dataSnapShot.data()}
                                    })
                                )                                
                                return billed[0];
                            }).catch((e)=>{ return [] })
    return week
}

const getIncomesReport      = async(payload, order)=>{

    let initTime = new Date(payload.date.init).getTime()
    let endTime  = new Date(payload.date.end).getTime()
    
    const incomes = await firebase.firestore().collection("CompanySalesReport")
                                .where("SalesReportCompanyId","==",payload.company)
                                .where("SalesReportSalesTime",">=",initTime)
                                .where("SalesReportSalesTime","<=",endTime)
                                .orderBy("SalesReportSalesTime",order)
                                .get()
                                .then(res=>{
                                    let incomes_array = []
                                    incomes_array.push(
                                        res.docs.map(dataSnapShot=>{
                                            return { id: dataSnapShot.id, data: dataSnapShot.data() }
                                        })
                                    )

                                    return incomes_array[0]
                                })
                                .catch(()=>{ return [] })
    return  incomes
}

const getProductSalesReport = async(payload)=>{
    const saleReport = await firebase.firestore().collection("CompanyProductSalesReport")
                                .where("ProductSalesReportCompanyId","==",payload.company)
                                .orderBy("ProductSalesReportSalesAmount", "desc")
                                .get()
                                .then(res=>{
                                    let reportArray = []
                                        reportArray.push(
                                            res.docs.map(dataSnapShot=>{
                                                return { id: dataSnapShot.id, data: dataSnapShot.data() }
                                            })
                                        )

                                    return reportArray[0]
                                })
                                .catch(()=>{ return [] })
    return saleReport
}    

const getTopProductsSales = async(payload)=>{    
    const topProducts = await firebase.firestore().collection("CompanyProductSalesReport")
                                    .where("ProductSalesReportCompanyId","==",payload.company)
                                    .where("ProductSalesReportSalesAmount",">",0)
                                    .orderBy("ProductSalesReportSalesAmount","desc")
                                    .limit(5)
                                    .get()
                                    .then(res=>{
                                        let reportArray = []
                                        reportArray.push(
                                            res.docs.map(dataSnapShot=>{
                                                return {id: dataSnapShot.id, data: dataSnapShot.data()}
                                            })
                                        )
                                        return reportArray[0]
                                    })
                                    .catch((e)=>{ return [] })
    return topProducts
}

const getTopCategoriesSales = async(payload)=>{
    const topCategories = await firebase.firestore().collection("CompanyCategorySalesReport")
                                    .where("categorySalesReportCompanyId","==",payload.company)
                                    .where("categorySalesReportSalesAmount",">",0)
                                    .orderBy("categorySalesReportSalesAmount","desc")
                                    .limit(5)
                                    .get()
                                    .then(res=>{
                                        let reportArray = []
                                        reportArray.push(
                                            res.docs.map(dataSnapShot=>{
                                                return {id: dataSnapShot.id, data: dataSnapShot.data()}
                                            })
                                        )
                                        return reportArray[0]
                                    })
                                    .catch(()=>{ return [] })
    return topCategories;
}

const getTransactions = async(payload)=>{
    const recentTransactions = await firebase.firestore().collection("Billing")
            .where("billingCompanyId","==",payload.company)
            .where("billingState","==",1)
            .limit(5)
            .orderBy("billingTime","desc")
            .get().then(res=>{
                let billed = []
                billed.push(
                    res.docs.map(dataSnapShot=>{
                        return {data: dataSnapShot.data()}
                    })
                )                                
                return billed[0];
            })
            .catch(()=>{ return [] })    
    return recentTransactions
}

const getRecentActivities = async(payload)=>{
    const activities = await firebase.firestore().collection("Activities")
        .where("activityCompany","==",payload.company)
        .limit(4)
        .orderBy("activityTime","desc")
        .get().then(res=>{
            let activities = []
            activities.push(
                res.docs.map(dataSnapShot=>{
                    return {data: dataSnapShot.data()}
                })
            )                                
            return activities[0];
        })
        .catch(()=>{ return [] })
    return activities;
}

const getTransactionsByDate = async(payload)=>{

    let initTime = new Date(payload.date.init).getTime()
    let endTime  = new Date(payload.date.end).getTime()
    
    const transactions = await firebase.firestore().collection("Billing")
        .where("billingCompanyId", "==", payload.company)
        .where("billingState", "==", 1)
        .where("billingTime", ">=", initTime)
        .where("billingTime", "<=", endTime)
        .orderBy("billingTime","desc")
        .get().then(res=>{
            let billed = []
            billed.push(
                res.docs.map(dataSnapShot=>{
                    return {data: dataSnapShot.data()}
                })
            )                                
            return billed[0];
        })
        .catch(()=>{ return [] });
    
    return transactions;
}

const getActivitiesByDate = async(payload)=>{

    let initTime = new Date(payload.date.init).getTime()
    let endTime  = new Date(payload.date.end).getTime()

    const activities = await firebase.firestore().collection("Activities")
        .where("activityCompany","==",payload.company)
        .where("activityTime", ">=", initTime)
        .where("activityTime", "<=", endTime)
        .orderBy("activityTime","desc")
        .get().then(res=>{
            let activities = []
            activities.push(
                res.docs.map(dataSnapShot=>{
                    return {data: dataSnapShot.data()}
                })
            )                                
            return activities[0];
        })
        .catch(()=>{ return [] })
    return activities;
}

const reportServices = {
    getDailyReport       : getDailyReport   ,
    getIncomesReport     : getIncomesReport ,
    getProductSalesReport: getProductSalesReport,
    getWeekProductSales  : getWeekProductSales,
    getDailyReportByUi   : getDailyReportByUi,
    getTopProductsSales  : getTopProductsSales,
    getTopCategoriesSales: getTopCategoriesSales,
    getTransactions: getTransactions,
    getRecentActivities: getRecentActivities,
    getTransactionsByDate: getTransactionsByDate,
    getActivitiesByDate: getActivitiesByDate
}

export default reportServices;