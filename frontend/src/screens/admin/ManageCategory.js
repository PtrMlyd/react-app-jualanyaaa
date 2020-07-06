import React from 'react';



function ManageCategory (props){

    return(
        <div>
            <div>
                <h2>
                    Select Your Product Category
                </h2>
            </div>
            <div>
                <select>
                    <option>1</option>
                    <option>2</option>
                </select>
            </div>
            <div>
                <button>
                    Nwe Category
                </button>
                {
                    <input type="text" placeholder="Name of Category"></input>
                }
            </div>
            <div>
                <button>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ManageCategory