// new App.js
import React from 'react';
import {Link}  from 'react-router-dom';
import data from './db/data.json'
import Products from './components/Products';
import Header from './components/Header'
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './redux/store'
import { Provider } from 'react-redux'

class App extends React.Component {    
    render() {
    return (
    <Provider store = { store }>
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

                <div className='content'>
                    <div className="content-product">
                        <Filter />
                        <Products />
                    </div>
                    <div className='content-cart'>
                        <Cart />
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
