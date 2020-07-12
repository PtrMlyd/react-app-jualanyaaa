const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/syamsuri_fashion'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'apanyaoleh'
const PORT = process.env.PORT || 5001
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'AYvCSNnbVLnuzwopaBrYjtGePl0WDhL_Aeo8nOG8vFEQ6cMtmi1QgefWvgaQsG53U8b2-QzdoTIsv6QI'
const MAILGUN_APIKEY = process.env.MAILGUN_APIKEY || '124a159cbf479eb9a1009ec44644b8a8-87c34c41-db40f7a7'

module.exports = { JWT_SECRET_KEY, PORT, PAYPAL_CLIENT_ID, MONGODB_URL,MAILGUN_APIKEY }

