import React from 'react';
import { Link } from 'react-router-dom'

function Header () {
    return ( 
        <div className="header">
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
                <div className='dropdown' >

                        <i className="fa fa-user-circle"  ></i> 

                    <ul className="dropdown-content">
                        <li>
                            <Link to='/profile/'> Profile </Link>
                            <Link to="/managebrand">Manage Brand </Link> 
                            <Link to="/managecategory">Manage Category </Link> 
                            <Link to="/manageproduct">Manage Product </Link> 
                            <Link to="/manageorder" >Manage Order</Link> 
                        </li>
                    </ul>
                </div>          
            </div>   
        </div>                                     
    )
}
 
export default Header;