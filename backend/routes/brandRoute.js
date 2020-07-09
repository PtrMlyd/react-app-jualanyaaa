const express = require('express')
const { brandModel} = require('../models/detailsMod')

const router = express.Router();

// brands
router.get('/',  async (req, res ) => {
    try {
        const brand = await brandModel.find({})

        res.send(brand)
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})

router.post('/brands',  async (req, res) => {
    
    const brand = new brandModel({
        name: req.body.name,
        image : req.body.image,
        hash : "brand"
    });
    const newBrand = await brand.save()
    
    if(newBrand){
        res.send({
            _id : newBrand.id,
            name: newBrand.name,
            image : newBrand.image,
            hash : newBrand.hash
        })
    }else{
        res.status(401).send({ msg : 'INVALID BRAND DATA'})
    }
})


module.exports = router;
// const express = require('express')
// const { catModel} = require('../models/detailsMod')

// const router = express.Router();




// module.exports = router;