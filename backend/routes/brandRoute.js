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

router.post('/',  async (req, res) => {
    
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

router.put('/:id', async (req, res) => {
    const getBrandId = req.params.id
    const brand = await brandModel.findById(getBrandId)
    
    if(brand){
        brand.name = req.body.name,
        brand.image = req.body.image

        const updateBrand = await brand.save()

        if(updateBrand){
            return res.status(201).send({ message: 'Brand Updated!', data : updateBrand})
        }
    }
    return res.status(500).send({ msg : 'Error while Updating Brand.'})
})

router.delete('/:id', async (req, res) => {
    const getBrandId = req.params.id  
    const brand = await brandModel.findOne( { _id : getBrandId})

    if(brand){
        await brand.remove()
        return res.send( { message : 'Brand Deleted !'})
    }
    return res.status(500).send({ msg : 'Error while deleting Brand.'})
    
})


module.exports = router;





// module.exports = router;