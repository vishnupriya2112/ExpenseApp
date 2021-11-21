const mongoose = require('mongoose');
var config=require('../config/database');


mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true
}).then((response)=>{
    console.log("Connected to MongoDB successfully");
}).catch((error)=>{
    console.log("MongoDB not able to connect");
    console.log(error);
})

mongoose.Promise=global.Promise;

module.exports={mongoose}