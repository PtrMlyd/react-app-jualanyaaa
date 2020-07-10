const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILED, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAILED } = require("../constant/product");
const { default: Axios } = require("axios");


const listProducts = ( category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const {data} = await Axios.get('/api/products?category=' + category + '&searchKeyword=' + searchKeyword + '&sortOrder=' + sortOrder)
        dispatch({ type : PRODUCT_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAILED, payload: error.message })
    }
}

const detailProducts = ( productId ) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })

        const { data } =  await Axios.get('/api/products/' + productId);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAILED, payload: error.message})
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const { userSignin: { userInfo } } = getState();
      if (!product._id) {
        const { data } = await Axios.post('/api/products', product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Axios.put('/api/products/' + product._id, product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
  
    } catch (error) {
  
      dispatch({ type: PRODUCT_SAVE_FAILED, payload: error.message });
    }
  }


const deleteProduct = ( productId ) => async (dispatch, getState) => {
    try {
        const { userSignin: { userInfo } } = getState();
        
        dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId })


        const { data } =  await Axios.delete('/api/products/' + productId, {
            headers: {
                'Authorization' : 'Bearer ' + userInfo.token 
            }
        });

        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success:true })

    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAILED, payload: error.message})
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        const { 
            userSignin: { 
                userInfo : { token },
            },
        } = getState();

        dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload : review })
        
        const { data } = await Axios.post(
            `/api/products/${productId}/reviews`, review, {
            headers: {
                Authorization : 'Bearer ' + token
            }
        
        })
        dispatch({ type : PRODUCT_REVIEW_SAVE_SUCCESS, payload: data})
        window.location.reload()
    } catch (error) {
        dispatch({ type : PRODUCT_REVIEW_SAVE_FAILED, payload : error.message })
    }
}

export{ listProducts, detailProducts, saveProduct, deleteProduct, saveProductReview }