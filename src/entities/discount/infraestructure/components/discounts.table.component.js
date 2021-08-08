import { React, useEffect }  from 'react';
import UiLoading             from '../../../ui/infraestructure/components/ui.loading.component';

const TableDiscounts =(props)=>{

    useEffect(()=>{
        if(props.payload.discounts.array !== undefined){
            window.feather.replace();
        }
    })
        
    return( <div className="grid grid-cols-12 gap-6 mt-5"> 
                 {(!props.payload.isLoaded)
                    ?<></>
                    :<div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                                         
                        <div className="hidden md:block mx-auto text-gray-600">{props.payload.discounts.size} Cantidad de promociones como resultado de la búsqueda</div>                                                                    
                    </div> } 
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    {(!props.payload.isLoaded)
                        ?<UiLoading loading={props.payload.loading.loading}></UiLoading>
                        :<table className="table table-report -mt-2">
                            <thead>
                                <tr> 
                                    <th className="whitespace-nowrap"><b>Descripción</b></th>
                                    <th className="text-center whitespace-nowrap"><b>Fecha de finalización</b></th>  
                                    <th className="text-center whitespace-nowrap"><b>Acciones</b></th>
                                </tr>
                            </thead>
                            <tbody>                                 
                                {props.payload.discounts.array !== undefined && props.payload.discounts.array[props.payload.Page] !== undefined && 
                                    props.payload.discounts.array[props.payload.Page].map((discount , index)=>(

                                    <tr key={index} className="intro-x">
                                        <td>{discount.data.DiscountName}</td>
                                        <td className="text-center">{
                                            (discount.data.DiscountEndDate==="")
                                                ?"Sin fecha de finalización"
                                                :new Date(discount.data.DiscountEndDate).toLocaleDateString([],{ year: 'numeric', month: 'long', day: 'numeric' }) 
                                        }</td>
                                        <td className="table-report__action w-56">
                                            <div className="flex justify-center items-center">
                                                <div onClick={()=>{ props.payload.showDiscount(discount.id) }} className="flex items-center mr-3 cursor-pointer"> 
                                                    <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Modificar 
                                                </div>
                                                <div onClick={()=>{ props.payload.onDeleteDiscount(discount.id) }} className="flex items-center text-theme-6 cursor-pointer"> 
                                                    <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Eliminar 
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                )) }                                
                            </tbody>
                        </table> }
                    
                </div>
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    {(props.payload.isLoaded)
                        ?<ul className="pagination">
                            <li onClick={()=>{ props.payload.SetPage(0) }}  > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                            <li onClick={()=>{ if(props.payload.Page > 0)
                                                   props.payload.SetPage(props.payload.Page -1)
                                             }} > 
                                <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> 
                            </li> 
                            {(props.payload.discounts.array !== undefined && props.payload.discounts.array.map((item, index)=>(                                            
                                <li key={index} onClick={()=>{props.payload.SetPage(index)}} > 
                                    <div className={(index === props.payload.Page)?"pagination__link pagination__link--active":"pagination__link"} >{index+1}</div> 
                                </li>                                              
                            )))}    
                            <li  onClick={()=>{ if(props.payload.Page  < props.payload.discounts.array.length - 1)
                                                    props.payload.SetPage(props.payload.Page+1)
                                            }} > 
                                <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> 
                            </li> 
                            <li  onClick={()=>{ props.payload.SetPage(props.payload.discounts.array.length -1) }} > 
                                <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div> 
                            </li>                                             
                        </ul>
                        :<></> }                                    
                </div>  
            </div>)
}

export default TableDiscounts;