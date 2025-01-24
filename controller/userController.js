import Blog from '../models/blog.js'
import mongoose from 'mongoose';
import pkg from 'lodash';
const { isEmpty } = pkg;
import lodash from "lodash"
const { isNull } = lodash;
import _ from "lodash";

const aboutContent = "Welcome to Dailys Today. giving you insite into the best in blog business daily";
const contactContent = "Welcome to Dailys Today call us on +234 9099 876 8765 or you’re on your own";

const firstPost = {
    title: "New Day",
    post: "We did a great job!",
}

export const getAllPost = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const postperpage = 10;
        ///({name: {$regex: this.search, $options:"i"}})
        const found = await Blog.find({})
            .sort({ title: 1 })
            .skip(page * postperpage)
            .limit(postperpage)
        if (isEmpty(found)) {
            await Blog.create(firstPost)
            console.log("First post added successfully")
            return res.redirect("/");
        }
        return res.render("indexes", { daily: found })
    } catch (error) {
        throw error
    }
}
export const aboutPage = (req, res) => {
    return res.render("about", { about: aboutContent })
}
export const contactPage = (req, res) => {
    return res.render("contact", { contact: contactContent })
}
export const getNewPost = (req, res) => {
    return res.render("compose");
}
export const createNewPost = async (req, res) => {
    try {
        const { title, post } = req.body;
        await Blog.create(
            {title, post}
        )
        return res.redirect("/");
    } catch (error) {
        throw error
    }
}
export const getPostById = async (req, res) => {
    const requestPostId = req.params.postId;
    try {
        if (!mongoose.Types.ObjectId.isValid(requestPostId)) {
            return res.redirect("/");
          }

        const postFound = await Blog.findById({_id:requestPostId});
        if (postFound instanceof Error) {
            return res.redirect('/')
        }
        return res.render("post", { post: postFound })
    } catch (error) {
        throw(error)
    }
}
export const editPostPage = async (req, res) => {
    try {
        const editPost = req.params.edit;
        const postEdit = await Blog.findOne({ _id: editPost })
        if (postEdit instanceof Error) {
            return res.redirect('/')
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
            return res.render("edit", { edit: postEdit }, Error)
        }
        res.redirect("/")
    } catch (error) {
        return(error)
    }
}

export const deletePost = async (req, res) => {
    const deleteId = req.params.id;
    const deletePost = await Blog.deleteOne({deleteId})

    try {
        if (deletePost.title === firstPost.title && deletePost.post === firstPost.post) {
            return render("edit",{ edit: deletePost}, "Cannot delete the first post");
        }
        if (deletePost instanceof Error) {
            return res.render("edit", { edit: deletePost }, Error)
        }
        res.redirect("/");
    } catch (error) {
        throw error
    }
}