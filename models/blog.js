const mongoose = require('mongoose');

const blogSchema = ({
    title: {
        type : String,
        required : true
    }, 

    post: {
        type: String,
        required: true
    },

    date_created: {
        type: Date,
        default: Date.now
    }
})

const Blog = new mongoose.model("blog", blogSchema);

module.exports = Blog;