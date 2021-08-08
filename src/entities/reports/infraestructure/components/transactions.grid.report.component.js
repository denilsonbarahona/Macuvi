import { React , useState, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import Header                          from '../../../header/infraestructure/components/header.component';
import MobileMenu                      from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                        from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                  from '../../../ui/core/selector/ui.selector';
import { getCookie  }                  from '../../../../cookies/selectors/cookie.selector'; 
import { getReports }                  from '../../core/selector/report.selector'; 
import { getTransactionsByDate }       from '../../core/actions/report.actions';
import { loadCookie }                  from '../../../../cookies/actions/cookie.actions';

const TransactionsReport =()=>{

    const dispatch = useDispatch()
    const loading = useSelector(getLoading);
    const cookie = useSelector(getCookie); 
    const report = useSelector(getReports);
    const [transactions, setTransactions] = useState([]) 
    const datePicker = document.getElementById("datepicker");

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])

    const fillTransactions =(transactions)=>{
        setTransactions(transactions)
    }

    return(
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="6" sub="32"></SideMenu>
                <div className="content">
                    <Header></Header>
                
                    <h2 className="intro-y text-lg font-medium mt-10">Reporte de transaciones realizadas</h2>
                    <div className="box p-5 mt-5">
                        <div>
                            <div> 
                                
                                <label>Rango de fechas</label> 
                                <div className="relative w-full mx-auto mt-2">                                   
                                    <input data-daterange="true" id="datepicker" className="datepicker input w-full border block mx-auto mt-2"/> 
                                </div>
                            </div> 
                            
                            <button style={{display:(loading.button)?"":"none" }}  className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }}  onClick={ ()=>{ dispatch(getTransactionsByDate({ company : cookie.cookie.login.companyId, 
                                                                                                                                date   : {init: window.startDate, end:  window.finishDate },
                                                                                                                                fillTransactions: fillTransactions }))  } } type="button" className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
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
                                    {(transactions.length<1)
                                        ? <div className="box p-5 mt-5">
                                            <div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">No se ha encontrado transacciones realizadas en esta fecha </div>
                                          </div>
                                        :<div className="intro-y box mt-5">
                                            {transactions.length>0 && transactions.map((item, index)=>(
                                                <div key={index} className="intro-x">
                                                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                                        <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                        <img alt="transaction" src="/assets/images/item.jpg" />
                                                        </div>
                                                        <div className="ml-4 mr-auto">
                                                            <div className="font-semibold text-xs">{item.data.billingCreatedBy}</div>
                                                            <div className="text-gray-600 text-xs mt-0.5">{item.data.billingDate}</div>
                                                        </div>
                                                        <div className="text-theme-9">{Number(item.data.billingTotal).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    }                                                                                  
                                </div>)
                        :<> </>}                     
                </div>
            </div>
        </div>
    )
}

export default TransactionsReport;