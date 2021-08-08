import { React, useEffect, useState }   from 'react';
import { useDispatch, 
         useSelector }        from 'react-redux';
import { getDashboard }       from '../../../ui/core/selector/ui.selector';
import { getCookie  }         from '../../../../cookies/selectors/cookie.selector'; 
import { getTopTransaction }  from '../../core/actions/report.actions';
import { loadCookie }         from '../../../../cookies/actions/cookie.actions';
import UiLoading              from '../../../ui/infraestructure/components/ui.loading.component';

const TopTransactions = ()=>{

    const [transactions, setTransactions] = useState([])
    const dispatch = useDispatch()
    const loading  = useSelector(getDashboard);
    const cookie   = useSelector(getCookie); 

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find, dispatch])
    
    useEffect(()=>{
        if(!cookie.find){                    
            dispatch(getTopTransaction({fillTransactions:fillTransactions,
                                         company: cookie.cookie.login.companyId }))                             
        }
    },[cookie.find, cookie.cookie.login.companyId, dispatch])

    const fillTransactions = (transactions)=>{ 
        setTransactions(transactions)
    }

    return (<div className="xxl:pl-6 grid grid-cols-12 gap-6"> 
                <div className="col-span-12 md:col-span-6 xl:col-span-4 xxl:col-span-12 mt-3 xxl:mt-8">
                    <div className="intro-x flex items-center h-10">
                        <h2 className="text-lg font-medium truncate mr-5">
                            Transacciones recientes
                        </h2>
                    </div>
                    {(cookie.find || loading.topTransactions)
                        ?<UiLoading loading={loading.topTransactions}></UiLoading>
                        :<div className="mt-5">
                            {transactions.length>0 && transactions.map((item, index)=>(
                                <div key={index} className="intro-x">
                                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                                        <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                                        <img alt="transaction" src="/assets/images/item.jpg" />
                                        </div>
                                        <div className="ml-4 mr-auto">
                                            <div className="font-semibold text-xs">{item.data.billingCreatedBy}</div>
                                            <div className="text-gray-600 text-xs mt-0.5">{item.data.billingDate}</div>
                                        </div>
                                        <div className="text-theme-9">{Number(item.data.billingTotal).toFixed(2).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</div>
                                    </div>
                                </div>
                            ))}

                            {transactions.length>0
                                ?<>
                                    {cookie.cookie.login.isMaster === 1
                                        ? <div className="intro-x w-full block text-center 
                                                rounded-md py-3 border border-dotted border-theme-15 
                                                text-theme-16 cursor-pointer"
                                                onClick={()=>{ window.location.href="/admin/report/sales/transactions" }}>
                                            Ver mas </div>
                                        :<></> }
                                 </>
                                :<div className="intro-x w-full block text-center 
                                        rounded-md py-3 border border-dotted border-theme-15 
                                        text-theme-16 cursor-pointer">
                                    No hay transacciones realizadas </div>  }
                            
                        </div>
                    }
                    
                </div>
            </div>)
}

export default TopTransactions;