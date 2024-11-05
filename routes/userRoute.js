import express from 'express'
const router = express.Router()
import { getNewPost, createNewPost, getPostById, editPostPage, PostEdit, deletePost, getAllPost, aboutPage, contactPage } from "../controller/userController.js";

router.get("/",getAllPost);

router.get("/about", aboutPage)

router.get("/contact", contactPage)

//////////////////////////////////Targeting Compose Route///////////////////////////////////////////////////////////////
router.route("/compose")
    .get(getNewPost)
    .post(createNewPost);

router.get("/posts/:postId", getPostById)

////////////////////////////Targeting Edit Route With Its Id///////////////////////////////////////////////////////////////
router.route("/edit/:edit")//From <form action="/edit/<%-edit._id%>" method="post">
    .get(editPostPage)
    .post(PostEdit)

router.get("/delete/:id", deletePost)

export default router