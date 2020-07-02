const Product = require('../models/product')
const express = require('express');
const { isAuth, isAdmin } = require('../util');
const router = express.Router();


router.get('/', async( req, res) =>{
    try {
        const category = req.query.category ? 
                        { category: req.query.category } : {}
        const searchKeyword =  req.query.searchKeyword ? 
                                {
                                    name: {
                                        $regex : req.query.searchKeyword,
                                        $options : "i"
                                    }
                                } : {}

        const sortOrder = req.query.sortOrder ?
                         req.query.sortOrder === 'lowest' 
                        ? { price : 1 } 
                        : { price : -1 } 
                        : { _id : -1 }
        const getAllProducts = await Product.find({...category, ...searchKeyword}).sort(sortOrder);
        res.send(getAllProducts)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('SERVER ERROR')
    }
})

router.get("/:id", async (req, res) => {
    
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found." });
    }
  });

router.post('/',isAuth,isAdmin, async (req, res) => {

    const product = new Product ({
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        brand : req.body.brand,
        price : req.body.price,
        inStock : req.body.inStock,
        description : req.body.description,
    })
    const newProduct = await product.save()

    if(newProduct){
        return res.status(201).send( { message : 'New Product Created !', data: newProduct})
    }
    return res.status(500).send({ msg : 'Error while Creating New Product.'})
})

router.put('/:id',isAuth,isAdmin, async (req, res) => {
    const getProductId = req.params.id  
    const product = await Product.findById( getProductId )

    if(product){
        product.name = req.body.name,
        product.image = req.body.image,
        product.category = req.body.category,
        product.brand = req.body.brand,
        product.price = req.body.price,
        product.inStock = req.body.inStock,
        product.description = req.body.description
        
        const updateProduct = await product.save()
        
        if(updateProduct){
            return res.status(200).send( { message : 'Product Updated !', data: updateProduct})
        }
    }
    return res.status(500).send({ msg : 'Error while Updating Product.'})
    
})

router.delete('/:id',isAuth,isAdmin, async (req, res) => {
    const getProductId = req.params.id  
    const product = await Product.findOne( { _id : getProductId})

    if(product){
        await product.remove()
        return res.send( { message : 'Product Deleted !'})
    }
    return res.status(500).send({ msg : 'Error while deleting Product.'})
    
})
router.post('/:id/reviews',isAuth, async (req, res) => {
    const getProductId = req.params.id  
    const product = await Product.findById( getProductId )
    
    console.log('masuk sebelum di save')
    if(product){
        const review = {
            name : req.body.name,
            rating : Number (req.body.rating),
            comment : req.body.comment
        }
        product.reviews.push(review)

        product.onReviews = product.reviews.length

        console.log( product.onReviews)

        product.rating = 
            (product.reviews.reduce( ( a, c ) => c.rating + a, 0 ))
             /
            product.reviews.length

        const updateProduct = await product.save()
        console.log('masuk setelah di save')
        //untuk menampilkan review terakhir
        res.status(201).send( { 
            message : ' Review Save Successfully.',
            data : updateProduct.reviews[ updateProduct.reviews.length - 1 ], 
        })
        console.log('masuk setelah di re.send')
    }else{
        return res.status(404).send({ msg : 'PRODUCT NOT FOUND.'})
    }
    
})
 module.exports = router