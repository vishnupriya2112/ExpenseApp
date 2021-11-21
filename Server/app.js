var express=require('express');
var app=express();
var path=require('path');
var session = require("express-session");
var fs = require('fs');
var morgan=require('morgan');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
var cors=require('cors');
app.use(cors());
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

require('./routes/user')(app,passport);
require('./routes/item')(app,passport);
require('./mongodb/connection');
require('./config/passport')(passport);
require('./config/auth');
var port=3000;


app.use(session({ 
    secret: "cats",
    resave: true,
    saveUninitialized: true
}));

app.listen(port, () => {
        console.log('server running at ' + port)
    })
