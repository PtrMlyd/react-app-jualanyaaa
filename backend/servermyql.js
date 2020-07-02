const express = require('express');
const data = require('./database/data')
const db = require('./config/mongo')
const bodyParser = require('body-parser')
const {PORT} = require('./config/string')

const path = require('path')


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

// 6. uploadImg - use the upload route
const uploadRouter = require('./routes/uploadRout')

app.use('/api/uploads', uploadRouter)
// 7. uploadImg - go to manage order screen

// 14. uploadImg - make file go public / bulid environment 
app.use('/uploads', express.static(path.join(__dirname, '/../uploads' )))

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
} )