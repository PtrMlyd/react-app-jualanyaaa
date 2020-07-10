import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { listCat, saveCat, deleteCat} from '../../actions/catAction'
// import Checkout from '../../components/createProduct';

function ManageCat (props){

    const [name, setName] = useState('')
    const [nameExis, setNameExis] = useState('')
    const [image, setImage] = useState('')
    
    const catList = useSelector(state => state.catList)
    const {loading, error, cats, success} = catList
    
    // untuk menyimpand cat 
    const catSave = useSelector( state => state.catSave) 
    const { loading: loadingCatSave, success : catSaveSuccess, error: errorCatSave } = catSave
    
    //deleting cat
    const catDelete = useSelector( state => state.catDelete);
    const { loading :loadingDelete, success: successDelete, errror: errorDelete } = catDelete

    // move cat lit into a modal
    const [ modalVisible, setModalVisible] = useState(false);
    const [ ID, setID ] = useState('');

    const dispatch = useDispatch()

    
    useEffect( () => {
        if(catSaveSuccess){
            setModalVisible(false)
        }
        dispatch(listCat());

        return () => {

        };
    }, [catSaveSuccess, successDelete] );

    const openModal = (cat) => {
        setModalVisible(true)
        setID(cat._id);
        setName(cat.name);
        setImage(cat.image);
    }

    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(saveCat({ 
            _id:ID,
            name ,
            image
        }))
    }

    const onDeleteClick = (cat) => {
        dispatch(deleteCat(cat._id))
    }

    return <div className="content content-margined">
        <div className="cat-header">
            <h3>
                Cats
            </h3>
            <button className="button primary" onClick={ () => openModal({})}> New Cat</button>
        </div>
        <hr/>
        {   
             modalVisible && 
            // <Checkout step1 step2 step3 ></Checkout>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        {
                            loadingCatSave && <div>Loading . . .</div> 
                        }
                        <li>
                            <h2>
                                Select Your Cat
                            </h2>
                        </li>
                        <li>
                            {
                            //     cats.length ?

                            //     <select  value={cats.name} onChange={ (e) => setNameExis(e.target.value)}>
                            //         <option>select your cat</option>
                            //         {
                            //             cats.map( cat => <option key= {cat._id} value={name}>
                            //                 { cat.name }
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
                            errorCatSave ? <div style={{color:'red'}}>{errorCatSave}</div>
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
                cats.length ? 
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
                            cats.map(cat => (
                                <tr key= {cat._id}>
                                    <td>{ cat._id } </td>
                                    <td>{ cat.name } </td>
                                    <td><img src={ cat.image } alt={cat.image} height='100px' /> </td>
                                    <td className="prodact">
                                        <button className="button secondary" onClick={ () => openModal(cat)}>
                                            Edit
                                        </button>
                                        {
                                            loadingDelete ? <div>Loading Deletion . . .</div>
                                            :
                                            errorDelete ? <div>{errorDelete}</div>
                                            :
                                            <button className='button secondary' onClick={ () => onDeleteClick(cat)} >
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
                <div> Cat is Empty </div>
            }
        </div>
          
    </div>
    
}

export default ManageCat