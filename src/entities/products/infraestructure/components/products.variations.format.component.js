import PopoverPicker from './product.color.component'; 

const format = ["COLOUR","SIZE", "SIZE-COLOUR","BRAND"]
/***************COLOUR FORMAT***********************/      

const colour =(index, type , props)=>{    
    format["COLOUR"] = []
    format["COLOUR"][0]={  header:"#"                     , type:(index+1).toString() }
    format["COLOUR"][1]={  header:"Variante"              , type:<label>Color</label> }
    format["COLOUR"][2]={  header:"Nombre del color"      , type:<input type="text"  
                                                                        onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="value" 
                                                                        value={(type === "header")?"":props.value} 
                                                                        placeholder="Nombre del color" 
                                                                        className="input w-full border mt-2" /> }

    format["COLOUR"][3]={  header:"Color"                 , type: <PopoverPicker props={{...props, index:index}}></PopoverPicker>}

    format["COLOUR"][4]={  header:"Código del producto"   , type:<input type="text" 
                                                                        onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="code" 
                                                                        value={(type === "header")?"":props.code}  
                                                                        placeholder="Código del producto" 
                                                                        className="input w-full border mt-2" /> }

    format["COLOUR"][5]={  header:"Precio de compra"      , type:<input type="number" 
                                                                        onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="cost" 
                                                                        min="0"
                                                                        value={(type === "header")?"":props.cost}  
                                                                        placeholder="Precio de compra" 
                                                                        className="input w-full border mt-2" /> }

    format["COLOUR"][6]={  header:"Precio de venta"       , type:<input type="number" 
                                                                        onChange={(event)=>{props.onChange(event, index);
                                                                              props.onPriceChange(index, event.target.value);
                                                                        }} 
                                                                        min="0"
                                                                        name="price"    
                                                                        value={(type === "header")?"":props.price}  
                                                                        placeholder="Precio de venta" 
                                                                        className="input w-full border mt-2" />  }

    format["COLOUR"][7]={  header:"Cantidad"              , type:<input type="number" 
                                                                        onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="quantity"
                                                                        min="1" 
                                                                        value={(type === "header")?"":props.quantity}  
                                                                        placeholder="Cantidad" 
                                                                        className="input w-full border mt-2" /> }

    format["COLOUR"][8]={  header:"Condición del producto", type:<select name="ItemCondition"
                                                                         onChange={(event)=>{props.onConditionChange(event, index)}} 
                                                                         value={(![undefined,""].includes(props.ItemCondition))?props.ItemCondition.value:""} 
                                                                         className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                            <option value="">Seleccionar una condición</option>
                                                                            <option value="NEW">Nuevo</option> 
                                                                            <option value="USED">Usuado</option> 
                                                                  </select>}

    format["COLOUR"][9]={  header:"Proveedor"             , type:<input onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="supplier" 
                                                                        value={(type === "header")?"":props.supplier} 
                                                                        type="text"  
                                                                        placeholder="Proveedor" 
                                                                        className="input w-full border mt-2" /> }

    format["COLOUR"][10]={ header:"Precio sin impuesto"   , type:<input onChange={(event)=>{props.onChange(event, index)}} 
                                                                        name="basePrice" 
                                                                        value={(type === "header")?"":props.basePrice} 
                                                                        type="number"  
                                                                        readOnly 
                                                                        placeholder="Precio sin impuesto" 
                                                                        className="input w-full bg-gray-100 cursor-not-allowed border mt-2" /> }

    format["COLOUR"][11]={ header: "Acción"              , type:<div onClick={()=>{props.delete(index)}} className="flex items-center text-theme-6 cursor-pointer" > Eliminar </div> }

    return format["COLOUR"]
}


/***************SIZE FORMAT***********************/      
const size =(index, type , props)=>{
  
    format["SIZE"] = []
    format["SIZE"][0]={header:"#"                      , type:(index+1).toString() }
    format["SIZE"][1]={header:"Variante"               , type:<label>Tamaño</label> }
    format["SIZE"][2]={header:"Tamaño"                 , type:<input type="text"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     placeholder="Tamaño" 
                                                                     name="value" 
                                                                     value={(type === "header")?"":props.value} 
                                                                     className="input w-full border mt-2" /> }

    format["SIZE"][3]={header:"Código del producto"    , type:<input type="text"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     name="code" 
                                                                     value={(type === "header")?"":props.code} 
                                                                     placeholder="Código del producto" 
                                                                     className="input w-full border mt-2" /> }

    format["SIZE"][4]={header:"Precio de compra"       , type:<input type="number"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     name="cost"
                                                                     min="0" 
                                                                     value={(type === "header")?"":props.cost}  
                                                                     placeholder="Precio de compra" 
                                                                     className="input w-full border mt-2" /> }

    format["SIZE"][5]={header:"Precio de venta"        , type:<input type="number" 
                                                                     onChange={(event)=>{props.onChange(event, index);
                                                                        props.onPriceChange(index, event.target.value);
                                                                     }}
                                                                     name="price"
                                                                     min="0"    
                                                                     value={(type === "header")?"":props.price} 
                                                                     placeholder="Precio de venta" 
                                                                     className="input w-full border mt-2" />  }

    format["SIZE"][6]={header:"Cantidad"               , type:<input type="number"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     name="quantity"
                                                                     min="1" 
                                                                     value={(type === "header")?"":props.quantity}  
                                                                     placeholder="Cantidad"  
                                                                     className="input w-full border mt-2" /> }

    format["SIZE"][7]={header:"Condición del producto" , type:<select name="ItemCondition"                                                                             
                                                                      value={(![undefined,""].includes(props.ItemCondition))?props.ItemCondition.value:""} 
                                                                      onChange={(event)=>{props.onConditionChange(event, index)}}
                                                                      className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                      <option value="">Seleccionar una condición</option>
                                                                      <option value="NEW">Nuevo</option> 
                                                                      <option value="USED">Usuado</option> 
                                                              </select>}

    format["SIZE"][8]={header:"Proveedor"              , type:<input type="text"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     name="supplier" 
                                                                     value={(type === "header")?"":props.supplier} 
                                                                     placeholder="Proveedor" 
                                                                     className="input w-full border mt-2" /> }

    format["SIZE"][9]={header:"Precio sin impuesto"    , type:<input  type="number"  
                                                                      onChange={(event)=>{props.onChange(event, index)}}
                                                                      readOnly
                                                                      name="basePrice" 
                                                                      value={(type === "header")?"":props.basePrice}  
                                                                      placeholder="Precio sin impuesto" 
                                                                      className="input w-full bg-gray-100 cursor-not-allowed border mt-2" /> }
    
    format["SIZE"][10]={ header: "Acción"            , type:<div  onClick={()=>{props.delete(index)}} className="flex items-center text-theme-6 cursor-pointer" > Eliminar </div> }

    return format["SIZE"]
}


/***************SIZE FORMAT***********************/      

const size_colour =(index, type , props)=>{
    format["SIZE-COLOUR"] = []
    format["SIZE-COLOUR"][0]={ header:"#"                      , type:(index+1).toString() }
    format["SIZE-COLOUR"][1]={ header:"Variante"               , type:<label>Tamaño-Color</label> }
    format["SIZE-COLOUR"][2]={ header:"Nombre del color"       , type:<input type="text"  
                                                                             name="value" 
                                                                             value={(type === "header")?"":props.value} 
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             placeholder="Nombre del color" 
                                                                             className="input w-full border mt-2" />  }

    format["SIZE-COLOUR"][3]={ header:"Color"                  , type:<PopoverPicker props={{...props, index:index}}></PopoverPicker>}

    format["SIZE-COLOUR"][4]={ header:"Tamaño"                 , type:<input type="text"
                                                                             name="colour_size" 
                                                                             value={(type === "header")?"":props.colour_size} 
                                                                             onChange={(event)=>{props.onChange(event, index)}}  
                                                                             placeholder="Tamaño" 
                                                                             className="input w-full border mt-2" /> }

    format["SIZE-COLOUR"][5]={ header:"Código del producto"    , type:<input type="text" 
                                                                             name="code" 
                                                                             value={(type === "header")?"":props.code}  
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             placeholder="Código del producto" 
                                                                             className="input w-full border mt-2" /> }

    format["SIZE-COLOUR"][6]={ header:"Precio de compra"       , type:<input type="number"  
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             name="cost"
                                                                             min="0" 
                                                                             value={(type === "header")?"":props.cost}
                                                                             placeholder="Precio de compra" 
                                                                             className="input w-full border mt-2" /> }

    format["SIZE-COLOUR"][7]={ header:"Precio de venta"        , type:<input type="number"  
                                                                             onChange={(event)=>{props.onChange(event, index);
                                                                                props.onPriceChange(index, event.target.value);
                                                                             }}
                                                                             name="price"
                                                                             min="0"    
                                                                             value={(type === "header")?"":props.price} 
                                                                             placeholder="Precio de venta" 
                                                                             className="input w-full border mt-2" />  }

    format["SIZE-COLOUR"][8]={ header:"Cantidad"               , type:<input type="number"  
                                                                             name="quantity"
                                                                             min="1" 
                                                                             value={(type === "header")?"":props.quantity} 
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             placeholder="Cantidad" 
                                                                             className="input w-full border mt-2" /> }

    format["SIZE-COLOUR"][9]={ header:"Condición del producto" , type:<select  name="ItemCondition"                                                                             
                                                                               value={(![undefined,""].includes(props.ItemCondition))?props.ItemCondition.value:""} 
                                                                               onChange={(event)=>{props.onConditionChange(event, index)}}
                                                                               className="input border mr-auto whitespace-nowrap mt-0.5 w-full">+
                                                                          <option value="">Seleccionar una condición</option>
                                                                          <option value="NEW">Nuevo</option> 
                                                                          <option value="USED">Usuado</option> 
                                                                      </select>}

    format["SIZE-COLOUR"][10]={header:"Proveedor"              , type:<input type="text"  
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             name="supplier" 
                                                                             value={(type === "header")?"":props.supplier} 
                                                                             placeholder="Proveedor" 
                                                                             className="input w-full border mt-2" /> }

    format["SIZE-COLOUR"][11]={header:"Precio sin impuesto"    , type:<input type="number"  
                                                                             onChange={(event)=>{props.onChange(event, index)}}
                                                                             readOnly
                                                                             name="basePrice" 
                                                                             value={(type === "header")?"":props.basePrice} 
                                                                             placeholder="Precio sin impuesto" 
                                                                             className="input w-full bg-gray-100 cursor-not-allowed border mt-2" /> }

    format["SIZE-COLOUR"][12]={ header: "Acción"              , type:<div  onClick={()=>{props.delete(index)}}  className="flex items-center text-theme-6 cursor-pointer" > Eliminar </div> }                                                                             
    return format["SIZE-COLOUR"]
}


/***************BRAND***********************/      

const brand =(index, type , props)=>{
    format["BRAND"] = []
    format["BRAND"][0]={header:"#"                      , type:(index+1).toString() }
    format["BRAND"][1]={header:"Variante"               , type:<label>Marca</label> }
    format["BRAND"][2]={header:"Marca"                  , type:<input type="text"
                                                                      onChange={(event)=>{props.onChange(event, index)}}  
                                                                      placeholder="Marca" 
                                                                      name="value" 
                                                                      value={(type === "header")?"":props.value} 
                                                                      className="input w-full border mt-2" />  }            

    format["BRAND"][3]={header:"Código del producto"    , type:<input type="text"
                                                                      name="code" 
                                                                      value={(type === "header")?"":props.code}    
                                                                      onChange={(event)=>{props.onChange(event, index)}}
                                                                      placeholder="Código del producto" 
                                                                      className="input w-full border mt-2" /> }

    format["BRAND"][4]={header:"Precio de compra"       , type:<input type="number"
                                                                      name="cost"
                                                                      min="0" 
                                                                      value={(type === "header")?"":props.cost}  
                                                                      onChange={(event)=>{props.onChange(event, index)}}
                                                                      placeholder="Precio de compra" 
                                                                      className="input w-full border mt-2" /> }

    format["BRAND"][5]={header:"Precio de venta"        , type:<input type="number"  
                                                                      onChange={(event)=>{props.onChange(event, index);
                                                                            props.onPriceChange(index, event.target.value);
                                                                      }}
                                                                      min="0"
                                                                      name="price"    
                                                                      value={(type === "header")?"":props.price}
                                                                      placeholder="Precio de venta" 
                                                                      className="input w-full border mt-2" />  }

    format["BRAND"][6]={header:"Cantidad"               , type:<input type="number" 
                                                                      name="quantity"
                                                                      min="1" 
                                                                      value={(type === "header")?"":props.quantity} 
                                                                      onChange={(event)=>{props.onChange(event, index)}}
                                                                      placeholder="Cantidad" 
                                                                      className="input w-full border mt-2" /> }

    format["BRAND"][7]={header:"Condición del producto" , type:<select name="ItemCondition"                                                                             
                                                                       value={(![undefined,""].includes(props.ItemCondition))?props.ItemCondition.value:""} 
                                                                       onChange={(event)=>{props.onConditionChange(event, index)}}
                                                                       className="input border mr-auto whitespace-nowrap mt-0.5 w-full">
                                                                      <option value="">Seleccionar una condición</option>
                                                                      <option value="NEW">Nuevo</option> 
                                                                      <option value="USED">Usuado</option> 
                                                                </select>}

    format["BRAND"][8]={header:"Proveedor"             , type:<input type="text"
                                                                     onChange={(event)=>{props.onChange(event, index)}}  
                                                                     placeholder="Proveedor" 
                                                                     name="supplier" 
                                                                     value={(type === "header")?"":props.supplier} 
                                                                     className="input w-full border mt-2" /> }

    format["BRAND"][9]={header:"Precio sin impuesto"   , type:<input type="number"  
                                                                     onChange={(event)=>{props.onChange(event, index)}}
                                                                     readOnly 
                                                                     name="basePrice" 
                                                                     value={(type === "header")?"":props.basePrice}
                                                                     placeholder="Precio sin impuesto" 
                                                                     className="input w-full bg-gray-100 cursor-not-allowed border mt-2" /> }

    format["BRAND"][10]={ header: "Acción"            , type:<div onClick={()=>{props.delete(index)}} className="flex items-center text-theme-6 cursor-pointer" > Eliminar </div> }
    return format["BRAND"]
}

const functions = ["BRAND","SIZE","COLOUR","SIZE-COLOUR"]

functions["BRAND"]       = (index, type ,props) => brand( index, type , props)
functions["SIZE"]        = (index, type , props) => size( index, type , props)
functions["COLOUR"]      = (index, type , props) => colour( index, type , props)
functions["SIZE-COLOUR"] = (index, type , props) => size_colour( index, type , props)

const getVariationFormat =(array, index, type, props)=>{    
    return functions[array](index, type, props)
}

export default getVariationFormat;
