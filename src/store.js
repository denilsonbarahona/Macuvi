import { compose, applyMiddleware, createStore } from 'redux';
import reducers     from './reducers';
import middlewares  from './middleware';
import firebaseConf from './config/config.firebase';
import fireService  from './Service/firebase/firebase.service'


fireService.firebase  = firebaseConf
fireService.firestore = firebaseConf.firestore
fireService.storage   = firebaseConf.storage()

const composeEnhancers = 
    (process.env.NODE_ENV === 'development' && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const configureStore = (services)=>createStore(

    reducers,
    composeEnhancers( 
                applyMiddleware( ...middlewares.map(f=>f(services)) ) 
            )
)

