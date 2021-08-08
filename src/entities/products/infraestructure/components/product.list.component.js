import { React, 
         useEffect,
         useState }                  from 'react'
import { useDispatch, 
         useSelector }               from 'react-redux';
import { useHistory}                 from "react-router-dom";
import Header                        from '../../../header/infraestructure/components/header.component';
import MobileMenu                    from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                      from '../../../menu/infraestructure/components/side_menu.component';
import  DeleteProductConfirmation    from './product.delete.confirmation.component';
import ProductsTable                 from '../../../products/infraestructure/components/products.table.component';
import { getProducts }               from '../../core/selectors/products.selectors';
import { getLoading  }               from '../../../ui/core/selector/ui.selector';
import { getCookie   }               from '../../../../cookies/selectors/cookie.selector';
import { GetProductList }            from '../../core/actions/products.actions';
import { loadCookie  }               from '../../../../cookies/actions/cookie.actions';
import {  ResetEditProdutState }     from '../../core/actions/products.actions';
import { getCategory }               from '../../../categories/core/selector/category.selectors';
import { getCategoriesList}          from '../../../categories/core/actions/category.actions'; 

const ProductList =()=>{

    const dispatch = useDispatch();
    const [page , setPage] = useState((window.ProductPage === undefined)?0:window.ProductPage)
    const [category , setCategory] = useState("blank")
    const [description, setDescription] = useState("")
    const [delete_ , setDelete] = useState({id:"", name:"", category:""});
    const [findMethod, setFindMethod] = useState("0")
    const history = useHistory();
    const products = useSelector(getProducts);
    const ui = useSelector(getLoading);
    const cookie = useSelector(getCookie);
    const categories = useSelector(getCategory);
    const productFilter = document.getElementById("productFilter");

    useEffect(()=>{
        dispatch(loadCookie())                 
    },[dispatch])

    useEffect(()=>{
        if (productFilter !== null && window.setMenu ) {
          window.setMenu();
        }
    },[productFilter])

    useEffect(()=>{        
        if(products.getProductsList && !cookie.find && !ui.loading){
            dispatch(GetProductList({company:cookie.cookie.login.companyId, category:"blank", description:"", setPager:setPager}))
        }  
    },[dispatch, cookie.cookie.login.companyId, products.getProductsList, cookie.find, ui.loading])

    useEffect(()=>{        
        if(!ui.loading && categories.find && !cookie.find){
            dispatch(getCategoriesList(cookie.cookie.login.companyId))
        }
    },[dispatch, cookie.cookie.login.companyId, categories.find, cookie.find, ui.loading])


    const onChangeFindMethod=(e)=>{
        setFindMethod(e.target.value)
    }

    const onViewProduct=(id)=>{
       dispatch(ResetEditProdutState())
       history.push({pathname:'/admin/update-product/'+id})
    }

    const setPager=(index)=>{
        window.ProductPage = index;
        setPage(index)
    }

    const onDeleteProduct=(productId, productName, categoryId)=>{
        window.showModal("#delete-product")        
        setDelete({id: productId, name: productName, category: categoryId})
    }

    const onDescriptionChange=(e)=>{
        setDescription(e.target.value)
    }

    const onClickFilter=()=>{   
        
        if(findMethod ==="0"){            
            dispatch(GetProductList({company:cookie.cookie.login.companyId, category: "blank", description:"", typeSearch:"0", setPager:setPager}))
        } else if(findMethod ==="2"){            
            dispatch(GetProductList({company:cookie.cookie.login.companyId, category: category, description:"", typeSearch:"2", setPager:setPager}))
        } else {
            dispatch(GetProductList({company:cookie.cookie.login.companyId, category: "blank", description:description, typeSearch:"3", setPager:setPager}))
        }          
    }

    const onChangeCategory=(category)=>{
        setCategory(category.target.value)
    }

    return (<div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="3" sub="8"></SideMenu>
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"><b>Listado de productos</b></h2>                                                                       
                        </div> 
                        {(cookie.cookie.login !== undefined)
                            ?<DeleteProductConfirmation state={{idDelete: delete_, 
                                                                company: cookie.cookie.login.companyId, 
                                                                auth: cookie.cookie.login.id,
                                                                authName: cookie.cookie.login.name,
                                                                category: category,
                                                                description:description,
                                                                typeSearch: ["0","2"].includes(findMethod)?findMethod:"3",
                                                                setPager: setPager}} ></DeleteProductConfirmation>
                            :<></>}      
                        <div className="flex intro-y mb-10 mt-10">                            
                            <div id="productFilter" className="relative w-9/12 text-gray-700 dark:text-gray-300"> 
                                    <div className="w-max mb-5 relative text-gray-700">    
                                        <select name="findBy"                                                 
                                                onChange={onChangeFindMethod}
                                                value={findMethod}
                                                className="input border mr-auto whitespace-nowrap mt-0.5">
                                            <option key="0" value="0">Buscar todos</option> 
                                            <option key="1" value="1">Buscar por nombre</option> 
                                            <option key="2" value="2">Buscar por categoría</option> 
                                        </select> 
                                    </div>   
                                    {(findMethod ==="2")
                                        ? <select onChange={onChangeCategory}
                                                    name="category" 
                                                    value={category}
                                                    className="input border whitespace-nowrap mt-0.5 mr-5 w-max">
                                                <option key={0} value="blank">TODOS</option>
                                                {categories.payload.map((item, index)=>(
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                         </select>
                                        :<input type="text" 
                                                name="identity" 
                                                onChange={onDescriptionChange}
                                                value={description} 
                                                className="input w-52 box placeholder-theme-13 w-90 mr-5" 
                                                placeholder="Ingrese el identificar del producto" />}
                                    <>                                            
                                        <button style={{display:(ui.button)?"":"none" }}  className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                        <button style={{display:(ui.button)?"none":"" }}  
                                                onClick={()=>{ onClickFilter() }} 
                                                type="button" 
                                                className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                                    </>                                                                        
                            </div>                                           
                        </div>                  
                        <ProductsTable payload={{...products.payload              , 
                                                 onViewProduct   : onViewProduct  , 
                                                 onDeleteProduct : onDeleteProduct, 
                                                 setPage         : setPager       , 
                                                 onFindCategory  : onChangeCategory ,
                                                 page            : page           ,                                                                                                  
                                                 categories      : categories     ,    
                                                 selectedCategory: category       ,                                             
                                                 ui              : ui }}></ProductsTable>
                    </div>
                </div>
            </div>)
}

export default ProductList;