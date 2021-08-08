import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }        from 'react-redux';
import { getDashboard }       from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { getQuaterIncome }    from '../../core/actions/report.actions';
import { loadCookie }         from '../../../../cookies/actions/cookie.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';
import dayjs                  from "dayjs";

const CompareMonthsDashBoard=()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 
    const [showReport, setShowReport] = useState( {show: false, data:{labels:[], datasets:[]}, current:0, last:0 } )
    const chart = document.getElementById("report-line-chart");

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            const params  = {init: dayjs().add(-3, "month").format('MM/DD/YYYY'), end:  dayjs().format('MM/DD/YYYY') }   
            dispatch(getQuaterIncome({ date:params,  company : cookie.cookie.login.companyId, updateSetReportState: updateSetReportState  })) 
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])

    useEffect(()=>{
        if(window.LineChart !== undefined){
            window.LineChart(showReport.data.labels, showReport.data.datasets, "L","product")
        }        
    },[chart, showReport.data.labels, showReport.data.datasets])

    const updateSetReportState =(report)=>{        
        setShowReport({ show    : true, 
                        "data"  :{"labels": report.labels, "datasets": report.datasets },
                        current : report.currentMonth,
                        last    : report.lastMonth
                    } )
    }

    return(
        <div className="intro-y box p-5 mt-12 sm:mt-5">
            {  (!cookie.find && cookie.cookie.login.isMaster)
                 ?<>
                    {loading.quaterIncomes
                        ?<div className="pb-20 pt-9"><UiLoading loading={loading.quaterIncomes}></UiLoading></div>
                        :<>
                            <div className="flex flex-col xl:flex-row xl:items-center">
                                <div className="flex">
                                    <div>
                                        <div className="text-theme-20 dark:text-gray-300 text-lg xl:text-xl font-bold">L { Number(showReport.current).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }</div>
                                        <div className="mt-0.5 text-gray-600 dark:text-gray-600">Mes actual</div>
                                    </div>
                                    <div className="w-px h-12 border border-r border-dashed border-gray-300 dark:border-dark-5 mx-4 xl:mx-6" />
                                    <div>
                                        <div className="text-gray-600 dark:text-gray-600 text-lg xl:text-xl font-medium">L {Number(showReport.last).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,").toString() }</div>
                                        <div className="mt-0.5 text-gray-600 dark:text-gray-600">Mes anterior</div>
                                    </div>
                                </div>
                            </div>
                            {/*}<div className="report-chart">{*/}
                            <div>
                                <canvas id="report-line-chart" height={169} className="mt-6" />
                            </div>
                         
                         </>
                    }
                    
                 </>
                 :<div className="flex flex-col xl:flex-row xl:items-center h-96 text-center align-middle" >Esta información es únicamente visible para el administrador</div>}
            
        </div>
    )
}

export default CompareMonthsDashBoard