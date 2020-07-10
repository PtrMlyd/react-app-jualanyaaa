import Axios from "axios";

const { 
    CAT_LIST_REQUEST, 
    CAT_LIST_SUCCESS, 
    CAT_LIST_FAILED,
    CAT_SAVE_REQUEST,
    CAT_SAVE_SUCCESS,
    CAT_SAVE_FAILED,
    CAT_DELETE_REQUEST,
    CAT_DELETE_SUCCESS,
    CAT_DELETE_FAILED
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

const saveCat = (cat) => async (dispatch, getSate) => {
    try {
        dispatch({ type: CAT_SAVE_REQUEST, payload: cat });
        const { userSignin : { userInfo } } = getSate()
        if(!cat._id){
            const { data } = await Axios.post('/api/categories', cat,{
                headers: {
                    Authorization : "Bearer " + userInfo.token
                }
            })
            dispatch({ type : CAT_SAVE_SUCCESS, payload: data }); 
        }else{
            const { data } = await Axios.put('/api/categories/' + cat._id, cat,{
                headers: {
                    Authorization : "Bearer " + userInfo.token
                }
            })
            dispatch({ type : CAT_SAVE_SUCCESS, payload: data }); 

        }
    } catch (error) {
        dispatch({ type: CAT_SAVE_FAILED, payload: error.message })
    }
}
const deleteCat = (catId) => async (dispatch, getSate) => {
    try {
        const { userSignin : {userInfo } } = getSate()

        dispatch( { type : CAT_DELETE_REQUEST, payload: catId } )

        const { data } = await Axios.delete('/api/categories/' + catId, {
            headers: {
                Authorization : 'Bearer ' + userInfo.token
            }
        })

        dispatch( { type : CAT_DELETE_SUCCESS, payload: data, success :true } )
    } catch (error) {
        dispatch( { type : CAT_DELETE_FAILED, payload: error.message } )
    }
}


export {
    listCat,
    saveCat,
    deleteCat
}

