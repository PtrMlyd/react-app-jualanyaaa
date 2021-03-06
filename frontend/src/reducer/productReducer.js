import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAILED, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAILED, 
    PRODUCT_SAVE_REQUEST, 
    PRODUCT_SAVE_SUCCESS, 
    PRODUCT_SAVE_FAILED, 
    PRODUCT_DELETE_REQUEST, 
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAILED, 
    PRODUCT_REVIEW_SAVE_REQUEST, 
    PRODUCT_REVIEW_SAVE_SUCCESS, 
    PRODUCT_REVIEW_SAVE_FAILED, 
    PRODUCT_REVIEW_SAVE_RESET 
} from "../constant/product";

function productListReducer(state = { products: [] }, action ) {
    
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading : true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading : false, products: action.payload }
        case PRODUCT_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function productDetailReducer(state = { product: { reviews: []} }, action ) {
    
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading : true }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading : false, product: action.payload }
        case PRODUCT_DETAILS_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}


function productSaveReducer(state = { product: {} }, action) {

    switch (action.type) {
      case PRODUCT_SAVE_REQUEST:
        return { loading: true };
      case PRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case PRODUCT_SAVE_FAILED:
        return { loading: false, error: action.payload }
      default:
        return state;
    }
}

function productDeleteReducer(state = { product: {} }, action ) {
    
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading : true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading : false, success: true, product: action.payload }
        case PRODUCT_DELETE_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}

function productReviewSaveReducer(state = {}, action ) {
    
    switch (action.type) {
        case PRODUCT_REVIEW_SAVE_REQUEST:
            return { loading : true }
        case PRODUCT_REVIEW_SAVE_SUCCESS:
            return { loading : false, review: action.payload, success: true}
        case PRODUCT_REVIEW_SAVE_FAILED:
            return { loading : false, error: action.payload };
        case PRODUCT_REVIEW_SAVE_RESET :
            return { };
        default:
            return state
    }
}

export {
    productListReducer, 
    productDetailReducer,
    productSaveReducer, 
    productDeleteReducer,
    productReviewSaveReducer
}