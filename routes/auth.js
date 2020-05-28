const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');

// Sign-Up
router.post('/signup', (req,res) => {
    const {name,email,password} = req.body;

    if (!email || !password || !name) {
       return res.status(422).json({error: "Please complete all fields"})
    }

    User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser) {
                return res.status(422).json({error: "User already exists with that Email"})
            }

            bcrypt.hash(password,12)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        email,
                        password:hashedpassword
                    })

                    user.save()
                        .then(user => {
                            res.json({ message: "Registration Successful" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
});

// Sign-In
router.post('/signin', (req,res) => {
    const {email,password} = req.body

    if (!email || !password) {
        return res.status(422).json({error: "Please provide email and password"})
    }

    User.findOne({email:email})
        .then(savedUser => {
            if(!savedUser) {
                return res.status(422).json({error: "Invalid Email or Password"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch => {
                    if(doMatch) {
                        // res.json({message:"Successfully Logged In"})

                        const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                        const {_id,name,email,followers,following} = savedUser

                        res.json({token,user:{_id,name,email,followers,following}})
                    } else {
                        return res.status(422).json({error: "Invalid Email or Password"})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});

module.exports = router;