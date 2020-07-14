import { FETCH_PRODUCT, FILTER_PRODUCT_BY_SIZE, SORT_PRODUCT_BY_PRICE } from "../types"

//2. product redux - declare fetchProducts
export const fetchProducts = () => async ( dispatch ) => {
   const res = await fetch('/api/products')  //19. product redux - casue the product need to convert with JSON.  define a data to convert to JSON and use await
   const data = await res.json();
   console.log( data )

   dispatch( {
       type : FETCH_PRODUCT,
       payload : data
   }) // 3. product redux - create reducer
}
// 2. filter redux - create filterproducts, filter product accept 2 paramater, which mean :All product from server and size yang akan kita filter by size
export const filterProducts = ( products, size ) => ( dispatch ) => { 
    // 3a.filter-redux -  kita perlu dispatch untuk mengubah ke redux store
    dispatch ({
        type : FILTER_PRODUCT_BY_SIZE,
        payload : { 
            // 3b. payload yang dikirim berupa object yang di isi dengan 2 nilai : 1. size yang dipilih, 2. product yang di filter by size <- index array jadi pake indexOf yang mana harus lebih besar dari 0
            size : size,
            item : 
                size === "" 
                    ? products 
                    : products.filter( ( x ) => x.sizes.indexOf( size ) >= 0 )
         }
    })
}

// 4. filter redux - create a sort product yang akan menerima 2 parameter : 1. product yang telah difilter, 2. product yang akan di sort by harga
export const sortProducts = ( filteredProducts, sort ) => ( dispatch ) => {
    //4b filter redux
    const sortedProducts = filteredProducts.slice()
    // 5. filter redux - create condition which if sort is '', it mean, it could be sort by ID
    if( sort === '' ) {
        sortedProducts.sort( (a, b) => (
            a._id > b._id 
            ? 1
            : -1
        ))
    } else{
        sortedProducts.sort(( a, b ) => ( 
            sort === 'lowest'
            ? a.price > b.price
                ? 1
                : -1  // 5a. this condition make sort low to high
            : a.price > b.price
                ? -1
                : 1   // 5b. this condition make sort high to low , go to productreducer
       ))
    }
    console.log(sortedProducts);
    dispatch ({
        type : SORT_PRODUCT_BY_PRICE,
        payload : {
            // 4a. pada payload ini akan mengambil 2 nilai, 1. harga yang di sort , dan product yang di sort
            sort : sort,
            item : sortedProducts //<- define a sorted product
        }
    })
}