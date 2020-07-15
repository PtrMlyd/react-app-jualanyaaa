import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

// 2. cart-redux - create action from this type, add to cart ada 2 param (1. item yang didalam cart dan product)
export const addToCart = ( product ) => ( dispatch, getSate ) => { // 2i. cart-redux - add getstate and remove 'item' to return value of cart by redux
    // 2a. cart-redux - kita buat clone cartitems
    // const cartItems = items.slice()
    const cartItems = getSate().cart.cartItems.slice(); // using  this
    let alreadyExists = false;

    //2b. cart-redux - kita buat foreach untuk cek apakah cart item yang kita masukkan sesuai dengan product yang kita inginkan
    cartItems.forEach( ( x ) => {
        if( x._id === product._id ) { 
            alreadyExists = true;
            x.count++;
        }
    });
    if( !alreadyExists ) { 
        cartItems.push({ ...product, count : 1 }); 
    }
    dispatch({
        type : ADD_TO_CART,
        payload : { cartItems }
    });
    localStorage.setItem('cartItems', JSON.stringify( cartItems ));
}

// 2c. cart-redux - add remove from cart , same with add to cart but add a filter function

export const removeFromCart = ( product ) => ( dispatch, getState ) => {
    const cartItems = getState().cart.cartItems
        .slice()
        .filter(( x ) => x._id !== product._id ); 
    dispatch({
        type : REMOVE_FROM_CART, payload : { cartItems }
    });
    localStorage.setItem('cartItems', JSON.stringify( cartItems ));
}; // 2d. cart-redux - create reducers