import { React, useEffect , useState }                 from 'react';
import { useDispatch, useSelector    }      from 'react-redux';
import Header                               from '../../../header/infraestructure/components/header.component';
import MobileMenu                           from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                             from '../../../menu/infraestructure/components/side_menu.component';
import TableDiscounts                       from '../components/discounts.table.component';
import DeleteDiscount                       from '../components/discount.delete.popup.component';
import { getLoading  }                      from '../../../ui/core/selector/ui.selector';
import { getCookie   }                      from '../../../../cookies/selectors/cookie.selector';
import { getDiscount }                      from '../../core/selector/discount.selector';
import { loadCookie  }                      from '../../../../cookies/actions/cookie.actions';
import { getDiscountsAvailable ,
         resetDiscountResponse }            from '../../core/actions/discount.actions'


const DiscountsList=()=>{

    const dispatch = useDispatch();
    const [Page, SetPage]         = useState((window.discountPage === undefined)?0:window.discountPage)
    const [idDelete, setIdDelete] = useState("")
    const loading    = useSelector(getLoading);
    const cookie     = useSelector(getCookie);
    const discounts  = useSelector(getDiscount);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getDiscountsAvailable({company: cookie.cookie.login.companyId}))           
        }
    },[dispatch, cookie.find, cookie.cookie.login.companyId])

    const onDeleteDiscount =(id)=>{
        dispatch(resetDiscountResponse())
        window.showModal("#delete-discount");
        setIdDelete(id)
    }

    const setPageIndex =(index)=>{
        window.discountPage = index;
        SetPage(index)
    }

    const showDiscount =(id)=>{
        window.location.href="/admin/update-discount/"+id
    }

    return (<div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="5" sub="19"></SideMenu>
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto">Lista de descuentos</h2>                                                                       
                        </div> 
                        {(discounts.loaded)
                            ?<DeleteDiscount state={{ company  : cookie.cookie.login.companyId ,
                                                        idDelete : idDelete ,
                                                        SetPage  : setPageIndex
                                                    }} ></DeleteDiscount>
                            :<></> }
                        
                        <TableDiscounts payload={{ discounts: discounts.payload, isLoaded: discounts.loaded ,SetPage: setPageIndex ,
                                                   Page     : Page, loading:loading, onDeleteDiscount: onDeleteDiscount,
                                                   showDiscount: showDiscount
                                                }} ></TableDiscounts>
                    </div>
                </div> 

            </div>)
}

export default DiscountsList;
