import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }        from 'react-redux';
import { getDashboard }       from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { getRecentActivities }from '../../core/actions/report.actions';
import { loadCookie }         from '../../../../cookies/actions/cookie.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';

const TopActivities = ()=>{

    const [activities, setActivities] = useState([])
    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 
 
    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])
    
    useEffect(()=>{
        if(!cookie.find){                    
            dispatch(getRecentActivities({ fillActivities:fillActivities,
                                         company: cookie.cookie.login.companyId }))                           
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])

    const fillActivities = (activities)=>{ 
        setActivities(activities)
    }

    return (<div className="xxl:pl-6 grid grid-cols-12 gap-6"> 
                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3">
                    <div className="intro-x flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            Actividades recientes
                        </h2>
                        {cookie.cookie.login.isMaster === 1 
                            ?<div onClick={()=> window.location.href="/admin/report/activities"} className="ml-auto text-theme-1 dark:text-theme-10 truncate cursor-pointer">Ver todo</div> 
                            :<></> }
                        
                    </div>
                    <div className="report-timeline mt-5 relative">
                        {(cookie.find || loading.recentActivities)
                            ?<UiLoading loading={loading.recentActivities}></UiLoading>
                            :<> {activities.map((item, index)=>(
                                    <div key={index} className="intro-x relative flex items-center mb-3">
                                        <div className="report-timeline__image">
                                            <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                                <img alt="Midone Tailwind HTML Admin Template" src="/assets/images/item.jpg" />
                                            </div>
                                        </div>
                                        <div className="box px-5 py-3 ml-4 flex-1 zoom-in">
                                            <div className="flex items-center">
                                                <div className="font-semibold text-xs">{item.data.activityAuthName}</div>
                                                <div className="text-xs text-gray-500 ml-auto">{item.data.activityDate}</div>
                                            </div>
                                            <div className="text-gray-600 mt-1">{item.data.activityDescription}</div>
                                        </div>
                                    </div>
                                )) }
                            </>}
                        {activities.length>0 || cookie.find || loading.recentActivities
                            ?<></>
                            :<div className="intro-x w-full block text-center 
                                    rounded-md py-3 border border-dotted border-theme-15 
                                    text-theme-16 cursor-pointer">
                                No hay actividades recientes </div>  }
                    </div>
                </div>
            </div>)
}

export default TopActivities;