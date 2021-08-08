import {React} from 'react';
import { useSelector } from 'react-redux';
import { getNotification} from '../../core/selector/notification.selector';

const NotificationLogHeader =()=>{

    const notifications = useSelector(getNotification)
    
    return ( <div className="p-5 flex flex-col-reverse sm:flex-row text-gray-600 border-b border-gray-200 dark:border-dark-1">
                <div className="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-gray-200 pt-5 sm:pt-0 mt-5 sm:mt-0 -mx-5 sm:mx-0 px-5 sm:px-0">                    
                    <div className="flex items-center mt-3 sm:mt-0 border-t sm:border-0 border-gray-200 pt-5 sm:pt-0 mt-5 sm:mt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
                        <div >Has click en las notificaciones para marcar como leídas </div>
                    </div>
                    <div onClick={()=>window.location.reload()} className="w-5 h-5 ml-5 cursor-pointer flex items-center justify-center dark:text-gray-300"> 
                        <i className="w-4 h-4" data-feather="refresh-cw" /> 
                    </div>
                </div>
                <div className="flex items-center mt-3 border-t sm:border-0 border-gray-200 pt-5 sm:pt-0 mt-5 sm:mt-0 -mx-5 sm:mx-0 px-5 sm:px-0">
                    {notifications.notificationResponse.show
                        ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-6" >{notifications.notificationResponse.msj}</div>
                        :<></>}
                </div>
                <div className="flex items-center sm:ml-auto">
                    <div >Ultimas 50 notificaciones</div>
                </div>
            </div> )
}

export default NotificationLogHeader;