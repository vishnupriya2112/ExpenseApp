var passport=require('passport');
var jwt=require('jsonwebtoken');
var User=require('../mongodb/models/user.model');
var config=require('../config/database');
require('../config/auth');
const jwtHelper=require('../config/jwtHelper')

module.exports=function(app,passport){

    app.post('/register',function(req,res){
        var newUser=new User({
            name : req.body.name,
            dob : req.body.dob,
            email : req.body.email,
            gender : req.body.gender,
            password : req.body.password       
        })
        User.createUser(newUser,function(err)
        {
            
            if(err){
                res.send({success:false,message:'User is not registered'});
                console.log(err);
            }
            else{
                res.send({success:true,message:'User registered successfully'});
            }
        });

    });

    app.post('/login',function(req,res){
        const expires="1d";
        var email=req.body.email;
        var password=req.body.password;
        User.getUserByEmail(email,function(err,user){
          if(err) {
              console.log(err.message);
          }
          if(!user){
              return res.status(400).send({success:false,message:'No user found'});
          }
          User.comparePassword(password,user.password,function(err,isMatch){
              if(isMatch){
                  var token=jwt.sign(user.toJSON(),config.secret,{expiresIn:expires});
                  res.json({success:true,token:token,user:user});
              }
              else{
                  return res.status(401).send({success:false,message:'Password mismatch'});
              }
          })
        })
    })

    app.get('/balance/:email',function(req,res){
        var email=req.params.email;
        User.balanceAmount(email,function(err,user)
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

    

    app.get('/showamount/:email',function(req,res){
        var email=req.params.email;
        User.showAmount(email,function(err,user)
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

    

    app.get('/user',function(req,res){
        var id=req._id;
        User.getUserByID(id,function(err,userData){
            if(err) throw err;
            if(userData){
              return res.json(userData);
          }
        })
    })

    app.post('/find',(req,res)=>{
        console.log(req.body);
    })

    // app.get('/user/:id',function(req,res){
    //     var id=req._id;
    //     User.getUserByID(id,function(err,userData){
    //         if(err) throw err;
    //         if(userData){
    //           return res.json(userData);
    //       }
    //     })
    // })

    app.get('/user/:email',function(req,res){
        var email=req.params.email;
        User.getUserByEmail(email,function(err,user){
          if(err) {
              console.log(err.message);
          }
          if(!user){
              return res.status(400).send({success:false,message:'No user found'});
          }
          if(user){
              return res.json(user);
          }
        })
    })

    app.get('/user/edit',jwtHelper.verifyJwtToken,function(req,res){
        jwtHelper.verifyJwtToken
        User.getUserByID(email,function(err,userData){
            if(err) throw err;
            if(userData){
              return res.json(userData);
          }
        })
    })

    app.get('/user/edit/:email',function(req,res){
        
        var email=req.params.email;
        console.log("Email edit="+email);
        //res.send(req.params);
        User.getUserByEmail(email,function(err,userData){
            if(err) throw err;
            if(userData){
              return res.json(userData);
          }
        })
    })
    app.delete('/delete/:email',function(req,res) {
        var email=req.params.email;
         res.json(email);
        
        User.deleteUser(email);
    })


    app.post('/update',function(req,res){
        var updatedUser=new User({
            name : req.body.name,
            dob : req.body.dob,
            email : req.body.email,
            gender : req.body.gender       
        })
        //User.updateOne({email: req.body.email},updateUser).then(
        User.updateUser(updatedUser,function(err,userData){
            if(err) {
                console.log(err);
                throw err;
            }
            if(userData){
              return res.json(userData);
          }
        })
    })

    
    app.get('/logout',function(req,res){
        req.logout();
    })

    function isLoggedIn(req,res,next){
        req.user?next():res.sendStatus(401);
    }
    //app.get('/auth/google',)
    app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}))

    app.get('/google/callback',passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure'
    }))


    app.get('/auth/failure',(req,res)=>{
        res.send('Something went wrong');
    })
    app.get('/protected',isLoggedIn,(req,res)=>{
        res.send(`<p>Hello ${req.user.displayName}</p><br><a href="/logout">Logout</a>`);
        
    })
}