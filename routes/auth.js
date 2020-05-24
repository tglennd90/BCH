const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");

router.get('/', (req,res) => {
    res.send("hello from /routes/auth")
});

router.post('/signup', (req,res) => {
    const {name,email,password} = req.body;

    if (!email || !password || !name) {
       return res.status(422).json({Error: "Please complete all fields"})
    }

    User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser) {
                return res.status(422).json({Error: "User already exists with that Email"})
            }

            const user = new User({
                name,
                email,
                password
            })

            user.save()
                .then(user => {
                    res.json({message: "Saved Successfully"})
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router;