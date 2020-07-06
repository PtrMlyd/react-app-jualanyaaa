import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { saveProduct, listProducts, deleteProduct } from '../../actions/productAction';
import Axios from 'axios';
import { listBrand } from '../../actions/detailAction';


function ManageProductScreen (props) {

    // create a product
    const [name, setName ] = useState('');
    const [image, setImage ] = useState('');    
    const [category, setCat] = useState('');      
    const [price, setPrice] = useState(0);    
    const [inStock, setInStock] = useState(0);    
    const [description, setDescription] = useState('');   

    // 8. uploadImg - create state hooks for upload
    const [ uploading, setUploading] = useState(false)
    
    const productSave = useSelector( state => state.productSave);
    const { loading : loadingSave, success: successSave, error: errorSave }= productSave

    const productDelete = useSelector( state => state.productDelete);
    const { loading :loadingDelete, success: successDelete, errror: errorDelete } = productDelete
    
    // rendering a list product
    const productList = useSelector( state => state.productList);
    const { loading, products, error } = productList

    // move product lit into a modal
    const [ modalVisible, setModalVisible] = useState(false);
    const [ ID, setID ] = useState('');

   
    const dispatch = useDispatch();

    useEffect( () => {
        if(successSave){
            setModalVisible(false)
        }
        dispatch(
            listProducts(), 
        );
        
        return () => {

        };
    }, [successSave, successDelete] );

    const openModal = (product) => {
        setModalVisible(true)
        setID(product._id);
        setName(product.name);
        setImage(product.image);
        setCat(product.category);
        setPrice(product.price);
        setInStock(product.inStock);
        setDescription(product.description);
    }

    const onSubmitClick = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id:ID,
            name,
            image,
            category,
            price,
            inStock,
            description
        }))
    }

    const onDeleteClick = (product) => {
        dispatch(deleteProduct(product._id))
    }

    // 10. uploadImg - create uloadHandler Function
    // const onUploadFile = (e) => {
    //     const file = e. target.files[0]

    //     // 11. uploadImg - prepare file for uloading
    //     const bodyFormData = new FormData()
    //     bodyFormData.append('image', file)
    //     setUploading(true)
    //     // 12. ajax request axios.post file as multipart
    //     Axios.post('/api/uploads' , bodyFormData, {
    //         headers: {
    //             'Content-Type' : 'multipart/form-data'
    //         }
    //         // 13. set image and set uploading
    //     }).then( (response) => {
    //         setImage(response.data)
    //         setUploading(false)
    //     }).catch( err => {
    //         console.log(err)
    //         setUploading(false)
    //     })
    // }

    return(
        <div className="content content-margined">
            <div className="product-header">
                <h3>
                    Products
                </h3>
                <button className="button primary" onClick={ () => openModal({})}> Create Product</button>
            </div>
            {
                modalVisible && 

                <div className='form'>
                        <ul className='form-container'>
                            <li>
                                <p>
                                    {ID ? "Update Product" : "Create Product"}
                                </p>
                            </li>
                            <li>
                                {loadingSave && <div> Loading . . .</div>}
                                {errorSave && <div> { errorSave }</div>}
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
                                {/* 9. uploadImg - create handleupload trigger
                                <input type='file' name='upload' onChange={ onUploadFile} />
                                {
                                    // if upload true -> render div
                                    uploading && <div>Upload . . . </div>
                                } */}
                           </li>
                            
                            <li>
                                <label htmlFor="category">
                                    Product Categories 
                                </label>
                                <input type='text' name="category" value={category} id='category' onChange={ (e) => setCat( e.target.value )} />
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
                                <button className='button primary' onClick={onSubmitClick}>{ID ? "Update" : "Continue"} </button>
                            </li>
                            <li>
                                <button type='submit' onClick={ () => setModalVisible(false)} className='button primary'> Close</button>
                            </li>
                        </ul>
                </div>
            }


            <div className='product-list'>
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
                                        <button className='button secondary' onClick={ () => onDeleteClick(product)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )  )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    )

}

export default ManageProductScreen;


/*
import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <MaterialTable
      title="Editable Example"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}*/