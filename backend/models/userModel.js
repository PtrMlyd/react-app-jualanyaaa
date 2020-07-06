const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : { type : String, required : true, unique: true},
    email : { type : String, required : true  },
    password : { type : String, required : true },
    isAdmin : { type : Boolean, required : true, default: false }
})

const userModel = mongoose.model("users", userSchema );

module.exports = userModel

// const db = require('../config/mysql')
// const {Sequelize, DataTypes} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory')

// const User = db.define(
//     "users", 
//     {
//         username : { type : Sequelize.STRING,  },
//         email : { type : Sequelize.STRING, unique:'compositeIndex', },
//         password : { type : Sequelize.STRING,  },
//         isAdmin : { type : Sequelize.BOOLEAN,  },
//     },{
//         createdAt : false,
//         updatedAt : false ,
//         freezeTableName : true
//     }
// )

// module.exports = User
// 

// db.connect( function (err) {

//     var sql =  `
//         CREATE TABLE users(
//             id AUTO_INCREMENT PRIMARY KEY NOT NULL,
//             username VARCHAR(50), 
//             email VARCHAR (50),
//             password VARCHAR (50),
//             isAdmin TINYTINT
//         )`
//     db.query(sql, function (req,res) {
//         if ( err ) throw err
//         console.log('TABLE CREATED! ')
//     }  )
// })