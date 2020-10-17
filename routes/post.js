const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Post = mongoose.model("Post");
const requireLogin = require('../middleware/requireLogin')

router.get('/posts',(req,res)=>{

    Post.find().populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/createPost',requireLogin,(req,res)=>{
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"Please add title and body both."})
    }
    req.user.password = undefined
    const post = new Post({
        title,
         body, 
         postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err);
    })
    
})


module.exports = router