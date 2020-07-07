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
            <div className="jumbotron2-container">
            {
                loading ? <div> Loading . . . </div>
                :
                error ? <div> {error}</div> :
                    <div className="jumbotron2-center">
                        <div className="jumbotron2-item" >
                            {
                                products ?  products.map( product =>       
                                <div className="jumbotron2-content"> 
                                    <img key={product._id} src={product.image} alt={product.name}/>
                                </div>
                                ) :
                                <div>
                                    Error
                                </div> 
                            }
                       
                        </div>
                    </div>
            }
            </div>
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