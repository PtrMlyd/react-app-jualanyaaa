// newProduct

import React, { Component } from 'react'
import { formatCurrency } from '../support/NewUtil'

export default class Products extends Component {

    render() {
        return (
            <div>
                <ul className='products'>
                    {/* 4. create render of */}
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
                                    <button className = "button primary">
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
