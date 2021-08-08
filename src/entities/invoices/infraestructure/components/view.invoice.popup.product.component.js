import {React} from 'react';
import { useSelector } from 'react-redux';
import { getInvoice  } from '../../core/selector/invoice.selector';

const ViewInvoiceProduct =()=>{

    const invoice  = useSelector(getInvoice); 

    return (
        <div className="modal__product" id="product-invoice-modal">
            <div className="modal__content">
                <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                    <h2 className="font-medium text-base mr-auto"> Productos vendidos</h2>
                </div>
                <div className="px-5 sm:px-16 py-10 sm:py-20">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="border-b-2 whitespace-nowrap">DESCRIPCIÓN</th> 
                                    <th className="border-b-2 whitespace-nowrap">PRECIO</th>     
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.productsInInvoice.map((item, index)=>(
                                    <tr key={index}>
                                        <td  className="border-b">
                                        <div className="font-medium whitespace-nowrap">{item.productName}</div>
                                            {item.ProductVariations.map((variation , i)=>(
                                                <div key={i} className="text-gray-600 flex text-xs whitespace-nowrap">{variation.name}</div> ))}                                                                                        
                                        </td>
                                        <td className="text-right border-b dark:border-dark-5 w-32"> 
                                            {item.ProductVariations.map((variation , i)=>(
                                                <div key={i} className="text-gray-600 flex text-xs whitespace-nowrap">L {Number(variation.invoice_price).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}  </div>                                                                                                                               
                                            ))}                                            
                                        </td>
                                    </tr>))}                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default ViewInvoiceProduct;