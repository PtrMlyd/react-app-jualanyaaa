const mongoose = require('mongoose')

// create of sub of order Schema : payment and shipping
const paymentSchema = {
    paymentMethod : { type : String , required : true }
}


const shippingSchema = {
    address : { type : String, required : true },
    city : { type : String, required: true },
    zipCode : { type : Number, required : true},
    country : { tyoe : String }
}

const orderItemSchema = new mongoose.Schema({
    name : { type: String, required : true },
    qty : { type : Number, required : true },
    image : { type : String, required : true },
    price : { type : Number, required : true },
    id : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'products',
        required : true
    }
})

const orderSchema = new mongoose.Schema({
// getting table refference
    user : { 
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'users',
        required : true
    },
    orderItems : [orderItemSchema],
    shipping : shippingSchema,
    payment : paymentSchema,
    itemsPrice :  { type : Number }, 
    shippingPrice : { type: Number }, 
    taxPrice : { type: Number }, 
    totalPrice:  { type : Number }, 
    isPaid : { type : Boolean, default: false },
    paidAt : { type : Date },
    isDelivered : { type : Boolean, default: false },
    deliveredAt : { type : Date }
},{
    timestamps : true
})

const orderModel = mongoose.model("orders", orderSchema );

module.exports = orderModel