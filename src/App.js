import Login                 from './entities/login/infraestructure/components/login.component'
import SignUp                from './entities/login/infraestructure/components/signup.component'
import Admin                 from './entities/admin/infraestructure/components/admin.components'
//import PrintPayment          from './entities/customers/infraestructure/components/account.payment.print.support.component';
import Invitation            from './entities/login/infraestructure/components/invitation.signup.component';
import RequestChangePassword from './entities/login/infraestructure/components/request.change.password.component';
import RequestNotificationSuccess from './entities/login/infraestructure/components/request.notification.success.component';
import ChangePassword        from './entities/login/infraestructure/components/change.password.component';
import ActivateAccount       from './entities/login/infraestructure/components/activate.account.component';
/********************/
import { BrowserRouter , 
         Route , Switch  }   from 'react-router-dom';
import queryString           from 'query-string';

function App() {
  return (
    <div className="App">
      <BrowserRouter>  
            <Switch>
                <Route exact path="/"                  component={Login}></Route>
                <Route exact path="/sign-up"           component={SignUp}></Route>
                <Route exact path="/request/change"    component={RequestChangePassword}></Route>
                <Route exact path="/request/notify/:email" component={RequestNotificationSuccess}></Route>
                { queryString.parse( window.location.search ).mode=== "resetPassword" && 
                    <Route exact path="/account/help/issue" component={ChangePassword}/>}
                
                { queryString.parse( window.location.search ).mode=== "verifyEmail" && 
                    <Route exact path="/account/help/issue" component={ActivateAccount}/>}
                <Route exact path="/invitation/:email/:ref/:name" component={Invitation}></Route>                 
                <Route path="/admin"                   component={Admin}></Route> 
                {/*}<Route exact path="/print-payment/:company/:pay/:day/:name/:reference/:counter" component={PrintPayment}></Route>{*/}
               
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
