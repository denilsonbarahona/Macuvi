import { React, useEffect , useState }                 from 'react';
import { useDispatch, useSelector    }      from 'react-redux';
import Header                               from '../../../header/infraestructure/components/header.component';
import MobileMenu                           from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                             from '../../../menu/infraestructure/components/side_menu.component';
import TablePromotion                       from '../components/promotion.table.component';
import PromotionDiscount                    from '../components/promotion.delete.popup.component';
import { getLoading  }                      from '../../../ui/core/selector/ui.selector';
import { getCookie   }                      from '../../../../cookies/selectors/cookie.selector';
import { getPromotion }                     from '../../core/selector/promotion.selector';
import { loadCookie  }                      from '../../../../cookies/actions/cookie.actions';
import { getPromotionAvailable, 
         resetPromotionResponse }           from '../../core/actions/promotion.actions'

const PromotionsList=()=>{

    const dispatch = useDispatch();
    const [Page, SetPage] = useState( (window.promotionPage === undefined)?0:window.promotionPage )
    const [idDelete, setIdDelete] = useState("")
    const loading    = useSelector(getLoading);
    const cookie     = useSelector(getCookie);
    const promotion  = useSelector(getPromotion);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])

    useEffect(()=>{
        if(!cookie.find){
            dispatch(getPromotionAvailable({company: cookie.cookie.login.companyId}))           
        }
    },[cookie.find, dispatch, cookie.cookie.login.companyId])

    const onDeletePromotion = (id)=>{
        dispatch(resetPromotionResponse())
        window.showModal("#delete-promotion");
        setIdDelete(id)
    }

    const setPageIndex =(index)=>{
        window.promotionPage = index;
        SetPage(index)
    }

    const showPromotion =(id)=>{
        window.location.href="/admin/update-promotion/"+id
    }

    return (<div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="5" sub="20"></SideMenu>
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto">Lista de promociones</h2>                                                                       
                        </div>
                        {(promotion.loaded)
                            ?<PromotionDiscount state={{company  : cookie.cookie.login.companyId ,
                                                        idDelete : idDelete ,
                                                        SetPage  : setPageIndex}} ></PromotionDiscount>
                            :<></>}                                                     
                        <TablePromotion payload={{ promotions: promotion.payload, isLoaded: promotion.loaded ,SetPage          : setPageIndex , 
                                                   Page      : Page             , loading:loading            ,onDeletePromotion: onDeletePromotion,
                                                   showPromotion: showPromotion   
                                                }} ></TablePromotion>
                    </div>
                </div> 

            </div>)
}

export default PromotionsList;
