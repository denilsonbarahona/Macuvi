import {convertToMonth} from './util' 

const getGridDailyReport      = async(request, payload)=>{
    let products     = [];
    let groupedArray = [];
    let groupedJson  = {};
    let total        = 0;

    const report     = await request.report.getDailyReport(payload)
    for(let i=0;i < report.length; i++){
        for(let y=0; y < report[i].data.billingProducts.length; y++){
            products.push(report[i].data.billingProducts[y])
        } 
    }

    products.forEach((product)=>{
            total += Number(product.productQuantity)
        let quantity = 0;

        if(groupedJson[product.productName]){
            quantity = groupedJson[product.productName].quantity + Number(product.productQuantity)
        }else{
            quantity =  Number(product.productQuantity)
        }
        groupedJson[product.productName] ={ product : product.productName, 
                                             quantity: quantity
                                            }
    })
    
    Object.keys(groupedJson).forEach((result)=>{
        groupedArray.push(groupedJson[result])
    })

    return {grouped: groupedArray, total: total}
}

const getWeekReport           = async(request, payload)=>{
    
    var currentWeekProducts = []
    var lastWeekProducts    = []
    var currentWeekTotal    = 0;
    var lastWeekTotal       = 0;
    
    const currentWeek = await request.report.getWeekProductSales({date:payload.currentWeek, company: payload.company})
    const lastWeek    = await request.report.getWeekProductSales({date:payload.lastWeek   , company: payload.company})

 
    for(let i=0; i < currentWeek.length; i++){
        currentWeekProducts = currentWeekProducts.concat(currentWeek[i].data.billingProducts);
    }
   
    for(let i=0; i < lastWeek.length; i++){
        lastWeekProducts = lastWeekProducts.concat(lastWeek[i].data.billingProducts);
    }
    
    currentWeekProducts.forEach(item=>{
        currentWeekTotal+=Number(item.productQuantity)
    })

    lastWeekProducts.forEach(item=>{
        lastWeekTotal+=Number(item.productQuantity)
    })

    const increase_decrease = ((currentWeekTotal - lastWeekTotal)/( lastWeekTotal || currentWeekTotal || 1) )*100
    return { productsTotal: currentWeekTotal, increase_decrease: increase_decrease }
}
  
const getDailySalesReport     = async(request, payload)=>{
    
    var todayReport = []    
    var yesterdayReport = []
    if(payload.isMaster){
        todayReport     =  await request.report.getDailyReport({date:payload.today, company: payload.company})
        yesterdayReport =  await request.report.getDailyReport({date:payload.yesterday, company: payload.company})
    }else{
        todayReport     =  await request.report.getDailyReportByUi({date:payload.today    , company: payload.company, uid: payload.uid})
        yesterdayReport =  await request.report.getDailyReportByUi({date:payload.yesterday, company: payload.company, uid: payload.uid})
    }
    
    const todayTotal      = todayReport.length;
    const yesterdayTotal  = yesterdayReport.length;

    const increase_decrease = ((todayTotal - yesterdayTotal)/ (yesterdayTotal || todayTotal || 1) )*100
    return { productsTotal: todayTotal, increase_decrease: increase_decrease }
} 

const getDailyProductsSale    = async(request, payload)=>{
    
    var todayReport       = []
    var yesterdayReport   = []
    var todayProducts     = []
    var yesterdayProducts = []
    var todayTotal  = 0;
    var yesterdayTotal     = 0;

    if(payload.isMaster){
        todayReport     =  await request.report.getDailyReport({date:payload.today, company: payload.company})
        yesterdayReport =  await request.report.getDailyReport({date:payload.yesterday, company: payload.company})
    }else{
        todayReport     =  await request.report.getDailyReportByUi({date:payload.today    , company: payload.company, uid: payload.uid})
        yesterdayReport =  await request.report.getDailyReportByUi({date:payload.yesterday, company: payload.company, uid: payload.uid})
    }

    for(let i=0; i < todayReport.length; i++){
        todayProducts = todayProducts.concat(todayReport[i].data.billingProducts);
    }
   
    for(let i=0; i < yesterdayReport.length; i++){
        yesterdayProducts = yesterdayProducts.concat(yesterdayReport[i].data.billingProducts);
    }

    todayProducts.forEach(item=>{
        todayTotal+=Number(item.productQuantity)
    })

    yesterdayProducts.forEach(item=>{
        yesterdayTotal+=Number(item.productQuantity)
    })
    
    const increase_decrease = ( (todayTotal - yesterdayTotal)/ (yesterdayTotal || todayTotal || 1)  )*100
     
    return { productsTotal: todayTotal, increase_decrease: increase_decrease }
}

const getDailyIncomeSales     = async(request, payload)=>{
    const incomesResponse = await request.report.getIncomesReport({date:{init:payload.yesterday, end:payload.today}, company: payload.company},"desc")
    var todayIncome       = 0;
    var yesterdayIncome   = 0;

    incomesResponse.forEach(income=>{

        if(new Date(payload.today).getTime() >= income.data.SalesReportSalesTime && new Date(payload.yesterday).getTime() < income.data.SalesReportSalesTime){
            todayIncome = income.data.SalesReportMoneyAmount
        }else {
            yesterdayIncome = income.data.SalesReportMoneyAmount
        }
    })

    const increase_decrease = ( (todayIncome - yesterdayIncome)/(yesterdayIncome || todayIncome || 1) )*100

    return { todayIncome: todayIncome, increase_decrease: increase_decrease}
}

const getIncomesChartReport   = async(request, payload)=>{
    let labels = [] , incomes = [], profit = [];
    let jincomes = {
                    label: "Ingresos",
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    data: [],
                    backgroundColor: "#3160D8",
                }   
    
    let jprofit  = {
                    label: "Ganacias",
                    barPercentage: 0.5,
                    barThickness: 6,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    data: [],
                    backgroundColor: "#cbd5e0",
                }


    const incomesResponse = await request.report.getIncomesReport(payload,"desc")

    incomesResponse.forEach(income=>{
        labels.push(new Date(income.data.SalesReportSalesDate.replaceAll("-","/")).toLocaleDateString())
        incomes.push(income.data.SalesReportMoneyAmount)
        profit.push(income.data.SalesReportProfitDay)
    })

    jincomes.data = incomes
    jprofit.data  = profit

    return {labels: labels, datasets:[jincomes, jprofit]}
}

const getCurrentBalance       = async(request, payload)=>{
    const currentBalance = await request.balance.getBalance(payload.company, payload.uid)
    return currentBalance
}

const getQuaterIncomes        = async(request, payload)=>{
    var groupedIncomes = {}
    var months  = []
    var incomes = []    
    var jIncomes = 
    {
        label: "Ingresos",
        data: [],
        borderWidth: 2,
        borderColor: "#3160D8",
        backgroundColor: "transparent", 
    }  

    const quaterIncome = await request.report.getIncomesReport(payload,"asc")
    quaterIncome.forEach(income=>{

        let month = convertToMonth(new Date(income.data.SalesReportSalesDate).getMonth() );
        if(groupedIncomes[month]){
            groupedIncomes[month] += Number(income.data.SalesReportMoneyAmount)
        }else{
            groupedIncomes[month] = Number(income.data.SalesReportMoneyAmount)
        }
    })

    Object.keys(groupedIncomes).forEach((month)=>{
        months.push(month)
        incomes.push(groupedIncomes[month])
    })

    jIncomes.data= incomes;    
    return {labels: months, datasets: [jIncomes], currentMonth: incomes[incomes.length -1] || 0, lastMonth: incomes[incomes.length -2] || 0}
}

const getProductsSaleChartReport = async(request, payload)=>{
    let labels = [] , sales = [] , profit =[];
    let jSales = {
        label: "Ventas",
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [],
        backgroundColor: "#3160D8",
    }   

    let jprofit  = {
            label: "Ganacias",
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [],
            backgroundColor: "#cbd5e0",
        }

    const ProductsReport = await request.report.getProductSalesReport(payload)
    ProductsReport.forEach(report =>{
        labels.push(report.data.ProductSalesReportProductName)
        sales.push(report.data.ProductSalesReportSalesAmount)
        profit.push(Number(report.data.ProductSalesReportProfit).toFixed(2))
    })
    
    jSales.data  = sales
    jprofit.data = profit

    return {labels: labels, datasets: [jSales,jprofit] }
}

const getTopProductsSales = async(request, payload)=>{
    let labels = [], sales = [], detail = [],
        colors = ["#FF8B26", "#FFC533", "#285FD3","#219421","#CA1F5C"];
    let jDataSet = {
                        data: [],
                        backgroundColor: colors,
                        hoverBackgroundColor: colors,
                        borderWidth: 5,
                        borderColor: "#fff",
                    };

    const topProducts = await request.report.getTopProductsSales(payload)
    topProducts.forEach((report, index)=>{
        labels.push(report.data.ProductSalesReportProductName)
        sales.push( report.data.ProductSalesReportSalesAmount )
        detail.push({product: report.data.ProductSalesReportProductName, 
                     color  : colors[index], 
                     sales  : report.data.ProductSalesReportSalesAmount})
    })

    jDataSet.data = sales
    return {labels: labels, datasets: [jDataSet], detail: detail}
}

const getTopCategoriesSales = async(request, payload)=>{
    let labels = [], sales = [], detail = [],
        colors = ["#FF8B26", "#FFC533", "#285FD3","#219421","#CA1F5C"];
    let jDataSet = {
                    data: [],
                    backgroundColor: colors,
                    hoverBackgroundColor: colors,
                    borderWidth: 5,
                    borderColor: "#fff",
                }

    const topCategories = await request.report.getTopCategoriesSales(payload)
    topCategories.forEach((report, index)=>{
        labels.push(report.data.categorySalesReportCategoryName)
        sales.push(report.data.categorySalesReportSalesAmount)
        detail.push({ category: report.data.categorySalesReportCategoryName ,
                      color   : colors[index] ,
                      sales   : report.data.categorySalesReportSalesAmount
                    })
    })
    jDataSet.data = sales
    return {labels: labels, datasets: [jDataSet], detail: detail }
}

const getTopTransactions = async(request, payload)=>{
    const transactions = await request.report.getTransactions(payload)
    for(let i=0; i < transactions.length; i++){
        
        const day = new Date(transactions[i].data.billingDate).getDate();
        const month = convertToMonth(new Date(transactions[i].data.billingDate).getMonth() );
        const year = new Date(transactions[i].data.billingDate).getFullYear();
        
        transactions[i].data.billingDate = day.toString()+' '+month+' '+year.toString()
    }
    return transactions;
}

const getRecentActivities = async(request, payload)=>{
    const activities = await request.report.getRecentActivities(payload)
    for(let i=0; i < activities.length; i++){
        
        const day = new Date(activities[i].data.activityDate).getDate();
        const month = convertToMonth(new Date(activities[i].data.activityDate).getMonth() );
        const year = new Date(activities[i].data.activityDate).getFullYear();
        
        activities[i].data.activityDate = day.toString()+' '+month+' '+year.toString()
    }
    return activities
}

const getTransactionsByDate = async(request, payload)=>{
    const transactions = await request.report.getTransactionsByDate(payload)
    for(let i=0; i < transactions.length; i++){
        
        const day = new Date(transactions[i].data.billingDate).getDate();
        const month = convertToMonth(new Date(transactions[i].data.billingDate).getMonth() );
        const year = new Date(transactions[i].data.billingDate).getFullYear();
        
        transactions[i].data.billingDate = day.toString()+' '+month+' '+year.toString()
    }
    return transactions;
}

const getActivitiesByDate = async(request, payload)=>{
    const activities = await request.report.getActivitiesByDate(payload)
    for(let i=0; i < activities.length; i++){
        
        const day = new Date(activities[i].data.activityDate).getDate();
        const month = convertToMonth(new Date(activities[i].data.activityDate).getMonth() );
        const year = new Date(activities[i].data.activityDate).getFullYear();
        
        activities[i].data.activityDate = day.toString()+' '+month+' '+year.toString()
    }
    return activities    
}

const reports = {
    getGridDailyReport: getGridDailyReport ,
    getIncomesChartReport: getIncomesChartReport,
    getProductsSaleChartReport: getProductsSaleChartReport,
    getWeekReport: getWeekReport,
    getDailySalesReport: getDailySalesReport,
    getDailyProductsSale: getDailyProductsSale,
    getDailyIncomeSales: getDailyIncomeSales,
    getCurrentBalance: getCurrentBalance,
    getQuaterIncomes: getQuaterIncomes,
    getTopProductsSales: getTopProductsSales,
    getTopCategoriesSales: getTopCategoriesSales,
    getTopTransactions: getTopTransactions,
    getRecentActivities: getRecentActivities,
    getTransactionsByDate: getTransactionsByDate,
    getActivitiesByDate: getActivitiesByDate
}

export default reports;