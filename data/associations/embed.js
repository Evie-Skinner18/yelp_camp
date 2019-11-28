const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demoDb', {useNewUrlParser: true, useUnifiedTopology: true});


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


// let dibby = new User({
//     name: 'Dibby',
//     email: 'dibby@hogwarts.school',
// });

// // add a new post to Dibby's array of Posts
// dibby.posts.push({
//     title: 'How to Tickle Doggies',
//     content: 'You tickle them while they are asleep. He he he!'
// });

// dibby.save((err, user)=>{
//     if(err){
//         console.log('Error!');
//     }
//     else{
//         console.log(user);
//     }
// });

User.findOne({name: 'Dibby'}, (err, user)=>{
    if(err){
        console.log('Error!');
    }
    else{
        user.posts.push({
            title: 'I am a Buffalo',
            content: 'I like to graze on the American plains.'
        });
        // after updating a resource in MongoDB you must save
        user.save((err, user)=> {
            if(err){
                console.log('There was an error saving the user');
            }
            else{
                console.log(`I have updated a user and found a user called ${user.name}. Here you go: ${user}`);
            }
        })
    }
});

// let newBlogPost = new Post({
//     title: 'Why I Love Doggies',
//     content: 'They are so cute and fluffy'
// });

// newBlogPost.save((err, post)=>{
//     if(err){
//         console.log('Error!');
//     }
//     else{
//         console.log(post);
//     }
// });
