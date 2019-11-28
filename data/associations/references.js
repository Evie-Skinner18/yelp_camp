const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb2', {useNewUrlParser: true, useUnifiedTopology: true});


// define post schema and model first because a User has many Posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model('Post', postSchema);

// user
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // array of Posts
    posts: [postSchema]    
});

const User = mongoose.model('User', userSchema);


