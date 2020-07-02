import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailProducts, saveProduceReview, saveProductReview } from '../actions/productAction';
import { Link } from 'react-router-dom';
import Rating from '../components/rating'
import { PRODUCT_REVIEW_SAVE_RESET } from '../reducer/constant/product';

function ProductScreen (props) {

    // memangggil user info dari redux
    const userSignin = useSelector( state => state.userSignin)
    const { userInfo } = userSignin

    // rating& comments
    const [ rating, setRating ] = useState(0)
    const [ comment, setComment ] = useState('')

    const productReviewSave = useSelector( state => state.productReviewSave)
    const {success: productSaveSuccess } = productReviewSave

    const [qty, setQty] = useState(1)

    const productDetails = useSelector( state => state.productDetails);
    const { product, loading, error } = productDetails
    const dispatch = useDispatch();
 
    useEffect( () => { 
        if(productSaveSuccess){
            setRating(0)
            setComment('')

            dispatch({ type : PRODUCT_REVIEW_SAVE_RESET})
        }
        dispatch(detailProducts(props.match.params.id));
        return () => {

        };
    }, [productSaveSuccess] )

    const onSubmit = (e) => {
        e.preventDefault()
        // dispatch actions
        dispatch(saveProductReview(props.match.params.id, {
            name : userInfo.username,
            rating : rating,
            comment : comment
        }))
    }

    const addToCart = () => {
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}` )
    }

    return loading ? <div>Loading . . .</div>:
       error ? <div>{error}</div> : 
    <div>
        <div className='details'>
            <div className='details-image'>
                <img src={ product.image } alt={product.name} />            
            </div>
            <div className='details-info'>
                <ul>
                    <li>
                        <b>{ product.name }</b>
                    </li>
                    <li>
                        <a href='#reviews'>
                            <Rating 
                                value={product.rating}
                                text={`( ${product.onReviews} reviews )`} 
                            />
                        </a>
                    </li>
                    <li>
                        { product.brand }
                    </li>
                    <li>
                        <b>IDR </b>{ product.price }
                    </li>
                    <li>
                        Description :
                        <div>
                        { product.description }
                        </div>
                    </li>
                    <div className="garis" />
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price : IDR <b>{product.price}</b>
                    </li>
                    <li>
                        Status : {product.inStock > 0 ? "In Stock" : " Out of Stock" }
                    </li>
                    <li>
                        Qty : <select value={qty} onChange={ (e) => {setQty(e.target.value)}}>
                            {[...Array(product.inStock).keys()].map( x => 
                                    <option key={ x + 1 } value={ x + 1 }> { x + 1} </option>)} </select>
                    </li>
                    <li>
                        {
                            product.inStock > 0 &&
                            <button className="button primary" onClick={addToCart}>
                                Add to Cart
                            </button>
                        }
                    </li>
                </ul>

            </div>
        </div>
        {/* user revies */}
        <div className='content-margined'>
            <h2> Reviews</h2>
            {
                !product.reviews.length && <div> There is no Review</div>
            }
            <ul className='review' id="reviews">
                {
                    product.reviews.map( review => (
                        <li key={ review._id}>
                            <div>
                                {review.name}
                            </div>
                            <div>
                                {<Rating value={review.rating}/>}
                            </div>
                            <div>
                                { review.createdAt.substring(0, 10) }
                            </div>
                            <div>
                                { review.comment }
                            </div>
                        </li>
                    ))
                }
                <li>
                    <h3>
                        Write a Customer Review
                    </h3>
                    {
                        userInfo ? <form onSubmit={onSubmit}>
                            <ul className='form-container'>
                                <li>
                                    <label> Rating</label>
                                    <select value={rating} onChange={ (e) => setRating(e.target.value)}>
                                        <option value='1'>Poor</option>
                                        <option value='2'>Fair</option>
                                        <option value='3'>Good</option>
                                        <option value='4'>Very Good</option>
                                        <option value='5'>Excelent</option>
                                    </select>
                                </li>
                                <li>
                                    <label> Comment</label>
                                    <textarea value={comment} onChange={(e) => setComment(e.target.value) } />
                                </li>
                                <li>
                                    <button type='submit' className='button primary submit'/>
                                </li>
                            </ul>
                        </form> 
                        :
                        <div>
                            Please <Link to='/signin/'>Sign In</Link> to write a review
                        </div>

                    }
                </li>
            </ul>
        </div>
    </div>
    
}

export default ProductScreen