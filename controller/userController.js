import Blog from '../models/blog.js'
import lodash from "lodash"
const { isNull } = lodash;
import _ from "lodash";

const aboutContent = "Welcome to Dailys Today. giving you insite into the best in blog business daily";
const contactContent = "Welcome to Dailys Today call us on +234 9099 876 8765 or you’re on your own";

export const getAllPost = async (req, res) => {
    const firstPost = new Blog({
        title: "New Day",
        post: "We did a great job!",
    })
    try {
        const page = req.query.page || 0;
        const postperpage = 10;
        ///({name: {$regex: this.search, $options:"i"}})
        const found = await Blog.find({})
            .sort({ title: 1 })
            .skip(page * postperpage)
            .limit(postperpage)
        // if (isNull(found)) {
        if (!found) {
            const newPost = await Blog.create({firstPost})
            console.log("First post added successfully")
            res.redirect("/", {daily: newPost});
        }
        if(found){
            res.render("indexes", { daily: found })
        }
    } catch (error) {
        throw error
    }
}
export const aboutPage = (req, res) => {
    res.render("about", { about: aboutContent })
}
export const contactPage = (req, res) => {
    res.render("contact", { contact: contactContent })
}
export const getNewPost = (req, res) => {
    res.render("compose");
}
export const createNewPost = async (req, res) => {
    try {
        const { title, post } = req.body;
        newpost = await Blog.create(
            {title, post}
        )
        res.redirect("/");
    } catch (error) {
        throw error
    }
}
export const getPostById = async (req, res) => {
    try {
        const requestPostId = req.params.postId;
        const postFound = await Blog.findOne({ _id: requestPostId })
        if (postFound instanceof Error) {
            res.redirect('/')
        }
        res.render("post", { post: postFound })
    } catch (error) {
        throw(error)
    }
}
export const editPostPage = async (req, res) => {
    try {
        const editPost = req.params.edit;
        const postEdit = await Blog.findOne({ _id: editPost })
        if (postEdit instanceof Error) {
            res.redirect('/')
        }
        res.render("edit", { edit: postEdit })
    } catch (error) {
        return(error)
    }
}
export const PostEdit = async (req, res) => {
    try {
        const PostEdit = req.params.edit;
        const postEdit = await Blog.findOneAndUpdate(
            { _id: PostEdit },
            { $set: req.body }
        )
        if (postEdit instanceof Error) {
            res.render("edit", { edit: postEdit }, Error)
        }
        res.redirect("/")
    } catch (error) {
        return(error)
    }
}

export const deletePost = async (req, res) => {
    try {
        const deleteId = req.params.id;
        const deletePost = await Blog.deleteOne({ _id: deleteId })
        if (deletePost instanceof Error) {
            res.render("edit", { edit: deletePost }, Error)
        }
        res.redirect("/");
    } catch (error) {
        return(error)
    }
}