import { FETCH_PRODUCT } from "../types"

//2. redux - declare fetchProducts
export const fetchProducts = () => async ( dispatch ) =>{
   const res = await fetch('/api/products')  //19. redux - casue the product need to convert with JSON.  define a data to convert to JSON and use await
   const data = await res.json();
   console.log( data )

   dispatch( {
       type : FETCH_PRODUCT,
       payload : data
   }) // 3. redux - create reducer
}