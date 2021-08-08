import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie  } from '../../../../cookies/selectors/cookie.selector'; 
import { loadCookie } from '../../../../cookies/actions/cookie.actions';
import {createMobileMenu } from '../../core/services/menu.service';

const MobileMenu=()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)   
    const [Menu, setMobileMenu] = useState([]);
    const menuToggler = document.getElementById("mobile-menu-toggler");

    useEffect(()=>{
        if (window.setMobileSideMenu) {
            window.setMobileSideMenu()
        }

        if (window.feather) {
            window.feather.replace()
        }
    },[menuToggler])

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])
      
    useEffect(()=>{
        if(!cookie.find){            
            createMobileMenu(cookie.cookie.login.access)
        }
    },[dispatch, cookie.find, cookie.cookie.login.access])

    window.setMobileMenu = setMobileMenu

    return(
        <div className="mobile-menu md:hidden">
            <div className="mobile-menu-bar">
                <a href="/admin" className="flex mr-auto">
                    <img alt="macuvi logo" className="w-10" src="/assets/images/macuvi.svg" />
                </a>
                <div id="mobile-menu-toggler"> <i data-feather="bar-chart-2" className="w-8 h-8 text-white transform -rotate-90" /> </div>
            </div>
            { cookie.find || Menu === undefined
                ?<></>
                :<ul className="border-t border-theme-24 py-5 hidden">
                    <li>
                        <a href="/admin" className="menu">
                            <div className="menu__icon"> <i data-feather="home" /> </div>
                            <div className="menu__title"> Inicio </div>
                        </a>
                    </li>
                    {cookie.cookie.login.isMaster
                        ?<li>
                            <a href="/admin/get-notifications" className="menu">
                                <div className="menu__icon"> <i data-feather="inbox" /> </div>
                                <div className="menu__title"> Bandeja de entrada </div>
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
                        <ul >
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

                    <li className="menu__devider my-6" />
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
                </ul>  }
            
        </div>

    )
}

export default MobileMenu;

