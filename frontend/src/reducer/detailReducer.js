
import { 
    BANNER_LIST_REQUEST, 
    BANNER_LIST_SUCCESS, 
    BANNER_LIST_FAILED, 
    BRAND_LIST_REQUEST,
    BRAND_LIST_SUCCESS,
    BRAND_LIST_FAILED,
    CAT_LIST_REQUEST,
    CAT_LIST_SUCCESS,
    CAT_LIST_FAILED,
    BRAND_SAVE_FAILED,
    BRAND_SAVE_REQUEST,
    BRAND_SAVE_SUCCESS
} from "../constant/detail";

function bannerListReducer(state = { banners: [] }, action ) {
    
    switch (action.type) {
        case BANNER_LIST_REQUEST:
            return { loading : true, banners: [] }
        case BANNER_LIST_SUCCESS:
            return { loading : false, banners: action.payload }
        case BANNER_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function brandListReducer(state = { brands: [] }, action ) {
    
    switch (action.type) {
        case  BRAND_LIST_REQUEST:
            return { loading : true, brands: [] }
        case BRAND_LIST_SUCCESS:
            return { loading : false, brands: action.payload }
        case BRAND_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function brandSaveReducer(state = {}, action ) {
    switch (action.type) {
        case  BRAND_SAVE_REQUEST:
            return { loading : true, brand:{} }
        case BRAND_SAVE_SUCCESS:
            return { loading : false, brand: action.payload, success : true }
        case BRAND_SAVE_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}







function catListReducer(state = {   cats:[] }, action ) {
    
    switch (action.type) {
        case CAT_LIST_REQUEST:
            return { loading : true, cats: [] }
        case CAT_LIST_SUCCESS:
            return { loading : false, cats: action.payload }
        case CAT_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function catSaveReducer(state = { cat: {} }, action ) {
    
    switch (action.type) {
        case  CAT_LIST_REQUEST:
            return { loading : true, cat:{} }
        case CAT_LIST_SUCCESS:
            return { loading : false, cat: action.payload }
        case CAT_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}


export {
    bannerListReducer, 
    brandListReducer,brandSaveReducer,
    catListReducer, catSaveReducer

}