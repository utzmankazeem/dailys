const express = require("express"),
    mongoose = require("mongoose"),
    ejs = require("ejs"),
    _ = require("lodash"),
    app = express();


//DB CONFIG
const db = require('./config/key').mongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


///////////////Targeting User routes///////////////////////
app.use('/', require('./routes/user'));


app.listen(1700, () => console.log("Server runnig on port 1700"));
