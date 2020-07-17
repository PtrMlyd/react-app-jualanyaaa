// newProduct

import React, { Component } from 'react'
import { formatCurrency } from '../support/NewUtil'

export default class Products extends Component {

    render() {
        return (
            <div>
                <ul className='products'>
                    {/* 5. create render of */}
                    {
                        // property must be same on data.json
                    this.props.products.map( product => (
                        <li key = { product._id } >
                            <div className = 'product'>
                                <a href={ `#${ product._id }` }>
                                    <img src = { product.image } alt= { product.title }  />
                                </a>
                                <p>
                                    { product.title }
                                </p>
                                <div className = 'product-price'>
                                    <div>
                                        { formatCurrency(product.price) }
                                    </div>
                                    {/* 1. cart -  create handle add to cart to make a functon. go to app.js*/}
                                    {/* 5. cart - karena kita menggunakan add to cart dari props, go to app.js */}
                                    <button onClick={ () => this.props.addToCart( product ) } className = "button primary">
                                        Add to Cart
                                    </button>
                                </div>  
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
