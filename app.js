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
app.route("/api/:id").get((req, res) => {
  const param = req.params;
  res.json(param)
    //res.send("<h1>Hello World !</h1>");
});

//Get all users
app.route("/users").get(async (req,res) => {
    try{
        const getUsers = await pool.query("SELECT * FROM users");
        res.json(getUsers.rows);
    }catch(err){
        res.json({
            message: err.message,
        })
    }
})


//Insert a user
app.route("/user").post(async (req, res) => {
  try {
    const {firstname,lastname,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,saltRounds); 
    const newUser = await pool.query("INSERT INTO Users(firstname,lastname,usermail,password) VALUES($1,$2,$3,$4) RETURNING *",[firstname,lastname,email,hashedPassword]);
    res.json(newUser)
  } catch (err) {
        res.json({
            message: err.message,
        })
  }
});

//Update a user

app.route('/user/update/:id').patch(async (req, res) => {
  try{
    const id = req.params.id;
    console.log(id);
    const body = req.body;
    console.log(body);
    for(const property in body){
      console.log(`${property} : ${object[property]}`);
    }
  }catch(err){
    res.json({
      message: err.message
    });
  }
})

//Delete a user
app.route("/user").delete(async (req,res) => {
  try{
    const {id} = req.body;
    const deletedUser = await pool.query("DELETE FROM Users WHERE userid = $1 RETURNING usermail", [id] );
    res.json(deletedUser.rows);
  }catch(err){
    res.json({
      message : err.message
    });
  }
})

//! Server Settings
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
