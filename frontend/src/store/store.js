import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import { productListReducer, productDetailReducer, productSaveReducer, productDeleteReducer } from '../reducer/productReducer';
import thunk from 'redux-thunk'
import { cartReducer } from '../reducer/cartReducer';
import Cookie from 'js-cookie'
import { userSiginReducer, userRegisterReducer, userUpdateReducer } from '../reducer/userReducer';
import { createOrderReducer, detailsOrderReducer, orderPayReducer, orderListReducer, orderDeleteReducer, myOrderListReducer } from '../reducer/orderReducer';
import { bannerListReducer, brandListReducer, catListReducer, brandSaveReducer } from '../reducer/detailReducer';

const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null

const initialState= { cart: { cartItems }, userSignin : { userInfo } };

//function yang memanggil state atao action yang mengembalikan nilai dalam ini
const reducer = combineReducers({
    // name value
    productList : productListReducer,
    productDetails : productDetailReducer,
    cart : cartReducer,
    userSignin : userSiginReducer,
    userRegister : userRegisterReducer,
    productSave : productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate : createOrderReducer,
    orderDetails : detailsOrderReducer,
    orderPay : orderPayReducer,
    orderList : orderListReducer,
    myOrderList : myOrderListReducer,
    orderDelete : orderDeleteReducer,
    userUpdate : userUpdateReducer,
    productReviewSave : productSaveReducer,
    bannerList : bannerListReducer,
    brandList : brandListReducer,
    brandSave : brandSaveReducer,
    catList : catListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store