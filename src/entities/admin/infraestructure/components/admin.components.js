import {React,useEffect}       from 'react';
import { useDispatch, 
         useSelector }         from 'react-redux';
import GeneralReports          from './main.page.component';
import CreateInvoice           from '../../../invoices/infraestructure/components/createinvoice.component';
import ViewInvoice             from '../../../invoices/infraestructure/components/view.invoice.component';
import DataListInvoices        from '../../../invoices/infraestructure/components/data.list.invoices.component';
import Balance                 from '../../../balance/infraestructure/components/balance.component';
import CreateExpense           from '../../../balance/infraestructure/components/new.expense.component';
import CreateIncome            from '../../../balance/infraestructure/components/new.income.component';
import CreateCategory          from '../../../categories/infraestructure/components/create.categories.component';
import ListCategory            from '../../../categories/infraestructure/components/category.list.component';
import EditCategory            from '../../../categories/infraestructure/components/edit.category.component';
import IdentitiesList          from '../../../products/infraestructure/components/identities.list.component';
import ProductList             from '../../../products/infraestructure/components/product.list.component';
import ProductEdit             from '../../../products/infraestructure/components/product.edit.component';
import NewProduct              from '../../../products/infraestructure/components/product.create.component';
import NewCustomer             from '../../../customers/infraestructure/components/create.customer.component';
import ListCustomer            from '../../../customers/infraestructure/components/customers.list.component';
import EditCustomerInformation from '../../../customers/infraestructure/components/edit.customer.component';
import AccountsRecivableList   from '../../../customers/infraestructure/components/accounts.receivable.list.component';
import ViewReceivable          from '../../../customers/infraestructure/components/view.accounts.receivable.component';
import NewDiscount             from '../../../discount/infraestructure/components/create.discount.component';
import NewPromotion            from '../../../promotion/infraestructure/components/create.promotion.component';
import DiscountsList           from '../../../discount/infraestructure/components/discounts.list.component';
import PromotionsList          from '../../../promotion/infraestructure/components/promotion.list.component';
import EditDiscount            from '../../../discount/infraestructure/components/edit.discount.component';
import EditPromotion           from '../../../promotion/infraestructure/components/edit.promotion.component';
import DailyGridReport         from '../../../reports/infraestructure/components/daily.sale.grid.report.component';
import IncomeChart             from '../../../reports/infraestructure/components/incomes.chart.report.component';
import ProductsSale            from '../../../reports/infraestructure/components/products.sale.chart.report.component';
import TransactionsReport      from '../../../reports/infraestructure/components/transactions.grid.report.component';
import ActivitiesReport        from '../../../reports/infraestructure/components/activities.grid.report.component';
import CreateProfile           from '../../../profiles/infraestructure/components/create.profile.component';
import ProfilesList            from '../../../profiles/infraestructure/components/profiles.list.component';
import EditProfile             from '../../../profiles/infraestructure/components/edit.profile.component';
import CreatePOS               from '../../../pos/infraestructure/components/create.pos.component';
import ListPOS                 from '../../../pos/infraestructure/components/pos.list.component';
import UpdatePOS               from '../../../pos/infraestructure/components/edit.pos.component';
import CreateTax               from '../../../taxes/infraestructure/components/create.tax.component';
import TaxesList               from '../../../taxes/infraestructure/components/taxes.list.component';
import EditTax                 from '../../../taxes/infraestructure/components/edit.tax.component';
import AccountReceivableConf   from '../../../customers/infraestructure/components/accounts.receivable.notification.conf.component';
import UpdateCompany           from '../../../company/infraestructure/components/update.company.component';
import NotificationsLog        from '../../../notifications/infraestructure/components/notifications.log.component';
/*************************************************************************************************************/
import { BrowserRouter , Route , Switch  }    from 'react-router-dom';
import { getCookie  }                         from '../../../../cookies/selectors/cookie.selector'; 
import { loadCookie }                         from '../../../../cookies/actions/cookie.actions';


const PrivateRoute = ({ component: Component, authenticated, access , ...rest }) => (  
    <Route {...rest} render={(props) => (
       (authenticated && access) 
        ? <Component {...props} />
        : window.location.href="/"//props.history.push({pathname:"/" , state:props.location})
    )} /> 
)

const Main=()=>{
    
    const dispatch   = useDispatch();
    const cookie     = useSelector(getCookie);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[cookie.find,dispatch])

    return(
        <div className="body app">
           { (!cookie.find)
                ?<BrowserRouter>
                    <Switch>    
                        <PrivateRoute exact path="/admin"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:true}      
                                      component={GeneralReports}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-invoices"                 
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.invoices}      
                                      component={DataListInvoices}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/get-category"                 
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.categories}   
                                      component={ListCategory}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-identities"               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.identitiesList}  
                                      component={IdentitiesList}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-products"                 
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listProduct}
                                      component={ProductList}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-customers"                                                                      
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listCustomers}
                                      component={ListCustomer}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-recivable"                                                                         
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.accountReceivable}             
                                      component={AccountsRecivableList}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/get-discounts"                                                                          
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.discountList}                    
                                      component={DiscountsList}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/get-promotions"                                                                          
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.promotionList}                   
                                      component={PromotionsList}></PrivateRoute> 
                        <PrivateRoute exact path="/admin/get-profiles"                                                                           
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listAuths}                 
                                      component={ProfilesList}></PrivateRoute>            
                        <PrivateRoute exact path="/admin/get-pos"                                                                           
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.POS}                        
                                      component={ListPOS}></PrivateRoute>
                        <PrivateRoute exact path ="/admin/get-tax"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.getTax} 
                                      component={TaxesList}></PrivateRoute>
                        <PrivateRoute exact path="/admin/get-notifications"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.isMaster}
                                      component={NotificationsLog}></PrivateRoute>
                        <PrivateRoute exact path="/admin/new-invoice"                                                                            
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newSales}                   
                                      component={CreateInvoice}></PrivateRoute>
                        <PrivateRoute exact path="/admin/new-balance"                                                                               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.cashclosing}                 
                                      component={Balance}></PrivateRoute> 
                        <PrivateRoute exact path="/admin/new-expense"                                                                               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newExpense}                    
                                      component={CreateExpense}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/new-income"                                                                               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newIncome}                     
                                      component={CreateIncome}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/new-category"                                                                               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newCategory}                  
                                     component={CreateCategory}></PrivateRoute>
                        <PrivateRoute exact path="/admin/new-product"                                                                               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newProduct}                      
                                      component={NewProduct}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/new-customer"                                                                                 
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newCustomer}                 
                                      component={NewCustomer}></PrivateRoute> 
                        <PrivateRoute exact path="/admin/new-discount"                                                                                  
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newDiscount}                  
                                      component={NewDiscount}></PrivateRoute>                       
                        <PrivateRoute exact path="/admin/new-promotion"                                                                                   
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newPromotion}                
                                      component={NewPromotion}></PrivateRoute>
                        <PrivateRoute exact path="/admin/new-profile"                                                                                   
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newLogin}                    
                                      component={CreateProfile}></PrivateRoute>   
                        <PrivateRoute exact path="/admin/new-pos"                                                                                     
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newPOS}                     
                                      component={CreatePOS}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/new-tax"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.newTax} 
                                      component={CreateTax}></PrivateRoute>              
                        <PrivateRoute exact path="/admin/update-product/:id"                                                                                      
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listProduct}          
                                      component={ProductEdit}></PrivateRoute>                                                                        
                        <PrivateRoute exact path="/admin/update-category/:id"                                                                                        
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.categories}            
                                      component={EditCategory}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/update-customer/:id"   
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listCustomers}         
                                      component={EditCustomerInformation}></PrivateRoute>
                        <PrivateRoute exact path="/admin/update-discount/:id"      
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.discountList}        
                                      component={EditDiscount}></PrivateRoute>                      
                        <PrivateRoute exact path="/admin/update-promotion/:id"       
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.promotionList}         
                                      component={EditPromotion}></PrivateRoute>
                        <PrivateRoute exact path="/admin/update-profile/:id"        
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.listAuths}           
                                      component={EditProfile}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/update-pos/:id"         
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.POS}                 
                                      component={UpdatePOS}></PrivateRoute> 
                        <PrivateRoute exact path="/admin/update-tax/:id"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.getTax}
                                      component={EditTax}></PrivateRoute>
                        <PrivateRoute exact path="/admin/update-notification"
                                      authenticated={(cookie.cookie.login !== undefined)?true:false}
                                      access={(cookie.cookie.login===undefined)?false:cookie.cookie.login.access.updatenotification}
                                      component={AccountReceivableConf}></PrivateRoute> 
                        <PrivateRoute exact path="/admin/update-company"          
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.bussinesConfig}               
                                      component={UpdateCompany}></PrivateRoute>                  
                        <PrivateRoute exact path="/admin/view-invoice/:id"           
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)
                                                ?false
                                                :cookie.cookie.login.access.newSales || cookie.cookie.login.access.invoices}               
                                      component={ViewInvoice}></PrivateRoute>    
                        <PrivateRoute exact path="/admin/view-receivabe/:id/:company"            
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.accountReceivable} 
                                      component={ViewReceivable}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/report/sales/grid-daily"               
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.DailySalesDetails}    
                                      component={DailyGridReport}></PrivateRoute>
                        <PrivateRoute exact path="/admin/report/income/chart"                
                                      authenticated={(cookie.cookie.login!== undefined)?true:false} 
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.graphIncomes}         
                                      component={IncomeChart}></PrivateRoute>
                        <PrivateRoute exact path="/admin/report/products/chart"                 
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}                                        
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.graphProduct}      
                                      component={ProductsSale}></PrivateRoute>  
                        <PrivateRoute exact path="/admin/report/sales/transactions"
                                      authenticated={(cookie.cookie.login!== undefined)?true:false}
                                      access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.transactions}
                                     component={TransactionsReport} ></PrivateRoute> 
                        <PrivateRoute exact path="/admin/report/activities"
                                     authenticated={(cookie.cookie.login!== undefined)?true:false}
                                     access={(cookie.cookie.login=== undefined)?false:cookie.cookie.login.access.activities}
                                     component={ActivitiesReport}></PrivateRoute>                    
                    </Switch>
                 </BrowserRouter>
                :<></> }
            
        </div>
    )
}

export default Main;