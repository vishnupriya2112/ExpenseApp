const mongoose = require('mongoose');

const itemSchema=new mongoose.Schema({
	
	email:{
		type:String,
		required:true,
        allowNull:false
	},
    added_date:{
        type:Date,
		required:true,
        allowNull:false
    },
	amount:{
        type:Number,
        required:true,
        allowNull:false
    },
    description:{
        type:String,
        required:true,
    }
})


var Item=module.exports=mongoose.model('Item',itemSchema);


module.exports.addItem=function(newUser,cb){
    console.log(newUser.email);
    console.log(newUser);
     newUser.save(cb);
}

module.exports.deleteItem=function(id,cb){
    Item.deleteOne({_id:id},cb) ;
}

module.exports.updateItem=function(updatedItem,cb){
    console.log(updatedItem._id);
    Item.updateOne({_id: updatedItem._id},
	    { $set: {added_date:updatedItem.added_date, amount: updatedItem.amount,description: updatedItem.description}},cb);
}


module.exports.showItem=function(email,cb){
    console.log(email);
    Item.aggregate([
    {
        $match:
        {
            email:{$eq:email}
        }
     },
     {
        $group:
        {
            _id:"$email",
            "itemsSold": { $addToSet: {id:"$_id",amount:"$amount",description:"$description",date:"$added_date" }},
        }
     },
     
    ],cb);
}

// module.exports.showItemByDate=function(email,cb){
//     Item.aggregate([
//     {
//         $match:
//         {
//            email:{$eq:email},
//         }
//      },
//      {
//         $group:
//         {
//             _id: { $dateToString: { format: "%d-%m-%Y", date: "$added_date" } },
//             itemsSold: { $addToSet: {amount:"$amount",description:"$description"} }
            
//         }
//      },
//      {
//         $sort:
//         {
//             added_date: 1
//         }
//      }
//     ],cb);
// }

module.exports.dailyItem=function(email,cb){
    Item.aggregate([
    {
        $project:
        {
            "email":"$email",
            "year": { "$year": "$added_date"},
            "month":{ "$month": "$added_date"},
            "date":{ "$dayOfMonth": "$added_date"},
            "amount":"$amount",
            "description":"$description"
        }
     },
     {
        $match:
        {
            "email":"vishnu@gmail.com",
            "year": new Date().getFullYear(),
            "month": new Date().getMonth() + 1, //because January starts with 0
            "date": new Date().getDate()
        }
     },
     {
        $group:
        {
            _id:"$email",
            "itemsSold": { $addToSet: {amount:"$amount",description:"$description"} },
        }
     }
    ],cb);
}

module.exports.showDesc=function(email,cb){
    Item.aggregate([
    {
        $match:
        {
           email:{$eq:email},
           
        }
     },
     {
         $group:
         {
            _id: '$email',
            descList: { $addToSet: {amount:"$amount",description:"$description",date:"$added_date"}  }
            
            }
     }
    ],cb);
}

module.exports.incomeAmount=function(email,cb){
    Item.aggregate([
    {
        $match:
        {
           email:{$eq:email},
           amount:{$gt:0}
        }
     },
     {
         $group:
         { 
            _id: "$email", 
            Marks: { $sum:"$amount" }
        } 
     },
     {
         $group:
         { 
            _id: "$_id", 
            TotalMarks: { "$sum": "$Marks" }
        }

     }
    ],cb);
}

module.exports.expenseAmount=function(email,cb){
    Item.aggregate([
    {
        $match:
        {
           email:{$eq:email},
           amount:{$lt:0}
        }
     },
     {
         $group:
         { 
            _id: "$email", 
            Marks: { $sum:"$amount" }
        } 
     },
     {
         $group:
         { 
            _id: "$_id", 
            TotalMarks: { "$sum": "$Marks" }
        }

     }
    ],cb);
}

module.exports.showByDate=function(data,cb){

    console.log(data.email,data.date);
    Item.aggregate([
    {
        $project:
        {
            "email":"vishnu@gmail.com",
            "year": { "$year": "$added_date"},
            "month":{ "$month": "$added_date"},
            "date":{ "$dayOfMonth": "$added_date"},
            "amount":"$amount",
            "description":"$description"
        }
     },
     {
        $match:
        {
            "email":"vishnu@gmail.com",
            "year": new Date("2021-10-03T05:22:59.556Z").getFullYear(),
            "month": new Date("2021-10-03T05:22:59.556Z").getMonth() + 1, //because January starts with 0
            "date": new Date("2021-10-03T05:22:59.556Z").getDate()
        }
     },
     {
        $group:
        {
            _id:"$email",
            "itemsSold": { $addToSet: {amount:"$amount",description:"$description"} },
        }
     }
    ],cb);
}

