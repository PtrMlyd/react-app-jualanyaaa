const { FETCH_PRODUCT, FILTER_PRODUCT_BY_SIZE, SORT_PRODUCT_BY_PRICE } = require("../types");

//4. product-redux - define a function product to get a product
export const productReducer = ( state = {}, action ) => {
    switch (action.type) {
        
        //6. filter-redux, create case filter from filter action   
        case FILTER_PRODUCT_BY_SIZE :  
        return {
            ...state, //<- return current state, jika kitsa ngambil value ini maka akan di merge dengan state yang sedang digunakan, maka buat nilai filtered item yang akan memanggil item dari state, dan juga panggil size dari state 
            size : action.payload.size,
            filteredItem : action.payload.item,
        }  
        case SORT_PRODUCT_BY_PRICE :
            return {
                ...state,
                sort : action.payload.sort,
                filteredItem : action.payload.item // go to filter .js
            }
            // 11. filter redux - add filteredItem , which, in the begining of session, item and filter return by payload (there is no condition)
        case FETCH_PRODUCT :
            return { 
                item : action.payload , 
                filteredItem : action.payload //12. filter redux - go to the filter.js
            } //5. product-redux - go creating the store.js
        default: 
        return state
    }
}