const express = require('express');
const data = require('./database/data')
const db = require('./config/mongo')
const bodyParser = require('body-parser')
const {PORT, PAYPAL_CLIENT_ID} = require('./config/string')

const path = require('path')

const app = express();

app.get('/', ( req, res) => {
    res.send('RESPON SUCCESS')
})

app.use( express.urlencoded({ extended : true } ) )
app.use( bodyParser.json() )

const userRouter = require('./routes/userRoute')
const productRouter = require('./routes/productRoute')
const orderRouter = require('./routes/orderRoute')
const bannerRouter = require('./routes/bannerRoute')
const brandRouter = require('./routes/brandRoute')
const catRouter = require('./routes/catRoute')


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/banners', bannerRouter)
app.use('/api/brands', brandRouter)
app.use('/api/categories', catRouter)

// get a api for paypal
app.get('/api/config/paypal', (req, res ) => {
    res.send(PAYPAL_CLIENT_ID)
})

// 6. uploadImg - use the upload route
const uploadRouter = require('./routes/uploadRout')

app.use('/api/uploads', uploadRouter)
// 7. uploadImg - go to manage order screen

// 14. uploadImg - make file go public / bulid environment 
app.use('/products', express.static(path.join(__dirname, 'products' )))

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
} )