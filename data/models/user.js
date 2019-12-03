const mongoose = require('mongoose');

// user
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // array of objects
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]    
});

const User = mongoose.model('User', userSchema);

module.exports = User;