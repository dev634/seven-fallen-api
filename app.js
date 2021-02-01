//* Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const pool = require("./db");
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
app.use(express.urlencoded({ extend: true }));

//*Strategies session settings

app.use(cors());
app.use(express.json());

//! Requests session settings
//* Route TEST
app.route("/").get((req, res) => {
  res.send("<h1>Hello World ! </h1>");
});
//* Route User
app.post("/user", async (req, res) => {
  try {
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.email);
  } catch (err) {
    console.log(err.message);
  }
});

//! Server Settings
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
