import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import DeleteConfirmation from './tax.delete.confirmation.component';
import UiLoading         from '../../../ui/infraestructure/components/ui.loading.component';
import TaxTable          from './taxes.table.component';
import { getLoading }    from '../../../ui/core/selector/ui.selector';
import { getCookie  }    from '../../../../cookies/selectors/cookie.selector'; 
import { GetTableTaxes } from '../../core/actions/taxes.actions';
import { loadCookie }    from '../../../../cookies/actions/cookie.actions';

const TaxesList =()=>{

    const dispatch   = useDispatch();
    const [Taxes, setTaxes] = useState([])
    const [idDelete , setIdDelete] = useState("")
    const loading = useSelector(getLoading);
    const cookie = useSelector(getCookie);    

    useEffect(()=>{        
        if(cookie.find){
            dispatch(loadCookie())           
        } 
    },[dispatch, cookie.find])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(GetTableTaxes({company: cookie.cookie.login.companyId}))
        } 
    },[dispatch, cookie.find, cookie.cookie.login.companyId])

    const setTaxesList =(taxes)=>{
        setTaxes( taxes )
    }

    window.setTaxesList = setTaxesList

    const onClickEdit =(id)=>{
        window.location.href = '/admin/update-tax/'+id
    }

    const onClickDelete =(id)=>{
        window.showModal("#delete-tax")
        setIdDelete(id)
    }

    return (
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="7" sub="29"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Lista de impuestos </h2>                                                                       
                    </div>  
                    {(loading.loading)
                        ?<UiLoading loading={loading.loading}></UiLoading>  
                        :<div className="grid grid-cols-12 gap-6 mt-5">
                            {(cookie.cookie.login !== undefined)
                                ?<DeleteConfirmation 
                                    state = {{id: idDelete, company: cookie.cookie.login.companyId}}></DeleteConfirmation>
                                :<></>}  
                            <TaxTable state={{tax: Taxes, onClickDelete: onClickDelete, onClickEdit: onClickEdit}} ></TaxTable>                                       
                        </div>}                                        
                </div>
            </div>                                    
        </>
    )
}

export default TaxesList;