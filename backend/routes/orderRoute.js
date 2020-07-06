const express = require('express');
const orderModel = require('../models/orderModel');
const { isAuth, isAdmin } = require('../util')

const router = express.Router();



router.get('/', isAuth,  async( req, res) =>{
    try {
        const orders = await orderModel.find({}).populate('user');
        res.send(orders)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('SERVER ERROR')
    }
})
router.get('/mine', isAuth,  async( req, res) =>{
    try {
        const getAllOrder = await orderModel.find({ user: req.user._id})
        res.send(getAllOrder)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('SERVER ERROR')
    }
})

router.get('/:id', isAuth, async ( req, res ) => {
    const order = await orderModel.findOne({ _id:req.params.id});

    if(order){
        res.send(order)
    }else{
        res.status(404).send( { msg : 'ORDER NOT FOUND' })
    }
})

router.post('/', isAuth, async (req, res) => {
    try {
        console.log('masuk sini')
        const newOrder = new orderModel({
            orderItems : req.body.orderItems,
            user : req.user._id,
            shipping : req.body.shipping,
            payment : req.body.payment,
            itemsPrice : req.body.itemsPrice,
            shippingPrice : req.body.shippingPrice,
            taxPrice : req.body.taxPrice,
            totalPrice : req.body.totalPrice,
        })

        const newOrderCreated = await newOrder.save()
        console.log(newOrderCreated)
        res.status(201).send({ message : 'New Order Created!', data : newOrderCreated })

    } catch (error) {
        console.log( "ini errornya adalah : " + error)
        res.send({ message : error.message})
    }
})

router.put('/:id/pay', isAuth, async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id)
        if(order){
            order.isPaid = true
            order.paidAt = Date.now()
            order.payment = {
                paymentMethod : 'paypal',
                paymentResult: {
                    payerID : req.body.payerID,
                    orderID : req.body.orderID,
                    paymentID : req.body.paymentID
                }
            }
            const OrderUpdated = await order.save()
            console.log(OrderUpdated)
            res.status(201).send({ message : 'New Order Updated!\n', order : OrderUpdated })
        }

    } catch (error) {
        console.log( "ini errornya adalah : " + error)
        res.send({ message : error.message})
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    const order = await orderModel.findOne({ _id: req.params.id });
    if (order) {
      const deletedOrder = await order.remove();
      res.send(deletedOrder);
    } else {
      res.status(404).send("Order Not Found.")
    }
  });

module.exports = router