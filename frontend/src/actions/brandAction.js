import Axios from "axios";

const { 
    BRAND_LIST_REQUEST, 
    BRAND_LIST_SUCCESS, 
    BRAND_LIST_FAILED, 
    BRAND_SAVE_REQUEST, 
    BRAND_SAVE_SUCCESS, 
    BRAND_SAVE_FAILED 
} = require("../constant/detail");


const listBrand = () => async (dispatch, getSate) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST });
        const { userSignin : { userInfo } } = getSate()
        const {data} = await Axios.get('/api/brands', {
            headers: {
                Authorization : "Bearer " + userInfo.token
            }
        })
        dispatch({ type : BRAND_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: BRAND_LIST_FAILED, payload: error.message })
    }
}

// const saveBrand = (brand) => async (dispatch, getSate) => {
//     try {
//         dispatch({ type: BRAND_SAVE_REQUEST, payload: brand });
//         const { userSignin : { userInfo } } = getSate()
//         const { data : { dtaa : newBrand }} = await Axios.post('/api/brands', brand,{
//             headers: {
//                 Authorization : "Bearer " + userInfo.token
//             }
//         })
//         dispatch({ type : BRAND_SAVE_SUCCESS, payload: newBrand });


//     } catch (error) {
//         dispatch({ type: BRAND_SAVE_FAILED, payload: error.message })
//     }
// }

// const saveBrandExist = (brand, product) => async (dispatch, getSate) => {
//     try {
//         dispatch({ type: BRAND_SAVE_REQUEST, payload: product });
//         const { userSignin : { userInfo } } = getSate()
//         const { data : { dtaa : newBrand }} = await Axios.post('/api/brands/'+ brand + '/product', product._id ,{
//             headers: {
//                 Authorization : "Bearer " + userInfo.token
//             }
//         })
//         dispatch({ type : BRAND_SAVE_SUCCESS, payload: newBrand });


//     } catch (error) {
//         dispatch({ type: BRAND_SAVE_FAILED, payload: error.message })
//     }
// }
const saveBrand = ( data ) => (dispatch) => {
    dispatch({ type : BRAND_SAVE_SUCCESS, payload: data})
}


export {
    listBrand,
    saveBrand
    // saveBrandExist
}