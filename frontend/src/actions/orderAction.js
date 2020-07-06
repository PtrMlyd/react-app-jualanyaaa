import { 
    ORDER_CREATE_REQUEST, 
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILED, 
    ORDER_DETAILS_REQUEST, 
    ORDER_DETAILS_FAILED, 
    ORDER_DETAILS_SUCCESS, 
    ORDER_PAY_REQUEST, 
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_FAILED, 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_FAILED, 
    ORDER_LIST_SUCCESS, 
    MYORDER_LIST_REQUEST, 
    MYORDER_LIST_SUCCESS, 
    MYORDER_LIST_FAILED, 
    ORDER_DELETE_REQUEST, 
    ORDER_DELETE_SUCCESS, 
    ORDER_DELETE_FAILED 
} from "../constant/order"

const { default: Axios } = require("axios")


// untuk mendapatkan token tambahkan setelah dispatch : get State
const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch( { type : ORDER_CREATE_REQUEST, payload : order } )
        const { userSignin : { userInfo } } = getState()
        //use ajax request
        const { data : { data : newOrder } } = await Axios.post('/api/orders', order, {
            headers: {
                Authorization : " Bearer " + userInfo.token
            }
        } )

        dispatch( { type : ORDER_CREATE_SUCCESS, payload : newOrder } );
        
    } catch (error) {
        console.log(error)
        dispatch( { type : ORDER_CREATE_FAILED, payload : error.message } );
        
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type : ORDER_DETAILS_REQUEST , payload : orderId})
        const { userSignin : { userInfo } } = getState()
        const { data } = await Axios.get('/api/orders/' + orderId, {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })

        dispatch({ type : ORDER_DETAILS_SUCCESS , payload : data })
    } catch (error) {
        console.log(error)
        dispatch( { type : ORDER_DETAILS_FAILED, payload : error.message } );
    }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type : ORDER_PAY_REQUEST , payload : paymentResult})
        const { userSignin : { userInfo } } = getState()
        const { data } = await Axios.put('/api/orders/' + order._id + '/pay', paymentResult, {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })

        dispatch({ type : ORDER_PAY_SUCCESS , payload : data })
    } catch (error) {
        console.log(error)
        dispatch( { type : ORDER_PAY_FAILED, payload : error.message } );
    }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type : ORDER_DELETE_REQUEST , payload : orderId})
        const { userSignin : { userInfo } } = getState()
        const { data } = await Axios.delete('/api/orders/' + orderId, {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })

        dispatch({ type : ORDER_DELETE_SUCCESS , payload : data })
    } catch (error) {
        console.log(error)
        dispatch( { type : ORDER_DELETE_FAILED, payload : error.message } );
    }
}

const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type : ORDER_LIST_REQUEST })
        const { userSignin : { userInfo } } = getState()
        const { data } = await Axios.get('/api/orders', {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })

        dispatch({ type : ORDER_LIST_SUCCESS, payload : data })
    } catch (error) {
        dispatch({ type : ORDER_LIST_FAILED, payload : error.message })
    }
}

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type : MYORDER_LIST_REQUEST })
        const { userSignin : { userInfo } } = getState()
        const { data } = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })

        dispatch({ type : MYORDER_LIST_SUCCESS, payload : data })
    } catch (error) {
        dispatch({ type : MYORDER_LIST_FAILED, payload : error.message })
    }
}

export { 
    createOrder, 
    detailsOrder, 
    payOrder, 
    listOrders, 
    listMyOrders, 
    deleteOrder }