import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, update } from '../../actions/userAction';
import { listMyOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';


function UserProfile(props) {
    
    const [ username, setusername ] = useState('')
    const [ password, setpassword ]  = useState('')
    const [ email, setemail] = useState('')
    
    // get access to store.js
    const userUpdate = useSelector( state => state.userUpdate )
    const { loading, success, error } = userUpdate
    
    // get access token
    const userSignin = useSelector( state => state.userSignin)
    const { userInfo } = userSignin

    // my orders
    const myOrderList = useSelector(state => state.myOrderList)
    const {loading: loadingOrders, orders, error: errorOrders} = myOrderList
    
    const dispatch = useDispatch()

    useEffect( () => {
        if(userInfo){
            console.log(userInfo.username)
            setusername(userInfo.username);
            setemail(userInfo.email);
            setpassword(userInfo.password)
        }
        dispatch(listMyOrders())
        return() =>{

        }
    }, [userInfo])

        
    const onSubmitClicka = (e) => {
        e.preventDefault();
        dispatch(update({
            userId: userInfo._id, 
            username, 
            email, 
            password}))
    }

    const onLogOut = () => {
        dispatch(logOut())
        props.history.push('/')
    }
   
    // column
    return <div className="user-profile">
        <div className="profile-info">      {/* column1 */}
            <div className='form'>
                <form onSubmit={onSubmitClicka} >
                    <ul className='form-container'>
                        <li>
                            <p>
                                User Profile
                            </p>
                        </li>
                        <li>
                            {loading && <div> Loading . . .</div>}
                            {error && <div> { error }</div>}
                            {success && <div> Profile Saved Success</div>}
                        </li>

                        <li>
                            <label>
                                User Name :
                            </label> 
                            <input type='text' value={username} id='username' onChange={ (e) => setusername( e.target.value )} /> 
                        </li>
                        
                        <li>
                            <label>
                                Email :
                            </label>
                            <input type='text' value={email} id='email' onChange={ (e) => setemail( e.target.value )} />
                        </li>
                        
                        <li>
                            <label>
                                Password :
                            </label>
                            <input type='password' value={password} id='password' onChange={ (e) => setpassword( e.target.value )} />
                        </li>
                        
                        <li>
                            <button  type='submit' className='button secondary full-width'> Update </button>
                        </li>
                        <li>
                            <button onClick={onLogOut} type="button" className='button secondary full-width'> Log Out </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        {/* column2 */}
        <div classNames="profile-ordersa content-margined">
            {
                loadingOrders ? <div>Loading . . . </div>:
                errorOrders ? <div>{errorOrders}</div>:
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map( order => 
                                <tr key={order._id}>
                                    <td className='tableid'>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid.toString()}</td>
                                    <td>
                                        <Link to={'/order/' + order._id} className='button secondary'>DETAILS</Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            }
        </div>
    </div>
    

}

export default UserProfile