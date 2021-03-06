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

// Delete Post
router.delete('/deletepost/:postId', requireLogin, (req,res) => {
    Post.findOne({_id:req.params.postId})
        .populate("postedBy","_id")
        .exec((err,post) => {
            if (err || !post) {
                return res.status(422).json({error:err})
            }

            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    })
                    .catch(err=>{console.log(err)})
            }
        })
});

// All Posts
router.get('/allposts', requireLogin, (req,res) => {
    Post.find()
        .populate("postedBy","_id name")
        .populate("comments.postedBy","_id name")
        .sort('-createdAt')
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err)
        })
});

// Get Posts of users that you Follow
router.get('/getfollowedposts', requireLogin, (req,res) => {
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .sort('-createdAt')
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{console.log(err)})
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

// Like Post
router.put('/like', requireLogin, (req,res) => {

    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    }, {
        new:true
    })
    .exec((err,result) => {
        if (err) {
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })

});

// Un-Like Post
router.put('/unlike', requireLogin, (req,res) => {

    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    }, {
        new: true
    })
    .exec((err,result) => {
        if (err) {
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })

});

// Comment on Post
router.put('/comment', requireLogin, (req,res) => {

    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push:{comments:comment}
    }, {
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result) => {
        if (err) {
            return res.status(422).json({error:err})
        } else {
            res.json(result)
        }
    })

});

// Delete Comment
// router.delete('/deletecomment/:commentId', requireLogin, (req,res) => {
//     Post.findOne({_id:req.params.commentId})
//         .populate("postedBy","_id")
//         .exec((err,comment) => {
//             if (err || !comment) {
//                 return res.status(422).json({error:err})
//             }

//             if (post.postedBy._id.toString() === req.user._id.toString()) {
//                 post.remove()
//                     .then(result => {
//                         res.json(result)
//                     })
//                     .catch(err=>{console.log(err)})
//             }
//         })
// });

module.exports = router; 