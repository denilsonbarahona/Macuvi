import { React, useEffect }  from 'react';

const CustomersTable =(state)=>{

    useEffect(()=>{
        if(state.props.array !== undefined){
            window.feather.replace();
        }
    },[state.props.array])

    return( <div className="grid grid-cols-12 gap-6 mt-5">                
                <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                            
                    <div className="hidden md:block mx-auto text-gray-600">{state.props.size} clientes como resultado de la búsqueda</div>                            
                </div>                                                                                                     
                    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                        <table className="table table-report -mt-2">
                            <thead>
                                <tr>
                                    <th className="whitespace-nowrap">DNI DEL CLIENTE</th>
                                    <th className="whitespace-nowrap">NOMBRE DEL CLIENTE</th> 
                                    <th className="whitespace-nowrap">NÚMERO DE TELÉFONO</th> 
                                    <th className="whitespace-nowrap">CORREO ELECTRÓNICO</th>
                                    <th className="whitespace-nowrap">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {state.props.array !== undefined && state.props.array[state.props.page] !== undefined &&
                                        state.props.array[state.props.page].map((item , index)=>(
                                            <tr key={index} className="intro-x">
                                                <td className="W-40"> {item.data.CustomerID} </td> 
                                                <td className="W-40"> {item.data.CustomerName} </td> 
                                                <td className="W-40"> {item.data.CustomerPhoneNumber} </td> 
                                                <td className="W-40"> {item.data.CustomerEmail} </td>                                                       
                                                <td className="table-report__action w-56">
                                                    <div className="flex justify-center items-center">
                                                        <div onClick={()=>{state.props.onShowCustomer(item.id) }} className="flex items-center mr-3 cursor-pointer"> <i data-feather="eye" className="w-4 h-4 mr-1" /> Visualizar </div> 
                                                        <div onClick={()=>{state.props.onDeleteCustomer(item.id) }} className="flex items-center mr-3 cursor-pointer text-theme-6"> <i data-feather="trash-2" className="w-4 h-4 mr-1" /> Eliminar </div>                                                                                                                             
                                                    </div>
                                                </td>
                                            </tr>
                                        )) }                                                                                                                                    
                            </tbody>
                        </table>
                    </div>
                 <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                        <ul className="pagination">
                            <li onClick={()=>{ state.props.setPager(0)}} > <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-left" /> </div> </li>
                            <li onClick={()=>{ if(state.props.page > 0) 
                                                    state.props.setPager(state.props.page -1) }} > 
                                <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-left" /> </div> </li>  
                                                                                
                                {state.props.array !== undefined && state.props.array.map((item , index)=>(
                                    <li  key={index} onClick={()=>{ state.props.setPager(index) }} >
                                        <div className={(index === state.props.page)
                                                ?"pagination__link pagination__link--active cursor-pointer"
                                                :"pagination__link cursor-pointer"} >
                                            { index +1 }
                                        </div></li>))}
                            
                            <li onClick={()=>{ if(state.props.page < state.props.array.length -1) 
                                                    state.props.setPager(state.props.page +1) }}> 
                                <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevron-right" /> </div> </li>
                            <li onClick={()=>{ state.props.setPager(state.props.array.length -1)}}  > <div className="pagination__link cursor-pointer" > <i className="w-4 h-4" data-feather="chevrons-right" /> </div> </li>
                        </ul>                   
                    </div>                                        
            </div>)
}

export default CustomersTable;