const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema=new mongoose.Schema({
	name:{
		type:String,
		required:true,
		minlength:1,
		trim:true,
    allowNull:false
	},
	dob:{
		type:Date,
		require:true,
    allowNull:false
	},
	email:{
		type:String,
		required:true,
		unique:true,
    allowNull:false
	},
	gender:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        allowNull:false
    }
})


var User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserByID=function(id,cb){
    User.findOne({_id:id},cb);
}

module.exports.getUserByEmail=function(email,cb){
    console.log("User Idetified");
    User.findOne({email:email},cb);
}

module.exports.createUser=function(newUser,cb){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            if(err){
                console.log(err);
                throw err;
            }
            newUser.password=hash;
            newUser.save(cb);
            
        })
    })
}


module.exports.balanceAmount=function(email,cb){
    User.aggregate([
    { $lookup:
       {
            from: 'items',
            localField: 'email',
            foreignField: 'email',
            as: 'itemDetails'
        }
     },
     {
         $group:
         {
            _id: '$email',
            sumAmount: {
            $sum: {
                $sum: "$itemDetails.amount"
                }
            }
        }
     },
     {
        $match:
        {
            _id:{$eq:email}
        }
     }
    ],cb);
}



module.exports.showAmount=function(email,cb){
    User.aggregate([
    { $lookup:
       {
            from: 'items',
            localField: 'email',
            foreignField: 'email',
            as: 'items'
        }
     },
     {
         $project:
         {
            email:1,
            items:1
        }
     },
     {
        $match:
        {
            email:{$eq:email}
        }
     },
     {
         $group:
         { 
             _id : "$items.amount" 
        }
     }
    ],cb);
}



module.exports.updateUser=function(updatedUser,cb){
    User.updateOne({email: updatedUser.email},
	    { $set: { name: updatedUser.name,dob: updatedUser.dob,gender: updatedUser.gender}},cb);
}

module.exports.comparePassword=function(myPassword,hash,cb){
    bcrypt.compare(myPassword,hash,function(err,isMatch){
        if(err) throw err;
        cb(null,isMatch)
    })
}

module.exports.deleteUser=function(email){
    User.deleteOne({email:email}, function(err,res){
        if(err){
            console.log(err);
        }
        else{
            console.log('User deleted successfully');
        }
    }) ;
}