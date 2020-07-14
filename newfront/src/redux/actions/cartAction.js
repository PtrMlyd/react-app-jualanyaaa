
import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

//2. cart redux -  create addToCart yang menerima 2 parameter : 1. untuk  panggil item yang ada dialam cart , 2. product yang akan di passing ke cart and remove cart funtion
export const addToCart = ( items, product ) => ( dispatch ) => {
    //3. cart redux - didalam cart, kita clone item dengan define item
    const cart = items.slice();
    // 4.cart redux -kita cari item yang akan di cek apakah product yang kita masukkab itu benar apa tidak, or pindahkan fungsi addto cart dan remove  yang di app.js 
    let alreadyExist = false
    cart.forEach( x => {
        if( x._id === product._id ) {
            alreadyExist = true ;
            x.count++;
        }
    });
    if( !alreadyExist ) {
        cart.push( { ...product, count : 1 })
    }
    dispatch( {
        type : ADD_TO_CART,
        payload : { cart }
    })
    localStorage.setItem('cartItems', JSON.stringify(cart) )
}

export const removeFromCart = (items, product) => (dispatch) => {
    const cart = 
        items
        .slice()
        .filter(
            x  => x._id !== product._id 
        )

    dispatch({
        type : REMOVE_FROM_CART,
        payload : { cart }
    })
    localStorage.setItem(
        'cartItems',
        JSON.stringify( cart ) )
}