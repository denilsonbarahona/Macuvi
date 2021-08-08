import {React, useState, useEffect}         from 'react';
import {useDispatch, useSelector}           from 'react-redux';
import { getCookie }                        from '../../../../cookies/selectors/cookie.selector';
import { getNotifications}                  from '../../core/actions/notification.actions';
import { loadCookie }                       from '../../../../cookies/actions/cookie.actions';

const HeaderNotification = ()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)
    const [notificaions, setNotifications] = useState([])

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{        
        if(!cookie.find){
            dispatch(getNotifications({company: cookie.cookie.login.companyId, setNotificationState: setNotificationState}))           
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])

    const setNotificationState =(notifications_)=>{
        setNotifications(notifications_)
    }

    return ( <div className="intro-x dropdown mr-auto sm:mr-6">
                <div className={(notificaions.length>0)
                                    ?"dropdown-toggle notification notification--bullet cursor-pointer"
                                    :"dropdown-toggle cursor-pointer"
                                }> 
                    <i data-feather="bell" className="notification__icon" /> 
                </div>
                <div className="notification-content pt-2 dropdown-box">
                    <div className="notification-content__box dropdown-box__content box">
                        <div className="notification-content__title">Notificaciones</div>                        
                        {notificaions.map((item, index)=>(
                            <div key={index}  
                                className="cursor-pointer relative flex items-center mt-5 ">
                                <div className="w-12 h-12 flex-none image-fit mr-1">
                                    <img alt="notification" className="rounded-full" src="/assets/images/item.jpg" />
                                    <div className="w-3 h-3 bg-theme-9 absolute right-0 bottom-0 rounded-full border-2 border-white" />
                                </div>
                                <div className="ml-2 overflow-hidden">
                                    <div className="flex items-center cursor-pointer">
                                        <div className="font-medium truncate mr-5">{item.data.NotificationType}</div> 
                                        <div className="text-xs text-gray-500 ml-auto whitespace-nowrap">{item.data.NotificationDate}</div>
                                    </div>
                                    <div className="w-full truncate text-gray-600 mt-0.5"> {item.data.NotificationMsj}</div>
                                </div>
                            </div>
                        ))} 
                        {notificaions.length===0
                            ?<div className="w-full truncate text-sm text-gray-600 mt-0.5" >No hay notificaciones para visualizar</div>
                            :<></> }                                            
                    </div>
                </div>
            </div> )
}

export default HeaderNotification;