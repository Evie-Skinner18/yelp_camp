const mongoose = require('mongoose');
mongoose.connect('mongo://localhost/:27017/demoDb', {useNewUrlParser: true, useUnifiedTopology: true});

// user
let userSchema = new mongoose.Schema({
    email: String,
    name: String,    
});

// post
let postSchema = new mongoose.Schema({
    tile: String,
    content: String
});