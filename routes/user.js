const { isNull } = require("lodash");

const express = require("express"),
    _ = require("lodash"),
    Blog = require('../models/blog'),
    app = express();


const aboutContent = "Welcome to Dailys contact page. We are the best in blog biz";
const contactContent = "Welcome to Dailys contact page. call us on +234 9099 876 8765 or you’re on your own";

const firstPost = new Blog({
            title: "New Day",
            post: "We did a great job!",
        })

app.get("/", function (req, res) {
    Blog.find({}, function (er, found) {
        //console.log(er)
        if (found == isNull) {
            //console.log(found.length)
            Blog.save(firstPost, function (er) {
                console.log("First post added successfully")
            })
            res.redirect("/");
        } else {
            res.render("indexes", { daily: found })
        }
    })
});

app.get("/about", function (req, res) {
    res.render("about", { about: aboutContent })
})

app.get("/contact", function (req, res) {
    res.render("contact", { contact: contactContent })
})

//////////////////////////////////Targeting Compose Route///////////////////////////////////////////////////////////////
app.route("/compose")
.get(function (req, res) {
    res.render("compose");
})
.post(function (req, res) {
    const { title, post } = req.body;
    
    let blog = new Blog({
        title,
        post
    })

    blog.save();
    res.redirect("/");
});

app.get("/posts/:postId", function (req, res) {
    const requestPostId = req.params.postId;

     Blog.findOne({_id: requestPostId}, function (er, pow) {
            res.render("post", {post: pow})
    })
})

////////////////////////////Targeting Edit Route With Its Id///////////////////////////////////////////////////////////////
app.route("/edit/:edit")//From <form action="/edit/<%-edit._id%>" method="post">
.get(function(req, res){
    const editPost = req.params.edit;
        Blog.findOne({_id: editPost}, function(er, post){
            res.render("edit", {edit: post})
        })
})
.post(function (req, res) {
    const PostEdit = req.params.edit;
    Blog.findOneAndUpdate(
        {_id: PostEdit},
        {$set: req.body},
        function(er){
            if(!er){
                res.redirect("/")
            } else {
                res.send(er)
            }
        })
})

app.get("/delete/:id", function(req, res){
    const deleteId = req.params.id;

    Blog.deleteOne({_id: deleteId}, function(er){
        if(!er){
            res.redirect("/");
        } else {
            res.send(er)
        }
    })
})

module.exports = app;