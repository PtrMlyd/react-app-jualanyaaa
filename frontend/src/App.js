import React, { useEffect, useState } from 'react';
import './App.css';
import ShopScreen from './screens/user/ShopScreen';
import ProductScreen from './screens/user/ProductScreen';
import { Route, Link, useHistory } from 'react-router-dom';
import ShoppiingCartScreen from './screens/user/ShoppingCartScreen';
import SigninScreen from './screens/user/SigninScreen';
import { useSelector, useDispatch } from 'react-redux';
import RegisterScreen from './screens/user/RegisterScreen';
import ManageProductScreen from './screens/admin/ManageProduct';
import ShippingScreen from './screens/user/ShippingScreen';
import OrderScreen from './screens/user/OrderScreen';
import PaymentScreen from './screens/user/PaymentScreen';
import PlaceOrderScreen from './screens/user/PlaceOrderScreen';
import ManageOrderScreen from './screens/admin/ManageOrder';
import UserProfile from './screens/user/UserProfileScreen';
import { logOut } from './actions/userAction';
import HomeScreen from './screens/user/HomeScreen';
import Testing from './components/Banner';
import header from './components/HeaderTesting';
import selectBrand from './screens/admin/ManageBrand'
import selectCat from './screens/admin/ManageCategory'


import { listProducts } from './actions/productAction';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { listBrand } from './actions/detailAction';

function App(props) {

  const userSignin = useSelector( state => state.userSignin);
  const { userInfo } = userSignin;
  
  const productList = useSelector( state => state.productList );
  const {products, loading, error} = productList

  const brandList = useSelector(state => state.brandList)
  const {loading:loadingBrand, error : errorBrand, brands, success : successBrand} = brandList


  const dispatch = useDispatch();

  // fetchDate from server // sama dengan component did mount
  useEffect( () => {
      dispatch(listProducts())
      dispatch(listBrand())
      return () => {
      }
  }, [])


    const onLogOut = () => {
        dispatch(logOut())  
    }  

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

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
                    { 
                        userInfo && !userInfo.isAdmin  ? 
                        (
                            <div className='dropdown'> 
                             <  a href="#"> 
                                    <i className="fa fa-user-circle" isOpen={dropdownOpen} toggle={toggle} ></i> 
                                </a>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link className='profile' to='/profile/'> Profile </Link>
                                        {/* <Link onMouseEnter={onLogOut}>
                                            Log Out
                                        </Link> */}
                                    </li>
                                </ul>
                            </div>
                        ) : userInfo && userInfo.isAdmin ?
                        (
                            <div className='dropdown'>
                                <div isOpen={dropdownOpen} toggle={toggle}> 
                                    <i className="fa fa-user-circle"  ></i> 
                                </div>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link className='profile' to='/profile/'> Profile </Link>
                                        <Link to="/manageproduct">Manage Product </Link> 
                                        <Link to="/manageorder" >Manage Order</Link> 
                                        {/* <Link onClick={onLogOut}>Log Out</Link> */}
                                    </li>
                                </ul>
                            </div>     
                        ) : 
                        <Link className='logina' to="/signin"><i className="fa fa-user-circle"></i></Link>  
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
                <Route path='/managebrand' component={selectBrand} />
                <Route path='/manageproduct' component={ManageProductScreen} />
                <Route path='/managecat' component={selectCat} />
                <Route path='/product/:id' component={ProductScreen} />
                <Route path='/register' component={RegisterScreen} />
                <Route path='/signin' component={SigninScreen} />
                <Route path='/cart/:id?' component={ShoppiingCartScreen} />
                <Route path='/category/:id' component={ShopScreen} />
                <Route path='/shop' component={ShopScreen} />
                <Route path='/testing' component={Testing} />
                <Route path='/header' component={header} />
                <Route path='/' exact={true} component={HomeScreen} />
          </main>
            <div className='product-brand'>
                {
                loading ? <div> Loading . . . </div>
                :
                error ? <div> {error}</div> :
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
            <footer className="footer">
              All Right Reserved
             </footer>
         </div>
    );
}

export default App;
