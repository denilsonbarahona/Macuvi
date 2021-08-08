import { React , useState, useEffect } from 'react';
import { useDispatch, useSelector }    from 'react-redux';
import Header                          from '../../../header/infraestructure/components/header.component';
import MobileMenu                      from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                        from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                  from '../../../ui/core/selector/ui.selector';
import { getCookie  }                  from '../../../../cookies/selectors/cookie.selector'; 
import { getProductsSalesReport }      from '../../core/actions/report.actions';
import { loadCookie }                  from '../../../../cookies/actions/cookie.actions';

const ProductsSale =()=>{

    const dispatch = useDispatch()
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie);  
    const [showReport, setShowReport] = useState( {show: false, data:{labels:[], datasets:[]} } )
    const chart = document.getElementById("horizontal-bar-chart-widget");

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getProductsSalesReport({company: cookie.cookie.login.companyId, UpdateshowReport: UpdateshowReport}))           
        }
    },[cookie.find, dispatch, cookie.cookie.login.companyId])


    useEffect(()=>{
        if(window.HorizontalChart !== undefined){
            window.HorizontalChart(showReport.data.labels, showReport.data.datasets, "L","product")
        }        
    },[chart, showReport.data.labels, showReport.data.datasets])


    const UpdateshowReport=(report)=>{
        setShowReport({show: true, "data":{"labels": report.labels, "datasets": report.datasets } } )
    }


    return (
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="6" sub="23"></SideMenu>
                <div className="content">
                    <Header></Header>
                
                    <h2 className="intro-y text-lg font-medium mt-10">Reporte de ventas por productos</h2>
                    {(loading.loading)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)}                       
                    
                    {(showReport.show)
                        ?(  <div>                                                                            
                                    {(showReport.data.labels.length<1)
                                        ? <div className="box p-5 mt-5">
                                            <div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">No se han realizado ventas de productos hasta el momento</div>
                                          </div>
                                        :<div className="intro-y box mt-5">
                                            
                                            <div className="p-5" id="horizontal-bar-chart">
                                                <div className="preview">
                                                    <canvas id="horizontal-bar-chart-widget" height={window.screen.width <= 800 ?500: 100} />
                                                </div>                                            
                                            </div>
                                        </div>
                                    }                                                                                  
                                </div>)
                        :<> </>}                     
                </div>
            </div>
        </div>
    )
}


export default ProductsSale;