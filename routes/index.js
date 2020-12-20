const express = require('express');
const router = express.Router();

const User  = require('../models/User')

router.get('/', (req,  res) => {
    res.render('submit')
})

router.post('/submitForm', async (req, res) => {
    const { uName, email, message } = req.body

    const newUser = new User({
        uName, email, message
    })
    await newUser.save()

    res.status(200).render('success', {"user":newUser})
})

router.get('/viewMessages', (req, res) => {

    res.status(200).render('view-msgs')
})

router.get('/viewUser', async (req, res) => {
    const foundUser = await User.findOne({uName: req.query.uName})

    if(foundUser){
        res.status(200).render('msg', {'user': foundUser})
    }else{
        res.status(404).send({"Error": "User not found!"})
    }

})

module.exports = router