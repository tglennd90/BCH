const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

// Create Post
router.post('/createpost', requireLogin, (req,res) => {
    const {title,body,pic} = req.body;

    if (!title || !body || !pic) {
        return res.status(422).json({error: "Please complete all fields"})
    }

    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })

    post.save()
        .then(result => {
            res.json({post:result})
        })
        .catch(err => {
            console.log(err)
        })
});

// All Posts
router.get('/allposts', (req,res) => {
    Post.find()
        .populate("postedBy","_id name")
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err)
        })
});

// All Posts of Current User
router.get('/myposts', requireLogin, (req,res) => {
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(myposts => {
            res.json({myposts})
        })
        .catch(err => {
            console.log(err)
        })
});

module.exports = router; 