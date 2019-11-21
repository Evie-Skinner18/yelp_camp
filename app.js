const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// connect to the DB
mongoose.connect('mongodb://localhost/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true});

// set up schema
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String    
});

// model the campground in JS using Mongoose
const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//     name: 'Rodborough Fort',
//     image: 'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
// }, function(err, campground){
//     if(err){
//         console.log('Oh no there\'s been an error!');
//     }
//     else{
//         console.log(`The ${campground.name} campground has been added to the DB`);
//     }
// });

// root route
app.get('/', (req, res)=> {
    res.render('landing');
});

// allow user to READ all camp grounds. This is an array for now but will be rows in a MongoDB later
app.get('/campgrounds', (req, res)=> {
    Campground.find(function(err, allCampgrounds){
        if(err){
            res.send('Oh no I can\'t find any campgrounds!');
        }
        else{
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
});

// route to the form page. User will CREATE a new camp ground via the form and submit this. Submit btn will use that POST route below
app.get('/campgrounds/new', (req, res)=> {
    res.render('new');
})

// allow user to CREATE a new campground. Following the RESTful convention, both the POST and GET methods for the campground resource
// should point to /campgrounds
app.post('/campgrounds', (req, res)=> {
    // grab data from the user's form
    let campgroundName = req.body.name;
    let campgroundImage = req.body.image;
    let newCampground = {name: campgroundName, image: campgroundImage};
    // create a new campground an d save to the DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            res.send('Oh no there is an error!');
        }
        else{
            res.redirect('/campgrounds');
        }
    });
})


//start the node server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Yelp Camp has started!');
});