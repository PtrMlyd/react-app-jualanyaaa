import Axios from "axios";

const { 
    BANNER_LIST_REQUEST, 
    BANNER_LIST_SUCCESS, 
    BANNER_LIST_FAILED 
} = require("../constant/detail");

const listBanner = () => async (dispatch) => {
    try {
        dispatch({ type: BANNER_LIST_REQUEST });

        const {data} = await Axios.get('/api/banners')
        dispatch({ type : BANNER_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: BANNER_LIST_FAILED, payload: error.message })
    }
}

export {
    listBanner
}