const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "jancuk",
//     password: "jeleklu123",
//     database: "syamsuri_fashion"
// });

// db.connect( (err) => {
//     if(!err){
//         console.log(`Database is Connected`);
//     }else {
//         console.log(' Database Connection Failed')
//     }
// })

// menggunakan sequlize
const sequelize = require('sequelize')

const db = new sequelize ('syamsuri_fashion', 'jancuk', 'jeleklu123', {
    dialect : "mysql"
})
db.authenticate().then(() => 
    console.log('Database is Connected')
).catch((err) => 
console.log("Connectionn Failed")
)

module.exports = db