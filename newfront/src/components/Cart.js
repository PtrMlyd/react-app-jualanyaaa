//1. checkout - create a local storage to make cart item will be save when the browser refreshing, go to app.js

// 9. cart - create a impleted functionn of the add to cart button to client
import React, { Component } from 'react'
import formatCurrency from '../util'
import Modal from 'react-modal'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { removeFromCart } from '../redux/actions/cartAction';
import { connect } from 'react-redux';
import { createOrder, clearOrder } from '../redux/actions/orderAction'

class Cart extends Component {
    // 7. checkout
    constructor( props ) {
        super(props);
        this.state = { 
            // 10.checkout - create a state for the checkout form
            name : '',
            email :'',
            address : '',
            showCheckOut : false
        } //implement the checkout form to client view
    }

    // 9. checkout
    handleInput = (e) => {
        this.setState( { [ e.target.name ] : e.target.value } ) // after thatt, update a state to create them
    }

    //11. checkout - create order function
    createOrder = (e) => {
        // 12. checkout - cause value represent by form, make e.prevent.value
        e.preventDefault();

        // 13. checkout - create object where to save this object to order
        const order = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItems : this.props.cartItems,
            total : this.props.cartItems.reduce(
                ( a, c ) => a + c.price * c.count, 0
            ),
        }   
        // 14. checkout - and then pass to create order function for app.js
        this.props.createOrder(order) // 15. checkout - go to app.js
    };

    closeModal = () => {
        this.props.clearOrder ()
    };
    render() {
        const { cartItems, order } = this.props
        console.log(cartItems)
        return (
            <div>
                { 
                    cartItems.length === 0
                    ? <div className = 'cart cart-header'> Cart is Empty. </div> 
                    : (
                        <div className = 'cart cart-header'>
                             you have { cartItems.length } in the cart.
                        </div>    
                    )/* 10. cart -  styling this, go to css */ 
                }
                {
                    order && (
                        <Modal isOpen = { true } onRequestClose = {this.closeModal}
                        >
                            <Zoom>
                                <button className = 'close-modal' onClick = {this.closeModal}>
                                    x
                                </button>
                                <div className = 'order-details'>
                                    <h3 className = 'success-message'>
                                        Your Order has been Placed
                                    </h3> 
                                    <h2> Order : {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div> Name : </div>
                                            <div> {order.name} </div>
                                        </li>
                                        <li>
                                            <div> Email : </div>
                                            <div> {order.email} </div>
                                        </li>
                                        <li>
                                            <div> Address : </div>
                                            <div> {order.address} </div>
                                        </li>
                                        <li>
                                            <div> Date : </div>
                                            <div> {order.createdAt} </div>
                                        </li>
                                        <li>
                                            <div> Total : </div>
                                            <div> {formatCurrency(order.total) } </div>
                                        </li>
                                        <li>
                                            <div> Cart Items: </div>
                                            <div> 
                                                {
                                                    order.cartItems.map( (x) => (
                                                        <div>
                                                            { x.count } {" x "} { x.title } 
                                                        </div>
                                                    ))
                                                } 
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
                {/* /* 12. cart - render of the cart item  */ }
                <div className='cart'>
                    <Fade left cascade>
                        <ul className='cart-items'>
                            {
                                cartItems.map( (item) => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={ item.image } alt= { item.title } />
                                        </div>
                                        <div>
                                            <div> { item.title } </div>
                                            <div className='right' > 
                                                <div> { item.count } x { formatCurrency( item.price ) }</div>
                                                <button className='button' onClick = { () => this.props.removeFromCart( item ) }> {/* 14. create a remove function, go to app.js */}
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))//13. cart -  styling this, go to css
                            }
                        </ul>
                    </Fade>
                </div> 
                {/* create Total item price and add condition*/}
                {
                    cartItems.length !== 0 && (
                        <div>
                            <div className='cart'>
                                <div className='total'>
                                    <div>
                                        Total: 
                                        { formatCurrency(
                                            cartItems.reduce( ( a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    {/* 6. cart - make onclick to create proceed functionn, when clicked, it showing the form , now, define a constructor*/}
                                    <button 
                                        onClick={ () => {
                                            this.setState(
                                                { showCheckOut : true } 
                                            ) 
                                        } } className='button primary'>
                                        Proceed
                                    </button>
                                </div>
                            </div>     
                            {
                                this.state.showCheckOut && (
                                    <Fade right cascade>
                                        <div className = 'cart'>
                                            <form onSubmit = {this.createOrder}>
                                                <ul className = 'form-container'>
                                                    <li>
                                                        <label> Email </label>
                                                        <input 
                                                            type = 'email'
                                                            name = 'email'
                                                            required
                                                            onChange = {this.handleInput}
                                                            />
                                                    </li>
                                                    <li>
                                                        <label> Name </label>
                                                        <input 
                                                            type = 'text'
                                                            name = 'name'
                                                            required
                                                            onChange = {this.handleInput}
                                                            />
                                                    </li>
                                                    <li>
                                                        <label> Address </label>
                                                        <input 
                                                            type = 'text'
                                                            name = 'address'
                                                            required
                                                            onChange = {this.handleInput}
                                                        />
                                                    </li>
                                                    <li>
                                                        <button type = 'submit' className='button primary'>
                                                            Checkout
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick = { () => this.setState({ showCheckOut : false })} className='button primary'>
                                                            Cancel
                                                        </button>
                                                    </li>
                                                    {/* 9. checkout - create handle input function & create order*/}
                                                </ul>
                                            </form>
                                        </div>  
                                    </Fade>
                                )
                            }
                       </div>
                    )
                }
            </div>
            
        )
    }
}

export default connect (
    ( state ) => ({
        order : state.order.order,
        cartItems : state.cart.cartItems,
    }),
    { removeFromCart, createOrder, clearOrder } 
) (Cart) //2f. cart-redux - go to the store