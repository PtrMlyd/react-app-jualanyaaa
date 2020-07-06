import React from 'react';

function Checkout (props) {
    return <div className="create-product-step">
        <div className={props.step1 ? 'active' : ''} > Add Product</div>
        <div className={props.step2 ? 'active' : ''} > Select Brand</div>
        <div className={props.step3 ? 'active' : ''} > Select Category</div>

    </div>
}

export default Checkout