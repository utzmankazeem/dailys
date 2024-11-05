import mongoose from 'mongoose'
const {Schema} = mongoose
const blogSchema = new Schema ({
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

const Blog = mongoose.model("blog", blogSchema);
export default Blog 
