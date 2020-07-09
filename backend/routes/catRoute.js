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
router.post('/categories',  async (req, res) => {

    const cat = new catModel({
        name: req.body.name,
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



module.exports = router;