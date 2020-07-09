import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { logOut } from './actions/userAction';
// import { listProducts } from './actions/productAction';
import { listBrand } from './actions/brandAction';

import Banner from './components/Banner';
import header from './components/carousel';

import './App.css';
import RegisterScreen from './screens/user/RegisterScreen';
import SigninScreen from './screens/user/SigninScreen';
import HomeScreen from './screens/user/HomeScreen';
import ShopScreen from './screens/user/ShopScreen';
import ProductScreen from './screens/user/ProductScreen';
import ShoppiingCartScreen from './screens/user/ShoppingCartScreen';
import ShippingScreen from './screens/user/ShippingScreen';
import PaymentScreen from './screens/user/PaymentScreen';
import PlaceOrderScreen from './screens/user/PlaceOrderScreen';
import OrderScreen from './screens/user/OrderScreen';
import UserProfile from './screens/user/UserProfileScreen';
import ManageBrand from './screens/admin/ManageBrand'
import ManageCategory from './screens/admin/ManageCategory'
import ManageProductScreen from './screens/admin/ManageProduct';
import ManageOrderScreen from './screens/admin/ManageOrder';




function App(props) {

  const userSignin = useSelector( state => state.userSignin);
  const { userInfo } = userSignin;

  const brandList = useSelector(state => state.brandList)
  const {loading:loadingBrand, error : errorBrand, brands} = brandList


  const dispatch = useDispatch();

  // fetchDate from server // sama dengan component did mount
  useEffect( () => {
      dispatch(listBrand())
      return () => {
      }
  }, [])


    // const onLogOut = () => {
    //     dispatch(logOut())  
    // }  

    return (
      <div className="grid-container">          
            <header className="header">
                <div className="brand">
                    <Link to='/' >Jualan Yaaa </Link> 
                </div>
                <div className="header-link">
                    <a href="/shop">Shop</a>
                </div>
                <div className="trol">
                    <Link to='/cart'>
                         <i className="fa fa-shopping-cart" ></i> 
                    </Link>
                    <i className="fas fa-bell"></i>
                    { 
                        userInfo && !userInfo.isAdmin  ? 
                        (
                            <div className='dropdown' >

                                    <i className="fa fa-user-circle"  ></i> 

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to='/profile/'> Profile </Link>
                                        {/* <Link onMouseEnter={onLogOut}>
                                            Log Out
                                        </Link> */}
                                    </li>
                                </ul>
                            </div>
                        ) : userInfo && userInfo.isAdmin ?
                        (
                            <div className='dropdown'>

                                    <i className="fa fa-user-circle"  ></i> 

                                <ul className="dropdown-content">
                                    <li>
                                        <Link to='/profile/'> Profile </Link>
                                        <Link to="/managebrand">Manage Brand </Link> 
                                        <Link to="/manageproduct">Manage Product </Link> 
                                        <Link to="/manageorder" >Manage Order</Link> 
                                        {/* <Link onClick={onLogOut}>Log Out</Link> */}
                                    </li>
                                </ul>
                            </div>     
                        ) : 
                        <Link  to="/signin"><i className="fa fa-user-circle"></i></Link>  
                    }            
              </div>
          </header>
          <main className="main">
                <Route path='/profile' component={UserProfile} />
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
                <Route path='/' exact={true} component={HomeScreen} />
          </main>
            <div className='product-brand'>
                {
                loadingBrand ? <div> Loading . . . </div>
                :
                errorBrand ? <div> {errorBrand}</div> :
                    <div className="jumbotron-footer-container">
                        {  
                            brands ?  brands.map( brand =>       
                                <div className="jumbotron-footer-item" key={brand._id} >
                                    <img src={ brand.image } alt={brand.name} />
                                </div>
                                ) :
                            <div>
                                Error
                            </div> 
                        }
                    </div>
                 }       
            </div>
            <div className="media-site">
                <div className='media-site-center'>
                    <div><h2>JOIN OUR NEWSLETTER </h2></div>
                    <div>
                        <input placeholder='Email Address' />   
                    </div>
                    <div> 
                        <button className="button secondary">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

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

export default App;
