const { default: Axios } = require("axios");
const Cookie =require('js-cookie-remove-all');
const { 
    USER_SIGNIN_FAILED, 
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_REQUEST, 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAILED, 
    USER_UPDATE_REQUEST, 
    USER_UPDATE_FAILED, 
    USER_UPDATE_SUCCESS,
    USER_LOGOUT } = require("../constant/user");

const signin = ( username, password) => async (dispatch) => {
    dispatch({ type : USER_SIGNIN_REQUEST, payload : { username, password }});

    try {
        const { data } = await Axios.post("api/users/signin", { username, password });

        dispatch({ type : USER_SIGNIN_SUCCESS, payload : data});
        Cookie.set('userInfo', JSON.stringify( data ),{expires : 1});
    } catch (error) {
        dispatch({ type : USER_SIGNIN_FAILED, payload : error.message });
        
    }
}

const register = ( username, email, password) => async (dispatch) => {
    dispatch({ type : USER_REGISTER_REQUEST, payload : { username, email, password}});

    try {
        const { data } = await Axios.post("api/users/register", { username, email, password });

        dispatch({ type : USER_REGISTER_SUCCESS, payload : data});
        Cookie.set('userInfo', JSON.stringify( data ),{ expires : 1});
        
    } catch (error) {
        dispatch({ type : USER_REGISTER_FAILED, payload : error.message });
        
    }
}


const update = ( {userId, username, email, password}) => async (dispatch, getState) => {
    
    const { userSignin: { userInfo } } = getState();
    dispatch({ type : USER_UPDATE_REQUEST, payload : { userId, username, email, password }});
    try {
        const { data } = await Axios.put("/api/users/" + userId
        , { username, email, password }, {
            headers: {
                Authorization : 'Bearer ' + userInfo.token
            }
        });

        dispatch({ type : USER_UPDATE_SUCCESS, payload : data});
        Cookie.set('userInfo', JSON.stringify( data ),{expires : 1});
    } catch (error) {
        dispatch({ type : USER_UPDATE_FAILED, payload : error.message });
        
    }
}

const logOut = () => (dispatch) => {
    // remove cookie
    Cookie.removeAll({});
    dispatch({ type: USER_LOGOUT })   
}

export{
    signin,
    register,
    logOut,
    update
}