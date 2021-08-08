import { React, useEffect }             from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import ItemsSalesDashBoard              from '../../../reports/infraestructure/components/weekly.items.sales.dashboard.component';
import TodayTotalSales                  from '../../../reports/infraestructure/components/daily.sales.dashboard.component';
import TodayProductsSales               from '../../../reports/infraestructure/components/daily.products.sales.dashboard.component';
import DailyIncomesDashboard            from '../../../reports/infraestructure/components/daily.income.dashboard.component';
import CurrentBalanceDashBoard          from '../../../reports/infraestructure/components/daily.balance.dashboard.component';
import CompareMonthsDashBoard           from '../../../reports/infraestructure/components/compare.months.sales.dashboard.component';
import TopProductDashBoard              from '../../../reports/infraestructure/components/top.products.dashboard.component';
import TopCategoriesDashBoard           from '../../../reports/infraestructure/components/top.categories.dashboard.component';
import TopTransactions                  from '../../../reports/infraestructure/components/top.transactions.dashboard.component';
import TopActivities                    from '../../../reports/infraestructure/components/top.recent.activities.dashboard.component';

const GeneralReports =()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie); 
    
    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="1" sub="0"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="grid grid-cols-12 gap-6">
                        {/***********HERE THERE ARE REPORTS*********/}
                        <div className="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
                            <div className="col-span-12 mt-8">
                                <div className="intro-y flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        Reportes generales
                                    </h2>
                                    <a href="/admin" className="ml-auto flex text-theme-1 dark:text-theme-10"> <i data-feather="refresh-ccw" className="w-4 h-4 mr-3" /> Recargar datos </a>
                                </div>
                                <div className="grid grid-cols-12 gap-6 mt-5">
                                    <ItemsSalesDashBoard></ItemsSalesDashBoard>
                                    <TodayTotalSales></TodayTotalSales>
                                    <TodayProductsSales></TodayProductsSales>
                                    {(!cookie.find && cookie.cookie.login.isMaster)
                                        ?<DailyIncomesDashboard></DailyIncomesDashboard>
                                        :<CurrentBalanceDashBoard></CurrentBalanceDashBoard>}                                                                                
                                </div>
                                
                            </div>    
                            <div className="col-span-12 lg:col-span-6 mt-8">
                                <div className="intro-y block sm:flex items-center h-10">
                                    <h2 className="text-lg font-medium truncate mr-5">
                                        Reporte de ingreso trimestral
                                    </h2>
                                </div>
                                <CompareMonthsDashBoard></CompareMonthsDashBoard>                                                                    
                            </div>
                            <TopProductDashBoard></TopProductDashBoard>
                            <TopCategoriesDashBoard></TopCategoriesDashBoard>
                        </div>
                        {/************* HERE ARE TRANSACTIONS ***********/}
                        <div className="col-span-12 xxl:col-span-3 xxl:border-l border-theme-5 -mb-10 pb-10">
                            <TopTransactions></TopTransactions>
                            <TopActivities></TopActivities>
                        </div>
                            

                    </div>
                </div>
            </div>                                    
        </>
    )
}

export default GeneralReports;