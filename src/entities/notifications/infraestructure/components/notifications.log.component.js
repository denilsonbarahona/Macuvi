import { React, useState ,useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import NotificationLogHeader            from './notification.log.header.component';
import NotificationLogItem              from './notification.log.item.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector';
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import {getLastNotifications}           from '../../core/actions/notification.actions';

const NotificationsLog =()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)  
    const loading  = useSelector(getLoading)
    const [Notifications, setNotifications] = useState([]) 

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getLastNotifications({company: cookie.cookie.login.companyId}))           
        }
    },[dispatch, cookie.find, cookie.cookie.login.companyId])

    const setNotificationState = (notificaions) =>{
        setNotifications(notificaions);
    }

    window.setNotificationState = setNotificationState

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="8" sub=""></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8"> 
                            <h2 className="text-lg font-medium mr-auto">
                                Bandeja de notificaciones
                            </h2> 
                    </div>
                    <div className="col-span-12 lg:col-span-9 xxl:col-span-10">
                        {loading.loading
                            ?<UiLoading loading={true}></UiLoading>
                            :<div className="intro-y inbox box mt-5">
                                <NotificationLogHeader></NotificationLogHeader>
                                <div className="overflow-x-auto sm:overflow-x-visible">
                                    {Notifications.length>0 && Notifications.map((item, index)=>(
                                        
                                        <NotificationLogItem key={index} state={{...item}} ></NotificationLogItem>
                                    ))}
                                    {Notifications.length<1
                                        ? <div className="p-5 mt-5">
                                            <div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">No se encontraron notificaciones para mostrar </div>
                                          </div>
                                        :<></> }
                                </div>
                                <div className="p-5 flex flex-col sm:flex-row items-center text-center sm:text-left text-gray-600"></div>
                            </div>}
                    </div>
                </div>
            </div>                                    
        </>
    )
}

export default NotificationsLog;