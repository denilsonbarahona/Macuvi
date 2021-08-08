import { React, useState, useEffect } from 'react';
import { useDispatch,useSelector }    from 'react-redux';
import { useHistory}     from "react-router-dom";
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import InvoiceTable      from './invoice.table.component';
import {getInvoicesList} from '../../core/actions/invoice.actions';
import { loadCookie  }   from '../../../../cookies/actions/cookie.actions';
import { initCleanUp } from '../../core/actions/invoice.actions';
import { getCustomers }  from '../../../customers/core/actions/customer.action';
import { getInvoice  }   from '../../core/selector/invoice.selector';
import { getLoading  }   from '../../../ui/core/selector/ui.selector';
import { getCustomer }   from '../../../customers/core/selector/customer.selector';
import { getCookie   }   from '../../../../cookies/selectors/cookie.selector';
import Select            from 'react-select';


const DataListInvoices =()=>{
    
    const dispatch              = useDispatch();
    const history               = useHistory();
    const invoice               = useSelector(getInvoice)
    const cookie                = useSelector(getCookie)  
    const customers             = useSelector(getCustomer);   
    const loading               = useSelector(getLoading);
    const [filters, setFilters] = useState( { customer:"", length: 15, page : (window.page === undefined)?0:window.page } );
    const invoiceTable = document.getElementById("invoiceTable");
    const datePicker = document.getElementById("datepicker");

    useEffect(()=>{
        if (datePicker && window.setDateFilters) {
            window.setDateFilters()
        }
    },[datePicker])

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch,cookie.find])

    useEffect(()=>{
        if( invoice.getInvoices && customers.getCustomers ){
            dispatch(getCustomers((cookie.cookie.login === undefined)?"":cookie.cookie.login.companyId))
         }
    },[dispatch, cookie.cookie.login.companyId, 
            invoice.getInvoices, customers.getCustomers, cookie.cookie.login ])

    useEffect(()=>{        
        if(invoiceTable !== null) {
            window.setMenu()
        }
    },[invoiceTable])

    const onCustomerChange =(e)=>{
        window.customer = e
        setFilters(()=>({...filters, "customer": e }))
    }

    const fnViewInvoice=(id)=>{
        dispatch(initCleanUp())
        history.push({pathname:"/admin/view-invoice/"+id })        
    }

    const onSearchInvoices=()=>{
        setFilters(()=>({...filters, "page": 0 }))
        dispatch(
            getInvoicesList({...filters, 
                            company : cookie.cookie.login.companyId ,
                            from    : window.startDate ,
                            until   : window.finishDate
                        })) 
    }

    const onClickPage =(index)=>{
        window.page = index;
        setFilters(()=>({ ...filters, "page": index }));
    }

    return(
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="2" sub="5"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <h2 className="intro-y text-lg font-medium mt-10">Lista de facturas</h2>
                    <div className="box p-5 mt-5">
                        <div>
                            <div> 
                                
                                <label>Rango de fechas</label> 
                                <input data-daterange="true" id="datepicker" className="datepicker input w-full border block mx-auto mt-2"/> 
                            </div>
                            <div className="mt-3"> 
                                <label>Lista de clientes</label> 
                                <Select id="customer"
                                        onChange={(onCustomerChange)}  
                                        value={(window.customer === undefined)?filters.customer:window.customer}
                                        className="mr-auto text-gray-600 text-xs whitespace-nowrap  block mx-auto mt-2 w-full"
                                        options={customers.payload} />
                            </div>
                            
                            <button style={{display:(loading.button)?"":"none" }}  className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                            <button style={{display:(loading.button)?"none":"" }}  onClick={ onSearchInvoices } type="button" className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                        </div>
                       
                    </div>                    
                    {(invoice.invoicesList.invoices !== undefined && !loading.button)
                        ?(<InvoiceTable invoices ={{...invoice.invoicesList, fnViewInvoice: fnViewInvoice, fnChangePage: onClickPage, page: filters.page }}></InvoiceTable>)
                        :(<></>) }                    
                </div>
            </div>
        </>
    )
}

export default DataListInvoices;
