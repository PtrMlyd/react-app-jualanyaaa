import React, { useEffect, useState } from 'react';
import { saveCat, listCat } from '../../actions/catAction';
import { useSelector, useDispatch } from 'react-redux';



function ManageCategory (props){

    const [name, setName] = useState('')
    const [nameExis, setNameExis] = useState('')
    const [image, setImage] = useState('')

    const catList = useSelector(state => state.catList)
    const {loading, error, cats, success} = catList

    // untuk menyimpand cats 
    const catSave = useSelector( state => state.catSave) 
    const { loading: loadingCatSave, success : catSaveSuccess, error: errorCatSave } = catSave

    const dispatch = useDispatch    ()

    
    useEffect( () => {
        
        dispatch(listCat());

        return () => {

        };
    }, [] );

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(saveCat(props.match.params.id,{ 
            name :  name
        }))
        if(catSaveSuccess){
            setName('')
            setImage('')

            props.history.push('/manageproduct')
        }
    }
    return <div>
        {
            loading ? <div>Loading . . .</div> 
            : 
            error ? <div>{error} </div>
            :
            // <Checkout step1 step2 step3 ></Checkout>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>
                                Select Your Product Category
                            </h2>
                        </li>
                        <li>
                            {
                                cats.length ?

                                <select  value={cats.name} onChange={ (e) => setNameExis(e.target.value)}>
                                    <option>select your cats</option>
                                    {
                                        cats.map( cat => <option key= {cat._id} value={name}>
                                            { cat.name }
                                        </option>)
                                    }
                                </select>
                            :
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
                            <button type="submit" className="button primary"> Continue </button>
                        </li>

                    </ul>
                </form>
            </div>
        }
    </div>
}

export default ManageCategory