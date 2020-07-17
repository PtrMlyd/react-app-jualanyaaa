import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function ShoppingCartScreen (props) {
    //untuk mengakses ke redux store
    const cart = useSelector( state => state.cart)   
    const { cartItems } = cart;

    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split('=')[1]):1

    const  dispatch = useDispatch();

    const deleteItem = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkOutItem = () => {
        props.history.push('/signin?redirect=shipping')
    }

    useEffect( () => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    }, [])

    return <div className="cart">

        <table className='table'>
            <thead >
                <tr>
                    <th className='cart-head'>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is Empty
                    </div>
                    :
                    cartItems.map( item => 
                        <tr key={item.id} >
                            <td className="cart-na">
                                <div className="cart-image"> 
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="cart-name">
                                    <p> Name : {item.name} </p>
                                    <p> Id : {item.id} </p>
                                    <p> Category : {item.category} </p>
                                </div>
                            </td>
                            <td> {item.price} </td>
                            <td> 
                                <select value={item.qty} onChange={ (e) => dispatch(addToCart(item.id, e.target.value)) }>
                                    {[...Array(item.inStock).keys()].map( x => 
                                    <option key={ x + 1 } value={ x + 1 }> { x + 1} </option>
                                    )}
                                </select>
                            </td>
                            <td> {item.price * item.qty} </td>
                            <td>
                                <button onCtbodyck={ () => deleteItem(item.id)} className="button" >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )
                }              
            </tbody>
        </table>
        <div className='cartfoot'>
            <div className='cartfootbut'>
                <Link to='/shop'>
                    <button className='button secondary '>
                        Back to Shop
                    </button>
                </Link>
                <button onClick={checkOutItem} className='button secondary' disabled ={ cartItems.length === 0}>
                    Proceed to Check Out
                </button>
            </div>
            <div >
                <h3>
                    Subtotal 
                    :
                    IDR {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
            </div>
        </div>
    </div>
    
}

export default ShoppingCartScreen