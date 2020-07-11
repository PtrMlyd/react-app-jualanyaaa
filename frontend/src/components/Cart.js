
// 9. cart - create a impleted functionn of the add to cart button to client
import React, { Component } from 'react'
import { formatCurrency } from '../support/NewUtil'

export default class Cart extends Component {
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
                        <div className='cart'>
                            <div className='total'>
                                <div>
                                    Total: 
                                    { formatCurrency(
                                        cart.reduce( ( a, c) => a + c.price * c.count, 0)
                                    )}
                                </div>
                                <button className='button primary'>
                                    Proceed
                                </button>
                            </div>
                        </div>     
                    )
                }
            </div>
            
        )
    }
}
