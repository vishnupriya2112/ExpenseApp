var passport=require('passport');
var Item=require('../mongodb/models/item.model');
var config=require('../config/database');

module.exports=function(app,passport){

    app.post('/additem',function(req,res){
        console.log(req.body);

        var newItem=new Item({
            added_date:req.body.added_date,
            amount : req.body.amount,
            description : req.body.description,
            email : req.body.email,      
        })
        console.log(newItem);
        Item.addItem(newItem,function(err,user)
        {
            if(err){
                console.log(err);
                return res.data({success:true, message:"Item added Successfully"});
            }
            else{
                return res.json(user);
            }
        });
    })

    app.get('/showitem/:email',function(req,res){
        var email=req.params.email;
        Item.showItem(email,function(err,user)
        {
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                return res.json(user);
            }
        });
    })

    // app.get('/showitems/:email',function(req,res){
    //     var email=req.params.email;
    //     Item.showItemByDate(email,function(err,user)
    //     {
    //         if(err){
    //             res.send({success:false,message:'Failed'});
    //             console.log(err);
    //         }
    //         if(user){
    //             return res.json(user);
    //         }
    //     });
    // })

    app.post('/updateitem',function(req,res){
        console.log(req.body.id);
        console.log(req.body.amount);
        console.log(req.body.description);
        console.log(req.body.added_date);
        var newItem=new Item({
            _id:req.body.id,
            added_date:req.body.adding_date,
            amount : req.body.amount,
            description : req.body.description,      
        })
        Item.updateItem(newItem,function(err)
        {
            if(err){
                res.send({success:false,message:'User is not updated'});
                console.log(err);
            }
            else{
                res.send({success:true,message:'User updated successfully'});
            }
        });
    })

    app.delete('/deleteitem/:id',function(req,res){
        var id=req.params.id;
        console.log(id);
        Item.deleteItem(id,function(err,user)
        {
            if(err){
                console.log(err);
                res.send({success:false,message:'Failed'});
                
            }
            if(user){

                return res.json(user);
            }
        });
    })

    app.get('/incomeamount/:email',function(req,res){
        var email=req.params.email;
        Item.incomeAmount(email,function(err,user)
        {
            
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                return res.json(user);
            }
        });
    })

    app.get('/expenseamount/:email',function(req,res){
        var email=req.params.email;
        Item.expenseAmount(email,function(err,user)
        {
            
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                return res.json(user);
            }
        });
    })

    

    app.get('/showdesc/:email',function(req,res){
        var email=req.params.email;
        Item.showDesc(email,function(err,user)
        {
            
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                return res.json(user);
            }
        });
    })

    app.post('/showbydate',function(req,res){
        console.log(req.body);
        var data=req.body;
        console.log(data);
        Item.showByDate(data,function(err,user)
        {
            
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                console.log(user);
                return res.json(user);
            }
        });
    })

    app.get('/dailyitem/:email',function(req,res){
        var email=req.params.email;
        Item.dailyItem(email,function(err,user)
        {
            
            if(err){
                res.send({success:false,message:'Failed'});
                console.log(err);
            }
            if(user){
                return res.json(user);
            }
        });
    })
    
}