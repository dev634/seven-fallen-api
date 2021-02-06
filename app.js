//* Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;

//* Variables
const app = express();
const port = 3000;
const saltRounds = 10;

//* App settings
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//*Strategies session settings

app.use(cors());
app.use(express.json());

//! Requests session settings
//* Route TEST
app.route("/api").get((req, res) => {
  res.send("<h1>Hello World !</h1>");
});
//* Route User
app.route("/user").post(async (req, res) => {
  try {
    const {firstname,lastname,email} = req.body.firstname;
    console.log(firstname);
    console.log(email)
    const newUser = await pool.query("INSERT INTO Users(firstname,lastname,usermail) VALUES($1,$2,$3)",[firstname,lastname,email]);
    console.log(newUser);
    res.json(newUser)
    bcrypt.hash(req.body.test, saltRounds, (err, hash) => { 
    if (err) {
        
        console.log(err.message)
      }
      console.log(hash);
    });

  } catch (err) {
    console.log(err.message);
  }
});

//! Server Settings
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
