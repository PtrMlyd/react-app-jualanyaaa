const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/syamsuri_fashion'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'apanyaoleh'
const PORT = process.env.PORT || 5001
const PAYPAL_CLIENT_ID = process.env || 'sb'

module.exports = { JWT_SECRET_KEY, PORT, PAYPAL_CLIENT_ID, MONGODB_URL }

