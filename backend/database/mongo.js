const mongoose = require('mongoose')

const MONGODB_URL = 'mongodb://localhost/syamsuri_fashion'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
    useCreateIndex : true
}).catch( error => console.log( error.reason ) )

