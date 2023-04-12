const mongoose = require("mongoose");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwt_secret;

// ____________Router___________


// ___mongoose_______

mongoose.connect(
  process.env.connection_string || "mongodb://localhost/opportunity"
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database");
});

// ______MULTER package for uploading setup_________
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/img");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

var upload = multer({ storage: storage });

// ___________AUTHORIZATION_________
const auth = (req, res, next) => {
  try {
    var token = req.get("Authorization");
    if (token) {
      token = token.split(" ")[1];
      // console.log(token);
      var decoded = jwt.verify(token, process.env.jwt_secret);
      if (decoded.email) {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
  // console.log(decoded);
};

module.exports = {  mongoose, upload, auth };
