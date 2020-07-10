const express = require('express')
const { catModel} = require('../models/detailsMod')

const router = express.Router();


// cats
router.get('/',  async (req, res ) => {
    try {
        const cats = await catModel.find({})

        res.send(cats)
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})
router.post('/',  async (req, res) => {

    const cat = new catModel({
        name: req.body.name,
        image : req.body.image,
        hash : 'cats'
    });
    const newCat = await cat.save()

    if(newCat){
        res.send({
            _id : newCat.id,
            name: newCat.name,
            image : newCat.image,
            hash : newCat.hash
        })
    }else{
        res.status(401).send({ msg : 'INVALID cat DATA'})
    }
})
router.put('/:id', async (req, res) => {
    const getCatId = req.params.id
    const cat = await catModel.findById(getCatId)
    
    if(cat){
        cat.name = req.body.name,
        cat.image = req.body.image

        const updateCat = await cat.save()

        if(updateCat){
            return res.status(201).send({ message: 'Cat Updated!', data : updateCat})
        }
    }
    return res.status(500).send({ msg : 'Error while Updating Cat.'})
})

router.delete('/:id', async (req, res) => {
    const getCatId = req.params.id  
    const cat = await catModel.findOne( { _id : getCatId})

    if(cat){
        await cat.remove()
        return res.send( { message : 'Cat Deleted !'})
    }
    return res.status(500).send({ msg : 'Error while deleting Cat.'})
    
})



module.exports = router;