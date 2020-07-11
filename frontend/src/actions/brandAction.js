import Axios from "axios";
import { get } from "js-cookie";

const { 
    BRAND_LIST_REQUEST, 
    BRAND_LIST_SUCCESS, 
    BRAND_LIST_FAILED, 
    BRAND_SAVE_REQUEST, 
    BRAND_SAVE_SUCCESS, 
    BRAND_SAVE_FAILED, 
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_FAILED,
    BRAND_DELETE_SUCCESS
} = require("../constant/detail");


const listBrand = () => async (dispatch) => {
    try {
        dispatch({ type: BRAND_LIST_REQUEST });
        const {data} = await Axios.get('/api/brands')
        dispatch({ type : BRAND_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: BRAND_LIST_FAILED, payload: error.message })
    }
}

const saveBrand = (brand) => async (dispatch, getSate) => {
    try {
        dispatch({ type: BRAND_SAVE_REQUEST, payload: brand });
        const { userSignin : { userInfo } } = getSate()
        if(!brand._id){
            const { data } = await Axios.post('/api/brands', brand,{
                headers: {
                    Authorization : "Bearer " + userInfo.token
                }
            })
            dispatch({ type : BRAND_SAVE_SUCCESS, payload: data }); 
        }else{
            const { data } = await Axios.put('/api/brands/' + brand._id, brand,{
                headers: {
                    Authorization : "Bearer " + userInfo.token
                }
            })
            dispatch({ type : BRAND_SAVE_SUCCESS, payload: data }); 

        }
    } catch (error) {
        dispatch({ type: BRAND_SAVE_FAILED, payload: error.message })
    }
}
const deleteBrand = (brandId) => async (dispatch, getSate) => {
    try {
        const { userSignin : {userInfo } } = getSate()

        dispatch( { type : BRAND_DELETE_REQUEST, payload: brandId } )

        const { data } = await Axios.delete('/api/brands/' + brandId, {
            headers: {
                Authorization : 'Bearer ' + userInfo.token
            }
        })

        dispatch( { type : BRAND_DELETE_SUCCESS, payload: data, success :true } )
    } catch (error) {
        dispatch( { type : BRAND_DELETE_FAILED, payload: error.message } )
    }
}


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
// const saveBrand = ( data ) => (dispatch) => {
//     dispatch({ type : BRAND_SAVE_SUCCESS, payload: data})
// }


export {
    listBrand,
    saveBrand,
    deleteBrand
}