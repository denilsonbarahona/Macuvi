import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie  } from '../../../../cookies/selectors/cookie.selector'; 
import { loadCookie } from '../../../../cookies/actions/cookie.actions';
import {createSideMenu} from '../../core/services/menu.service';

const SideMenu=( active )=>{

    const dispatch = useDispatch()
    const cookie = useSelector(getCookie)   
    const [Menu, setSideMenu] = useState([]);
    const sideMenu = document.getElementsByClassName("side-menu");
 
    useEffect(()=>{ 
        if (window.setMenu) {
            window.setMenu()
        }
    },[sideMenu.length])

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])
      
    useEffect(()=>{
        if(!cookie.find){
            createSideMenu(cookie.cookie.login.access, active)
        }
    },[dispatch, cookie.find, cookie.cookie.login.access, active])


    window.setSideMenu = setSideMenu 

    return(       
        <nav className="side-nav">

            <a href="/admin" className="intro-x flex items-center pl-5 pt-4">
                <img alt="macuvi logo" className="w-10" src="/assets/images/macuvi.svg" />
                <span className="hidden xl:block text-white text-lg ml-3"> Mac<span className="font-medium">uvi</span> </span>
            </a>
            <div className="side-nav__devider my-6" />
            {cookie.find || Menu === undefined
                ?<></>
                :<ul>
                    <li className="cursor-pointer">
                        <a href="/admin" className={(active.code ==="1")?"side-menu side-menu--active":"side-menu"}>
                            <div className="side-menu__icon"> <i data-feather="home" /> </div>
                            <div className="side-menu__title"> Inicio </div>
                        </a>
                    </li>
                    {cookie.cookie.login.isMaster
                        ?<li>
                            <a href="/admin/get-notifications" className={(active.code ==="8")?"side-menu side-menu--active":"side-menu"}>
                                <div className="side-menu__icon"> <i data-feather="inbox"></i> </div>
                                <div className="side-menu__title"> Bandeja de entrada </div>
                            </a>
                         </li>
                        :<></> }
                    
                    <li className="cursor-pointer">
                        {Menu["in-out"] !== undefined && Menu["in-out"].header}
                        <ul>
                            {Menu["in-out"] !== undefined && Menu["in-out"].items[0]}
                            {Menu["in-out"] !== undefined && Menu["in-out"].items[1]}
                            {Menu["in-out"] !== undefined && Menu["in-out"].items[2]}
                            {Menu["in-out"] !== undefined && Menu["in-out"].items[3]}
                            {Menu["in-out"] !== undefined && Menu["in-out"].items[4]}
                        </ul>
                    </li>
                    <li className="cursor-pointer">
                        {Menu["stock"] !== undefined && Menu["stock"].header}
                        <ul>
                            {Menu["stock"] !== undefined && Menu["stock"].items[0]}
                            {Menu["stock"] !== undefined && Menu["stock"].items[1]}
                            {Menu["stock"] !== undefined && Menu["stock"].items[2]}
                            {Menu["stock"] !== undefined && Menu["stock"].items[3]}
                            {Menu["stock"] !== undefined && Menu["stock"].items[4]}
                        </ul>
                    </li>
                    <li className="cursor-pointer">
                        {Menu["customers"] !== undefined && Menu["customers"].header}
                        <ul>
                            {Menu["customers"] !== undefined && Menu["customers"].items[0]}
                            {Menu["customers"] !== undefined && Menu["customers"].items[1]}
                            {Menu["customers"] !== undefined && Menu["customers"].items[2]}
                        </ul>
                    </li>
                    <li className="cursor-pointer">
                        {Menu["promo-discount"] !== undefined && Menu["promo-discount"].header}
                        <ul>
                            {Menu["promo-discount"] !== undefined && Menu["promo-discount"].items[0]}
                            {Menu["promo-discount"] !== undefined && Menu["promo-discount"].items[1]}
                            {Menu["promo-discount"] !== undefined && Menu["promo-discount"].items[2]}
                            {Menu["promo-discount"] !== undefined && Menu["promo-discount"].items[3]}
                        </ul>
                    </li>
                    <li className="side-nav__devider my-6" />
                    <li className="cursor-pointer">
                        {Menu["report"] !== undefined && Menu["report"].header}
                        <ul>
                            {Menu["report"] !== undefined && Menu["report"].items[0]}
                            {Menu["report"] !== undefined && Menu["report"].items[1]}
                            {Menu["report"] !== undefined && Menu["report"].items[2]}
                            {Menu["report"] !== undefined && Menu["report"].items[3]}
                            {Menu["report"] !== undefined && Menu["report"].items[4]}
                        </ul>
                    </li>
                    <li className="cursor-pointer">
                        {Menu["config"] !== undefined && Menu["config"].header}
                        <ul>
                            {Menu["config"] !== undefined && Menu["config"].items[0]}
                            {Menu["config"] !== undefined && Menu["config"].items[1]}
                            {Menu["config"] !== undefined && Menu["config"].items[2]}
                            {Menu["config"] !== undefined && Menu["config"].items[3]}
                            {Menu["config"] !== undefined && Menu["config"].items[4]}
                            {Menu["config"] !== undefined && Menu["config"].items[5]}
                            {Menu["config"] !== undefined && Menu["config"].items[6]}
                            {Menu["config"] !== undefined && Menu["config"].items[7]}
                        </ul>
                    </li>
            </ul> }
        </nav>)
}

export default SideMenu;