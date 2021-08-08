import { React , useState, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import Header                          from '../../../header/infraestructure/components/header.component';
import MobileMenu                      from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                        from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                  from '../../../ui/core/selector/ui.selector';
import { getCookie  }                  from '../../../../cookies/selectors/cookie.selector'; 
import { getReports }                  from '../../core/selector/report.selector'; 
import { getDailyReportGrid }          from '../../core/actions/report.actions';
import { loadCookie }                  from '../../../../cookies/actions/cookie.actions';

const DailyGridReport =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie); 
    const report   = useSelector(getReports);
    const [reportState, setReportState] = useState({ filter: "", report:[], total: 0 })
    const datePicker = document.getElementById("datepicker");

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])
    
    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])


    const updateReportState=(report)=>{
        setReportState({...reportState, "report": report.grouped, total: report.total })
    }

    return(
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="6" sub="21"></SideMenu>
                <div className="content">
                    <Header></Header>
                
                    <h2 className="intro-y text-lg font-medium mt-10">Detalle de venta diaria</h2>
                    <div className="box p-5 mt-5">
                        <div>
                            <div>                                 
                                <label>Seleccionar una fecha</label> 
                                <div className="relative w-full mx-auto mt-2">
                                    <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 border text-gray-600 dark:bg-dark-1 dark:border-dark-4"> 
                                        <i data-feather="calendar" className="w-4 h-4"></i> 
                                    </div> 
                                    <input type="text" id="datepicker" className="datepicker w-full input pl-12 border" data-single-mode="true"/>
                                </div>
                            </div> 
                            
                            <button style={{display:(loading.button)?"":"none" }}  className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }}  onClick={ ()=>{ dispatch(getDailyReportGrid({ company: cookie.cookie.login.companyId, 
                                                                                                                                 date   : window.startDate ,
                                                                                                                                 updateReportState: updateReportState
                                                                                                                                })) } } type="button" className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
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
                                <div className="box p-5 mt-5">                                            
                                    {(reportState.report.length<1)
                                        ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">No se ha encontrado productos vendidos en esta fecha </div>
                                        :<div className="px-5 sm:px-16 py-10 sm:py-20">
                                            <div className="overflow-x-auto">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="border-b-2 whitespace-nowrap"><div className="font-bold">PRODUCTO</div></th> 
                                                            <th className="border-b-2 whitespace-nowrap"><div className="font-bold">CANTIDADES VENDIDAS</div></th>      
                                                        </tr>
                                                    </thead>
                                                    <tbody> 
                                                        {reportState.report.map((result, index)=>(
                                                            <tr key={index}>
                                                                <td className="border-b">
                                                                    <div className="font-medium whitespace-nowrap">{result.product}</div>                                                                                     
                                                                </td>
                                                                <td  className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                                    <div className="text-gray-600 flex whitespace-nowrap">
                                                                        {result.quantity} productos vendidos
                                                                    </div>                                                                                                                                             
                                                                </td>
                                                            </tr>
                                                         ))  }
                                                           
                                                        <tr>
                                                            <td className="border-b">
                                                                <div className="whitespace-nowrap font-bold">TOTAL VENDIDO</div>                                                                                     
                                                            </td>
                                                            <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                                <div className="text-gray-600 flex whitespace-nowrap"> 
                                                                    { reportState.total } productos vendidos
                                                                </div>                                                                                                                                             
                                                            </td>
                                                        </tr>                                     
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>}                                                                                  
                                </div>                                           
                            </div> )
                        :<> </>}                     
                </div>
            </div>
        </div>
    )
}

export default DailyGridReport;