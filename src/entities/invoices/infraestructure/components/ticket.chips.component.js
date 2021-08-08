import  React                       from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyPromotion }           from '../../core/actions/invoice.actions';
import { getInvoice }               from '../../core/selector/invoice.selector';

function ChipsTicket(props){
    
    var className  = ((props.props.active)?"bg-red-700 border bg-red-700 ":"border border-gray-300 text-gray-700 bg-gray-200 ")+"flex justify-center items-center m-1 px-2 py-1 cursor-pointer rounded-full text-base font-medium"    
    const dispatch = useDispatch()
    const invoice  = useSelector(getInvoice);

    const onChipClick =()=>{
        let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
        let discountOptions       = document.getElementById("Discount").options;
    
        let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                            label   : discountOptions[discountSelectedIndex].text               , 
                            value   : discountOptions[discountSelectedIndex].value }

        dispatch(applyPromotion({ product    : invoice.change,          invoice      : invoice.payload, 
                                  gblDiscount: props.props.gblDiscount, isExonerated : invoice.isExonerated, discountRef: discountref  } ) )
    }
    
    return(
        <div onClick={ onChipClick }>
            <div className={ className  } >
                <div className={( (props.props.active)?"text-white ":"" )+"text-xs whitespace-nowrap mt-0.5"}> -{props.props.promo.data.PromotionName}-</div>
            </div>
        </div>
    )
}

export default ChipsTicket;