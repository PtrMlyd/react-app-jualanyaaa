const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name : { type : String, required : true },
    rating : { type: Number, default :  0 },
    comment : { type : String, required : true }
},{
    timestamps : true
})

const catSchema = new mongoose.Schema({
    name : { type : String, unique: true, required:true},
    image : { type: String, unique: true},
    hash : {type : String,}
},{
    timestamps : false
})

const brandSchema = new mongoose.Schema({
    name : { type : String, unique: true, required:true},
    image : { type: String, unique: true},
    hash : {type : String,}
},{
    timestamps : false
})

const productSchema = new mongoose.Schema({
    name : { type : String, required : true, unique: true},
    image : { type : String, required : true },
    price : { type : Number, required : true, default: 0 },
    inStock : { type : Number, required : true, default: 0 },
    description : { type : String },
})

const productsSchema = new mongoose.Schema({
    product : [productSchema],
    brands : [brandSchema],
    categories : [catSchema],
    rating : { type : Number, required : true, default: 0 },
    onReviews : { type : Number, required : true, default: 0 },
    reviews : [reviewSchema],
})

const productsModel = mongoose.model("products", productsSchema );

module.exports = productsModel