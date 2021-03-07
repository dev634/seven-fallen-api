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
  res.json(param);
});

//Get all users
app.route("/users").get(async (req,res) => {
    try{
        const getUsers = await pool.query("SELECT * FROM users");
        if(getUsers.rowCount === 0){
          throw new Error('Resources not found...');
        }
        res.json(getUsers.rowCount);
    }catch(err){
        res.status(404).json({
            status : res.statusCode,
            message: err.message,
        })
    }
})

//Get a user
app.route('/user/:id').get(async (req,res)=>{
  try{
    const id = req.params.id;
    const getUser = await pool.query('SELECT * FROM Users WHERE userid = $1',[id]);
    if(getUser.rowCount === 0){
      throw new Error('This user doesn\'t exist');
    }
    res.json(getUser.rows);
  }catch(err){
    res.status(404).json({
      status : res.statusCode,
      message: err.message
    });
  }
});

//Insert a user
app.route("/user").post(async (req, res) => {
  try {
    const {username,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,saltRounds); 
    const newUser = await pool.query("INSERT INTO Users(username,email,password) VALUES($1,$2,$3) RETURNING username,email",[username,email,hashedPassword]).catch((err) => {
      const myError = new Error('Bad request or this user already exist ...');
      myError.prototype.statusCode = 400;
      console.log(myError);
      throw myError;
    });

    res.json(newUser)
  } catch (err) {
        res.status(404).json({
            status : err.statusCode,
            message: err.message
        })
  }
});

/* Update a user */
app.route('/user/update/:id').patch(async (req, res) => {
  try{
    const id = req.params.id;
    const body = req.body;
    const dataTab = [];
    for(property in body){
      dataTab.push(`${property} = \'${body[property]}\'`);
    }
    
    const settingString = dataTab.join();
    console.log(settingString);
    const updatedUser = await pool.query(`UPDATE Users SET ${settingString} WHERE userid = $1 RETURNING *`,[id]);
    res.json(updatedUser.rows);
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
