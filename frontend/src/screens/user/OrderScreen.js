import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom"
import { detailsOrder, payOrder } from '../../actions/orderAction';
import PaypalBtn from '../../components/PaypalButton';

function OrderScreen (props){
    //after payment success , redirect to profile
    const orderPay = useSelector( state => state.orderPay)
    const { loading : loadingPay, success : successPay, error: errorPay} = orderPay
    
    const dispatch = useDispatch()
    
    useEffect( () => {
        if(successPay){
            props.history.push('/profile')
        }else{
            dispatch(detailsOrder(props.match.params.id))
        }
        return () => {
        }
    }, [successPay] )
    
    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }
 
    const orderDetails = useSelector(state => state.orderDetails)
    const {loading, order, error} = orderDetails
    // console.log(orderDetails)
    
    return loading ? <div>Loading . . . </div> :
           error ? <div>{error}</div> :
    <div>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Shipping
                    </h3>
                    <div>
                        {order.shipping.address}, {order.shipping.city},{order.shipping.zipcode}, {order.shipping.country}
                    </div>
                </div>
                <div>
                    <h3>
                        Payment
                    </h3>
                    <div>
                        Payment Method : {order.payment.paymentMethod}
                    </div>
                    <div>
                        {
                            order.isPaid ? " Paid at " + order.paidAt : " Not Paid."
                        }
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li>
                            <h3>
                                Shopping Cart
                            </h3>
                            <div>
                                Price
                            </div>
                        </li>
                        {
                            order.orderItems.length === 0 ?
                            <div>
                                Cart is Empty
                            </div>
                            :
                            order.orderItems.map( item => 
                                <li key={item.id}>
                                    <div className="cart-image">
                                        <img src={item.image} alt="product"/> 
                                    </div>
                                
                                    <div className ="cart-name">
                                        <div>
                                            <Link to={"/product/"+ item.id}  >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div>
                                            QTY : {item.qty}                                             
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        IDR {item.price}
                                    </div>
                                </li> 
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <h3>
                            Order Summary
                        </h3>
                    </li>
                    <li>
                        <div> Items</div>
                        <div> IDR {order.itemsPrice}</div>
                    </li>
                    <li>
                        <div> Shipping</div>
                        <div> IDR {order.shippingPrice}</div>
                    </li>
                    <li>
                        <div> Tax</div>
                        <div> IDR {order.taxPrice}</div>
                    </li>
                    <li>
                        <div> Order Total</div>
                        <div> IDR {order.totalPrice}</div>
                    </li>
                    <li className='placeorder-actions-payment'>
                        { loadingPay ? <div>Finishing Payment...</div> 
                        :
                        errorPay ? <div> {errorPay} </div>
                        :
                        !order.isPaid && 
                        <PaypalBtn 
                        amount={ order.totalPrice}
                        onSuccess = {handleSuccessPayment} />    
                    }
                        
                    </li>
                </ul>
            </div>
        </div>  
    </div>
    
}
 
export default OrderScreen;