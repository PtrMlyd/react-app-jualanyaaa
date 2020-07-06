import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteOrder, listOrders } from '../../actions/orderAction';


function ManageOrderScreen (props) {
    // rendering a list order
    const orderList = useSelector( state => state.orderList);
    const { loading, orders, error } = orderList
    
    const orderDelete = useSelector( state => state.orderDelete);
    const { loading : loadingDelete, success: successDelete, error: errorDelete } = orderDelete

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(listOrders());
        
        return () => {

        };
    }, [ successDelete] );



    const onDeleteClick = (order) => {
        dispatch(deleteOrder(order._id))
    }

    return loading ? <div>Loading . . .</div> :
        <div className="content content-margined">
            <div className="order-header">
                <h3>
                    Orders
                </h3>
            </div>
        
            <div className='order-list'>
                <table>
                    <thead>
                        <tr>
                            <th className="tableid">ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>USER </th>
                            <th>PAID</th>
                            <th>PAID AT</th>
                            <th>DELIVERED</th>
                            <th>DELIVERED AT</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map( order => (
                                <tr key= {order._id}>
                                    <td>{ order._id } </td>
                                    <td>{ order.createdAt } </td>
                                    <td>{ order.totalPrice}</td>
                                    <td>{ order.user.username } </td>
                                    <td>{ order.isPaid.toString() } </td>
                                    <td>{ order.paidAt } </td>
                                    <td>{ order.isDelivered.toString() } </td>
                                    <td>{ order.deliveredAt } </td>
                                    <td className="prodact">
                                        <Link to={'/order/' + order._id} className='button secondary'>Details</Link>
                                        <button type='button' className='button secondary ' onClick={ () => onDeleteClick(order)}>
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

}

export default ManageOrderScreen;

