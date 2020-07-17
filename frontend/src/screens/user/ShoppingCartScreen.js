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
        {/* <div className='cart-list'>
            <ul className="cart-list-container">
                <li>
                    <h3>
                        Shopping Cart
                    </h3>                   
                    <div>
                        Price
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is Empty
                    </div>
                    :
                    cartItems.map( item => 
                        <li key={item.id}>
                            <div className="cart-image" >
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={`/product/${item.id}`} >
                                    {   item.name}
                                    </Link> 
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={ (e) => dispatch(addToCart(item.id, e.target.value)) }>
                                        {[...Array(item.inStock).keys()].map( x => 
                                        <option key={ x + 1 } value={ x + 1 }> { x + 1} </option>
                                        
                                             )}
                                    </select>
                                    <button onClick={ () => deleteItem(item.id)} className="button" >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="cart-price">
                                IDR {item.price}
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className="cart-action">
            <div >
             <input type='text'  placeholder="YOUR VOUCHER CODE"></input>
                <h3>
                Subtotal 
                :
                IDR {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button onClick={checkOutItem} className='button primary full-width' disabled ={ cartItems.length === 0}>
                    Proceed to Check Out
                </button>
            </div>
        </div> */}

        <table className='cart-list'>
            <thead >
                <tr className="cart-header">
                    <th className='cart-prod'>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody className="cart-body">
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is Empty
                    </div>
                    :
                    cartItems.map( item => 
                        <tr key={item.id} className='cart-key' >
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
                            <td> {cartItems.reduce(( c ) => c.price * c.qty, 0)} </td>
                            <td>
                                <button onCtbodyck={ () => deleteItem(item.id)} className="button" >
                                    Delete
                                </button>
                            </td>
                        </tr>

                    )
                }              
                
                <tr className="cart-footer">
                    <td>
                        <div>
                            <button>
                                Back To Shop
                            </button> 
                        </div>
                        <div>
                            <button onClick={checkOutItem}>
                                Proceed To Checkout
                            </button>
                        </div>
                    </td>
                    <td>
                        <div> Sub Totoal </div> 
                        <div> {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} </div> 
                    </td>
                </tr>   
            </tbody>
        </table>
    </div>
    
}

export default ShoppingCartScreen