import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { listBrand, saveBrand, deleteBrand} from '../../actions/brandAction'
// import Checkout from '../../components/createProduct';

function ManageBrand (props){

    const [name, setName] = useState('')
    const [nameExis, setNameExis] = useState('')
    const [image, setImage] = useState('')
    
    const brandList = useSelector(state => state.brandList)
    const {loading, error, brands, success} = brandList
    
    // untuk menyimpand brand 
    const brandSave = useSelector( state => state.brandSave) 
    const { loading: loadingBrandSave, success : brandSaveSuccess, error: errorBrandSave } = brandSave
    
    //deleting brand
    const brandDelete = useSelector( state => state.brandDelete);
    const { loading :loadingDelete, success: successDelete, errror: errorDelete } = brandDelete

    // move brand lit into a modal
    const [ modalVisible, setModalVisible] = useState(false);
    const [ ID, setID ] = useState('');

    const dispatch = useDispatch()

    
    useEffect( () => {
        if(brandSaveSuccess){
            setModalVisible(false)
        }
        dispatch(listBrand());

        return () => {

        };
    }, [brandSaveSuccess, successDelete] );

    const openModal = (brand) => {
        setModalVisible(true)
        setID(brand._id);
        setName(brand.name);
        setImage(brand.image);
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveBrand({ 
            _id:ID,
            name ,
            image
        }))
    }

    const onDeleteClick = (brand) => {
        dispatch(deleteBrand(brand._id))
    }

    return <div className="content content-margined">
        <div className="brand-header">
            <h3>
                Brands
            </h3>
            <button className="button primary" onClick={ () => openModal({})}> New Brand</button>
        </div>
        <hr/>
        {   
             modalVisible && 
            // <Checkout step1 step2 step3 ></Checkout>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        {
                            loadingBrandSave && <div>Loading . . .</div> 
                        }
                        <li>
                            <h2>
                                Select Your Brand
                            </h2>
                        </li>
                        <li>
                            {
                            //     brands.length ?

                            //     <select  value={brands.name} onChange={ (e) => setNameExis(e.target.value)}>
                            //         <option>select your brand</option>
                            //         {
                            //             brands.map( brand => <option key= {brand._id} value={name}>
                            //                 { brand.name }
                            //             </option>)
                            //         }
                            //     </select>
                            // :
                                <div>
                                    <li>
                                    <label htmlFor="Name">
                                        Name
                                    </label>
                                    <input type="text" name="name" id="name" value={name} onChange={ (e)=> setName(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="image">
                                        image
                                    </label>
                                    <input type="text" name="image" id="image" value={image} onChange={ (e)=> setImage(e.target.value)} />
                                </li>   
                            </div>
                        }  
                        </li>
                        <li>
                            <button className='button primary' onClick={submitHandler}>{ID ? "Update" : "Continue"}</button>
                        </li>
                        {
                            errorBrandSave ? <div style={{color:'red'}}>{errorBrandSave}</div>
                            :
                            <li>
                                <button type="submit" className="button primary"  onClick={ () => setModalVisible(false)} > Close </button>
                            </li>
                        }

                    </ul>
                </form>
            </div>
        }
        <div>
            {
                brands.length ? 
                <table>
                    <thead>
                        <tr>
                            <th className="tableid">ID</th>
                            <th>name</th>
                            <th>image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.map(brand => (
                                <tr key= {brand._id}>
                                    <td>{ brand._id } </td>
                                    <td>{ brand.name } </td>
                                    <td><img src={ brand.image } alt={brand.name} height='100px' /> </td>
                                    <td className="prodact">
                                        <button className="button secondary" onClick={ () => openModal(brand)}>
                                            Edit
                                        </button>
                                        {
                                            loadingDelete ? <div>Loading Deletion . . .</div>
                                            :
                                            errorDelete ? <div>{errorDelete}</div>
                                            :
                                            <button className='button secondary' onClick={ () => onDeleteClick(brand)} >
                                                Delete {/**/}
                                            </button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                :
                <div> Brand is Empty </div>
            }
        </div>
          
    </div>
    
}

export default ManageBrand