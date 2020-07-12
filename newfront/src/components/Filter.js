// 1. filter - create component file, goto app.js


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProduct } from '../redux/actions/productAction'

class Filter extends Component {
    render() {
        return ( 

                //8.filter-redux - create conditional rendering to check the filter product
                !this.props.filteredProduct ? (
                    <div> Loading ...</div>
                ) : ( //9.filter-redux - update the count to the filtered product
                    <div className="filter"> 
                     {/* 3. filter - it sould be 3 component : result, sort, and price. */}
                        <div className='filter-result'>
                            { this.props.filteredProduct.length } Products {/*10. filter-redux - go to  the app,js to delete filter function and sort, and then go to produc reducer */}
                        </div>
                        <div className="filter-sort">
                            {/* // 8.  filter - add a property of select: valu and onchange */}
                            Order   
                            <select 
                                value = { this.props.sort } 
                                onChange = { ( e ) => 
                                    this.props.sortProduct( this.props.filteredProduct, e.target.value )
                                } 
                            > {/* 13. filter redux - fit the current product,and the same patter and filter product */}
                                <option value=""> Latest </option>
                                <option value='lowest'> Lowest </option>
                                <option value='highest'> Highest </option>
                            </select>
                        </div>
                        <div className="filter-size">
                            Filter Size 
                            <select 
                                value = { this.props.size } 
                                onChange = { ( e ) => 
                                    this.props.filterProduct( this.props.products, e.target.value )
                                } 
                            > {/* back to the app.js to check the value */}
                                <option value=''> All </option>
                                <option value='XS'> XS </option>
                                <option value='S'> S </option>
                                <option value='M'> M </option>
                                <option value='L'> L </option>
                                <option value='XL'> XL </option>
                                <option value='XXL'> XXL </option>
                            </select>
                        </div> 
                    </div>
                    // 4. filter - implement the function of filter. -> go to app.js
                )

        )
    }
}

// 7. filter-redux - use connect which use 2 param: 1. convert state to props, 2. action dari productAction
export default connect ( ( state ) => ( {
    size : state.products.sizes,
    sort : state.products.sort,
    products : state.products.item,
    filteredProduct : state.products.filteredItem
}),{
    filterProducts,
    sortProduct
}) (Filter) // show loading if no filtered product
