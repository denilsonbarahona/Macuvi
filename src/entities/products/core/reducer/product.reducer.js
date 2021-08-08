import * as productActions from '../actions/products.actions';

const initialState = {
    payload               : []   ,
    payloadFilter         : []   ,
    identitiesDescriptions: [] ,
    identities            : ""   ,
    getProductsList       : true ,
    getIdentitiesList     : true ,
    show_edit             : false,
    getDescriptions       : true ,
    changeState           : false,
    fail                  : false,    
    success               : true ,
    product               : {}   ,    
    variation             : {}   ,
    errorDesc             : {}   ,
    updateIdentityResponse: {show_response: false, response: false, msj:""} ,
    Updateresponse        : {show_response: false, response: false, msj:""} ,
    CreateResponse        : {show_response: false, response: false, msj:""} ,
    DeleteResponse        : {show_response: false, response: false, msj:""} 
}

const product_reducer = (state = initialState, action )=>{    
    switch(action.type){
        case productActions.GET_PRODUCTS_SUCCESS        : return { ...state , 
                                                                   payload       : action.payload , 
                                                                   payloadFilter : action.payload ,
                                                                   success       : true  , 
                                                                   fail          : false , isPopUpShow: false  , 
                                                                   error         : false , errorDesc : {}     ,  
                                                                   Updateresponse: {show_response: false, response: false, msj:""},
                                                                   DeleteResponse: {show_response: false, response: false, msj:""},
                                                                   CreateResponse: {show_response: false, response: false, msj: "" }
                                                                };
        case productActions.CLEAN_PRODUCT_PAYLOAD       : return { ...state , payload   : [] , payloadFilter: [] }
        case productActions.SHOW_VARIATIONS_POPUP       : return { ...state , variation : action.payload , 
                                                                   isPopUpShow   : true          , error      : false , 
                                                                   errorDesc     : {}            , 
                                                                   Updateresponse: {show_response: false, response: false, msj:""},
                                                                   DeleteResponse: {show_response: false, response: false, msj:""},
                                                                   CreateResponse: {show_response: false, response: false, msj: "" }
                                                                };

        case productActions.SHOW_ERROR_VARIATIONS_POPUP : return { ...state , error : true          , 
                                                                   errorDesc     : action.payload   , 
                                                                   Updateresponse: {show_response: false, response: false, msj:""},
                                                                   DeleteResponse: {show_response: false, response: false, msj:""},
                                                                   CreateResponse: {show_response: false, response: false, msj: ""}
                                                                };

        case productActions.SET_IDENTITIES               : return { ...state, identities: action.payload  };
        case productActions.SHOW_PRODUCTS_FILTER         : return { ...state, payloadFilter : action.payload  };

        case productActions.SHOW_PRODUCTS_LIST           : return {...state, payload: action.payload, getProductsList: false ,
                                                                     Updateresponse: {show_response: false, response: false, msj:""},
                                                                     DeleteResponse: {show_response: false, response: false, msj:""} ,
                                                                     CreateResponse: {show_response: false, response: false, msj: "" }
                                                                }
        case productActions.SHOW_PRODUCT_BY_ID           : return {...state, show_edit: true, changeState: true, 
                                                                     Updateresponse: {show_response: false, response: false, msj:""},
                                                                     DeleteResponse: {show_response: false, response: false, msj:""} ,
                                                                     CreateResponse: {show_response: false, response: false, msj: "" }
                                                                }
        case productActions.UPDATE_CHANGE_STATE          : return {...state, changeState: false}
        case productActions.RESET_STATE_EDIT_PRODUCT     : return {...state, changeState: false, show_edit: false, 
                                                                     Updateresponse: {show_response: false, response: false, msj:""},
                                                                     DeleteResponse: {show_response: false, response: false, msj:""} ,
                                                                     CreateResponse: {show_response: false, response: false, msj: "" } }
        case productActions.SHOW_UPDATE_RESPONSE         : return {...state, Updateresponse    : {show_response: true, response: action.payload.response, msj: action.payload.msj } }                                                                                                                                 
        case productActions.SHOW_DELETE_RESPONSE         : return {...state, DeleteResponse    : {show_response: true, response: action.payload.response, msj: action.payload.msj } }
        case productActions.SHOW_IDENTITIES              : return {...state, getIdentitiesList : false, payload: action.payload }
        case productActions.SHOW_IDENTITIES_DESCRIPTIONS : return {...state, getDescriptions   : false ,identitiesDescriptions: action.payload }
        case productActions.SHOW_UPDATE_IDENTITY_DESCRIPTION_RESPONSE: return {...state, updateIdentityResponse: {show_response: true, response: action.payload.response, msj: action.payload.msj } }                                                                                                                             
        case productActions.SHOW_CREATE_PRODUCT_RESPONSE : return {...state, CreateResponse: {show_response: true, response: action.payload.response, msj: action.payload.msj } }                                                                                                                                     
        case productActions.RESET_CREATION_STATE         : return {...state, changeState: true}
        case productActions.STOP_CREATION_STATE_CHANGE   : return {...state, changeState: false}
        default: return state;
    }
}

export default product_reducer;