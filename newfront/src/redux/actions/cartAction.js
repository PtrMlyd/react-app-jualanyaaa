
import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

//2. cart redux -  create addToCart yang menerima 2 parameter : 1. untuk  panggil item yang ada dialam cart , 2. product yang akan di passing ke cart and remove cart funtion
export const addToCart = ( product ) => ( dispatch, getState ) => {
    //3. cart redux - didalam cart, kita clone item dengan define item
    const cartItems = getState().cart.cartItems.slice();
    // 4.cart redux -kita cari item yang akan di cek apakah product yang kita masukkab itu benar apa tidak, or pindahkan fungsi addto cart dan remove  yang di app.js 
    let alreadyExist = false
    cartItems.forEach( ( x ) => {
        if( x._id === product._id ) {
            alreadyExist = true ;
            x.count++;
        }
    });
    if( !alreadyExist ) {
        cartItems.push( { ...product, count : 1 })
    }
    dispatch( {
        type : ADD_TO_CART,
        payload : { cartItems }
    })
    localStorage.setItem('cartItems', JSON.stringify( cartItems ) )
}

export const removeFromCart = ( product ) => ( dispatch, getState ) => {
    const cartItems = getState()
        .cart.cartItems.slice()
        .filter(
           ( x ) => x._id !== product._id 
        )

    dispatch({
        type : REMOVE_FROM_CART,
        payload : { cartItems }
    })
    localStorage.setItem(
        'cartItems',
        JSON.stringify( cartItems ) )
}