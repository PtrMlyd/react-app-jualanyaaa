
const User = require('../models/userModel')
const express = require('express');
const { getToken, isAuth } = require('../util');
const router = express.Router();

// memuat admin
router.get('/createAdmin', async (req, res) => {
    try {
        const user = new User({
            username : 'zdipo',
            email : 'adipo@admin.com',
            password : 'admin',
            isAdmin : true
        })
        const newUser = await user.save();
        res.send(newUser)
        
    } catch (error) {
        console.log(error.message)
        res.status(401).send({ msg : 'INVALID email OR password.'})
    }
 })

router.get('/', async( req, res) =>{
    try {
        const getAllUser = await User.find();
        res.send(getAllUser)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('SERVER ERROR')
    }
})

router.post('/signin',  async (req, res) => {

    const loginUser = await User. findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(loginUser){
        res.send({
            _id: loginUser.id,
            username : loginUser.username,
            email : loginUser.email,
            isAdmin :loginUser.isAdmin,
            token : getToken(loginUser)
        })
    }else{
        res.status(401).send({ msg : 'INVALID email OR password.'})
    }
})

router.post('/register',  async (req, res) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      const newUser = await user.save();

    if(newUser){
        res.send({
            _id: newUser.id,
            username : newUser.username,
            email : newUser.email,
            isAdmin :newUser.isAdmin,
            token : getToken(newUser)
        })
    } else{
        res.status(401).send({ msg : 'INVALID USER DATA.'})
    }
})
// user update
router.put('/:id', isAuth,  async (req, res) => {
    
    const userId = req.params.id
    const user = await User.findById(userId);

    if(user){
        user.username = req.body.username || user.username
        user.email =  req.body.email || user.email
        user.password = req.body.password || user.password
       
        const update = await user.save()

        res.send({ 
            _id: update.id,
            username : update.username,
            email : update.email,
            isAdmin :update.isAdmin,
            token : getToken(update)
        })

    } else{
        res.status(404).send({ msg : 'USER NOT FOUND.'})
    }
})

 module.exports = router