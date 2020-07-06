const express = require('express')
const { brandModel, bannerModel, catModel } = require('../models/detailsMod');


const router = express.Router();

router.get('/',  async (req, res ) => {
    try {
        res.send(
            "RESPOND SUCCESS"
        )
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})
router.get('/banner',  async (req, res ) => {
    try {
        const banners = await bannerModel.find({})

        res.send(banners)
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})
// router.get('/',  async (req, res ) => {
//     try {

//         const catss = await catModel.find({})

//         res.send(catss)
//     } catch (error) {
//         res.status(404).send({ message: 'Banner Not Found'})
//     }
// })

// banners
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
// brands
router.get('/brands',  async (req, res ) => {
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
// cats
router.get('/cats',  async (req, res ) => {
    try {
        const cats = await catModel.find({})

        res.send(cats)
    } catch (error) {
        res.status(404).send({ message: 'Banner Not Found'})
    }
})
router.post('/cats',  async (req, res) => {

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

module.exports = router