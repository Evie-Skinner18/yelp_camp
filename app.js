const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// connect to the DB
mongoose.connect('mongodb://localhost:27017/yelpCamp', {useNewUrlParser: true, useUnifiedTopology: true});

// set up schema
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String    
});

// model the campground in JS using Mongoose
const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
//     name: 'Doggie Camp',
//     image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
//     description: 'The camp where dogs can fully express their doggie selves'
// });

// root route
app.get('/', (req, res)=> {
    res.render('landing');
});

// INDEX - show all campgrounds
// allow user to READ all camp grounds. This shows records in the campgrounds collection of the yelpCamp DB
app.get('/campgrounds', (req, res)=> {
    Campground.find(function(err, allCampgrounds){
        if(err){
            res.send('Oh no I can\'t find any campgrounds!');
        }
        else{
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

// NEW
// route to the create form page shown to the user. Submit btn will use that POST route below
app.get('/campgrounds/new', (req, res)=> {
    res.render('new');
})

// CREATE
// allow user to create a new campground and POST it. Following the RESTful convention, both the POST and GET methods 
//for the campground resource should point to /campgrounds
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
            res.redirect('/index');
        }
    });
})

// SHOW the campground of id [id]
app.get('/campgrounds/:id', (req, res)=> {
   //Campground.find(id) 
   // find the campground with the given ID

   // render it on the show view
   res.render('show');
});


//start the node server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Yelp Camp has started!');
});



/* RESTFUL ROUTES for the campground resource

Name        Url             Http verb   Desc  
========================================================================
INDEX       /campgrounds    GET         Display list of all campgrounds
NEW        /campgrounds/new GET         Display form to create new campground
CREATE     /campgrounds     POST        Add newly created campground to DB 
SHOW       /campgrounds/:id GET         Show info about this particular campground */
