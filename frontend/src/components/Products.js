// newProduct
// making product list to showing faded from react-reveal
// making product detail to adding by modal from react0modal

import React, { Component } from 'react'
import { formatCurrency } from '../support/NewUtil'
import Fade from 'react-reveal/Fade'

export default class Products extends Component {
    // 1. react-modal - create constructor
    constructor (props) {
        super (props) ;
        this.state = {
            product : null, //product detail by image of product. if product exist, product is show. go to image of product
        }
        
    }
    // 3. react-modal - create open modal function and close modal function
    openModal = (product) => {
        this.setState( { product } )
    }
    openModal = () => {
        this.setState( { product : null } )
    } // 4. react-modal - create implemented client view


    render() {
        return (
            <div>
                {/* create fade section */}
                <Fade bottom cascade>
                    <ul className='products'>
                        {/* 5. create render of */}
                        {
                            // property must be same on data.json
                        this.props.products.map( product => (
                            <li key = { product._id } >
                                <div className = 'product'>
                                    {/* 2. react-modal - add handle for open this modal by onclick */}
                                    <a href={ `#${ product._id }` } onClick = { () => openModal(product)} >
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
                </Fade>
            </div>
        )
    }
}
