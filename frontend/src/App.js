import React from 'react';
import './App.css';
import HomeScreen from './page/HomeScreen';
import ProductScreen from './page/ProductScreen';
import { Route, Link, useHistory } from 'react-router-dom';
import ShoppiingCartScreen from './page/ShoppingCartScreen';
import SigninScreen from './page/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import RegisterScreen from './page/RegisterScreen';
import ManageProductScreen from './page/ManageProduct';
import ShippingScreen from './page/ShippingScreen';
import OrderScreen from './page/OrderScreen';
import PaymentScreen from './page/PaymentScreen';
import PlaceOrderScreen from './page/PlaceOrderScreen';
import ManageOrderScreen from './page/ManageOrder';
import UserProfile from './page/UserProfileScreen';
import { logOut } from './actions/userAction';



function App(props) {

  const userSignin = useSelector( state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu=()=>{
    document.querySelector(".sidebar").classList.add("open")
  }

  const closeMenu=()=>{
    document.querySelector(".sidebar").classList.remove("open")
  }

  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(logOut())
    }

  return (
      <div className="grid-container">
          <header className="headerLogin">
              <div className="account">
                  { 
                    userInfo ? 
                        <div>
                            <Link className='profile' to='/profile/'> {userInfo.username} </Link>
                            / <button onClick={onLogOut}>Log Out</button>
                        </div> 
                        :
                        <Link className='profile'to="/signin">Log In</Link>
                  }
              </div>
              <div className="trol">
                    { 
                        userInfo && userInfo.isAdmin && (
                            <div>
                                <Link to="/manageproduct">Manage Product </Link> 
                                <Link to="/manageorder" >Manage Order</Link> 
                                <Link to="/cart" >Cart</Link> 
                            </div>
                        ) 
                    }
                    { userInfo && !userInfo.isAdmin && (
                        <div>
                            <Link to="/cart" >Cart</Link> 
                        </div>

                    )}
              </div>
          </header>
          
          <header className="header">
              <div className="brand">
                  <button onClick={openMenu}>
                      &#9776; 
                  </button>
                  <Link to='/' >Jualan Yaaa </Link> 
              </div>
              <div className="header-link">
                  <a href="career.html">Career</a>
                  <a href="about.html">About Us</a>
                  <a href="contact.html">Contact Us</a>
              </div>
          </header>
          <aside className="sidebar">
              <h4>Categories</h4>
              <button className="sidebar-close" onClick={closeMenu}>x</button>
              <ul className='categories'>
                  <li>
                      <Link to="/category/Shirt">Koko</Link>
                  </li>
                  <li>
                      <Link to="/category/Gamis">Gamis</Link>
                  </li>
                  <li>
                      <Link to="/category/Peci">Peci</Link>
                  </li>
                  <li>
                      <Link to="/category/Sangkok">SLinkngkok</Link>
                  </li>
                      
              </ul>
          </aside>
          <main className="main">
              <div className="content">


                    <Route path='category/:id' component={HomeScreen} />
                    <Route path='/profile' component={UserProfile} />
                    <Route path='/manageorder' component={ManageOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />  
                    <Route path='/place-order' component={PlaceOrderScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/manageproduct' component={ManageProductScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/signin' component={SigninScreen} />
                    <Route path='/cart/:id?' component={ShoppiingCartScreen} />
                    <Route path='/' exact={true} component={HomeScreen} />


              </div>
          </main>
          <footer className="footer">
              All Right Reserved
          </footer>
      </div>
  );
}

export default App;
