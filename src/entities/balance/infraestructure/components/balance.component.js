import { React , useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header            from '../../../header/infraestructure/components/header.component';
import MobileMenu        from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu          from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading         from '../../../ui/infraestructure/components/ui.loading.component';
import IncomeExpensePopUp from './incomes.expenses.popup.component';
import InitBalanceForm   from './create.balance.form.component'
import { getBalance, 
         showIncomeExpense,
         closeBalance
        }                from '../../core/actions/balance.actions';        
import { loadCookie  }   from '../../../../cookies/actions/cookie.actions';
import { getBalance_ }   from '../../core/selector/balance.selector';
import { getLoading }    from '../../../ui/core/selector/ui.selector';
import { getCookie   }   from '../../../../cookies/selectors/cookie.selector';



const Balance =()=>{

    const dispatch = useDispatch()
    const cookie   = useSelector(getCookie)  
    const balance  = useSelector(getBalance_);    
    const loading  = useSelector(getLoading);
        
    if(cookie.find){
        dispatch(loadCookie())           
    }
    
    useEffect(()=>{
        if(balance.check && !cookie.find && !loading.loading){
            dispatch(getBalance({company:cookie.cookie.login.companyId, auth:cookie.cookie.login.id}))
        }        
    })
    

    return(
        <>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="2" sub="4"></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Balance de caja </h2>  
                        {(balance.payload.length > 0)
                            ?<div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 
                                <button style={{display:(loading.button)?"":"none" }}  
                                        className="button w-32 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> Finalizando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img>
                                </button>                           
                                <div style={{display:(loading.button)?"none":"" }} 
                                     onClick={()=>{dispatch(closeBalance(balance.payload[0].id))}} 
                                     className="button text-white bg-theme-1 shadow-md mr-2">Cerrar Balance</div>
                            </div>
                            :<></>}                                              
                    </div>                    
                    <div className="box p-5 mt-5">                        
                        {(loading.loading)
                            ?(<>
                                <UiLoading className="mb-10" loading={loading.loading}></UiLoading>
                                <br/><br/>
                              </>)
                            :(<></>)} 
                        {(balance.payload.length > 0)
                            ?(  <div> 
                                    {(balance.show_error)
                                        ?<div className="p-2 gap-4 gap-y-3 font-medium text-theme-6">{balance.error} </div>
                                        :<></>}
                                    
                                    <IncomeExpensePopUp></IncomeExpensePopUp>
                                    <div className="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20">
                                        <div>
                                            <div className="text-base text-gray-600">Fecha de apertura</div>                                            
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                              {new Date(balance.payload[0].data.CashBalanceStartDate.replaceAll("-","/")).toLocaleDateString()}
                                            </div>
        
                                            <div className="text-base text-gray-600 mt-5">Estado</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                                {(balance.payload[0].data.CashBalanceState===1)?"Activo":"Inactivo"}
                                            </div>
                                        </div> 
                                        <div className="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
                                            <div className="text-base text-gray-600">Responsable</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                                {balance.payload[0].data.CashBalanceAuthName}
                                            </div>                                              
                                            <div className="text-base text-gray-600 mt-5">Balance</div>
                                            <div className="text-lg font-medium text-theme-1 dark:text-theme-10 mt-2">
                                                L { Number(balance.payload[0].data.CashBalanceFinalBalanceCash).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") }
                                            </div>                                 
                                        </div>
                                    </div>
                                    <div className="px-5 sm:px-16 py-10 sm:py-20">
                                        <div className="overflow-x-auto">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="border-b-2 whitespace-nowrap"><div className="font-bold">DETALLE</div></th> 
                                                        <th className="border-b-2 whitespace-nowrap"></th>  
                                                        <th className="border-b-2 whitespace-nowrap"></th>     
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="font-medium whitespace-nowrap">Saldo Inicial</div>                                                                                     
                                                        </td>
                                                        <td colSpan="2" className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">L 
                                                                {Number(balance.payload[0].data.CashBalanceInitBalanceCash).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                                            </div>                                                                                                                                             
                                                        </td>
                                                    </tr>   
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="font-medium whitespace-nowrap">Ingresos</div>                                                                                     
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">L 
                                                                {Number(balance.payload[0].data.CashBalanceMoneyIncome).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                                            </div>                                                                                                                                                                                                 
                                                        </td>                                                
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div data-toggle="modal"  data-target="#income-expense-modal" 
                                                                 onClick={()=>{ dispatch(showIncomeExpense({type:1 , data:balance.payload[0].data.CashBalancesIncomesDetail })) }}
                                                                 className="text-gray-600 flex cursor-pointer whitespace-nowrap font-bold">Detalle
                                                            </div>                                                                                                                                                                                                 
                                                        </td>
                                                    </tr>   
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="font-medium whitespace-nowrap">Salidas</div>                                                                                     
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">L 
                                                                {Number(balance.payload[0].data.CashBalanceMoneyExpenses).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                                            </div>                                                                                                                                             
                                                        </td>                                                
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div data-toggle="modal"  data-target="#income-expense-modal" 
                                                                 onClick={()=>{ dispatch(showIncomeExpense({type:2 , data:balance.payload[0].data.CashBalancesExpensesDetail })) }} 
                                                                className="text-gray-600 flex cursor-pointer whitespace-nowrap font-bold">Detalle</div>                                                                                                                                                                                                 
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                        <td className="border-b">
                                                            <div className="whitespace-nowrap font-bold">Balance final</div>                                                                                     
                                                        </td>
                                                        <td colSpan="2" className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div className="text-gray-600 flex whitespace-nowrap">L 
                                                                {Number(balance.payload[0].data.CashBalanceFinalBalanceCash).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
                                                            </div>                                                                                                                                             
                                                        </td>
                                                    </tr>                                              
                                                    <tr>
                                                        <td colSpan="2"  className="border-b">
                                                            <div className="whitespace-nowrap font-bold">
                                                                Primera factura: {(balance.payload[0].data.CashBalancesInvoices.length>0)?balance.payload[0].data.CashBalancesInvoices[0].invoice:""} 
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                Ultima factura: {(balance.payload[0].data.CashBalancesInvoices.length>0)?balance.payload[0].data.CashBalancesInvoices[balance.payload[0].data.CashBalancesInvoices.length-1].invoice:""}</div>                                                                                     
                                                        </td>
                                                        <td className="text-right border-b dark:border-dark-5 w-32">                                                         
                                                            <div data-toggle="modal"  data-target="#income-expense-modal" 
                                                                 onClick={()=>{ dispatch(showIncomeExpense({type:3 , data:balance.payload[0].data.CashBalancesInvoices })) }} 
                                                                 className="text-gray-600 flex cursor-pointer whitespace-nowrap font-bold">Ver facturas</div>                                                                                                                                             
                                                        </td>
                                                    </tr>                                
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>  )
                            :<>
                                {(!loading.loading)
                                    ?<InitBalanceForm cookies={{...cookie.cookie, balance: balance}}></InitBalanceForm>
                                    :<></>}                               
                            </>} 
                                             
                    </div>                     
                </div>
            </div>
        </>
    )
}

export default Balance;