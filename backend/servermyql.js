const express = require('express');
const data = require('./database/data')
const db = require('./config/mongo')
const bodyParser = require('body-parser')
const {PORT} = require('./config/string')

const app = express();

app.get('/', ( req, res) => {
    res.send('RESPON SUCCESS')
})

app.use( express.urlencoded({ extended : true } ) )
app.use( bodyParser.json() )

const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

const PAYPAL_CLIENT_ID = 'AYvCSNnbVLnuzwopaBrYjtGePl0WDhL_Aeo8nOG8vFEQ6cMtmi1QgefWvgaQsG53U8b2-QzdoTIsv6QI' || 'sb'

// get a api for paypal
app.get('/api/config/paypal', (req, res ) => {
    res.send(PAYPAL_CLIENT_ID)
})


// app.get('/api/products', ( req, res) => {
//     res.send(data.Products)
// })

// app.get(`/api/products/:id`, ( req, res) => {
//     const productId = req.params.id;

//     const product = data.Products.find( x => x.id === productId )
    
//     if(product)
//         res.send(product)
//     else
//         res.status(404).send( { msg: "PRODUCT NOT FOUND" } )
// })


app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
} )