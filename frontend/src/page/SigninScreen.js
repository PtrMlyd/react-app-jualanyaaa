import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../actions/userAction';


function Signin (props) {


    const [username, setusername ] = useState('');
    const [password, setpassword ] = useState('');    
    const userSignin = useSelector( state => state.userSignin);
    const { loading, userInfo, error} = userSignin;
    
    const dispatch = useDispatch();

    const redirect = props.location.search?props.location.search.split('=')[1]:'/'
    
    useEffect( () => {
        if(userInfo){
            props.history.push(redirect)
        }

        return () => {

        };
    }, [userInfo] );

    const onSubmitClick = (e) => {
        e.preventDefault();
        dispatch(signin(username, password))
    }

    return(
        <div className='form'>
           <form onSubmit={onSubmitClick} >
               <ul className='form-container'>
                    <center>
                        <li>
                            <p>
                                Sign In
                            </p>
                        </li>
                        <li>
                            {loading && <div> Loading . . .</div>}
                            {error && <div> { error }</div>}
                        </li>
                        <li>
                            <label>
                                User Name :
                            </label> 
                        </li>
                        <li>
                            <input type='text' id='username' onChange={ (e) => setusername( e.target.value )} /> 
                        </li>
                        <li>
                            <label>
                                Passsword :
                            </label>
                        </li>
                        <li>
                            <input type='password' id='password' onChange={ (e) => setpassword( e.target.value )} />
                        </li>
                        <li>
                            <button type='submit' className='button primary'> Sign In </button>
                        </li>
                        <li>
                                New to Syamsuri Fashion ?
                        </li>
                        <li>
                        
                                <Link to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}>
                                    <button type='submit' className='button secondary text-center full-width'>Create your Account</button>
                                </Link>
                        </li>
                    </center>
               </ul>
           </form>
        </div>
    )

}

export default Signin