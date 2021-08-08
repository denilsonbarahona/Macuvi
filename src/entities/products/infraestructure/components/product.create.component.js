import { React, 
         useEffect, 
         useState }                  from 'react';
import { useDispatch,
         useSelector }               from 'react-redux';
import Header                        from '../../../header/infraestructure/components/header.component';
import MobileMenu                    from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                      from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                     from '../../../ui/infraestructure/components/ui.loading.component';
import IdentitiesPopUp               from './identities.popup.component';
import WithOutVariations             from './product.without.variation.component';
import WithVariation                 from './product.with.variations.component';
import { CreateProductInformation }  from '../../core/actions/products.actions';
import { loadCookie }                from '../../../../cookies/actions/cookie.actions';
import { getCategoriesList}          from '../../../categories/core/actions/category.actions';
import { GetTaxes }                  from '../../../taxes/core/actions/taxes.actions';
import { getProducts }               from '../../core/selectors/products.selectors';
import { getCookie  }                from '../../../../cookies/selectors/cookie.selector'; 
import { getLoading }                from '../../../ui/core/selector/ui.selector';
import { getTaxes }                  from '../../../taxes/core/selector/taxes.selector';
import { getCategory }               from '../../../categories/core/selector/category.selectors';

const NewProduct=()=>{

    const dispatch      = useDispatch();
    const [product, setProduct] = useState({id: "",photo: "" , name: "" , type: "Producto",
        category: "", tax: { value: 0 , label: "Exento"},
        include: "SI", hasVari: "0", file: "", folder: "" });

    const [variations, setVariations] = useState({ items: [] , variationsType:"" });    
    const jsonVariation = {value: "", hex: "#000", name: "",colour_size: "", code: "", cost: "", price: "", quantity: "", ItemCondition: "", supplier: "", basePrice: "",type: "" } 
    const productRequiered = { required: [ "photo", "name", "type", "category", "tax", "include" ] }
    const productWithOutVariationRequiered = { required   : [ "cost", "price", "quantity" , "ItemCondition"] }
    const productWithvariationRequiered = { key : "variationsType", 
        conditions: [ { value: "COLOUR" , required: ["hex"  , "value", "cost" , "price"    , "quantity" , "ItemCondition"] , 
                        msj: 'Se tiene que ingresar el color, nombre de color, precio de compra, precio de venta, cantidad en inventario y condición de articulo para todas las variaciones.' },
                      { value: "SIZE-COLOUR", required: ["hex"  , "value", "colour_size", "cost", "price"    , "quantity"    , "ItemCondition"],
                        msj: "Se tiene que ingresar el color, nombre de color, tamaño, precio de compra, precio de venta, cantidad en inventario y condición de articulo para todas las variaciones." },
                      { value: "SIZE", required: ["value", "cost" , "price", "quantity" , "ItemCondition"] , 
                        msj: "Se tiene que ingresar el tamaño, precio de compra, precio de venta, cantidad en inventario y condición de articulo para todas las variaciones." },
                      { value: "BRAND", required: ["value", "cost" , "price", "quantity" , "ItemCondition"] , 
                        msj: "Se tiene que ingresar el nombre de la marca, precio de compra, precio de venta, cantidad en inventario y condición de articulo para todas las variaciones." }
                    ] }
 
    const products      = useSelector(getProducts);
    const cookie        = useSelector(getCookie);  
    const loading       = useSelector(getLoading)    
    const categories    = useSelector(getCategory);
    const taxes         = useSelector(getTaxes);
 
    useEffect(()=>{                  
        dispatch(loadCookie())                  
    },[dispatch])

    useEffect(()=>{ 
        if(!loading.loading && categories.find && !cookie.find){
            dispatch(getCategoriesList(cookie.cookie.login.companyId))
        }
    },[dispatch, cookie.cookie.login.companyId, loading.loading, categories.find, cookie.find])

    useEffect(()=>{
        if(!loading.loading && !cookie.find && !categories.find && taxes.getTaxes){
            dispatch(GetTaxes(cookie.cookie.login.companyId))
        } 
    },[dispatch, taxes.getTaxes, cookie.cookie.login.companyId, loading.loading, categories.find, cookie.find])

    const onImageChange = (e)=>{
        var files = e.target.files;
        if(FileReader && files && files.length){
            var reader = new FileReader();
            reader.onload =()=>{
                setProduct(()=>({...product, "photo": reader.result, "file": files[0]}))
            }            
            reader.readAsDataURL(files[0]);
        }
    }

    const onTextChange =(e)=>{
        setProduct({...product, [e.target.name]: e.target.value})
    }

    const onComboBoxChange =(e)=>{
        setProduct({...product,[e.target.name]: {
            value: e.target.value, 
            label: e.target.options[ e.target.options.selectedIndex ].text }})
    }

    const onComboBoxCategoryChange =(e)=>{
        setProduct({...product, [e.target.name]: {
            id: e.target.value,
            label: e.target.options[ e.target.options.selectedIndex ].text }})
    }

    const onVariationTextChange =(e,index)=>{
        if(variations.items.length===0){ 
            variations.items.push({id:"", data:jsonVariation})
        }
        const shadowVariations = [...variations.items];
        shadowVariations[index]["data"][e.target.name] = e.target.value;
        setVariations({...variations, items: shadowVariations});
    }

    const onVariationConditionChange =(e, index)=>{
        if(e.target.value !== ""){
            if(variations.items.length===0){ 
                variations.items.push({id:"", data:jsonVariation})
            }
            const shadowVariations = [...variations.items];
            shadowVariations[index]["data"][e.target.name] = {value: e.target.value, label: (e.target.value==="NEW")?"NUEVO":"USADO" };
            setVariations({...variations, items: shadowVariations});  
        }
    }

    const onChangeVariationType=(e)=>{
        if(e.target.value !== ""){
            jsonVariation["type"] = e.target.value;
            jsonVariation["name"] = e.target.options[ e.target.options.selectedIndex ].text;
            setVariations({items:[{id:"", data:jsonVariation}], variationsType: e.target.value})
        }
    }

    const onClickAddVariation=()=>{
        const types = document.getElementById("typesCB")
        jsonVariation["type"] = variations.variationsType;
        jsonVariation["name"] = types.options[ types.selectedIndex ].text;
        setVariations({...variations, items:[...variations.items,{id: "", data: jsonVariation}]})
    }

    const onClickDeleteVariation=(index)=>{
        const shadowVariations = [...variations.items];
        shadowVariations.splice(index, 1);
        setVariations({...variations, items: shadowVariations});  
    }

    const onChangeVariationColor=(hex, index)=>{
        const shadowVariations = [...variations.items];
        shadowVariations[index]["data"]["hex"] = hex;
        setVariations({...variations, items: shadowVariations});
    }

    const onChangeBasePrice=(tax, include)=>{
        const shadowVariations = [...variations.items];
        for(let index=0; index < shadowVariations.length; index++){
            if(include ==="SI"){
                shadowVariations[index]["data"]["basePrice"] = Number( Number( shadowVariations[index]["data"]["price"] )/( (Number(tax)/100) + 1 ) ).toFixed(2);
            }else{
                shadowVariations[index]["data"]["basePrice"] = Number(shadowVariations[index]["data"]["price"]).toFixed(2) 
            }
        }
        setVariations({...variations, items: shadowVariations});
    }

    const onChangeVariationPrice =(index, price)=>{
        const shadowVariations = [...variations.items]; 
        if(product.include ==="SI"){
            shadowVariations[index]["data"]["basePrice"] = Number( Number( price )/( (Number(product.tax.value)/100) + 1 ) ).toFixed(2);
        }else{
            shadowVariations[index]["data"]["basePrice"] = Number(price).toFixed(2) 
        } 
        setVariations({...variations, items: shadowVariations});   
    }

    const onClickNewProduct=()=>{
        dispatch(CreateProductInformation({
            product: product,
            variations: variations,
            company: cookie.cookie.login.companyId,
            auth: {authId: cookie.cookie.login.id, authName: cookie.cookie.login.name},  
            identities: products.identities, 
            productWithOutVariationRequiered: productWithOutVariationRequiered,  
            productRequiered: productRequiered,
            productWithvariationRequiered: productWithvariationRequiered,
            setNewState: setNewState
        }))
    }

    const setNewState =()=>{
        setProduct({id: "",photo: "" , name: "" , type: "Producto",
                    category: "", tax: { value: 0 , label: "Exento"},
                    include: "SI", hasVari: "0", file: "", folder: "" })
        setVariations({ items: [] , variationsType:"" })
    }

    return ( <div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="3" sub="7"></SideMenu> 
                    <div className="content">
                         <Header></Header>
                         <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"><b>Nuevo producto</b></h2>  
                            <div className="w-full sm:w-auto flex mt-4 sm:mt-0">                            
                                <button style={{display:(loading.button)?"":"none" }} className="button w-44 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                        Registrando 
                                        <img className="h-5 ml-8" alt="" src="/assets/images/white.gif"></img> </button>
                                <button style={{display:(loading.button)?"none":"" }}
                                        onClick={onClickNewProduct} 
                                        className="button w-44 text-white bg-theme-1 shadow-md ml-auto">Registrar información</button>
                            </div>                                                                                                 
                        </div>  
                        {(products.CreateResponse.show_response)
                            ?<div className={(products.CreateResponse.response)
                                                ?"p-2 gap-4  text-center text-lg font-bold gap-y-3 font-medium text-theme-9"
                                                :"p-2 gap-4  text-center text-lg font-bold gap-y-3 font-medium text-theme-6"
                                            }> 
                                    {products.CreateResponse.msj}
                             </div>
                            :<></>}
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            {taxes.getTaxes || cookie.find || categories.find 
                                ?<div className="col-span-12"> <UiLoading loading={true}></UiLoading></div>
                                :<div className="col-span-12"> 
                                    <div className="col-span-12">
                                        <div className="intro-y box lg:mt-5">
                                            <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                                                <h2 className="font-medium text-base mr-auto">Información general</h2>                                            
                                            </div> 
                                            <div className="p-5"> 
                                                <div className="grid grid-cols-12 gap-5">
                                                        <div className="col-span-12 xl:col-span-4">
                                                            <div className="border border-gray-200 dark:border-dark-5 rounded-md p-5">
                                                                <div className="w-40 h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                                                                    <img className="rounded-md" alt="Imagen del producto"  src={ product.photo }  />                                                        
                                                                </div>
                                                                <div className="w-40 mx-auto cursor-pointer relative mt-5">
                                                                    <button type="button" className="button w-full bg-theme-1 text-white">Agregar foto</button>
                                                                    <input onChange={ onImageChange }  type="file" className="w-full h-full top-0 left-0 absolute opacity-0" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 xl:col-span-8">
                                                            <div className="flex items-end">
                                                                <div  onClick={()=>{ window.showModal("#identities-modal"); }} className="ml-auto button text-white bg-theme-1 shadow-md mr-2">
                                                                        Identificadores 
                                                                        ({ ( (products.identities==="" || products.identities === undefined)
                                                                                ?0
                                                                                :products.identities.trim().split("\n").length.toString() ) })</div> 
                                                            </div>
                                                            <IdentitiesPopUp></IdentitiesPopUp>
                                                            <div className="p-5"> 
                                                                <div className="grid grid-cols-12 gap-5">
                                                                    <div className={( Number(product.hasVari) === 0)?"col-span-12 xl:col-span-6":"col-span-12"}>
                                                                        <div>
                                                                            <label>Nombre</label>
                                                                            <input type="text" onChange={onTextChange} name="name" 
                                                                                  value={product.name} className="input w-full border mt-2" 
                                                                                  placeholder="Nombre"  />
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <label>Tipo de producto</label>
                                                                            <select name="type" 
                                                                                    onChange={ onTextChange } 
                                                                                    value={product.type}
                                                                                    className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                                <option value="Producto">Producto</option>
                                                                                <option value="Servicio">Servicio </option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <label>Categoría</label>
                                                                            <select name="category"
                                                                                    onChange={ onComboBoxCategoryChange } 
                                                                                    value={product.category.id || ""} 
                                                                                    className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                                <option key={0} value="">Seleccione una categoría</option>
                                                                                {categories.payload.map((item, index)=>(
                                                                                    <option key={index} value={item.id}>{item.name}</option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <label>Impuesto gravado</label>
                                                                            <select name="tax" 
                                                                                    onChange={(e)=>{ onComboBoxChange(e);
                                                                                                     onChangeBasePrice(e.target.value, product.include) }}
                                                                                    value={product.tax.value} 
                                                                                    className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                                {taxes.payload.map((item, index)=>(
                                                                                    <option key={index} value={item.value} >{item.label}</option>
                                                                                ))}
                                                                                
                                                                            </select>
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <label>¿El precio incluye el impuesto?</label>
                                                                            <select name="include"
                                                                                    onChange={(e)=>{onTextChange(e); 
                                                                                                    onChangeBasePrice(product.tax.value, e.target.value)} } 
                                                                                    value={product.include}
                                                                                    className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                                <option value="SI">SI</option>
                                                                                <option value="NO">NO</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="mt-3">
                                                                            <label>Creación variación del producto</label>
                                                                            <select name="hasVari"
                                                                                    onChange={ onTextChange } 
                                                                                    value={product.hasVari}
                                                                                    className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                                <option value={1}>SI</option>
                                                                                <option value={0}>NO</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    {(Number(product.hasVari) === 0 && product.hasVari !== "")
                                                                        ? <WithOutVariations props={{ 
                                                                            variation: variations,
                                                                            onChangeVariationPrice: onChangeVariationPrice,
                                                                            onTextChange: onTextChange,
                                                                            onVariationTextChange:onVariationTextChange,
                                                                            onVariationConditionChange:onVariationConditionChange}} ></WithOutVariations>
                                                                        :<></>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/**variations*/}
                                        {Number(product.hasVari) === 1
                                            ?<WithVariation props={{ 
                                                variation: variations,
                                                onChangeVariationType: onChangeVariationType,
                                                onClickAddVariation: onClickAddVariation,
                                                onChangeVariationColor: onChangeVariationColor,
                                                onClickDeleteVariation: onClickDeleteVariation,
                                                onChangeVariationPrice: onChangeVariationPrice,
                                                onTextChange: onTextChange,
                                                onVariationTextChange: onVariationTextChange,
                                                onVariationConditionChange: onVariationConditionChange}} ></WithVariation>
                                            :<></> }
                                    </div>
                                </div>}
                                                       
                        </div>
                    </div>
                </div>
            </div>)
}

export default NewProduct;