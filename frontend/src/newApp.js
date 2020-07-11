// new App.js
import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import data from './newDatabase/data.json'
import Products from './components/Products';
import Header from './components/Header'
import Filter from './components/Filter';

class App extends React.Component {

    // 1. initial state for product rendering
    constructor() {
        super ()
        this.state = {
            // initiate must be same on object of data.json
            products : data.products,
            size :'',
            sort:''
            // 2. create database depend this state ( data.json )
        }
        
    }
    // 6. filter - create a function structure for filerProduct and sortProduct
    sortaProduct ( sort ) {
        console.log(sort.target.value) 
    }
    filtearProduct ( size ) {
        console.log(size.target.value);
    }
    // 7. go to the filter componennt.js
    
    // 8. filter - change the method to this arraw function fotr access set state method
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

        // 10 . make a condition if filter not a choosed
        if( size === '' ){
            this.setState( { size: size, products : data.products })
        }else{
            // 9. filter - set a setstate to make all product filtered by size
            this.setState({
                size : size,
                products : data.products.filter( 
                    (product) => product.size.indexOf(size) >= 0
                ),
            })
        }
    }

    render() {
    return (
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

                {/* 3. layouting for product list */}
                <div className='content'>
                    <div className="content-product">
                        {/* // 2. filter - call component Filter and define property*/}
                        <Filter 
                            count = { this.state.products.length }
                            size = { this.state.size }
                            sort = { this.state.sort }
                            // 5. filter , 3 property diatas (size, sort) itu di passing atas komponen filtering
                            // 2 property dibawah untuk membuat fungsi untuk handle perubahan dari size and sort
                            filterProduct = { this.filterProduct }
                            sortProduct = { this.sortProduct }
                        />
                        {/* 5. call product component */}
                        <Products products = { this.state.products }></Products>
                    </div>
                    <div className='content-cart'>
                        cart items
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
      );
  }
}

export default App;
