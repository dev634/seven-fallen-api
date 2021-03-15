//* Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;


// routes requirements 
const routeUsers = require('./Routes/Users');
const routeUser = require('./Routes/User');

//* Variables
const app = express();
const port = 3000;

//* App settings
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//*Strategies session settings
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes middleware
app.use('/api',routeUsers);
app.use('/api',routeUser);

//! Server Settings
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
