import {React, useEffect}         from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCookie }              from '../../../../cookies/selectors/cookie.selector';
import { loadCookie, logOut }     from '../../../../cookies/actions/cookie.actions';
import HeaderNotification         from '../../../notifications/infraestructure/components/notification.component';

const Header=()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)

    useEffect(()=>{
        document.getElementById("logout").addEventListener("click",()=>{
            dispatch(logOut())
        })

        if(cookie.find){
            dispatch(loadCookie())
        }
    })
 
    if(cookie.logout){
        window.location.href="/"
    }

    return(
            <div className="top-bar">
                {/* BEGIN: Breadcrumb */}
                <div className="-intro-x breadcrumb mr-auto hidden sm:flex"></div>
                {/* END: Breadcrumb */}
                <HeaderNotification></HeaderNotification>
                {/* BEGIN: Account Menu */}
                <div className="intro-x dropdown w-9 h-9"  >
                    <div className="dropdown-toggle w-9 h-9 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                        <img alt="macuvi profile icon" src="/assets/images/profile-8a.jpg" />
                    </div>
                    <div className="dropdown-box w-56 show" 
                         style={{width: "224px",position: "absolute", inset: "0px auto auto 0px", margin: "0px", transform: "translate(1626px, 64px)"}}>
                        <div className="dropdown-box__content box bg-theme-38 text-white">
                            <div className="p-4 border-b border-theme-40 dark:border-dark-3">
                                <div className="font-medium">{ (cookie.cookie.login !== undefined)?cookie.cookie.login.name:"" }</div>                                
                            </div>
                            <div  className="p-2 border-t border-theme-40 dark:border-dark-3 cursor-pointer">
                                <div id="logout" 
                                     className="flex pointer items-center  p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"> 
                                        <i data-feather="toggle-right" className="w-4 h-4 mr-2" /> Cerrar sesión 
                                </div>
                            </div>                           
                        </div>
                    </div>
                </div>
                {/* END: Account Menu */}
            </div>
    )
}


export default Header