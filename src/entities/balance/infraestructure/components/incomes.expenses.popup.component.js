import { React }         from 'react'
import { useSelector }   from 'react-redux';
import { getBalance_ }   from '../../core/selector/balance.selector';

const IncomeExpensePopUp=()=>{
    
    const balance  = useSelector(getBalance_);  
    
    return(
        <>
            <div className="modal__product" id="income-expense-modal">
                <div className="modal__content">
                    <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 dark:border-dark-5">
                        <h2 className="font-medium text-base mr-auto">
                            {(balance.incomeExpense.type===1)
                                ?"Lista de ingresos"
                                :(balance.incomeExpense.type===2)
                                    ?"Lista de gastos"
                                    :"Lista de facturas"
                            }</h2>
                    </div>
                    {(balance.incomeExpense.data !== undefined)
                        ?<div className="px-5 sm:px-5 py-5 sm:py-5">
                            <div className="overflow-y-auto max-h-96">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="border-b-2 whitespace-nowrap">FECHA</th> 
                                            <th className="border-b-2 w-5 whitespace-nowrap">
                                                    {(balance.incomeExpense.type===3)
                                                        ?"NÚMERO FACTURA"
                                                        :"DESCRIPCIÓN"}</th> 
                                            <th className="border-b-2 whitespace-nowrap">VALOR</th>     
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        { balance.incomeExpense.data.map((item , index)=>(
                                            <tr key={index}>
                                                <td  className="border-b">
                                                    <div className="font-medium text-xs whitespace-nowrap">{new Date(item.date.replaceAll("-","/")).toLocaleDateString()}</div>                                                                                      
                                                </td>
                                                <td  className="border-b w-5">
                                                    <div className="font-medium text-xs whitespace-nowrap">
                                                        {(balance.incomeExpense.type===3)
                                                            ?item.invoice
                                                            :item.description}
                                                    </div>                                                                                      
                                                </td>
                                                <td  className="border-b">
                                                    <div className="font-medium text-xs whitespace-nowrap">L {Number(item.value).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>                                                                                      
                                                </td>
                                            </tr>   
                                        ))}
                                                                
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :<></>}                    
                </div>
            </div>          
        </> )
}

export default IncomeExpensePopUp;