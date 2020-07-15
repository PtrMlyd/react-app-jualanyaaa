// 
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunk from 'redux-thunk'
import { productReducer } from './reducers/productReducer'
import { cartReducer } from './reducers/cartReducer'
import { orderReducer } from './reducers/orderReducer'
 
const initialState = {}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore ( 
    combineReducers ( {
        products : productReducer,
        cart : cartReducer, // go the product action to update action add to cart
        order : orderReducer // update cart .js to connect the action from redux
    }),
    initialState,
    composeEnhancer ( applyMiddleware( thunk ) ) 
)

export default store; // go to App.js 
