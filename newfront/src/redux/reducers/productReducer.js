const { FETCH_PRODUCT } = require("../types");

//4. define a function product to get a product
export const productReducer = ( state = {}, action ) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return { 
                item : action.payload
            } //5. redux - go creating the store.js   
        default: 
            return state
    }
}