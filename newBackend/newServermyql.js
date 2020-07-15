// 1. backend - import to use them
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

// 2. backend - call express as ap
const app = express();

// 3. backend - call body-parser
app.use( express.urlencoded({ extended : true } ) )
app.use( bodyParser.json() )

// 4. backend - initialize the database connection
const MONGODB_URL = 'mongodb://localhost/new_shop'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
    useCreateIndex : true
}).catch( error => console.log( error.reason ) )

app.get('/', ( req, res) => {
    res.send('RESPON SUCCESS')
})

// 6. backend - create a product model
const Product = mongoose.model(
    'newProducts', 
    new mongoose.Schema({
        // _id : { type : shortid.generate }, // change to the
        _id : { type : String, default : shortid.generate }, // let's run the postman for the test
        title : String,
        description : String, 
        image : String,
        price : Number,
        sizes : [String], 
    })
    )
    
// 5. backend - create a product endpoint
app.get('/api/products', async ( req, res ) => {
    /*7. backend - get a product from api/products,
    first, call the product and use .<table>.find({})*/
    const products = await Product.find({}) //<- find is promise, jadi perlu async await syntaks
    res.send(products) //8. backend -  pass the product to the client, and which mean product must be exists, jadi kita buat end point untuk tambah product
})

//9. backend - create end point to post the product
app.post('/api/products', async ( req, res ) => {
    const newProduct = new Product(req.body) 
    const saveProduct = await newProduct.save()
    res.send( 'New Product Created : ' + saveProduct)
})

//11. backend - delete product
app.delete('/api/products/:id', async (req, res) => {
    // 12. define deleted product
    const deletedProduct = await Product.findByIdAndDelete( req.params.id)
    res.send('Deleted Product : ' + deletedProduct) // now run nodemon, and if error of invalid schema, go to schema
})

// 1. createorder - create model
const Order = mongoose.model (
    'order', 
    new mongoose.Schema({
        _id : {
            type : String,
            default : shortid.generate
        },
        email : String,
        name : String,
        address : String,
        total : Number,
        cartItems : [{
            _id : String,
            title : String,
            price : Number,
            count : Number
        }]
    },
    {
        timestamps : true
    })
)

// 2. createorder - create end point to post 
app.post('/api/orders', async ( req, res ) => {
    if ( 
        !req.body.name ||
        !req.body.email ||
        !req.body.address ||
        !req.body.total ||
        !req.body.cartItems
    ) {
        return res.send({ message : "Data is Required!" })
    }
    const order = await Order(req.body).save()
    res.send(order)
}) //2 a. createorder - go to the client view to create type

//10. backend - lunch the server and create a default PORT using .env file
const PORT = process.env.PORT || 5003

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
} )
