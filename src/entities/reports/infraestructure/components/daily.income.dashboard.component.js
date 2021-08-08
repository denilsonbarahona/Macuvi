import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }        from 'react-redux';
import { getDashboard }       from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { dailyIncomeSale }   from '../../core/actions/report.actions';
import { loadCookie }         from '../../../../cookies/actions/cookie.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';
import dayjs                  from "dayjs";

const DailyIncomesDashboard =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 
    const [reportState, setReportState] = useState({total: 0, increase_decrease:0})

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            /**** setting the current week payload */
            const params     = {today: dayjs().format('MM/DD/YYYY'), yesterday:  dayjs().add(-1, "day").format('MM/DD/YYYY') }  
            
            dispatch(dailyIncomeSale({updateSetReportState:updateSetReportState, ...params, 
                                        company : cookie.cookie.login.companyId, 
                                        isMaster: cookie.cookie.login.isMaster ,
                                        uid     : cookie.cookie.login.id }))                 
        }
    },[cookie.find, dispatch, cookie.cookie.login.id, 
        cookie.cookie.login.isMaster, cookie.cookie.login.companyId])

    useEffect(()=>{        
        if(document.getElementById("chevron")){
            if( window.feather !== undefined){
                window.feather.replace();
            }            
        }        
    })

    const updateSetReportState =(response)=>{
        setReportState({total: response.todayIncome, increase_decrease: response.increase_decrease})
    }

    return (
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
                {loading.dailyIncome 
                    ?<div className="box pb-20 pt-9"><UiLoading loading={loading.dailyIncome}></UiLoading></div>
                    :<div className="box p-5">
                        <div className="flex">
                            <i data-feather="dollar-sign" className="report-box__icon text-theme-9" /> 
                            <div className="ml-auto">
                                <div  className={reportState.increase_decrease>=0
                                                    ?"report-box__indicator bg-theme-9 tooltip cursor-pointer"
                                                    :"report-box__indicator bg-theme-6 tooltip cursor-pointer" } 
                                        title={reportState.increase_decrease>=0
                                                ?Number(reportState.increase_decrease).toFixed(0).toString()+"% Mayor que ayer"
                                                :Number(reportState.increase_decrease).toFixed(0).toString()+"% Menor que ayer"}> 
                                    {Number(reportState.increase_decrease).toFixed(0).toString()}% 
                                    {reportState.increase_decrease < 0
                                        ?<i id="chevron" data-feather="chevron-down" className="w-4 h-4" /> 
                                        :<i id="chevron" data-feather="chevron-up" className="w-4 h-4" /> }                                            
                                </div>
                            </div>
                        </div>
                        <div className="text-3xl font-bold leading-8 mt-6">{Number(reportState.total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                        <div className="text-base text-gray-600 mt-1">Ingresos del día</div>
                     </div> }
                
            </div>
        </div>

    )
}

export default DailyIncomesDashboard;