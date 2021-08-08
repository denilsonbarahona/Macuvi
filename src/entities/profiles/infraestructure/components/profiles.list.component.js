import { React, useState, useEffect }   from 'react';
import { useDispatch,useSelector }      from 'react-redux';
import Header                           from '../../../header/infraestructure/components/header.component';
import MobileMenu                       from '../../../menu/infraestructure/components/mobile_menu.component';
import SideMenu                         from '../../../menu/infraestructure/components/side_menu.component';
import UiLoading                        from '../../../ui/infraestructure/components/ui.loading.component';
import ProfilesTable                    from './profiles.table.component';
import DeleteProfileConfirmation        from './delete.profile.popup.component';
import { getLoading }                   from '../../../ui/core/selector/ui.selector';
import { getCookie  }                   from '../../../../cookies/selectors/cookie.selector'; 
import { getProfile }                   from '../../core/selector/profile.selector';
import { loadCookie }                   from '../../../../cookies/actions/cookie.actions';
import { getProfiles }                  from '../../core/actions/profile.actions';

const ProfilesList =()=>{

    const dispatch            = useDispatch();
    const [page  , setPage]   = useState((window.ProfilesPage === undefined)?0:window.ProfilesPage);
    const [filter, setFilter] = useState({findBy:"0", value:""});
    const [idDelete , setIdDelete] = useState({id:"", uid:""});
    const loading             = useSelector(getLoading);
    const cookie              = useSelector(getCookie);
    const profile             = useSelector(getProfile);

    useEffect(()=>{
        if(cookie.find){
            dispatch(loadCookie())           
        }
    },[dispatch, cookie.find])

    useEffect(()=>{ 
        if(!cookie.find && profile.getProfiles){            
            dispatch(getProfiles( { filter   : {type: filter.findBy, value: filter.value} , 
                                    company  :  cookie.cookie.login.companyId ,
                                    setPager : setPager } ))
        }
    },[dispatch,cookie.cookie.login.companyId, filter.findBy, filter.value, profile.getProfiles, cookie.find])
    
    const setPager=(index)=>{
        window.ProfilesPage = index
        setPage(index)
    }

    const onDeleteProfile = (id, uid, isMaster)=>{
        window.showModal("#delete-profile")
        setIdDelete({id: id, uid: uid, isMaster: isMaster})
    }

    const onEditProfile = (id)=>{
        window.location.href="/admin/update-profile/"+id
    }

    return ( <div>
                <MobileMenu></MobileMenu>
                <div className="flex">
                    <SideMenu code="7" sub="25"></SideMenu>
                    <div className="content">
                        <Header></Header>
                        <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
                            <h2 className="text-lg font-medium mr-auto"> Listado de perfiles </h2>                                                                       
                        </div> 
                        
                        {(cookie.cookie.login !== undefined)
                            ?  <div className="flex intro-y mb-10 mt-10">                                                            
                                    <div className="relative w-9/12 text-gray-700 dark:text-gray-300"> 
                                            <div className="w-max mb-5 relative text-gray-700">    
                                                <select name="findBy"  
                                                        value={filter.findBy}
                                                        onChange={(e)=>{setFilter({...filter, "findBy":e.target.value, "value":""})}}
                                                        className="input border mr-auto whitespace-nowrap mt-0.5">
                                                    <option key="0" value="0">Buscar todos</option>  
                                                    <option key="1" value="1">Buscar por nombre</option> 
                                                    <option key="2" value="2">Buscar por email</option> 
                                                </select> 
                                            </div>   
                                            <input type="text" 
                                                    name="filter"  
                                                    value={filter.value}
                                                    onChange={(e)=>{setFilter({...filter, "value":e.target.value})}}
                                                    className="input w-52 box placeholder-theme-13 w-90 mr-5" 
                                                    placeholder="Ingrese el valor de la búsqueda" />
                                            <>                                            
                                                <button style={{display:(loading.button)?"":"none" }}  
                                                        className="button w-32 text-white bg-theme-1 inline-flex items-center ml-auto"> Buscando <img className="h-5 ml-3" alt="" src="/assets/images/white.gif"></img></button>
                                                <button style={{display:(loading.button)?"none":"" }}  
                                                        onClick={()=>{ dispatch(getProfiles( { filter   : {type: filter.findBy, value: filter.value} , 
                                                                                                company  :  cookie.cookie.login.companyId ,
                                                                                                setPager : setPager } ))} } 
                                                        type="button" 
                                                        className="button w-32 bg-theme-1 text-white mt-5">Buscar</button>
                                            </>                                                                        
                                    </div>                                           
                                </div>
                            :  <></> } 
                        {(!cookie.find)
                            ?<DeleteProfileConfirmation state={{ idDelete : idDelete, 
                                                                 filter   : {type: filter.findBy, value: filter.value} , 
                                                                 company  :  cookie.cookie.login.companyId ,
                                                                 setPager : setPager }}></DeleteProfileConfirmation>
                            :<></>}
                        
                        {(loading.loading)
                            ?<UiLoading loading={loading.loading}></UiLoading>  
                            :<ProfilesTable props={{...profile.payload, page: page, 
                                                    setPager: setPager, 
                                                    onDeleteProfile:onDeleteProfile,
                                                    onEditProfile: onEditProfile}}></ProfilesTable>}
                    </div>
                </div> 
            </div>)    
}

export default ProfilesList;