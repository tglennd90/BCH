const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");
const User = mongoose.model("User");

// View another user's profile
router.get('/user/:id', requireLogin, (req,res) => {
    User.findOne({_id:req.params.id})
        .select("-password")
        .then(user => {
            Post.find({postedBy:req.params.id})
                .populate("postedBy","_id name")
                .exec((err,posts) => {
                    if (err) {
                        return res.status(422).json({error:err})
                    }
                    
                    res.json({user,posts})
                })
        })
        .catch(err=>{return res.status(404).json({error:"User not found"})})
});

// Follow
router.put('/follow', requireLogin, (req,res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push:{followers:req.user._id}    
    },{
        new:true
    },(err,result) => {
        if (err) {
            return res.status(422).json({error:err})
        }

        User.findByIdAndUpdate(req.user._id, {
            $push:{following:req.body.followId}
        },{
            new:true
        })
        .select("-password")
        .then(result => {
            res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        })
    })
});

// Unfollow
router.put('/unfollow', requireLogin, (req,res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull:{followers:req.user._id}    
    },{
        new:true
    },(err,result) => {
        if (err) {
            return res.status(422).json({error:err})
        }

        User.findByIdAndUpdate(req.user._id, {
            $pull:{following:req.body.followId}
        },{
            new:true
        })
        .select("-password")
        .then(result => {
            res.json(result)
        })
        .catch(err=>{
            return res.status(422).json({error:err})
        })
    })
});

// Update Profile Photo
router.put('/updatephoto', requireLogin, (req,res) => {
    User.findByIdAndUpdate(req.user._id, 
        {$set:{photo:req.body.photo}}, 
        {new: true},
        (err,result) => {
            if(err){
                return res.status(422).json({error:"Photo cannot post"})
            }

            res.json(result)
        })
});

module.exports = router;