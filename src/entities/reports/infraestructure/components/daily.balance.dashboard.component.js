import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }        from 'react-redux';
import { getDashboard }       from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { getCurrentBalance }  from '../../core/actions/report.actions';
import { loadCookie }         from '../../../../cookies/actions/cookie.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';

const CurrentBalanceDashBoard =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 
    const [reportState, setReportState] = useState({total: 0 })

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            /**** setting the current week payload */            
            dispatch(getCurrentBalance({updateSetReportState:updateSetReportState,
                                         company : cookie.cookie.login.companyId, 
                                         uid     : cookie.cookie.login.id }))                             
        }
    },[cookie.find, dispatch, cookie.cookie.login.id, cookie.cookie.login.companyId ])

    const updateSetReportState =(response)=>{               
        setReportState({total: (response.length)?response[0].data.CashBalanceFinalBalanceCash:0 })
    }

    return (
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
                {loading.currentBalance 
                    ?<div className="box pb-20 pt-9"><UiLoading loading={loading.currentBalance}></UiLoading></div>
                    :<div className="box p-5">
                        <div className="flex">
                            <i data-feather="dollar-sign" className="report-box__icon text-theme-9" />                             
                        </div>
                        <div className="text-3xl font-bold leading-8 mt-6">{Number(reportState.total).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                        <div className="text-base text-gray-600 mt-1">Balance de caja</div>
                     </div> }
                
            </div>
        </div>

    )
}

export default CurrentBalanceDashBoard;