import React from 'react';

export default function Rating(props) {

    // firs, check value at this component with props.value
    return !props.value ? ( 
    <div></div> ) : (
        <div className="rating">
            <span>
                <i className={
                    props.value >= 1 
                    ? 'fas fa-star' 
                    : 
                    props.value >= 0.5 
                    ? 'fa fa-star-half-alt' 
                    : 'fas fa-star' 
                }> 
                </i>
            </span>
            
            <span>
                <i className={
                    props.value >= 2 
                    ? 'fas fa-star' 
                    : 
                    props.value >= 1.5 
                    ? 'fa fa-star-half-alt' 
                    : 'fas fa-star' 
                }>

                </i>
            </span>
            <span>
                <i className={
                    props.value >= 3 
                    ? 'fas fa-star' 
                    : 
                    props.value >= 2.5 
                    ? 'fa fa-star-half-alt' 
                    : 'fas fa-star' 
                }>
                    
                </i>
            </span>

            <span>
                <i className={
                    props.value >= 4 
                    ? 'fas fa-star' 
                    : 
                    props.value >= 3.5 
                    ? 'fa fa-star-half-alt' 
                    : 'fas fa-star' 
                }>

                </i>
            </span>
            <span>
                <i className={
                    props.value >= 5 
                    ? 'fas fa-star' 
                    : 
                    props.value >= 4.5 
                    ? 'fa fa-star-half-alt' 
                    : 'fas fa-star' 
                }>

                </i>
            </span>
            <span>
                {
                    props.text ? props.text : ''
                }
            </span>
        </div>
    ) 
}