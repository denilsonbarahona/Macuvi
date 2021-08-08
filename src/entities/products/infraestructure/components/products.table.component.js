import { React, useEffect } from 'react';
import UiLoading            from '../../../ui/infraestructure/components/ui.loading.component';

const ProductsTable =(products)=>{

    useEffect(()=>{
        if(products.payload.array !== undefined){
            window.feather.replace();
        }
    })

    return (<div className="grid grid-cols-12 gap-6 mt-5">
                {(products.payload.ui.loading)
                    ?<></>
                    :<div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                            
                        <div className="hidden md:block mx-auto text-gray-600">{products.payload.size} Cantidad de productos como resultado de la búsqueda</div>                           
                    </div>}
                
                <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                    {(products.payload.ui.loading)
                        ?<UiLoading loading={products.payload.ui.loading}></UiLoading>
                        :<table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap"><b>IMAGEN</b></th>
                                    <th className="whitespace-nowrap"><b>PRODUCTO</b></th>
                                    <th className="text-center whitespace-nowrap"><b>INVENTARIO</b></th>                                            
                                    <th className="text-center whitespace-nowrap"><b>ACCIONES</b></th>
                                </tr>
                            </thead>
                            <tbody> 
                                {(  products.payload.array !== undefined && products.payload.array[products.payload.page] !== undefined && 
                                    products.payload.array[products.payload.page].map((item, index)=>(
                                    <tr key={index} className="intro-x">
                                        <td className="w-40">
                                            <div className="flex">
                                                <div className="w-14 h-14 image-fit zoom-in">
                                                    <img alt="product img" className="tooltip rounded-full" src={item.img} title={item.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div  className="font-medium whitespace-nowrap">{item.name}</div> 
                                            <div className="text-gray-600 text-xs whitespace-nowrap mt-0.5">{item.categoryName}</div>
                                        </td>
                                        <td className="text-center">{item.stock}</td>
                                        <td className="table-report__action w-56">
                                            <div className="flex justify-center items-center">
                                                <div onClick={()=>{ products.payload.onViewProduct(item.id)}} className="flex items-center mr-3 cursor-pointer"> <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Modificar </div>
                                                <div onClick={()=>{ products.payload.onDeleteProduct(item.id, item.name, item.categoryId)}} className="flex items-center text-theme-6 cursor-pointer"> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Eliminar </div>
                                            </div>
                                        </td>
                                    </tr>
                                )))}                                        
                            </tbody>
                        </table>}
                                                   
                </div>                               
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    {(products.payload.ui.loading)
                        ?<></>
                        :<ul className="pagination">
                            <li onClick={()=>{  products.payload.setPage(0) }} > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                            <li  onClick={()=>{ if(products.payload.page > 0)
                                                    products.payload.setPage(products.payload.page-1)
                                            }} > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> </li>                                        
                            
                            {(products.payload.array !== undefined && products.payload.array.map((item, index)=>(                                            
                                <li key={index} onClick={()=>{products.payload.setPage(index)}} > <div className={(index === products.payload.page)?"pagination__link pagination__link--active":"pagination__link"} >{index+1}</div> </li>                                              
                            )))}                                                                              
                            <li onClick={()=>{ if(products.payload.page < products.payload.array.length - 1)
                                                    products.payload.setPage(products.payload.page+1)
                                            }} > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> </li>
                            <li  onClick={()=>{  products.payload.setPage(products.payload.array.length -1) }} ><div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div></li>
                        </ul>}
                     
                </div>                                                 
            </div> )
}


export default ProductsTable;