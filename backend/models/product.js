const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name : { type : String, required : true },
    rating : { type: Number, default :  0 },
    comment : { type : String, required : true }
},{
    timestamps : true
})

const productSchema = new mongoose.Schema({
    name : { type : String, required : true, unique: true},
    image : { type : String, required : true },
    category : { type : String, required : true },
    brand : { type : String, required : true },
    price : { type : Number, required : true, default: 0 },
    inStock : { type : Number, required : true, default: 0 },
    description : { type : String },
    rating : { type : Number, required : true, default: 0 },
    onReviews : { type : Number, required : true, default: 0 },
    reviews : [reviewSchema],
})

const productModel = mongoose.model("products", productSchema );

module.exports = productModel