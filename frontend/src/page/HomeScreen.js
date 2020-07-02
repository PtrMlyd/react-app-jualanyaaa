import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Rating from '../components/rating'

function HomeScreen (props) {
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

    return <div className="content">
        {
            category && 
            <h2>{category}</h2>
        }

        <ul className="filter">
            <li>
                <form onSubmit={onSubmitClick}> 
                    <input name='searchKeyword' onChange={ (e) => setKey( e.target.value )} />
                    <button type='submit'> Search </button>
                </form>
            </li>
            
            <li>
                <select name='sortOrder' onChange={onSortClick}>
                    <option value=''>Sort By</option>
                    <option value='newest'>Newest</option>
                    <option value='lowest'>Lowest</option>
                    <option value='highest'>Highest</option>
                    <option value='popularity'>Popularity</option>
                </select>
            </li>
        </ul>
        {
            loading ? <div> Loading . . . </div>
            :
            error ? <div> {error}</div> :
            <div>
                <ul className="products">
                    {
                        products ? products.map( product =>       
                            <li key={product._id}>
                                <div className="product"  >
                                    <Link to = {`/product/${ product._id }`}>
                                        <img className='product-image' src={ product.image } alt={product.name} />
                                    </Link>
                                    <div className="product-name">
                                        <Link to = {`/product/${ product.id }`}>{ product.name }</Link> 
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
                            ) :
                        <div>
                            Error
                        </div> 
                    }
                </ul>
            </div>
        }
    </div>
}

export default HomeScreen