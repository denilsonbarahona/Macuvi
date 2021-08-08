import {React} from 'react';
import getVariationFormat from './products.variations.format.component';

const WithVariation = (state)=>{
    return (<div className="intro-y box lg:mt-5">
                <div className="flex items-center p-5 border-b border-gray-200 dark:border-dark-5">
                    <h2 className="font-medium text-base mr-auto">Variaciones del producto </h2>
                </div>
                <div className="p-5">
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-4">                                    
                        <div className="w-full sm:w-auto flex mt-0 sm:mt-0">                                        
                            <div className="dropdown border mr-2">
                                <button onClick={state.props.onClickAddVariation} 
                                        className="dropdown-toggle button text-white bg-theme-1 shadow-md flex items-center"> Nueva variación 
                                        <i className="w-4 h-4 ml-2" data-feather="plus" /> 
                                </button>
                            </div>                                                
                            <select onChange={state.props.onChangeVariationType}  
                                    value={state.props.variation.variationsType}
                                    id="typesCB"
                                    className="dropdown-toggle box text-gray-700 bg-theme-5 flex items-center">                                                        
                                <option value="">Seleccionar</option>
                                <option value="COLOUR">Color </option> 
                                <option value="SIZE"> Tamaño </option>
                                <option value="SIZE-COLOUR"> Tamaño/Color </option> 
                                <option value="BRAND"> Marca </option> 
                            </select>
                        </div>
                    </div> 
                    {(state.props.variation.items.length && state.props.variation.variationsType !=="")  
                        ?<div className="overflow-x-auto mt-10">
                            <table className="table table--sm">
                                <thead>
                                    <tr>                                                                
                                        {getVariationFormat(state.props.variation.variationsType,0, "header",{}).map((item, index)=>(                                                   
                                            <th key={index} className="border-b-2 dark:border-dark-5 whitespace-nowrap">{item.header} </th>                                                    
                                        ))}
                                    </tr>                                                    
                                </thead>
                                <tbody>
                                    {state.props.variation.variationsType !=="" && state.props.variation.items.map((var_, index)=>(
                                        <tr key={index}>                                            
                                            {getVariationFormat(state.props.variation.variationsType,
                                                                index, "row",
                                                                {...var_.data , 
                                                                  onChange: state.props.onVariationTextChange,
                                                                  onPriceChange: state.props.onChangeVariationPrice,
                                                                  onConditionChange: state.props.onVariationConditionChange,
                                                                  setColor: state.props.onChangeVariationColor,
                                                                  delete  : state.props.onClickDeleteVariation}).map((item, i)=>(                                                   
                                                <td key={i} className="border-b ">{ item.type } </td>                                                    
                                            ))}
                                        </tr>
                                    ))}                                                             
                                </tbody>
                            </table>
                        </div>
                        :<></>}                                            
                </div>
            </div> )
}

export default WithVariation;