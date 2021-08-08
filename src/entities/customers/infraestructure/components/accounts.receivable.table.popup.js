import {React}   from 'react';

const ReceivableMovementTablePopUp=(state)=>{
    
    return (
        <div className="modal__product" id="receivable-modal">
            <div className="modal__content">
                

                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                    { (state.state.loading) 
                        ? <h2 className="font-medium text-base mr-auto inline-flex items-center">{"Imprimiendo..."} 
                                    <img  className="h-5 ml-3" alt="" src="/assets/images/black.gif"></img>
                            </h2>
                        :<h2 className="font-medium text-base mr-auto inline-flex items-center">{(state.state.type ==="credit")?"Lista de creditos":"Lista de abonos"}</h2> }                                        
                </div>
                <div className="px-5 sm:px-16 py-10 sm:py-20">
                    <div className="overflow-x-auto">
                        {(state.state.detail.length>0)
                            ?<table className="table">
                                <thead>
                                    <tr>
                                        <th className="border-b-2 whitespace-nowrap">FECHA</th> 
                                        <th className="border-b-2 whitespace-nowrap">PRECIO</th>
                                        <th className="border-b-2 whitespace-nowrap"></th>     
                                    </tr>
                                </thead>
                                <tbody> 
                                    {state.state.detail.map((item,index)=>(
                                        <tr key={index}>
                                            <td  className="border-b">
                                                <div className="font-medium whitespace-nowrap">{new Date(item.date.replaceAll("-","/")).toLocaleDateString()}</div>                                                                                                                                   
                                            </td>
                                            <td className="text-right border-b dark:border-dark-5 w-32"> 
                                                <div className="text-gray-600 flex text-xs whitespace-nowrap">L {Number(item.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  </div>                                                                                                                                                                          
                                            </td>
                                            <td  className="border-b w-12">
                                                { (state.state.type !== "credit")
                                                    ?<button onClick={()=>{ state.state.onClickChangePrintState({ reference: item.reference, 
                                                                                                  pay      : item.value    ,
                                                                                                  day      : item.date
                                                                                                }) }} 
                                                             type="button" className="button w-24 bg-theme-1 ml-0 text-white">Imprimir</button> 
                                                    :<></> }                                                                                                 
                                            </td>
                                        </tr>
                                    ))}                                                                                              
                                </tbody>
                             </table>
                            :<div>No hay datos que mostrar.</div>
                        }                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReceivableMovementTablePopUp;