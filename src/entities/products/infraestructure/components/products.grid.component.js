import {React, useState }           from "react";
import {useSelector } from 'react-redux';
//import { loadVariationPopUp }       from '../../core/actions/products.actions';
import { getProducts }              from '../../core/selectors/products.selectors';
import { getLoading }               from '../../../ui/core/selector/ui.selector';
import UiLoading                    from '../../../ui/infraestructure/components/ui.loading.component';
import ProductPopUp                 from './product.popup.component'; 

const GridProducts=()=>{

   // const dispatch = useDispatch()
    const [page, setPage] = useState(0)
    const [sheetLoading, setSheetLoading] = useState(false)
    const [productParams, setProductParams] = useState({})
    const [getVarition, setGetVariation] = useState(false);
    const products = useSelector(getProducts)
    const loading  = useSelector(getLoading)
    //const productsMap = (products.payloadFilter.length>0)?products.payloadFilter:products.payload;
    const productsMap = products.payloadFilter;
   
    const movePage = (index)=>{
        setSheetLoading(true)
        if (index === -1) {
            setPage(productsMap.length -1 )
        } else if(index === productsMap.length) {
            setPage(0)
        }else {
            setPage(index)
        }
        setTimeout(()=>setSheetLoading(false), 1000) 
    }

    const showAddVariation =(product)=>{
        setProductParams(product)
        setGetVariation(true)
        window.showModal("#add-item-modal")
    }

    window.moveProductGrid = movePage

    return( <> 
        <div className="mx-6">             
            <ProductPopUp state={{...productParams, 
                                getVarition: getVarition, 
                                setGetVariation: setGetVariation}}></ProductPopUp> 

            {loading.loadingProducts
                ?<div className="intro-y col-span-12 overflow-auto lg:overflow-visible mt-10">
                    <UiLoading loading = {loading.loadingProducts} ></UiLoading><br/>
                    </div>
                : <div className="intro-y single-item">
                    <div className="pb-8">
                        <div className="carousel relative ">
                            <div className="carousel-inner relative overflow-hidden w-full">
                                <input className="carousel-open" type="radio" id="arrow" name="carousel" aria-hidden="true" hidden defaultChecked="checked" />                                    
                                <div className="grid grid-cols-12 gap-5 mt-5 pt-5 border-t border-theme-5">                                
                                    {productsMap.length >0 && productsMap[page].map((product , index)=>(
                                        <div key={index} 
                                            onClick={()=>{
                                                showAddVariation(product)
                                                /*dispatch(loadVariationPopUp(product))*/
                                            }}  
                                            className="intro-y block col-span-12 sm:col-span-4 xxl:col-span-3 cursor-pointer">
                                             {sheetLoading
                                                ?<UiLoading loading = {true} ></UiLoading> 
                                                :<div className="box rounded-md p-3 relative zoom-in">
                                                    <div className="flex-none pos-image relative block">
                                                        <div className="pos-image__preview image-fit">
                                                            <img alt="Macuvi Product" src={product.product.img} />
                                                        </div>
                                                    </div>
                                                    <div className="block font-medium text-center truncate mt-3">{product.product.name}</div>
                                                 </div>}
                                        </div> ))}
                                </div>
                                {productsMap.length > 1
                                    ?<>
                                        <label onClick={()=>{ movePage(page-1) }} className="prev z-50 control-1 w-10 h-10 ml-2 md:ml-2 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-theme-2 hover:bg-blue-700 leading-tight text-center inset-y-0 left-0 my-auto">‹</label>
                                        <label onClick={()=>{ movePage(page+1) }} className="next z-50 control-1 w-10 h-10 mr-2 md:mr-2 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-theme-2 hover:bg-blue-700 leading-tight text-center inset-y-0 right-0 my-auto">›</label>
                                     </>
                                    :<></> }
                            </div>
                        </div>
                    </div>
                </div> }      
        </div>                          
        </> )
}

export default GridProducts;