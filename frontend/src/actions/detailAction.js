import Axios from "axios";

const { BANNER_LIST_REQUEST, BANNER_LIST_SUCCESS, BANNER_LIST_FAILED, BRAND_LIST_REQUEST, BRAND_LIST_SUCCESS, BRAND_LIST_FAILED, CAT_LIST_REQUEST, CAT_LIST_SUCCESS, CAT_LIST_FAILED, BRAND_SAVE_REQUEST, BRAND_SAVE_SUCCESS, BRAND_SAVE_FAILED } = require("../constant/detail");

const listBanner = ( banner) => async (dispatch) => {
    try {
        dispatch({ type: BANNER_LIST_REQUEST });

        const {data} = await Axios.get('/api/details/banner', banner)
        dispatch({ type : BANNER_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: BANNER_LIST_FAILED, payload: error.message })
    }
}
const listBrand = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST });

        const {data} = await Axios.get('/api/details/brands')
        dispatch({ type : BRAND_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: BRAND_LIST_FAILED, payload: error.message })
    }
}

const saveBrand = (name, image) => async (dispatch) => {
    try {
        dispatch({ type: BRAND_SAVE_REQUEST, payload:{name, image} });
        if(!name, image){
            const {data} = await Axios.post('/api/details/brands', {name, image})
            dispatch({ type : BRAND_SAVE_SUCCESS, payload: data });
        }

    } catch (error) {
        dispatch({ type: BRAND_SAVE_FAILED, payload: error.message })
    }
}

const listCat = () => async (dispatch) => {
    try {
        dispatch({ type: CAT_LIST_REQUEST });

        const {data} = await Axios.get('/api/details/cats')
        dispatch({ type : CAT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: CAT_LIST_FAILED, payload: error.message })
    }
}
const saveCat = (name) => async (dispatch) => {
    try {
        dispatch({ type: CAT_LIST_REQUEST, payload: name });
        if(!name){
            const {data} = await Axios.post('/api/details/cats', name)
            dispatch({ type : CAT_LIST_SUCCESS, payload: data });
        }

    } catch (error) {
        dispatch({ type: CAT_LIST_FAILED, payload: error.message })
    }
}

export {
    listBanner,
    listBrand,saveBrand,
    listCat, saveCat
}