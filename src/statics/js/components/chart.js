import chart from "chart.js";
import cash from 'cash-dom';

const HorizontalChart =(label, datasets, signal, type)=>{
    
    if (cash("#horizontal-bar-chart-widget").length) {
        let ctx = cash("#horizontal-bar-chart-widget")[0].getContext("2d");
        new chart(ctx, {
            type: "horizontalBar",
            data: {
                labels: label,
                datasets: datasets,
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontSize: "12",
                                fontColor: "#777777",
                                callback: function (value, index, values) {
                                    
                                    return (type ==="money")?signal + Number(value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString():signal + value.toString();
                                },
                            },
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontSize: "12",
                                fontColor: "#777777",
                            },
                            gridLines: {
                                color: "#D8D8D8",
                                zeroLineColor: "#D8D8D8",
                                borderDash: [2, 2],
                                zeroLineBorderDash: [2, 2],
                                drawBorder: false,
                            },
                        },
                    ],
                },
                tooltips: {                    
                    callbacks: {
                        label: (tooltip, data) => {
                            
                            if(type === "money"){
                                return `${ ( (tooltip.value < 0)
                                    ?"Pérdida"
                                    :data.datasets[tooltip.datasetIndex].label )+
                                        ":"+signal+". "+Number(tooltip.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }`
                            }else if(type ==="product"){
                                
                               if(data.datasets[tooltip.datasetIndex].label ==="Ventas"){
                                    return `${ data.datasets[tooltip.datasetIndex].label+":  "+tooltip.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }`
                               }else{
                                return `${ ( (tooltip.value < 0)
                                                ?"Pérdida"
                                                :data.datasets[tooltip.datasetIndex].label )+
                                                    ": "+signal+" "+Number(tooltip.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }`
                               }
                                
                            }else{
                                return data.datasets[tooltip.datasetIndex].label+" "+tooltip.value.toString()
                            }
                            
                        }
                    }
                }
            },
        });
    }
}

const LineChart = (labels, datasets, signal, type)=>{
    if (cash("#report-line-chart").length) {
        let ctx = cash("#report-line-chart")[0].getContext("2d");
        new chart(ctx, {
            
            type: "line",
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontSize: "12",
                                fontColor:"#777777",
                            },
                            gridLines: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontSize: "12",
                                stepSize: 1000,
                                fontColor: "#777777",
                                callback: function (value, index, values) {
                                    return "" + (Number(value)/1000).toFixed(0).toString()+"k"
                                } 
                            },
                            gridLines: {
                                color: "#D8D8D8",
                                zeroLineColor: "#D8D8D8",
                                borderDash: [2, 2],
                                zeroLineBorderDash: [2, 2],
                                drawBorder: false,
                            },
                        },
                    ],
                },
                tooltips: {                    
                    callbacks: {
                        label: (tooltip, data) => {
                            
                            if(type === "money"){
                                return `${ ( (tooltip.value < 0)
                                    ?"Pérdida"
                                    :data.datasets[tooltip.datasetIndex].label )+
                                        ":"+signal+". "+Number(tooltip.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }`
                            }else if(type ==="product"){
                                
                               if(data.datasets[tooltip.datasetIndex].label ==="Ventas"){
                                    return `${ data.datasets[tooltip.datasetIndex].label+":  "+tooltip.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }`
                               }else{
                                return `${ ( (tooltip.value < 0)
                                                ?"Pérdida"
                                                :data.datasets[tooltip.datasetIndex].label )+
                                                    ": "+signal+" "+Number(tooltip.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }`
                               }
                                
                            }else{
                                return data.datasets[tooltip.datasetIndex].label+" "+tooltip.value.toString()
                            }
                            
                        }
                    }
                }
            },
        });
    }
}

const PieChart = (labels, datasets, signal, type )=>{

    if (cash("#report-pie-chart").length) {
        let ctx = cash("#report-pie-chart")[0].getContext("2d");
        new chart(ctx, {
            type: "pie",
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                legend: {
                    display: false,
                },
                tooltips: {                    
                    callbacks: {
                        label: (tooltip, data) => {                            
                            if(type === "money"){
                                return data.labels[tooltip.index]+": "+signal+" "+Number(data.datasets[0].data[tooltip.index]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString()
                            }else{
                                return data.labels[tooltip.index]+": "+data.datasets[0].data[tooltip.index].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                            }
                            
                        }
                    }
                }
            },
        });
    }

}

const DonutChart = (labels, datasets, signal, type )=>{ 
    
    if (cash("#report-donut-chart").length) {
        let ctx = cash("#report-donut-chart")[0].getContext("2d");
        new chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                legend: {
                    display: false,
                },
                cutoutPercentage: 80,
                tooltips: {                    
                    callbacks: {
                        label: (tooltip, data) => {                            
                            if(type === "money"){
                                return data.labels[tooltip.index]+": "+signal+" "+Number(data.datasets[0].data[tooltip.index]).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString()
                            }else{
                                return data.labels[tooltip.index]+": "+data.datasets[0].data[tooltip.index].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                            }
                            
                        }
                    }
                }
            },
        });
    }
}

window.addEventListener("load",()=>{
    
    window.HorizontalChart = HorizontalChart
    window.LineChart       = LineChart
    window.PieChart        = PieChart
    window.DonutChart      = DonutChart

})

