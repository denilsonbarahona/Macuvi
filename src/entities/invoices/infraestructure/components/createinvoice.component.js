import { React, useEffect }   from 'react';
import { useSelector, useDispatch }  from 'react-redux';
import { getProducts }        from '../../../products/core/selectors/products.selectors';
import { getBalance_}         from '../../../balance/core/selector/balance.selector';
import { getLoading }         from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { GetProductsByInput } from '../../../products/core/actions/products.actions';
import { getBalance }         from '../../../balance/core/actions/balance.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';
import SideMenu               from '../../../menu/infraestructure/components/side_menu.component';
import MobileMenu             from '../../../menu/infraestructure/components/mobile_menu.component';
import Header                 from '../../../header/infraestructure/components/header.component';
import IdentitiesPopUp        from '../../../products/infraestructure/components/identities.popup.component';
import GridProducts           from '../../../products/infraestructure/components/products.grid.component';
import GridCategories         from '../../../categories/infraestructure/components/categories.grid.component';
import InitBalanceForm        from '../../../balance/infraestructure/components/create.balance.form.component';
import Ticket                 from './tickets.invoice.component';


const CreateInvoice=()=>{

    const dispatch = useDispatch()
    const products = useSelector(getProducts);    
    const balance  = useSelector(getBalance_);  
    const loading  = useSelector(getLoading);
    const cookie   = useSelector(getCookie);    
    
    const onFilterChange =(e)=>{
        dispatch(GetProductsByInput({products: products.payload, input: e.target.value, company:cookie.cookie.login.companyId }))
    }

    useEffect(()=>{
        if(balance.check && !cookie.find && !loading.loading){
            dispatch(getBalance({company:cookie.cookie.login.companyId, auth:cookie.cookie.login.id}))
        }        
    })    

    return(
        <>
            <MobileMenu></MobileMenu>
            <div  className="flex">
                <SideMenu code="2" sub="1"></SideMenu> 
                <div className="content">
                    <Header></Header>
                    { !cookie.find && cookie.cookie.company.CompanyEndingDocs
                        ?<></>
                        :<div  onClick={()=>window.location.href="/admin/update-company"}  
                            className="rounded-md flex items-center px-2 py-2 mt-2 cursor-pointer mb-2 bg-theme-12 text-white"> 
                            <i data-feather="alert-circle" className="w-6 h-6 mr-2"></i>
                            No se ha detectado una configuración de facturación, para realizarla has click aqui. Esta parte es necesario para iniciar a facturar
                         </div> }
                    
                    {(loading.loading && balance.check)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)}                     
                    {(balance.payload.length > 0) 
                        ?<>
                            <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                                <h2 className="text-lg font-medium mr-auto">
                                    Registrar venta
                                </h2>
                                <div className="w-full sm:w-auto flex mt-4 sm:mt-0">
                                    <div data-toggle="modal" data-target="#identities-modal" 
                                         className="button text-white bg-theme-1 shadow-md mr-2">
                                             Identificadores ({ ( (products.identities==="" || products.identities === undefined)?0:products.identities.trim().split("\n").length.toString() ) })
                                    </div> 
                                </div>
                            </div>                            
                            <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                                <div className="intro-y col-span-12 lg:col-span-8">
                                    <div className="flex intro-y">
                                        <div className="relative w-9/12 text-gray-700 dark:text-gray-300">
                                            <input type="text" onChange={onFilterChange} className="input w-9/12 w-full box pr-10 placeholder-theme-13" placeholder="Ingrese el nombre o código de barra del producto…" />
                                            <i className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-feather="search" /> 
                                        </div>                                           
                                    </div>
                                    <GridCategories></GridCategories> 
                                    <GridProducts></GridProducts>
                                    
                                </div>
                                <Ticket></Ticket>
                            </div>
                            <div>
                                <IdentitiesPopUp></IdentitiesPopUp>
                            </div>
                         </>
                        :<>
                            {(!loading.loading)
                                    ? <div className="box p-5 mt-5">  
                                            <div className="p-2 gap-4 gap-y-3 font-medium text-theme-11">
                                                {"Antes de realizar una venta es necesario realizar la apertura de caja."} 
                                            </div>
                                            <InitBalanceForm cookies={{...cookie.cookie, balance: balance}}></InitBalanceForm>
                                       </div>
                                    :<></>} 
                         </>}                            
                </div>                
            </div>
        </>
    )
}

export default CreateInvoice;