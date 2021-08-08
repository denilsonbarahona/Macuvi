import { React, useState, useEffect }   from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useParams }                    from 'react-router';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import { getEmptyPermission }           from '../../../login/infraestructure/services/const/authPermission';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { getProfile }                   from '../../core/selector/profile.selector';
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import { getProfileToUpdate,
         updateProfile }                from '../../core/actions/profile.actions';


const EditProfile =()=>{

    const [profileState, setProfileState] = useState({name: "", email:"", required: ["name","email"] })
    const [permissionState, setPermissionState] = useState(getEmptyPermission())
    const dispatch = useDispatch()
    const params   = useParams()
    const profile  = useSelector(getProfile)
    const cookie   = useSelector(getCookie)   
    const loading  = useSelector(getLoading)
    
    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{
        dispatch(getProfileToUpdate({id: params.id }))
    },[dispatch, params.id])

    const onChangeProfile = (e)=>{
        setProfileState({...profileState, [e.target.name]: e.target.value})
    }

    const onChangePermission = (e)=>{
        setPermissionState({...permissionState, [e.target.id]: e.target.checked })
    }

    const resetProfileState = (profile)=>{        
        setProfileState({...profileState, "name":profile.data.AuthUserName, "email":profile.data.AuthUserEmail})
        setPermissionState({...profile.data.AuthUserConfAccess})
    }
    
    window.resetProfileState = resetProfileState
    
    return (
        <div>
            <MobileMenu></MobileMenu>
            <div className="flex">
                <SideMenu code="7" sub=""></SideMenu>
                <div className="content">
                    <Header></Header>
                    <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                        <h2 className="text-lg font-medium mr-auto"> Editar perfil </h2> 
                        {(!loading.loading)
                            ?<div className="w-full sm:w-auto flex mt-4 sm:mt-0"> 

                                <button style={{display:(loading.button)?"":"none" }} 
                                        className="button w-40 mt-5 text-white bg-theme-1 inline-flex items-center ml-auto"> 
                                        Guardando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                <button style={{display:(loading.button)?"none":"" }} type="button" 
                                        onClick={()=>{ dispatch(updateProfile({...profileState, 
                                                                               permission  : permissionState ,
                                                                               id : params.id
                                                                              })) }}
                                        className="button w-40 bg-theme-1 text-white mt-5">Guardar</button>
                             </div>
                            :<></>}                                                                                              
                    </div>
                    <div className="box p-5 mt-5"> 
                        <div className="intro-y col-span-12 lg:col-span-6">
                        {(loading.loading)
                            ?<div className="mb-10"><UiLoading loading={true}></UiLoading></div>
                            :<div className="intro-y p-5">
                                {(profile.profileResponse.show)
                                    ?<div className={profile.profileResponse.response
                                                        ?"p-2 gap-4 gap-y-3 font-medium text-theme-9"
                                                        :"p-2 gap-4 gap-y-3 font-medium text-theme-6"}> 
                                        { profile.profileResponse.msj }
                                     </div> 
                                    :<></>  }
                                                              
                                <div>
                                    <label>Nombre completo del usuario</label>
                                    <input id="name" name="name"  onChange={onChangeProfile}
                                            value={profileState.name}
                                        className="input w-full border mt-2"  placeholder="Nombre del usuario"/>
                                </div>
                                <div className="mt-5">
                                    <label>Correo electrónico del usuario</label>
                                    <div className="relative mt-2">
                                        <div className="absolute rounded-l w-10 h-full flex items-center justify-center bg-gray-100 dark:bg-dark-1 dark:border-dark-4 border text-gray-600">@</div> 
                                        <input type="email" id="email" name="email"
                                                onChange={onChangeProfile}
                                                value={profileState.email}
                                                readOnly
                                            className="input pl-12 w-full border bg-gray-100 cursor-not-allowed col-span-4" placeholder="Correo electrónico" />
                                    </div>
                                </div>

                                <div className="accordion mt-6">
                                        <div className="accordion__pane active border border-gray-200 dark:border-dark-5 p-4"> 
                                            <div className="accordion__pane__toggle font-bold block cursor-pointer">
                                                Ingresos y salidas
                                            </div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newSales} 
                                                            onChange={onChangePermission}
                                                            className="input border mr-2" id="newSales" name="newSales" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newSales">Registrar venta</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newExpense} 
                                                            onChange={onChangePermission}
                                                            className="input border mr-2" id="newExpense" name="newExpense" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newExpense">Salida de caja</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newIncome} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newIncome" name="newIncome" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newIncome">Ingresos de caja</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.cashclosing} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="cashclosing" name="cashclosing" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="cashclosing">Balance de caja</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.invoices} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="invoices" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="invoices">Lista de facturas</label> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion__pane border border-gray-200 dark:border-dark-5 p-4 mt-3"> 
                                            <div  className="accordion__pane__toggle font-bold block cursor-pointer">
                                                Inventario
                                            </div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newProduct} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newProduct" name="newProduct" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newProduct">Registrar producto</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.listProduct} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="listProduct" name="listProduct" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="listProduct">Lista de productos</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newCategory} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newCategory" name="newCategory" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newCategory">Crear categoría</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.categories} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="categories" name="categories" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="categories">Lista de categorías</label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.identitiesList} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="identitiesList" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="identitiesList">Lista de identificadores</label> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion__pane border border-gray-200 dark:border-dark-5 p-4 mt-3"> 
                                            <div className="accordion__pane__toggle font-bold cursor-pointer block">
                                                Clientes
                                            </div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newCustomer} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newCustomer" name="newCustomer" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newCustomer"> Nuevo cliente </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.listCustomers} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="listCustomers" name="listCustomers"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="listCustomers">Lista de clientes </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.accountReceivable} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="accountReceivable" name="accountReceivable" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="accountReceivable">Cuentas por cobrar</label> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion__pane border border-gray-200 dark:border-dark-5 p-4 mt-3"> 
                                            <div className="accordion__pane__toggle font-bold cursor-pointer block">Descuentos y promociones</div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newDiscount} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newDiscount" name="newDiscount" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newDiscount"> Nuevo descuento </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newPromotion} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newPromotion" name="newPromotion" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="newPromotion">Nueva promoción </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.discountList} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="discountList" name="discountList" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="discountList">Lista de descuentos</label> 
                                                    </div> 
                                                    
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.promotionList} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="promotionList" name="promotionList" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="promotionList">Lista de promociones</label> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion__pane border border-gray-200 dark:border-dark-5 p-4 mt-3"> 
                                            <div className="accordion__pane__toggle font-bold cursor-pointer block">Reporteria</div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.DailySalesDetails} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="DailySalesDetails" name="DailySalesDetails"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="DailySalesDetails"> Ventas diarias </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.graphIncomes} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="graphIncomes" name="graphIncomes" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="graphIncomes"> Grafíco de ingresos diarios </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.graphProduct} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="graphProduct" name="graphProduct" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="graphProduct">Grafíco de productos vendidos</label> 
                                                    </div> 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.transactions} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="transactions" name="transactions" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="transactions">Transacciones realizadas</label> 
                                                    </div> 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.activities} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="activities" name="activities" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="activities">Actividades realizadas </label> 
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion__pane border border-gray-200 dark:border-dark-5 p-4 mt-3"> 
                                            <div className="accordion__pane__toggle font-bold cursor-pointer block">Configuración</div>
                                            <div className="accordion__pane__content mt-3 text-gray-700 dark:text-gray-600 leading-relaxed">
                                                <div>                                                 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newLogin} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newLogin" name="newLogin"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="newLogin"> Crear usuario </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.listAuths} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="listAuths" name="listAuths"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="listAuths"> Lista de usuarios </label> 
                                                    </div>
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newPOS} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newPOS" name="newPOS"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="newPOS">Nuevo POS</label> 
                                                    </div> 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.POS} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="POS" name="POS"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="POS">Lista de POS</label> 
                                                    </div> 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.newTax} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="newTax" name="newTax"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="newTax">Nuevo Impuesto</label> 
                                                    </div> 
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.getTax} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="getTax" name="getTax"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="getTax">Lista de Impuestos</label> 
                                                    </div>          
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.updatenotification} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="updatenotification" name="updatenotification"/> 
                                                        <label className="cursor-pointer select-none" htmlFor="updatenotification">Configuración de cuentas por cobrar </label> 
                                                    </div>                                       
                                                    <div className="flex items-center text-gray-700 dark:text-gray-500 mt-2"> 
                                                        <input type="checkbox" checked={permissionState.bussinesConfig} 
                                                                onChange={onChangePermission}
                                                                className="input border mr-2" id="bussinesConfig" name="bussinesConfig" /> 
                                                        <label className="cursor-pointer select-none" htmlFor="bussinesConfig">Configuración de la empresa</label> 
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                                   
                             </div> }

                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default EditProfile;