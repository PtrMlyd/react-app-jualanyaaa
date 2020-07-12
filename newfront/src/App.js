// new App.js
import React from 'react';
import {Link}  from 'react-router-dom';
import data from './db/data.json'
import Products from './components/Products';
import Header from './components/Header'
import Filter from './components/Filter';
import Cart from './components/Cart';
//9. redux - add a store, and then whap all inside a Provider < import this Provider
import store from './redux/store'
import { Provider } from 'react-redux'

class App extends React.Component {

    // 1. product - initial state for product rendering
    constructor() {
        super ()
        this.state = {
            // 2. product - initiate must be same on object of data.json
            products : data.products,

            // 2. cart - set state of cart to empty array (which mean default cart is null)
            // cart : [],

            // 4. checkout - change the array to json.parse for get cart from local storage
            cart : localStorage.getItem('cartItems') 
                    ? JSON.parse(localStorage.getItem('cartItems')) 
                    : [],
            size :'',
            sort:''
            // 3. product - create database depend this state ( data.json )
        }
        
    }
    // 6. filter - create a function structure for filerProduct and sortProduct
    sortaProduct ( sort ) {
        console.log(sort.target.value) 
    }
    filtearProduct ( size ) {
        console.log(size.target.value);
    }
    // 7. filter - go to the filter componennt.js
    
    // 9. filter - change the method to this arraw function fotr access set state method
    sortProduct =( sorts )=> {
        console.log(sorts.target.value) 
        const sort = sorts.target.value

        this.setState( ( state ) => ({
            sort : sort,
            products : this.state.products
            .slice()
            .sort( ( a, b ) =>
                sort === 'lowest'
                    ? a.price > b.price 
                        ? 1 
                        : -1 
                    :
                sort === 'highest' 
                    ? a.price < b.price 
                        ? 1 
                        : -1
                    : a._id < b._id
                    ? 1
                    : -1
            )
        }))
    }
    filterProduct =( sizes )=> {
        console.log(sizes.target.value);
        const size = sizes.target.value
        
        // 11. filter -  . make a condition if filter not a choosed
        if( size === '' ){
            this.setState( { size: size, products : data.products })
        }else{
            // 10. filter - set a setstate to make all product filtered by size
            this.setState({
                size : size,
                products : data.products.filter( 
                    (product) => product.size.indexOf(size) >= 0
                ),
            })
        }
    }

    // 3. cart - create add to cart function
    addToCart = ( product ) => {
        const cart = this.state.cart.slice() //<- this clone copy cart item of state
        let alreadyInCart = false;  // define a default value of cart is false

        cart.forEach( item => {
            if( item._id === product._id ) {  // if item yang di klik sama maka
                item.count++;  //item is increament
                alreadyInCart = true 
            }
        })
        if(!alreadyInCart) { // if item yang di klik beda (already = false / !item.id == !product.id)
            cart.push( { ...product, count: 1 } ) // ...product <- read field of product, count : 1 itu tambah instane dari product dengan count ke 1 sebagai item baru di cart item
        }
        // 8 cart - after adding a new stuff (newcart), update the state, go to implement for the clientview,  goto cart.js
        this.setState( { cart })
        // 2. checkout - add localstorage
        localStorage.setItem('cartItems', JSON.stringify(cart))
    }
    // 13. cart - define a remove button functionn, set a property to the cart
    removeFromCart = (product) => {
        const cart = this.state.cart.slice()
        this.setState({
            cart: cart.filter( x => x._id !== product._id ),
        })
        // 3. checkout - copas to the remove function
        // localStorage.setItem('cartItems', JSON.stringify(cart))
        // 5. checkout - change cart to this.state.cart - cause cart is inside the state. go to cart.js to make handle the proceed button
        localStorage.setItem('cartItems', JSON.stringify(cart.filter( x => x._id !== product._id )))
    }

    // 16.checkout - create order function
    createOrder = (order) => {
        alert( `Need to save order for ${order.name}` ) //and pass as a property inside a cart comoponent
    }
    
    render() {
    return (
    // 10. redux - add store as a poperty of provider and define as a store
    <Provider store = { store }> {/* 11. redux - connect the product , go to product.js*/}
        <div className="grid-container">          
            <header className="headers">
                 <Header />
            </header>
            <main className="main">
                {/* <Route path='/profile' component={UserProfile} />
                <Route path='/manageorder' component={ManageOrderScreen} />
                <Route path='/order/:id' component={OrderScreen} />  
                <Route path='/place-order' component={PlaceOrderScreen} />
                <Route path='/payment' component={PaymentScreen} />
                <Route path='/shipping' component={ShippingScreen} />
                <Route path='/managebrand' component={ManageBrand} />
                <Route path='/manageproduct' component={ManageProductScreen} />
                <Route path='/managecategory' component={ManageCategory} />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/signin' component={SigninScreen} />
                <Route path='/cart/:id?' component={ShoppiingCartScreen} />
                <Route path='/category/:id' component={ShopScreen} />
                <Route path='/shop' component={ShopScreen} />
                <Route path='/banner' component={Banner} />
                <Route path='/header' component={header} />
                <Route path='/' exact={true} component={HomeScreen} /> */}

                {/* 4. product - layouting for product list, create a new file of product component */}
                <div className='content'>
                    <div className="content-product">
                        {/* // 2. filter - call component Filter and define property*/}
                        <Filter 
                            count = { this.state.products.length }
                            size = { this.state.size }
                            sort = { this.state.sort }
                            // 5. filter , 3 property diatas (size, sort) itu di passing atas komponen filtering
                            // 5. filter , 2 property dibawah untuk membuat fungsi untuk handle perubahan dari size and sort
                            filterProduct = { this.filterProduct }
                            sortProduct = { this.sortProduct }
                        />
                        {/* 6. product - call product component */}
                        <Products 
                            products = { this.state.products } 
                            // 6. define add to cart as a property
                            addToCart = { this.addToCart } //7. cart -> go to add to cart function for add condition
                        />
                    </div>
                    <div className='content-cart'>
                        {/* 4. cart - use a new cart component, go to product.js */}
                        <Cart 
                            cart = { this.state.cart}
                            // 15. cart - using a handle property of cart. add total and proceed, go to cart.js
                            removeFromCart = { this.removeFromCart}
                            // 17. checkout - add a create order function
                            createOrder = { this.createOrder } // go to css for styling
                        />
                    </div>
                </div> 
            </main>
                <div className='sitemap'>
                    <div className='sitemap-footer'>
                        <div className='sitemap-about-logo'>
                            <h2>Jualan Yaaa</h2>
                        </div>
                        <div className='sitemap-about-web'>
                            <label> 
                                Help Center
                            </label>
                            <div>
                                <Link className='Link' to='/profile'>Account</Link>
                                <Link className='Link' to='/about-shipping'>Shipping</Link>
                                <Link className='Link' to='/about-faq'>Frequently Asked Question</Link>
                                <Link className='Link' to='/about-terms'>Terms of Condition</Link>
                            </div>
                        </div>
                        <div className='sitemap-about-web'>
                            <label> 
                                About Us
                            </label>
                            <div>
                                <Link className='Link' to='/company-profile'>Profile</Link>
                                <Link className='Link' to='/about-us'>About Us</Link>
                                <Link className='Link' to='/contact-us'>Contact Us</Link>
                                <Link className='Link' to='/join-us'>Join Us</Link>
                            </div>
                        </div>
    
                        
                        <div className='sitemap-about-web'>
                            <label>
                                Our Website
                            </label>
                            <div>
                                <Link className='Link' to='/'>Home</Link>
                                <Link className='Link' to='/shop'>Shop</Link>
                                <Link className='Link' to='/categories'>Categories</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="footer-center">
                        <div className="footer-copyright">
                            All Rights Reserved
                        </div>
                        <div className="footer-media">
                            <div>
                                Follow Us
                            </div>
                            <div>
                                <i className='fab fa-instagram' />
                            </div>
                            <div>
                                <i className='fab fa-facebook' />
                            </div>
                            <div>
                                <i className='fab fa-twitter' />
                            </div>
                        </div>    
                    </div>               
                </footer>
            </div>
        </Provider>
    );
  }
}

export default App;
