import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { listBrand, saveBrand} from '../../actions/brandAction'
import Checkout from '../../components/createProduct';

function ManageBrand (props){

    const [name, setName] = useState('')
    const [nameExis, setNameExis] = useState('')
    const [image, setImage] = useState('')

    const brandList = useSelector(state => state.brandList)
    const {loading, error, brands, success} = brandList

    // untuk menyimpand brand 
    const brandSave = useSelector( state => state.brandSave) 
    const { loading: loadingBrandSave, success : brandSaveSuccess, error: errorBrandSave } = brandSave

    const dispatch = useDispatch()

    
    useEffect( () => {
        
        dispatch(listBrand());

        return () => {

        };
    }, [] );

    const submitHandler = (e)=>{
        e.preventDefault();

        dispatch(saveBrand(props.match.params.id,{ 
            name :  name
        }))
        if(brandSaveSuccess){
            setName('')
            setImage('')

            props.history.push('/managecategory')
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
                                Select Your Brand
                            </h2>
                        </li>
                        <li>
                            {
                                brands.length ?

                                <select  value={brands.name} onChange={ (e) => setNameExis(e.target.value)}>
                                    <option>select your brand</option>
                                    {
                                        brands.map( brand => <option key= {brand._id} value={name}>
                                            { brand.name }
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

export default ManageBrand