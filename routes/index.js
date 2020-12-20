const express = require('express');
const router = express.Router();

const User  = require('../models/User')

router.get('/', (req,  res) => {
    res.render('landing')
})

router.post('/submitForm', async (req, res) => {
    const { uName, email, message } = req.body

    const newUser = new User({
        uName, email, message
    })

    console.log(newUser)

    await newUser.save()

    res.status(200).send(newUser)
})

router.get('/allUsers', async (req, res) => {
    const allUsers = await User.find()

    res.status(200).send(allUsers)
})

module.exports = router