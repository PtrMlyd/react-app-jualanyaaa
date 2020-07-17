// 1. filter - create component file, goto app.js


import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return ( // // 3. filter - it sould be 3 component : result, sort, and sie.
            <div className="filter"> 
                <div className='filter-result'>
                    { this.props.count } Products
                </div>
                <div className="filter-sort">
                    {/* // 8.  filter - add a property of select: valu and onchange */}
                    Order <select value = { this.props.sort } onChange = { this.props.sortProduct} >
                        <option value=""> Latest </option>
                        <option value='lowest'> Lowest </option>
                        <option value='highest'> Highest </option>
                    </select>
                </div>
                <div className="filter-size">
                Filter Size <select value = { this.props.size } onChange = { this.props.filterProduct} > {/* back to the app.js to check the value */}
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
    }
}
