// newProduct
// making product list to showing faded from react-reveal
// making product detail to adding by modal from react0modal

import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
import { connect } from 'react-redux'
import { fetchProducts } from '../redux/actions/productAction'
import { addToCart } from '../redux/actions/cartAction' //2h. cart-redux - to the app.js to remoce property of cart

// 12. redux - remove export default, and add connect in the end
class Products extends Component {
    // 1. react-modal - create constructor
    constructor (props) {
        super (props) ;
        this.state = {
            product : null, //2. react-modal - product detail by image of product. if product exist, product is show. go to image of product
        }
    }

    //15. redux - use componentdidmount() to fetching product
    componentDidMount() {
        this.props.fetchProducts() // 16. redux - go to package.json, set proxy - computer adress, after that, run both a side (client and backend), if error (map of undefined) , use conditional rendering (if object is false show loading, if not showing them)
    }


    // 3. react-modal - create open modal function and close modal function
    openModal =  (product ) => {
        this.setState( { product } )
    }
    closeModal = () => {
        this.setState( { product : null } )
    } // 4. react-modal - create implemented client view


    render() {
        //6. react-modal - define a product equal to this.state, use destructuring 
        const { product } = this.state

        return (
            <div>
                {/* create fade section */}
                <Fade bottom cascade>
                    {/*17.redux. use in here */}
                    {
                        !this.props.products ? (
                        <div> Loading ...</div>
                        ) : (
                        <ul className='products'>
                            {/* 5. create render of */}
                            {
                                // property must be same on data.json
                            this.props.products.map(( product )=> (
                                <li key = { product._id } >
                                    <div className = 'product'>
                                        {/* 2. react-modal - add handle for open this modal by onclick */}
                                        <a 
                                            href={ `#${ product._id }` } 
                                            onClick = { () => this.openModal(product)} 
                                        >
                                            <img src = { product.image[0] } alt= { product.title }  />
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
                        ) //18. redux - update the data in the product action
                    }
                </Fade>
                {/* 5. react-modal - create conditional , if product exists, sow the modal. define a modal */}
                {
                    product && (
                        <Modal isOpen = { true } onRequestClose = { this.closeModal }>
                            {/* 7. react-modal - lets's implemented a client view */}
                            <Zoom> 
                                <button onClick = { this.closeModal }>
                                    x
                                </button>
                                <div className = 'product-details'>
                                    <img src = { product.image[0] } alt = { product.title } />
                                    <div className = 'product-details-des'> 
                                        <p>
                                            <strong> { product.title } </strong>
                                        </p>
                                        <p>
                                            { product.description }
                                        </p>
                                        <p>
                                            Available Sizes: {" "}
                                            { product.sizes.map( size => (
                                                <span>
                                                    {" "}
                                                    <button className='button' > { size } </button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className = "product-price" >
                                            <div> { formatCurrency( product.price )} </div>
                                            <button 
                                                className = "button primary" 
                                                onClick = { ()=>{
                                                    // this.addToCart(product) <- change to this.props.addtocart to call add to cart property
                                                    this.props.addToCart(product)
                                                    this.closeModal()
                                                }}>
                                                Add To Cart
                                            </button>  
                                        </div>
                                    </div>   
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

// 13. redux - connect ada 2 param, : 1. function yang menerima state yang mereturn object yang kita gunakan (products.items)<- harus sama dengan product reducer, 2.list of action yang kita gunakan, selain connect paramater yang lain itu component itu sendiri ( untuk connectting the action)
export default connect ( 
    ( state ) => ( { products : state.products.filteredItem }),
    { fetchProducts, addToCart }
) (Products) //14. redux -  setelah itu kita use fetch roduct di dalam component did mount
