//1. checkout - create a local storage to make cart item will be save when the browser refreshing, go to app.js

// 9. cart - create a impleted functionn of the add to cart button to client
import React, { Component } from 'react'
import { formatCurrency } from '../support/NewUtil'

export default class Cart extends Component {
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
            cart : this.state.cart
        }   
        // 14. checkout - and then pass to create order function for app.js
        this.props.createOrder(order) // 15. checkout - go to app.js
    }

    render() {
        const { cart } = this.props
        return (
            <div>
                { 
                    cart.length === 0 
                    ? <div className = 'cart cart-header'> Cart is Empty. </div> 
                    : (
                        <div className = 'cart cart-header'>
                             you have { cart.length } in the cart.
                        </div>    
                    )/* 10. cart -  styling this, go to css */ 
                }
                    {/* /* 12. cart - render of the cart item  */ }
                <div className='cart'>
                    <ul className='cart-items'>
                        {
                            cart.map( item => (
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
                </div> 
                {/* create Total item price and add condition*/}
                {
                    cart.length !== 0 && (
                        <div>
                            <div className='cart'>
                                <div className='total'>
                                    <div>
                                        Total: 
                                        { formatCurrency(
                                            cart.reduce( ( a, c) => a + c.price * c.count, 0)
                                        )}
                                    </div>
                                    {/* 6. cart - make onclick to create proceed functionn, when clicked, it showing the form , now, define a constructor*/}
                                    <button onClick={ () =>  {this.setState( { showCheckOut : true } ) } } className='button primary'>
                                        Proceed
                                    </button>
                                </div>
                            </div>     
                            {
                                this.state.showCheckOut && (
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
                                                        Create Order
                                                    </button>
                                                </li>
                                                {/* 9. checkout - create handle input function & create order*/}
                                            </ul>
                                        </form>
                                    </div> 
                                )
                            }
                       </div>
                    )
                }
            </div>
            
        )
    }
}
