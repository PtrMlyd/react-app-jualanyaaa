
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
    BRAND_SAVE_SUCCESS,
    BRAND_DELETE_REQUEST,
    BRAND_DELETE_SUCCESS,
    BRAND_DELETE_FAILED,
    CAT_DELETE_REQUEST,
    CAT_DELETE_SUCCESS,
    CAT_DELETE_FAILED,
    CAT_SAVE_REQUEST,
    CAT_SAVE_SUCCESS,
    CAT_SAVE_FAILED
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
function brandSaveReducer(state = { brand :{}}, action ) {
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

function brandDeleteReducer ( state = { brand : { } }, action ) {
    switch (action.type) {
        case BRAND_DELETE_REQUEST:
            return { loading : true }
        case BRAND_DELETE_SUCCESS:
            return { loading : false, success : true, brand : action.payload }
        case BRAND_DELETE_FAILED:
            return { loading : false , error : action.payload}
        default:
            return state
    }
}






function catListReducer(state = {   cats:[] }, action ) {
    
    switch (action.type) {
        case CAT_LIST_REQUEST:
            return { loading : true, cats: [] }
        case CAT_LIST_SUCCESS:
            return { loading : false, cats: action.payload, success:true }
        case CAT_LIST_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function catSaveReducer(state = { cat: {} }, action ) {
    
    switch (action.type) {
        case  CAT_SAVE_REQUEST:
            return { loading : true, cat:{ } }
        case CAT_SAVE_SUCCESS :
            return { loading : false, cat: action.payload, success:true }
        case CAT_SAVE_FAILED:
            return { loading : false, error: action.payload };
        default:
            return state
    }
}
function catDeleteReducer ( state = { cat : { } }, action ) {
    switch (action.type) {
        case CAT_DELETE_REQUEST:
            return { loading : true }
        case CAT_DELETE_SUCCESS:
            return { loading : false, success : true, cat : action.payload }
        case CAT_DELETE_FAILED:
            return { loading : false , error : action.payload}
        default:
            return state
    }
}


export {
    bannerListReducer, 
    brandListReducer,brandSaveReducer, brandDeleteReducer,
    catListReducer, catSaveReducer, catDeleteReducer

}