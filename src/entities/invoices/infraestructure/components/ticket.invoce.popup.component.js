import { React , useState, useEffect} from 'react';
import { useDispatch, useSelector }   from 'react-redux';
import { getInvoice }                 from '../../core/selector/invoice.selector';
import { getDiscount }                from '../../../discount/core/selector/discount.selector';
import { updateVariationPopUp, 
         applyDiscount       ,
         changePopUpState }           from '../../core/actions/invoice.actions';
import ChipsTicket                    from './ticket.chips.component';


const TicketPopUp =()=>{

    const invoice  = useSelector(getInvoice);
    const discount = useSelector(getDiscount);
    const dispatch = useDispatch()

    const initialPopUpState = {
                                variation           : "", 
                                quantityVariation   : 1 ,  
                                variationPrice      : 0 ,
                                required            : ["variation","variationPrice"],
                                greater             : [
                                                        {key1: "quantityVariation", greatherThan:0, errordescription:"La cantidad del producto tiene que ser mayor a cero."},
                                                        {key1: "variationPrice", greatherThan:-1, errordescription:"El precio tiene que ser mayor o igual cero."}
                                                      ]
                            }

    const [AddVaritaionState, updateVariationAddState] = useState( initialPopUpState )
    
    useEffect(()=>{
        if( [false].includes(invoice.changePopUp) ){
            
            if(Number(invoice.change.hasVariations) === 0){                
                updateVariationAddState(()=>
                ({  ...AddVaritaionState,
                    variation        : invoice.change.variations[0].variationId ,
                    quantityVariation: invoice.change.variations[0].variationQuantity ,
                    variationPrice   : Number(invoice.change.variations[0].variationBasePrice).toFixed(2),
                })) 
                dispatch(changePopUpState(true))    

            } else if(invoice.change.variations !== undefined){           
                updateVariationAddState(()=> ({  ...AddVaritaionState, variation : "" , variationPrice : 0, quantityVariation:1 }))
                dispatch(changePopUpState(true))
            }           
        }

    },[invoice.changePopUp, invoice.change.hasVariations, invoice.change.variations, dispatch, AddVaritaionState])

    function onChange(e){
        e.persist()
        if([e.target.id] === "quantityVariation"){
            if(Number(e.target.value)>0){
                updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value}))        
            }
        }else if([e.target.id] === "variationPrice"){
            if(Number(e.target.value)>-1){
                updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value}))        
            }
        }else{
            updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value}))        
        }

        if(e.target.id === "variation"){
            if(e.target.value !== ""){
                invoice.change.variations.forEach((item)=>{                    
                    if(item.variationId === e.target.value)
                    {
                      updateVariationAddState(()=>({
                                                        variation        : e.target.value, 
                                                        quantityVariation: item.variationQuantity, 
                                                        variationPrice   : Number(item.variationBasePrice).toFixed(2),
                                                        required         : ["variation","variationPrice"],
                                                        greater          : [
                                                                                {key1: "quantityVariation", greatherThan:0, errordescription:"La cantidad del producto tiene que ser mayor a cero."},
                                                                                {key1: "variationPrice", greatherThan:-1, errordescription:"El precio tiene que ser mayor o igual cero."}
                                                                           ]                                    
                        })) 
                    }
                })
            }
        }            
    }

    const openStatePopUp =()=>{
       dispatch(changePopUpState(false))
    }
    
    const resetState = ()=>{
       updateVariationAddState(()=>({
            variation: "", quantityVariation: 1, variationPrice: 0,
            required:["variation","variationPrice"],
            greater: [
                        {key1: "quantityVariation", greatherThan:0, errordescription:"La cantidad del producto tiene que ser mayor a cero."},
                        {key1: "variationPrice", greatherThan:-1, errordescription:"El precio tiene que ser mayor o igual cero."}
                    ]
        }))        
                
        if(document.getElementById("variationPrice") !== null)
            document.getElementById("variationPrice").value = 0;        
        
        if(document.getElementById("quantityVariation") !== null)
            document.getElementById("quantityVariation").value = 1;   
        
        if(document.getElementById("variation") !== null){
            document.getElementById("variation").selectedIndex = 0;
        }             
    }

    function onPlus(){
        updateVariationAddState(()=>({...AddVaritaionState,quantityVariation:Number(AddVaritaionState.quantityVariation)+1}))     
    }

    function onMinus(){
        updateVariationAddState(()=>({...AddVaritaionState,quantityVariation: (AddVaritaionState.quantityVariation-1 < 1)?1:Number(AddVaritaionState.quantityVariation)-1 }))        
    }

    const discountOnChange=(e)=>{      
        updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value})) 

        let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
        let discountOptions       = document.getElementById("Discount").options;

        let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                            label   : discountOptions[discountSelectedIndex].text               , 
                            value   : discountOptions[discountSelectedIndex].value }

        dispatch(applyDiscount({product : invoice.change, invoice    : invoice.payload , isExonerated: invoice.isExonerated , 
                                discount: e.target.value, gblDiscount: discount.globalDicount, discountRef: discountref }))
    }

    const updateVariation =()=>{

        let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
        let discountOptions       = document.getElementById("Discount").options;

        let discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                            label   : discountOptions[discountSelectedIndex].text               , 
                            value   : discountOptions[discountSelectedIndex].value }

        if(Number(invoice.change.hasVariations) === 0){
            AddVaritaionState.variation = invoice.change.variations[0].variationId
        }

        dispatch(updateVariationPopUp({ state: AddVaritaionState, invoice: invoice.payload, discountRef: discountref ,
                                        gldiscount: discount.globalDicount, change: invoice.change, isExonerated: invoice.isExonerated }))
    }

    window.onClosePopUpChange = resetState;
    window.onOpenStatePopUp   = openStatePopUp;

    return(
        <div className="modal" id="update-ticket-modal" >
                <div className="modal__content">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base mr-auto ">
                            {(invoice.change === undefined)
                                    ?""
                                    :invoice.change.productName}
                        </h2>
                    </div>
                   
                    <div className="pr-1">
                        <div className="box p-2">
                            <div className="pos__tabs nav-tabs justify-center flex"> 
                                <div data-toggle="tab" data-target="#change" className="cursor-pointer flex-1 py-2 rounded-md text-center active">Producto en factura</div> 
                                
                                <div data-toggle="tab" data-target="#promo-discount" className="cursor-pointer flex-1 py-2 rounded-md text-center">Descuentos y promociones
                                    { (invoice.change.productDiscount !== undefined && (invoice.change.productDiscount.length > 1 || invoice.change.promoCounter>0)) 
                                        ?(<div className="w-3 h-3 bg-theme-6 absolute left-200 top-4 rounded-full border-2 border-white"></div>)
                                        :(<div></div>)}                                    
                                </div>                                     
                            </div>
                        </div>
                    </div>
                   
                    <div className="tab-content">
                        <div className="tab-content__pane active" id="change">
                            <div className="pr-1">
                                <div className="box p-5 mt-5">

                                    <div className="font-medium text-theme-6">
                                        {(!invoice.error)
                                            ?""
                                            :(invoice.errorDesc.emptyFields.length===2)
                                                ?"Se tiene que seleccionar una variación e ingresar un precio para el producto"
                                                :(invoice.errorDesc.emptyFields.length===1)
                                                    ?(invoice.errorDesc.emptyFields[0]==="variation")
                                                        ?"Se tiene que seleccionar una variación"
                                                        :"Se tiene que ingresar un precio para el producto"
                                                    :invoice.errorDesc.msj}
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 gap-y-3">                        
                                        {(invoice.change !== undefined && Number(invoice.change.hasVariations) === 1)
                                                ?(  <div className="col-span-12">
                                                        <label>Variación</label>
                                                        <div className="flex mt-2 flex-1">
                                                            <select id="variation"  onChange={onChange} className="input border mr-2">
                                                                <option key={-1} value="" >SELECCIONAR VARIACIÓN</option>
                                                                {invoice.change.variations.map((item, index)=>(
                                                                  <option  key={index} value={item.variationId} >                                                                      
                                                                      {item.variationName} 
                                                                  </option>))}                                                                                                
                                                            </select> 
                                                        </div>                            
                                                    </div>)
                                                :(<></>)}
                                        <div className="col-span-12">
                                            <label>Precio</label>
                                            <div className="flex mt-2 flex-1">
                                                <input type="number" id="variationPrice" min="0"  onChange={onChange} className="input w-34 border text-center" placeholder="Precio" value={AddVaritaionState.variationPrice} />
                                            </div>
                                        </div>     
                
                                        <div className="col-span-12">
                                            <label>Cantidad</label>
                                            <div className="flex mt-2 flex-1">
                                                <button type="button" id="minus" onClick={onMinus} className="button w-12 border bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 mr-1">-</button>
                                                <input  type="number" id="quantityVariation" min="0" onChange={onChange} className="input w-24 border text-center" placeholder="Cantidad en factura" value={AddVaritaionState.quantityVariation}/>
                                                <button type="button" id="plus" onClick={onPlus} className="button w-12 border bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 ml-1">+</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="px-5 py-3 text-right border-t border-gray-200 dark:border-dark-5">
                                    <button type="button" data-dismiss="modal" className="button w-24 border dark:border-dark-5 text-gray-700 dark:text-gray-300 mr-1">Cerrar</button>
                                    <button type="button" onClick={ updateVariation } className="button w-24 bg-theme-1 text-white">Modificar </button>
                                </div>

                            </div> 
                            
                        </div>
                    
                        <div className="tab-content__pane" id="promo-discount">
                            {(invoice.change.productDiscount !== undefined)
                                ?(  <div className="pr-1">                                                                    
                                        <div className="box p-5 mt-5">
                                            <div className="col-span-12">
                                                <label>Aplicar descuentos</label>
                                                <div className="text-xs text-gray-600 mt-2">Seleccione uno de los descuentos a los que aplica el producto.</div>
                                                <div className="flex mt-2 flex-1 mb-7">
                                                    <select id="product_discount" value={invoice.change.discountSelected} onChange={discountOnChange}  className="input border mr-2 text-gray-600 text-xs whitespace-nowrap mt-0.5">
                                                        {invoice.change.productDiscount.map((item, index)=>(
                                                            <option  key={index} value={item.id} >
                                                                { (item.id === "0")
                                                                        ?"0"
                                                                        :item.data.DiscountPercentage } % 
                                                                { (item.id === "0")
                                                                        ?""
                                                                        :"-"+item.data.DiscountName}
                                                            </option> ))}                                                                                                                                             
                                                    </select> 
                                                </div>
                                                { (invoice.change.promoCounter>0)
                                                        ?(  <div>
                                                                <label>Aplicar promociones</label>
                                                                <div className="text-xs text-gray-600 mt-2">Click en la promoción para aplicarla al producto.</div>
                                                                <div className="flex mt-2 flex-1">                                                                  
                                                                    {invoice.change.productPromotion.map((item, index)=>(
                                                                        <ChipsTicket key={index} props={{active: (invoice.change.promotionIsApplied===1)?true:false , promo: item , gblDiscount: discount.globalDicount}} />
                                                                    ))} 
                                                                </div>
                                                            </div> )
                                                        :(<div className="text-xs text-theme-6 mt-2">No hay promociones aplicables para el producto.</div>)}                                                
                                            </div>
                                        </div>
                                    </div>  )
                                :(<></>)}                            
                        </div>
                    </div>
                </div>
            </div> 
    )

}


export default TicketPopUp
