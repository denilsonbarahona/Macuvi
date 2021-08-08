import {combineReducers} from 'redux';
import login             from '../entities/login/core/reducer/login.reducer';
import ui                from '../entities/ui/core/reducer/ui.reducer';
import cookie            from '../cookies/reducer/cookie.reducer';
import categories        from '../entities/categories/core/reducer/category.reducer';
import products          from '../entities/products/core/reducer/product.reducer';
import invoice           from '../entities/invoices/core/reducer/invoice.reducer';
import discount          from '../entities/discount/core/reducer/discount.reducer';
import promotion         from '../entities/promotion/core/reducer/promotion.reducer';
import customers         from '../entities/customers/core/reducer/customer.reducer';
import balance           from '../entities/balance/core/reducer/balance.reducer';
import taxes             from '../entities/taxes/core/reducer/taxes.reducer';
import report            from '../entities/reports/core/reducer/report.reducer';
import profile           from '../entities/profiles/core/reducer/profile.reducer';
import pos               from '../entities/pos/core/reducer/pos.reducer';
import company           from '../entities/company/core/reducer/company.reducer';
import dashboard         from '../entities/ui/core/reducer/dashboard.reducer';
import notification      from '../entities/notifications/core/reducer/notification.reducer';

export default combineReducers({
    login       ,
    ui          ,
    cookie      ,
    categories  ,
    products    ,
    invoice     ,
    discount    ,
    promotion   ,
    customers   ,
    balance     ,
    taxes       ,
    report      ,
    profile     ,
    pos         ,
    company     ,
    dashboard   ,
    notification
})