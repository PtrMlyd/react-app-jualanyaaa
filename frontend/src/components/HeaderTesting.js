import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';
import Axios from 'axios';


function HeaderTest (props) {
    
    const [name, setName ] = useState('');
    const [image, setImage ] = useState('');    
    const [category, setCat] = useState('');    
    const [brand, setBrand] = useState('');    
    const [price, setPrice] = useState(0);    
    const [inStock, setInStock] = useState(0);    
    const [description, setDescription] = useState('');  

    const productList = useSelector( state => state.productList);
    const { loading, products, error } = productList

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(listProducts());
        
        return () => {

        };
    }, [] );

    const onSubmitClick = (e) => {
        e.preventDefault();
        dispatch(saveProduct( {
            name,
            image,
            category,
            brand ,
            price,
            inStock,
            description
        }))
    }

        return ( 
                <div className='form'>
                    <form onSubmit={onSubmitClick} >
                        <ul className='form-container'>
                            <li>
                                <p>
                
                                </p>
                            </li>
                            <li>

                            </li>
                            <li>
                                <label  htmlFor="name">
                                    Product Name
                                </label> 

                                <input type='text' name="name" value={name} id='name' onChange={ (e) => setName( e.target.value )} /> 
                            </li>
                            <li>
                                <label htmlFor="image">
                                    Product Image 
                                </label>
                                <input type='text' name="image" value={image} id='image' onChange={ (e) => setImage( e.target.value )} />
                                {/* 9. uploadImg - create handleupload trigger */}
                                <input type='file' name='upload'  />

                           </li>
                            
                            <li>
                                <label htmlFor="category">
                                    Product Categories 
                                </label>
                                {/* <input type='text' name="category" value={category} id='category' onChange={ (e) => setCat( e.target.value )} /> */}
                                <select>
                                </select>
                            </li>
                            <li>
                                <label htmlFor="">
                                    Product Brand 
                                </label>
                                <input type='text' name="brand" value={brand} id='brand' onChange={ (e) => setBrand( e.target.value )} />
                            </li>
                            <li>
                                <label htmlFor="">
                                    Product Price 
                                </label>
                                <input type='number' name="price" value={price} id='price' onChange={ (e) => setPrice( e.target.value )} />
                            </li>
                            <li>
                                <label htmlFor="">
                                    Product Stock 
                                </label>
                                <input type='number' name="inStock" value={inStock} id='inStock' onChange={ (e) => setInStock( e.target.value )} />
                            </li>
                            <li>
                                <label>
                                    Product Description 
                                </label>
                                <input type='textarea' name="description" value={description} id='description' onChange={ (e) => setDescription( e.target.value )} />
                            </li>
                            <li>
                            </li>
                            <li>
                                <button type='submit'  className='button primary'> Close</button>
                            </li>
                        </ul>
                    </form>
                </div>
            
        );
}
 
export default HeaderTest;