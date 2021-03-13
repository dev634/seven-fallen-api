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
    const updatedUser = await pool.query(`UPDATE users SET ${settingString} WHERE id = $1 RETURNING username`,[id])
      .catch((err) => {
        if(err){
          err.statusCode = 404;
          err.message = 'Bad request this user doesn\'t exist';
          throw err;
        }
      });
    if(updatedUser.rowCount === 0){
      const updateError = new Error('Bad request this user doesn\'t exist');
      updateError.statusCode = 404
      throw updateError;
    }
    res.json(`${updatedUser.rows[0].username} a bien etait mis a jour ...`);
  }catch(err){
    res.status(err.statusCode).json({
      status: err.statusCode,
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
