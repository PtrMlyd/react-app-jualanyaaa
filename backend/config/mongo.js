const mongoose = require('mongoose')
const { MONGODB_URL } = require('./string')


mongoose.connect(MONGODB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
    useCreateIndex : true
}).catch( error => console.log( error.reason ) )

