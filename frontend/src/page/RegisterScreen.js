import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction';


function Register (props) {

    const [username, setusername ] = useState('');
    const [emaill, setemaill ] = useState('');
    const [password, setpassword ] = useState('');    
    const [repassword, setrepassword ] = useState('');  

    const userRegister = useSelector( state => state.userRegister);
    const { loading, userInfo, error} = userRegister;
    
    const dispatch = useDispatch();

    
    const redirect = props.location.search?props.location.search.split('=')[1]:'/'
    
    useEffect( () => {
        if(userInfo){
            props.history.push(redirect)
        }

        return () => {

        };
    }, [userInfo] );

    const onSubmitClicka = (e) => {
        e.preventDefault();
        dispatch(register(username, emaill, password))
    }

    return(
        <div className='form'>
           <form onSubmit={onSubmitClicka} >
               <ul className='form-container'>
                    
                        <li>
                            <p>
                               Create Account
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
                            <input type='text' id='username' onChange={ (e) => setusername( e.target.value )} /> 
                        </li>
                       
                        <li>
                            <label>
                                Email :
                            </label>
                            <input type='text' id='email' onChange={ (e) => setemaill( e.target.value )} />
                        </li>
                       
                        <li>
                            <label>
                                Password :
                            </label>
                            <input type='password' id='password' onChange={ (e) => setpassword( e.target.value )} />
                        </li>
                       
                        <li>
                            <label>
                                ConfirmPassword :
                            </label>
                            <input type='repassword' id='repassword' onChange={ (e) => setrepassword( e.target.value )} />
                        </li>
                       
                        <li>
                            <button type='submit' className='button primary'> Register Account </button>
                        </li>
                        <li>
                                Already Have an Account ? <Link to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}>Sig In</Link>
                        </li>
                    
               </ul>
           </form>
        </div>
    )

}

export default Register