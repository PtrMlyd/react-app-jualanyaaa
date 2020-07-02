const jwt = require("jsonwebtoken")
const {JWT_SECRET_KEY} = require("./config/string")

module.exports = {
    getToken (user) {
        return jwt.sign( {
            _id : user._id,
            username : user.username,
            email : user.email,
            isAdmin : user.isAdmin,
        }, JWT_SECRET_KEY, {
            expiresIn : '29329389238'
        } )
    },
    isAuth (req, res, next) {
        const token = req.headers.authorization;
        
        if( token ){
            const onlyToken = token.slice(7, token.length);
            jwt.verify( onlyToken, JWT_SECRET_KEY, (err, decode) => {
                if( err ){
                    console.log(err)
                    return res.status(401).send( { msg: "Invalid Token" } )
                }
                req.user = decode;
                next();
                return
            })
        }else{
            return res.status(401).send( { msg: ' Token is not supplied' })
        }
    },
    isAdmin(req, res, next){
        console.log(req.user)
        if( req.user && req.user.isAdmin ) {
            return next();
        }
        return res.status(401).send( { msg: "Admin Token is not valid."})
    }
}
