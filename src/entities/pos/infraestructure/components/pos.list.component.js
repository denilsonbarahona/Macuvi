import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import DeletePOSConfirmation            from './delete.pos.popup.component';
import POSTable                         from './pos.table.component'
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { getPOS }                       from '../../core/selector/pos.selector'; 
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import { getPOSList }                   from '../../core/actions/posActions'

const ListPOS =()=>{

    const dispatch   = useDispatch();
    const [page, setPage] = useState((window.posPage === undefined)?0:window.posPage )
    const [idDelete , setIdDelete] = useState("")
    const loading    = useSelector(getLoading);    
    const cookie     = useSelector(getCookie);    
    const pos        = useSelector(getPOS);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{ 
        if(!cookie.find && pos.getPOS){            
            dispatch(getPOSList( {  company  :  cookie.cookie.login.companyId ,
                                    setPager : setPager } ))
        }
    },[dispatch, pos.getPOS, cookie.find, cookie.cookie.login.companyId])

    const setPager = (index)=>{
        setPage(index)
    }

    const deletePOS =(id)=>{
        window.showModal("#delete-pos")
        setIdDelete(id)
    }

    const onEditPOS = (id)=>{
        window.location.href="/admin/update-pos/"+id
    }

    return (
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="7" sub="27"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Listado de POS </h2>                                                                       
                    </div>  
                    {(!cookie.find)
                        ?<DeletePOSConfirmation state={{idDelete : idDelete ,
                                                        company  : cookie.cookie.login.companyId ,
                                                        setPager : setPager }}></DeletePOSConfirmation>
                        :<></> }
                    {(loading.loading || cookie.find)
                        ?<UiLoading loading={loading.loading}></UiLoading>  
                        :<POSTable props={{...pos.payload, page: page, 
                                            setPager : setPager, 
                                            deletePOS: deletePOS,
                                            onEditPOS: onEditPOS
                                        }}></POSTable>}                                        
                </div>
            </div> 
        </div>
    )
}

export default ListPOS;
