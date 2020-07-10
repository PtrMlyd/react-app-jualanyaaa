import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { listProducts } from '../../actions/productAction';
// import Rating from '../../components/rating'
import HBanner from '../../components/Banner';
import { listCat } from '../../actions/catAction';


function HomeScreen (props) {
    // reactRedux
    const productList = useSelector( state => state.productList );
    const {products, loading, error} = productList

    const catList = useSelector (state => state.catList)
    const {loading :loadingCat, cats, error: errorCat} = catList

    const dispatch = useDispatch();

    // fetchDate from server // sama dengan component did mount
    useEffect( () => {
        dispatch(listCat())
        return () => {
        }
    }, [])


    return <div className="content">
     
            <div className="jumbotron1-container">
                <img src="/images/nature/nature1.jpg" />
            </div>
            <div className='jb-cat'>
                BROWSE YOUR CHOICE
            </div>
            <div className="jumbotron2-container">
            {
                loadingCat ? <div> Loading . . . </div>
                :
                errorCat ? <div> {error}</div> :
                    <div className="jumbotron2-center">
                        <div className="jumbotron2-item" >
                            {
                                cats ?  cats.map( cat =>       
                                <div className="jumbotron2-content" key={cat._id}> 
                                    <img  src={cat.image} alt={cat.name}/>
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