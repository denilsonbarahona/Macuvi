export const mobileStructure = () =>[
    {
        type: "in-out",
        header: <div className="menu">
                    <div className="menu__icon"> <i data-feather="dollar-sign" /> </div>
                        <div className="menu__title">
                            Ingresos y salidas
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div>,
        sub_items: [
            { newSales: <li>
                            <a href="/admin/new-invoice" className="menu">
                                <div className="menu__icon"> <i data-feather="shopping-bag" /> </div>
                                <div className="menu__title"> Registrar venta </div>
                            </a>
                        </li>,
              index: 0
            },
            { newExpense: <li>
                                <a href="/admin/new-expense" className="menu">
                                    <div className="menu__icon"> <i data-feather="log-out" /> </div>
                                    <div className="menu__title"> Salida de caja </div>
                                </a>
                            </li>,
              index: 1
            },
            { newIncome: <li>
                            <a href="/admin/new-income" className="menu">
                                <div className="menu__icon"> <i data-feather="log-in" /> </div>
                                <div className="menu__title"> Ingresos a caja </div>
                            </a>
                        </li>, index: 2 },
            { cashclosing: <li>
                                <a href="/admin/new-balance" className="menu">
                                    <div className="menu__icon"> <i data-feather="layout" /> </div>
                                    <div className="menu__title"> Balance de caja </div>
                                </a>
                            </li>, index: 3},
            { invoices: <li>
                            <a href="/admin/get-invoices" className="menu">
                                <div className="menu__icon"> <i data-feather="archive" /> </div>
                                <div className="menu__title"> Lista de facturas </div>
                            </a>
                        </li>, index: 4}
        ]
    },
    {
        type:"stock",
        header: <div className="menu">
                    <div className="menu__icon"> <i data-feather="server" /> </div>
                    <div className="menu__title"> 
                        Inventario 
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div> ,
        sub_items: [
            {
                newProduct: <li>
                                <a href="/admin/new-product" className="menu">
                                    <div className="menu__icon"> <i data-feather="plus-square" /> </div>
                                    <div className="menu__title"> Registrar producto </div>
                                </a>
                            </li>, index: 0 } ,
            {
                listProduct: <li>
                                <a href="/admin/get-products" className="menu">
                                    <div className="menu__icon"> <i data-feather="list" /> </div>
                                    <div className="menu__title"> Lista de productos </div>
                                </a>
                            </li>, index: 1 } , 
            {
                newCategory:  <li>
                                    <a href="/admin/new-category" className="menu">
                                        <div className="menu__icon"> <i data-feather="bookmark" /> </div>
                                        <div className="menu__title"> Crear categoría </div>
                                    </a>
                                </li>, index: 2 } ,
            {
                categories: <li>
                                <a href="/admin/get-category" className="menu">
                                    <div className="menu__icon"> <i data-feather="align-left" /> </div>
                                    <div className="menu__title"> Lista de categorías </div>
                                </a>
                            </li>, index: 3 },
            {
                identitiesList: <li>
                                    <a href="/admin/get-identities" className="menu">
                                        <div className="menu__icon"> <i data-feather="align-justify" /> </div>
                                        <div className="menu__title"> Lista de identificadores </div>
                                    </a>
                                </li>, index: 4 }
        ]
    },
    {
        type : "customers",
        header: <div className="menu">
                    <div className="menu__icon"> <i data-feather="users" /> </div>
                    <div className="menu__title"> 
                        Clientes 
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div> ,
        sub_items : [
            {
                newCustomer: <li>
                                <a href="/admin/new-customer" className="menu">
                                    <div className="menu__icon"> <i data-feather="user-plus" /> </div>
                                    <div className="menu__title"> Nuevo cliente </div>
                                </a>
                            </li>, index: 0 },
            {
                listCustomers: <li>
                                    <a href="/admin/get-customers" className="menu">
                                        <div className="menu__icon"> <i data-feather="layers" /> </div>
                                        <div className="menu__title"> Lista de clientes </div>
                                    </a>
                                </li>, index: 1 },
            {
                accountReceivable: <li>
                                        <a href="/admin/get-recivable" className="menu">
                                            <div className="menu__icon"> <i data-feather="book" /> </div>
                                            <div className="menu__title"> Cuentas por cobrar </div>
                                        </a>
                                    </li>, index: 2 }
        ]
    } ,
    {
        type: "promo-discount",
        header: <div className="menu menu--active">
                    <div className="menu__icon"> <i data-feather="folder-minus" /> </div>
                    <div className="menu__title"> 
                        Desct y promo 
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div>,
        sub_items:[
            {
                newDiscount: <li>
                                <a href="/admin/new-discount" className="menu menu--active">
                                    <div className="menu__icon"> <i data-feather="minus" /> </div>
                                    <div className="menu__title"> Nuevo descuento </div>
                                </a>
                            </li>, index: 0 } ,
            {
                newPromotion: <li>
                                <a href="/admin/new-promotion" className="menu menu--active">
                                    <div className="menu__icon"> <i data-feather="minus-square" /> </div>
                                    <div className="menu__title"> Nueva promoción </div>
                                </a>
                            </li>, index: 1 } ,
            {
                discountList: <li>
                                <a href="/admin/get-discounts" className="menu">
                                    <div className="menu__icon"> <i data-feather="list" /> </div>
                                    <div className="menu__title"> Lista de descuentos </div>
                                </a>
                            </li>, index: 2 } ,
            {
                promotionList: <li>
                                    <a href="/admin/get-promotions" className="menu">
                                        <div className="menu__icon"> <i data-feather="grid" /> </div>
                                        <div className="menu__title"> Lista de promociones </div>
                                    </a>
                                </li>, index: 3 }
        ]
    } ,
    {
        type: "report",
        header: <div className="menu">
                    <div className="menu__icon"> <i data-feather="pie-chart" /> </div>
                    <div className="menu__title">
                        Reporteria 
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div>,
        sub_items: [
            {
                DailySalesDetails: <li>
                                        <a href="/admin/report/sales/grid-daily" className="menu">
                                            <div className="menu__icon"> <i data-feather="shopping-cart" /> </div>
                                            <div className="menu__title"> Ventas diarias </div>
                                        </a>
                                    </li>, index: 0 } ,
            {
                graphIncomes: <li>
                                    <a href="/admin/report/income/chart" className="menu">
                                        <div className="menu__icon"> <i data-feather="arrow-right" /> </div>
                                        <div className="menu__title"> Gráfico de ingresos diarias </div>
                                    </a>
                                </li>, index: 1 } ,
            {
                graphProduct:  <li>
                                    <a href="/admin/report/products/chart" className="menu">
                                        <div className="menu__icon"> <i data-feather="bar-chart-2" /> </div>
                                        <div className="menu__title"> Gráfico de productos vendidos </div>
                                    </a>
                                </li>, index: 2 } ,
            {
                transactions: <li>
                                    <a href="/admin/report/sales/transactions" className="menu">
                                        <div className="menu__icon"> <i data-feather="book-open" /> </div>
                                        <div className="menu__title"> Transacciones realizadas  </div>
                                    </a>
                                </li>, index: 3 } ,
            {
                activities: <li>
                                <a href="/admin/report/activities" className="menu">
                                    <div className="menu__icon"> <i data-feather="activity" /> </div>
                                    <div className="menu__title"> Actividades realizadas  </div>
                                </a>
                            </li>, index: 4 }
        ]
    },
    {
        type: "config",
        header: <div className="menu">
                    <div className="menu__icon"> <i data-feather="settings" /> </div>
                    <div className="menu__title">
                        Configuración 
                        <div className="menu__sub-icon"> <i data-feather="chevron-down" /> </div>
                    </div>
                </div>,
        sub_items: [
            {
                newLogin: <li>
                            <a href="/admin/new-profile" className="menu">
                                <div className="menu__icon"> <i data-feather="user-plus" /> </div>
                                <div className="menu__title"> Crear usuario </div>
                            </a>
                        </li>, index: 0 } ,
            {
                listAuths: <li>
                                <a href="/admin/get-profiles" className="menu">
                                    <div className="menu__icon"> <i data-feather="align-left" /> </div>
                                    <div className="menu__title"> Lista de usuarios </div>
                                </a>
                            </li>, index: 1 } ,
            {
                newPOS: <li>
                            <a href="/admin/new-pos" className="menu">
                                <div className="menu__icon"> <i data-feather="credit-card" /> </div>
                                <div className="menu__title"> Nuevo POS </div>
                            </a>
                        </li>, index: 2 } ,
            {
                POS: <li>
                        <a href="/admin/get-pos" className="menu">
                            <div className="menu__icon"> <i data-feather="list" /> </div>
                            <div className="menu__title"> Lista de POS </div>
                        </a>
                    </li>, index: 3 } ,
            {
                newTax: <li>
                            <a href="/admin/new-tax" className="menu">
                                <div className="menu__icon"> <i data-feather="percent" /> </div>
                                <div className="menu__title"> Nuevo Impuesto </div>
                            </a>
                        </li>, index: 4 } ,
            {
                getTax: <li>
                            <a href="/admin/get-tax" className="menu">
                                <div className="menu__icon"> <i data-feather="align-justify" /> </div>
                                <div className="menu__title"> Lista de Impuestos </div>
                            </a>
                        </li>, index: 5 } ,
            {
                updatenotification: <li>
                                        <a href="/admin/update-notification" className="menu">
                                            <div className="menu__icon"> <i data-feather="sliders" /> </div>
                                            <div className="menu__title"> Configuración de cuentas por cobrar </div>
                                        </a>
                                    </li>, index: 6 } ,
            {
                bussinesConfig: <li>
                                    <a href="/admin/update-company" className="menu">
                                        <div className="menu__icon"> <i data-feather="tool" /> </div>
                                        <div className="menu__title"> Configuración de la empresa </div>
                                    </a>
                                </li>, index: 7 }
        ]
    }  
]