import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/productAction';
import Rating from '../../components/rating'
import HBanner from '../../components/Banner';

function HomeScreen (props) {
    // reactRedux
    const productList = useSelector( state => state.productList );
    const {products, loading, error} = productList

    const category = props.match.params.id ? props.match.params.id:'';

    const dispatch = useDispatch();

    // fetchDate from server // sama dengan component did mount
    useEffect( () => {
        dispatch(listProducts(category))
        return () => {
        }
    }, [category])

    return <div className="content">
     
            <div className="jumbotron1-container">
                <img src="/images/nature/nature1.jpg" />

            </div>
            <div className='jb-cat'>
                BROWSE YOUR CHOICE
            </div>
            {
                loading ? <div> Loading . . . </div>
                :
                error ? <div> {error}</div> :
                    <div className="jumbotron2-container">
                        {
                            products ?  products.map( product =>       
                                <div className="jumbotron2-item" key={product._id} >
                                    <Link to = {`/product/${ product._id }`}>
                                        <h2>{product.category}</h2>
                                    </Link>
                                </div>
                                ) :
                            <div>
                                Error
                            </div> 
                        }
                    </div>
            }
            <div className='jb-cat'>
                <Link to='/shop'>
                    SHOP NOW
                </Link>
            </div>
            
            <div className="jumbotron3">
                    <HBanner/>
            </div>
    </div>
}

export default HomeScreen