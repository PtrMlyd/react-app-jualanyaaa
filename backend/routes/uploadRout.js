const express =require('express')
const multer =require('multer')
// const multer =require('')

// 2. uploadImg - create disk storage with Date.now().jpg as filename
const storage = multer.diskStorage({
    // param 1 - destination, param2 - file name
    destination( req, file, cb){
        cb(null, '../../frontend/public/images/products')
    }, filename( req, file, cb){
        cb( null, `${Date.now()}.jpg`)
    }
})

//3. uploadImg - set upload as multer storage
const upload = multer( { storage } )

// 4. uploadImg - create rute.post
const router = express.Router()

router.post( '/', upload.single( 'image' ), ( req, res ) => {
    res.send( `/${ req.file.path }` )
})

module.exports = router
//5. uploadImg - go to server.js
