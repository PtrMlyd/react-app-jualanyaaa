const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    numb : { type : Number, required : true, default : 0},
    name : { type : String},
    image : { type: String},
    hash : {type : String, default: "banner"}
},{
    timestamps : false
})

const bannerModel = mongoose.model("banners", bannerSchema );

const brandSchema = new mongoose.Schema({
    name : { type : String, unique: true, required:true},
    image : { type: String, unique: true},
    hash : {type : String,}
},{
    timestamps : false
})

const brandModel = mongoose.model("brands", brandSchema );

const catSchema = new mongoose.Schema({

    name : { type : String, unique: true, required:true},
    hash : {type : String, default: "cat"}
},{
    timestamps : false
})

const catModel = mongoose.model("cats", catSchema );

module.exports = {
    bannerModel,
    brandModel,
    catModel

}