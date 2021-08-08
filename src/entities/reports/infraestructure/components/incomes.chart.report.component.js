import { React , useState, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import Header                          from '../../../header/infraestructure/components/header.component';
import MobileMenu                      from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                        from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                  from '../../../ui/core/selector/ui.selector';
import { getCookie  }                  from '../../../../cookies/selectors/cookie.selector'; 
import { getReports }                  from '../../core/selector/report.selector'; 
import { getIncomesReport }            from '../../core/actions/report.actions';
import { loadCookie }                  from '../../../../cookies/actions/cookie.actions';

const IncomeChart =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie); 
    const report   = useSelector(getReports);
    const [reportState, setReportState] = useState({ filter: "", report:{labels:[], datasets:[]} })
    const chart = document.getElementById("horizontal-bar-chart-widget");
    const datePicker = document.getElementById("datepicker");

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if(window.HorizontalChart !== undefined){
            window.HorizontalChart(reportState.report.labels, reportState.report.datasets, "L","money")
        }        
    },[chart, reportState.report.labels, reportState.report.datasets])

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])

    const updateReportState =(report)=>{
        setReportState({...reportState, "report":{"labels": report.labels, "datasets": report.datasets } } )
    }

    return(
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="6" sub="22"></SideMenu>
                <div className="content">
                    <Header></Header>
                
                    <h2 className="intro-y text-lg font-medium mt-10">Reporte de ingresos y ganancias</h2>
                    <div className="box p-5 mt-5">
                        <div>
                            <div> 
                                
                                <label>Rango de fechas</label> 
                                <div className="relative w-full mx-auto mt-2">                                   
                                    <input data-daterange="true" id="datepicker" className="datepicker input w-full border block mx-auto mt-2"/> 
                                </div>
                            </div> 
                            
                            <button style={{display:(loading.button)?"":"none" }}  className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }}  onClick={ ()=>{ dispatch(getIncomesReport({ company : cookie.cookie.login.companyId, 
                                                                                                                                date   : {init: window.startDate, end:  window.finishDate },
                                                                                                                                updateReportState: updateReportState }))  } } type="button" className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                        </div>
                       
                    </div>
                    {(loading.loading)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)}                       
                    
                    {(report.show)
                        ?(  <div>                                                                            
                                    {(reportState.report.labels.length<1)
                                        ? <div className="box p-5 mt-5">
                                            <div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">No hemos encontrado ventas realizadas en estas fechas</div>
                                          </div>
                                        :<div className="intro-y box mt-5">
                                            
                                            <div className="p-5" id="horizontal-bar-chart">
                                                <div className="preview">
                                                    <canvas id="horizontal-bar-chart-widget" min-height={window.screen.width <= 800 ?500: 100} />
                                                </div>                                            
                                            </div>
                                        </div> }                                                                                  
                                </div>)
                        :<> </>}                     
                </div>
            </div>
        </div>
    )
}

export default IncomeChart;