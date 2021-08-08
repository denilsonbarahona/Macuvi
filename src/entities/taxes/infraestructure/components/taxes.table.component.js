import {React, useEffect} from 'react'

const TaxTable =(props)=>{

    useEffect(()=>{
        if (props.state.tax.length) {
            window.feather.replace()
        }
    },[props.state.tax.length])

    return (
        <>
            <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">                            
                <div className="hidden md:block mx-auto text-gray-600">{props.state.tax.length} impuestos como resultado de la búsqueda</div>                            
            </div>                                                                                                     
            <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
                <table className="table table-report -mt-2">
                    <thead>
                        <tr>
                            <th className="whitespace-nowrap">NOMBRE DEL IMPUESTO</th>
                            <th className="whitespace-nowrap">IMPUESTO</th> 
                            <th className="whitespace-nowrap">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {props.state.tax !== undefined && props.state.tax.map((item, index)=>(
                            <tr key={index} className="intro-x">
                                <td className="W-40"> {item.data.TaxName} </td>
                                <td className="W-40"> {item.data.Tax} </td>                                                       
                                <td className="table-report__action w-56">
                                    <div className="flex justify-center items-center">
                                        <div onClick={()=>{ props.state.onClickEdit(item.id) }} className="flex items-center mr-3 cursor-pointer"> <i data-feather="eye" className="w-4 h-4 mr-1" /> Visualizar </div> 
                                        <div onClick={()=>{ props.state.onClickDelete(item.id) }} className="flex items-center mr-3 cursor-pointer text-theme-6"> <i data-feather="trash-2" className="w-4 h-4 mr-1" /> Eliminar </div>                                                                                                                             
                                    </div>
                                </td>
                            </tr> )) }                                                                                                    
                    </tbody>
                </table>
            </div> 
        </>
    )
}

export default TaxTable;
