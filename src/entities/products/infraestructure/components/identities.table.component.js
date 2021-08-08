import { React, useEffect, useState }  from 'react';
import UiLoading                       from '../../../ui/infraestructure/components/ui.loading.component';
import UpdateIdentityPopUp             from './identity.popup.update.component';


const TableIdentities =(props)=>{

    const [identityPayload, setIdentityPayload] = useState({id:"", identity_description:"",required:["identity_description"]})

    useEffect(()=>{
        if(props.payload.array !== undefined){
            window.feather.replace();
        }
    })

    const showUpdatePopUp=(id, descripción)=>{
        setIdentityPayload({id:id, identity_description:descripción,required:["identity_description"]})
        window.showModal("#update-identity-popup")
    }

    const onChangePopUpDescription=(e)=>{
        setIdentityPayload(()=>({...identityPayload, [e.target.name]: e.target.value}))
    }

    return (
        <div className="grid grid-cols-12 gap-6 mt-5">              
            {(props.payload.loading.loading)
                ?<></>
                :<div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                                         
                    <div className="hidden md:block mx-auto text-gray-600">{props.payload.size} Cantidad de identificadores como resultado de la búsqueda</div>                                                                    
                </div> }                
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <UpdateIdentityPopUp payload={{ ...identityPayload, 
                                                updateIdentityResponse: props.payload.updateIdentityResponse ,
                                                updateIdentityDescription: props.payload.updateIdentityDescription ,
                                                onChangePopUpDescription:onChangePopUpDescription,
                                                ...props.payload.loading
                                                }}></UpdateIdentityPopUp>
                {(props.payload.loading.loading)
                    ?<UiLoading loading={props.payload.loading.loading}></UiLoading>
                    :<table className="table table-report -mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap"><b>Identificativo</b></th>
                                <th className="whitespace-nowrap"><b>Descripción</b></th>
                                <th className="text-center whitespace-nowrap"><b>Fecha de venta</b></th> 
                                <th className="text-center whitespace-nowrap"><b>Acciones</b></th> 
                            </tr>
                        </thead>
                        <tbody>
                            { (props.payload.array !== undefined && props.payload.array[props.payload.Page] !== undefined
                                 &&
                                props.payload.array[props.payload.Page].map((item, index)=>(
                                    <tr key={index} className="intro-x">
                                        <td className="">{ item.data.ProductIdentity }</td>
                                        <td>{item.data.ProductsIdentityDescription}</td>
                                        <td className="text-center">{item.data.ProductIdentitySellingDate}</td>
                                        <td className="table-report__action w-56">
                                            <div className="flex justify-center items-center">
                                                <div onClick={()=>{showUpdatePopUp(item.id, item.data.ProductsIdentityDescription)}} className="flex items-center mr-3 cursor-pointer"> 
                                                        <i data-feather="check-square" className="w-4 h-4 mr-1"></i> Modificar 
                                                </div>
                                                {/*}<div className="flex items-center text-theme-6 cursor-pointer"> <i data-feather="trash-2" className="w-4 h-4 mr-1"></i> Eliminar </div>{*/}
                                            </div>
                                        </td>
                                    </tr>
                                )) ) }                            
                        </tbody>
                    </table>}                
            </div> 

            <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                {(props.payload.loading.loading)
                    ?<></>
                    :<ul className="pagination">
                        <li onClick={()=>{  props.payload.SetPage(0) }}  > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                        <li onClick={()=>{ if(props.payload.Page > 0)
                                                    props.payload.SetPage(props.payload.Page-1)
                                            }} > 
                                            <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> 
                        </li> 
                        {(props.payload.array !== undefined && props.payload.array.map((item, index)=>(                                            
                                <li key={index} onClick={()=>{props.payload.SetPage(index)}} > 
                                    <div className={(index === props.payload.Page)?"pagination__link pagination__link--active":"pagination__link"} >{index+1}</div> 
                                </li>                                              
                            )))}  
                        <li onClick={()=>{ if(props.payload.Page  < props.payload.array.length - 1)
                                                    props.payload.SetPage(props.payload.Page+1)
                                            }}  > 
                                            <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> 
                        </li> 
                        <li  onClick={()=>{ props.payload.SetPage(props.payload.array.length -1) }} > <div className="pagination__link" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div> </li>                                             
                    </ul>}
                
            </div>           
        </div>
    )
}

export default TableIdentities;