import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailProducts, saveProduceReview, saveProductReview } from '../../actions/productAction';
import { Link } from 'react-router-dom';
import Rating from '../../components/rating'
import { PRODUCT_REVIEW_SAVE_RESET } from '../../constant/product';

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
    <div className='prud'>
        
        <div className="details-container">
            <div className='details'>
                <div className='details-image'>
                    <div className='main-image'>
                        <img src={ product.image } alt={product.name} />
                    </div>
                    <div className='support-image'>
                        <img src={ product.image } alt={product.name} />
                        <img src={ product.image } alt={product.name} />
                        <img src={ product.image } alt={product.name} />
                    </div>     
                </div>
                <div className='details-info'>
                    <div className='details-info-des-name'>
                        <ul>
                           <li>
                                <h2>{ product.name }</h2>
                            </li> 
                            <li>
                                <a href='#reviews'>
                                    <Rating 
                                        value={product.rating}
                                        text={`( ${product.onReviews} reviews )`} 
                                    />
                                </a>
                                <hr />
                            </li>
                        </ul>
                    </div>
                    <div className='details-info-des-status'>
                        <ul className='colname'>
                            <li> BRAND </li>
                            <li> PRICE </li>
                            <li> STATUS </li>
                            <li> QTY : </li>
                        </ul>
                        <ul className='colstatus'>
                            <li> {product.brand} </li>
                            <li> {product.price} </li>
                            <li> {product.inStock > 0 ? "AVAILABLE" : "OUT OF STOCK" } </li>
                        {
                            product.InStock > 0 && <button onClick={addToCart} className="button primary" >Add to Cart</button>
                        }
                            <li>
                                {/* <select value={qty} onChange={ (e) => {setQty(e.target.value)}}>
                                    {[...Array(product.inStock).keys()].map( x => 
                                    <option key={ x + 1 } value={ x + 1 }> { x + 1} </option>)} </select> */}
                                <i className="fa fa-minus-square" />
                                <input className='butqty' />
                                <i className="fa fa-plus-square" />
                            </li>
                        </ul>
                    </div>
                    {
                        product.inStock > 0 &&
                        <button className="button primary" onClick={addToCart}>
                            Add to Cart
                        </button>
                    }
                    {/* 
                        <li>
                        Description :
                        <div>
                        { product.description }
                        </div>
                    </li> */}
                </div>
            </div>
            <div className='detail-com'>
                <div className='detail-com1'>
                    Description
                </div>
                <div className='detail-com2'>
                    Discussion
                </div>
                <div className='detail-com3'> 
                    Review
                </div>
            </div>
            <div className='detail-com-action'>
                {/* <div className='content-margined'> */}

                {
                        !product.reviews.length && <div> There is no Review</div>
                    }
                    <div className='review' id="reviews">
                        {
                            product.reviews.map( review => (
                                <div className='div' key={ review._id}>
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
                                </div>
                            ))
                        }
                        <div>
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
                        </div>
                    </div>    
            </div>
        </div>  
    </div>
    
}

export default ProductScreen