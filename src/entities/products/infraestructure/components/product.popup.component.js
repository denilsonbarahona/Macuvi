import  {React, useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetVariationByProduct } from '../../core/actions/products.actions';
import { addToInvoice } from '../../../invoices/core/actions/invoice.actions';
import { getProducts } from '../../core/selectors/products.selectors';
import { getInvoice } from '../../../invoices/core/selector/invoice.selector';
import { getDiscount } from '../../../discount/core/selector/discount.selector';
import { getLoading } from '../../../ui/core/selector/ui.selector';
import UiLoading from '../../../ui/infraestructure/components/ui.loading.component';

const initialPopUpState = {
                           variationId: "", quantityInInvoice: 1,
                           required:["variationId"],
                           greater: [{key1: "quantityInInvoice", greatherThan:0, errordescription:"La cantidad del producto tiene que ser mayor a cero."}]
                        }


const ProductPopUp=(state)=>{
    
    const dispatch = useDispatch();
    const products = useSelector(getProducts)   
    const invoice  = useSelector(getInvoice)     
    const discount = useSelector(getDiscount);
    const loading  = useSelector(getLoading);
    const [AddVaritaionState, updateVariationAddState] = useState( initialPopUpState );
    const [productVariations, setProductsVariations] = useState([])

    useEffect(()=>{
        if (state.state.getVarition)
           dispatch(GetVariationByProduct({id: state.state.product.id}))
    },[state.state.getVarition, dispatch, state.state.product])


    function onChange(e){
        e.persist()
        if([e.target.id] === "quantityInInvoice"){
            if(Number(e.target.value)>1){
                updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value}))        
            }
        }else{
            updateVariationAddState(()=>({...AddVaritaionState,[e.target.id]: e.target.value}))        
        }
        
    } 

    function onPlus(){
        updateVariationAddState(()=>({...AddVaritaionState,quantityInInvoice:Number(AddVaritaionState.quantityInInvoice)+1}))     
    }

    function onMinus(){
        updateVariationAddState(()=>({...AddVaritaionState,
                                        quantityInInvoice: (AddVaritaionState.quantityInInvoice-1 < 1)?1:Number(AddVaritaionState.quantityInInvoice)-1 }))        
    }

    window.setProductsVariations = setProductsVariations

    const resetState=()=>{
        if(document.getElementById("variationId") !== null)
            document.getElementById("variationId").selectedIndex = 0;                
        
        if(document.getElementById("quantityInInvoice") !== null)
            document.getElementById("quantityInInvoice").value = 1;
        
        updateVariationAddState(()=>({
            variationId: "", quantityInInvoice: 1,
            required:["variationId"],
            greater: [{key1: "quantityInInvoice", greatherThan:0, errordescription:"La cantidad del producto tiene que ser mayor a 1."}]
        }))  
        state.state.setGetVariation(false)
    }

    const addProductToInvoice =()=>{    

        let discountref = ""
        if(document.getElementById("Discount") !== null){
            let discountSelectedIndex = document.getElementById("Discount").selectedIndex;
            let discountOptions       = document.getElementById("Discount").options;
    
            discountref = { discount: discountOptions[discountSelectedIndex].text.split("%")[0] , 
                            label   : discountOptions[discountSelectedIndex].text               , 
                            value   : discountOptions[discountSelectedIndex].value }
    
        }

        if(Number(state.state.product.hasVariations) === 0){
            AddVaritaionState.variationId = productVariations[0].id       
        }          
       
        dispatch(addToInvoice({product: {...state.state.product, variations: productVariations}, 
                               state: AddVaritaionState, 
                               isExonerated: invoice.isExonerated,
                               invoice: invoice.payload, 
                               gldiscount: discount.globalDicount, 
                               discountRef: discountref,
                               hasVariations: state.state.product.hasVariations
                              }))
    }

    window.onClosePopUp = resetState;


    return(
            <div className="modal" id="add-item-modal" >
                <div className="modal__content">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
                        <h2 className="font-medium text-base mr-auto">
                            {state.state.product!== undefined && state.state.product.name}
                        </h2>
                    </div>
                    {loading.loadingToTicket
                        ?<div className="h-20"><UiLoading loading={loading.loadingToTicket}></UiLoading></div>
                        :<>
                            <div className="mt-4 ml-4 mr-4 font-medium text-theme-6">
                                { (products.errorDesc.msj === undefined)
                                        ?""
                                        :(products.errorDesc.emptyFields.length >0)
                                            ?"Se tiene que seleccionar una variación"
                                            :products.errorDesc.msj }
                            </div>
                            <div className="p-5 grid grid-cols-12 gap-4 gap-y-3">                        
                                { (state.state.product!== undefined && Number(state.state.product.hasVariations) === 1)
                                        ?( <div className="col-span-12">
                                                <label>Variación</label>
                                                <div className="flex mt-2 flex-1">
                                                    <select id="variationId" onChange={onChange} className="input border mr-2">
                                                        <option key={-1} value="" >SELECCIONAR VARIACIÓN</option>
                                                        {(productVariations.map((item , index)=>(
                                                            <option key={index} value={item.id} >                                                                
                                                                {item.data.value + 
                                                                    ((item.data.colour_size==="")?"":" - "+item.data.colour_size)
                                                                    +((item.data.ItemCondition.value !=="NEW")?
                                                                        " - ("+item.data.ItemCondition.label+")":"") } 
                                                            </option>
                                                          )))}
                                                    </select> 
                                                </div>                                        
                                            </div>)
                                        :(<></>)}                        
                                <div className="col-span-12">
                                    <label>Cantidad</label>
                                    <div className="flex mt-2 flex-1">
                                        <button type="button" id="minus" onClick={onMinus} className="button w-12 border bg-gray-200 text-gray-600 mr-1">-</button>
                                        <input  type="number" id="quantityInInvoice" min="1" onChange={onChange} className="input w-24 border text-center" placeholder="Cantidad en factura" value={AddVaritaionState.quantityInInvoice} />
                                        <button type="button" id="plus" onClick={onPlus} className="button w-12 border bg-gray-200 text-gray-600 ml-1">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="px-5 py-3 text-right border-t border-gray-200">
                                <button type="button" data-dismiss="modal" className="button w-32 border text-gray-700 mr-1">Cerrar</button>
                                <>
                                    <button style={{display:(loading.buttonPopUp)?"":"none" }}  type="button" onClick={addProductToInvoice}
                                            className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto">
                                        Agregando
                                        <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                    </button>
                                    <button style={{display:(loading.buttonPopUp)?"none":"" }} type="button" onClick={addProductToInvoice} 
                                            id="add-item" className="button w-32 bg-theme-1 text-white">Agregar</button>
                                </>
                            </div>    
                        </> }
                </div>
            </div> 

    )
}


export default ProductPopUp;