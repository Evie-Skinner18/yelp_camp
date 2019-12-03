const mongoose = require('mongoose');


// define post schema and model first because a User has many Posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

// return this file so we can include it inside other files
module.exports = Post;