import login      from '../../entities/login/infraestructure/services' 
import categories from '../../entities/categories/infraestructure/services';
import products   from '../../entities/products/infraestructure/services';
import discounts  from '../../entities/discount/infraestructure/services';
import promotions from '../../entities/promotion/infraestructure/services';
import customers  from '../../entities/customers/infraestructure/services';
import invoice    from '../../entities/invoices/infraestructure/services';
import balance    from '../../entities/balance/infraestructure/services';
import taxes      from '../../entities/taxes/infraestructure/services';
import report     from '../../entities/reports/infraestructure/services';
import profile    from '../../entities/profiles/infraestructure/services';
import pos        from '../../entities/pos/infraestructure/services';
import company    from '../../entities/company/infraestructure/services';
import notification from '../../entities/notifications/infraestructure/services'

const requests = {
    login       ,
    categories  ,
    products    ,
    discounts   ,
    promotions  ,
    customers   ,
    invoice     ,
    balance     ,
    taxes       ,
    report      ,
    profile     ,
    pos         ,
    company     ,
    notification
}

export default requests;