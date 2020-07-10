import React from 'react';
import { useSelector } from 'react-redux';

function Productlist () {
    
    // rendering a list product
    const productList = useSelector( state => state.productList);
    const { loading, products, error } = productList

    //delete product
    const productDelete = useSelector( state => state.productDelete);
    const { loading :loadingDelete, success: successDelete, errror: errorDelete } = productDelete

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(
            listProducts(), 
        );
        return () => {

        };
    }, [ successDelete] );
    
// successSave
    const onDeleteClick = (product) => {
        dispatch(deleteProduct(product._id))
    }


    return <div>
        {
            loading ? <div> Loading . . . </div> :
            error ? <div> {error} </div> :
            <div className='product-list'>
                {
                    products.length === 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th className="tableid">ID</th>
                                <th>name</th>
                                <th>image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map( product => (
                                    <tr key= {product._id}>
                                        <td>{ product._id } </td>
                                        <td>{ product.name } </td>
                                        <td><img src={ product.image } alt={product.name} height='100px' /> </td>
                                        <td>{ product.price } </td>
                                        <td>{ product.category } </td>
                                        <td className="prodact">
                                            <button className="button secondary" onClick={ () => openModal(product)}>
                                                Edit
                                            </button>
                                            {
                                                loadingDelete ? <div>Loading Deletion . . .</div>
                                                :
                                                errorDelete ? <div>{errorDelete}</div>
                                                :
                                                <button className='button secondary' onClick={ () => onDeleteClick(product)}>
                                                    Delete
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )  )
                            }
                        </tbody>
                    </table>
                    :
                    <div> Product is Empty. </div>
                }
                
            </div>   
        }
    </div>
}

export default Productlist