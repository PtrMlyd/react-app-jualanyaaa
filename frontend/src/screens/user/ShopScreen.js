import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productAction';
import Rating from '../../components/rating'
import Banner from '../../components/Banner';
import { set } from 'js-cookie';



function ShopScreen (props) {
    // reactRedux
    const productList = useSelector( state => state.productList );
    const {products, loading, error} = productList

    const category = props.match.params.id ? props.match.params.id:''
    const [searchKeyword, setKey] = useState('');

    const [sortOrder, setSort] = useState('')

    const dispatch = useDispatch();

    // fetchDate from server // sama dengan component did mount
    useEffect( () => {
        dispatch(listProducts(category))

        return () => {

        }
    }, [category])

    const onSubmitClick = (e) => {
        e.preventDefault()
        dispatch(listProducts(category, searchKeyword, sortOrder ))
    }
    
    const onSortClick = (e) => {
        setSort(e.target.value)
        dispatch(listProducts(category, searchKeyword, sortOrder ))
    }
    return <div className="contentshop">
        <div className='product-best'>
            <Banner />
        </div>
        <div className='rowa'>
            <div className="colside" >
                <div className="menu" >
                    <div className="label">
                        <label >PRODUCT FILTER</label>
                    </div>
                    <div className='categories'>
                        {products.map(item =>
                            <label key={item._id} onMouseEnter={ (e) => setKey(e.target.value)} onClick={onSubmitClick} value={item.category}> - {item.category}</label>
                                )}
                    </div>
                </div>
            </div>

            <div className="colmid">
                <div className='search-box'>
                    <div className="labels">
                        <label>
                        {
                            category ? category : "All Products"
                        }
                        </label>
                    </div>
                    
                    <div className="filter"> 
                        <input name='searchKeyword' onChange={ (e) => setKey( e.target.value )} />
                        <i className="fa fa-search"  onClick={onSubmitClick} />
                    </div>

                    <div className='sort'>
                        <select name='sortOrder' onChange={onSortClick} className='button'>
                            <option value=''>Sort By</option>
                            <option value='newest'>Newest</option>
                            <option value='lowest'>Lowest</option>
                            <option value='highest'>Highest</option>
                            <option value='popularity'>Popularity</option>
                        </select>
                    </div>
                </div>

                <div className="prodbox">
                    {
                    loading ? <div> Loading . . . </div>
                    :
                    error ? <div> {error}</div> :
                        <div >
                            <ul className="products">
                                {
                                    products ? products.map( product =>       
                                        <li key={product._id}>
                                            <div className="product"  >
                                                <Link to = {`/product/${ product._id }`}>
                                                    <img className='product-image' src={ product.image } alt={product.name} />
                                                </Link>
                                                <div className="product-name">
                                                    <Link to = {`/product/${ product._id }`}>{ product.name }</Link> 
                                                </div>
                                                <div className="product-cat">{ product.brand }</div>
                                                <div className="product-price"><b>IDR { product.price }</b></div>
                                                <div className="product-rating">
                                                    <Rating
                                                        value={product.rating}
                                                        text={`( ${product.onReviews} reviews )`} 
                                                    /> 
                                                </div>
                                            </div>
                                        </li>
                                    )
                                        :
                                    <div>
                                        Error
                                    </div> 
                                }
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>      
</div>
}


export default ShopScreen