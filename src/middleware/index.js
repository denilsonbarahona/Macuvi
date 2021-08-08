import login      from '../entities/login/core/middleware/login.middleware';
import cookie     from '../cookies/middleware/cookie.middleware';
import categories from '../entities/categories/core/middleware/category.middleware';
import products   from '../entities/products/core/middleware/product.middleware';
import invoice    from '../entities/invoices/core/middleware/invoice.middleware';
import discount   from '../entities/discount/core/middleware/discount.middleware';
import promotion  from '../entities/promotion/core/middleware/promotion.middleware';
import customers  from '../entities/customers/core/middleware/customer.middleware';
import balance    from '../entities/balance/core/middleware/balance.middleware';
import taxes      from '../entities/taxes/core/middleware/taxes.middleware';
import report     from '../entities/reports/core/middleware/report.middleware';
import profile    from '../entities/profiles/core/middleware/profile.middleware';
import pos        from '../entities/pos/core/middleware/pos.middleware';
import company    from '../entities/company/core/middleware/company.middleware';
import notification from '../entities/notifications/core/middleware/notification.middleware';

const MiddleWares =  [...cookie,...login,...categories,...products,...invoice,...discount,
                      ...customers,...balance,...taxes,...promotion,...report,...profile,
                      ...pos,...company,...notification] 

export default MiddleWares
