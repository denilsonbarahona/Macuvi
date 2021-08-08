import { React, useEffect } from 'react';
import { setNotificationAsReaded} from '../../core/actions/notification.actions';
import { useDispatch } from 'react-redux';

const NotificationLogItem =(props)=>{    

    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.state){
            window.feather.replace()
        }
    },[props.state])

    return (<div className="intro-y"  onClick={()=>{ dispatch(setNotificationAsReaded({id: props.state.id, company: props.state.data.NotificationCompany})) }}>
                <div className={props.state.data.NotificationState?
                                    "inbox__item--active inbox__item inline-block sm:block text-gray-700 bg-gray-100 border-b border-gray-200":
                                    "inbox__item inline-block sm:block text-gray-700 bg-gray-100 border-b border-gray-200"} >
                    <div className="flex px-5 py-3">
                        <div className="w-72 flex-none flex items-center mr-5">                            
                            <div className="w-6 h-6 flex-none image-fit relative ml-5">
                                <img alt="notification item" className="rounded-full" src="/assets/images/item.jpg" />
                            </div>
                            <div className="inbox__item--sender truncate ml-3">
                                <div className={props.state.data.NotificationState?
                                    "font-semibold":""} >{props.state.data.NotificationType}</div>                            
                            </div>
                        </div>
                        <div className={props.state.data.NotificationState?
                                            "w-64 sm:w-auto truncate font-semibold":
                                            "w-64 sm:w-auto truncate"}> 
                            {props.state.data.NotificationMsj}
                        </div>
                        <div className="inbox__item--time whitespace-nowrap ml-auto pl-10"> 
                           <div className={props.state.data.NotificationState?
                                    "font-semibold":""} >{props.state.data.NotificationDate} 
                            </div> 
                        </div>
                    </div>
                </div>
            </div>)
}

export default NotificationLogItem;