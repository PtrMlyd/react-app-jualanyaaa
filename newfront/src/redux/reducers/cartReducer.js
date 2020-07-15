import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = ( 
    state = { cartItems : JSON.parse(localStorage.getItem('cartItems') || "[]" ) },
    action 
) => { //2d cart-redux - kana cart item diambil dari local storage, maka kita ambil lagi dari local storage dengan defin state 
    switch (action.type) {
        case ADD_TO_CART:
            return {
                cartItems : action.payload.cartItems
            }
        case REMOVE_FROM_CART :
                return {
                cartItems : action.payload.cartItems
            }
        default:
            return state;
    }
}; // 2e. cart-redux, go to the cart.js for connecting the redux 