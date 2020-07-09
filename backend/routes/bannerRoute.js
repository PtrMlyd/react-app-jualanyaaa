const express = require('express')
const { bannerModel} = require('../models/detailsMod');


const router = express.Router();

router.get('/',  async (req, res ) => {
    try {
        const banners = await bannerModel.find({})

        res.send(banners)
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})

router.post('/addBanner',  async (req, res) => {
    
    const banner = new bannerModel({
        numb : req.body.numb,
        name: req.body.name,
        image : req.body.image,
        hash : 'banner'
    });
    const newBanner = await banner.save()
    
    if(newBanner){
        res.send({
            numb : newBanner.numb,
            name: newBanner.name,
            image : newBanner.image,
            hash : newBanner.hash
        })
    }else{
        res.status(401).send({ msg : 'INVALID Banner DATA'})
    }
})

module.exports = router