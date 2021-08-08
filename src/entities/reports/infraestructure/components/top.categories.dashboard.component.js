import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }           from 'react-redux';
import { getDashboard }          from '../../../ui/core/selector/ui.selector';
import { getCookie  }            from '../../../../cookies/selectors/cookie.selector'; 
import { getTopCategoriesSales } from '../../core/actions/report.actions';
import { loadCookie }            from '../../../../cookies/actions/cookie.actions';
import UiLoading                 from '../../../ui/infraestructure/components/ui.loading.component';

const TopCategoriesDashBoard =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 
    const [showReport, setShowReport] = useState( {show: false, data:{labels:[], datasets:[]}, detail: []  } )
    const chart = document.getElementById("report-donut-chart");

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(window.DonutChart !== undefined){            
            window.DonutChart(showReport.data.labels, showReport.data.datasets, "","sales")
        }        
    },[ chart, showReport.data.labels, showReport.data.datasets])

    useEffect(()=>{
        if(!cookie.find){               
            dispatch(getTopCategoriesSales({  company : cookie.cookie.login.companyId , updateSetReportState: updateSetReportState  })) 
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])

    const updateSetReportState =(report)=>{         
        setShowReport({ show    : true, 
            "data"  :{"labels": report.labels, "datasets": report.datasets } ,
            detail  : report.detail
         })
    }
    return (  <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                <div className="intro-y flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5"> Las categorias mas vendidas </h2>                   
                </div>
                {  (!cookie.find && cookie.cookie.login.isMaster) 
                        ?<>
                            {loading.topCategories
                                ?<div className="mt-5 intro-y box pb-20 pt-9"><UiLoading loading={loading.topCategories}></UiLoading></div>
                                :<div className="intro-y box p-5 mt-5">
                                    <canvas className="mt-3" id="report-donut-chart" height={300} />
                                    <div className="mt-8">
                                        {showReport.detail.map((item,index)=>(                                            
                                            <div key={index} className="flex items-center">
                                                <div style={{background: item.color}} className="w-2 h-2 rounded-full mr-3" />
                                                <span className="truncate">{item.category}</span> 
                                                <div className="h-px flex-1 border border-r border-dashed border-gray-300 mx-3 xl:hidden" />                                                
                                            </div>
                                        ))}                                        
                                    </div>
                                </div>}
                             
                         </>
                        :<div className="flex box flex-col xl:flex-row xl:items-center h-96 text-center align-middle" >Esta información es únicamente visible para el administrador</div>}                                                
            </div> )
}

export default TopCategoriesDashBoard;