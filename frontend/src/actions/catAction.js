import Axios from "axios";

const { 
    CAT_LIST_REQUEST, 
    CAT_LIST_SUCCESS, 
    CAT_LIST_FAILED
} = require("../constant/detail");

const listCat = () => async (dispatch, getSate) => {
    try {
        dispatch({ type: CAT_LIST_REQUEST });
        const { userSignin : { userInfo } } = getSate()
        const {data} = await Axios.get('/api/categories', {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })
        dispatch({ type : CAT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CAT_LIST_FAILED, payload: error.message })
    }
}

const saveCat = (cat) => async (dispatch) => {
    try {
        dispatch({ type: CAT_LIST_REQUEST, payload: cat });
        // const { userSignin : { userInfo } } = getSate()
        // const { data : { dtaa : newCat }} = await Axios.post('/api/categories', cat,{
        //     headers: {
        //         Authorization : "Bearer " + userInfo.token
        //     }
        // })
        dispatch({ type : CAT_LIST_SUCCESS, payload: cat });


    } catch (error) {
        dispatch({ type: CAT_LIST_FAILED, payload: error.message })
    }
}


export {
    listCat,
    saveCat
}

