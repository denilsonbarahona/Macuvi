import {React} from 'react';

const WithOutVariations  =(state)=>{

    return ( <div className="col-span-12 xl:col-span-6">                                                                                                                                                                                  
                <div className="mt-0">
                    <label>Precio de compra</label>
                    <div className="relative mt-2">   
                        <input type="number" 
                            name="cost"
                            min="0"
                            value={state.props.variation.items.length?state.props.variation.items[0].data.cost:""}
                            onChange={(e)=> state.props.onVariationTextChange(e, 0) }
                            className="input pr-12 w-full border col-span-4" 
                            placeholder="Precio" />
                        <div className="absolute top-0 right-0 rounded-r px-4 h-full flex items-center justify-center bg-gray-100 border text-gray-600">Unidad</div>
                    </div>
                </div>                                                              
                <div className="mt-3">
                    <label>Precio de venta</label>
                    <div className="relative mt-0.5">
                        <input type="number" 
                            name="price"
                            min="0"
                            value={state.props.variation.items.length?state.props.variation.items[0].data.price:""}
                            onChange={(e)=> {state.props.onVariationTextChange(e, 0); 
                                             state.props.onChangeVariationPrice(0, e.target.value)   } }
                            className="input pr-12 w-full border col-span-4" 
                            placeholder="Precio" />
                        <div className="absolute top-0 right-0 rounded-r px-4 h-full flex items-center justify-center bg-gray-100 border text-gray-600">Unidad</div>
                    </div>
                </div>                                                        
                <div className="mt-3">
                    <label>Precio sin impuesto</label>
                    <div className="relative mt-0.5">
                        <input type="number" 
                            name="basePrice"
                            value={state.props.variation.items.length?state.props.variation.items[0].data.basePrice:""}
                            readOnly
                            className="input pr-12 w-full bg-gray-100 cursor-not-allowed  border col-span-4" placeholder="Precio" />
                        <div className="absolute top-0 right-0 rounded-r px-4 h-full flex items-center justify-center bg-gray-100 border text-gray-600">Unidad</div>
                    </div>
                </div>
                <div className="mt-3">
                    <label>Cantidad en inventario</label>
                    <div className="relative mt-0.5">
                        <input type="number" 
                            name="quantity"
                            min="1"
                            value={state.props.variation.items.length?state.props.variation.items[0].data.quantity:""}
                            onChange={(e)=> state.props.onVariationTextChange(e, 0) }
                            className="input pr-12 w-full border col-span-4" placeholder="Cantidad" />
                        <div className="absolute top-0 right-0 rounded-r px-4 h-full flex items-center justify-center bg-gray-100 border text-gray-600">Unidades</div>
                    </div>
                </div>
                <div className="mt-3">
                    <label>Código de barras</label>
                    <div className="relative mt-0.5">
                        <input type="text" 
                            name="code" 
                            value={state.props.variation.items.length?state.props.variation.items[0].data.code:""}
                            onChange={(e)=> state.props.onVariationTextChange(e, 0) }
                            className="input pr-12 w-full border col-span-4" placeholder="Código de barras" />
                        <div className="absolute top-0 right-0 rounded-r px-4 h-full flex items-center justify-center bg-gray-100 border text-gray-600">Código</div>
                    </div>
                </div>
                <div className="mt-3">
                    <label>Condición del producto</label>
                    <div className="relative mt-0.5">
                        <select name="ItemCondition"
                                value={(state.props.variation.items.length)?state.props.variation.items[0].data.ItemCondition.value:""}     
                                onChange={(e)=>{ state.props.onVariationConditionChange(e, 0) }}                                                                                              
                                className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                <option value="">Seleccionar una condición</option>
                                <option value="NEW">Nuevo</option> 
                                <option value="USED">Usuado</option> 
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <label>Nombre del proveedor</label>
                    <div className="relative mt-0.5">
                        <input type="text" 
                            name="supplier"
                            value={state.props.variation.items.length?state.props.variation.items[0].data.supplier:""}
                            onChange={(e)=> state.props.onVariationTextChange(e, 0) }
                            className="input pr-12 w-full border col-span-4" placeholder="Proveedor" />
                    </div>
                </div>
            </div>
    )
}

export default WithOutVariations;