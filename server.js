const express=require('express');
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')
const formidable=require('express-formidable')
const {auth}=require('./server/middleware/auth')
const cloudinary=require('cloudinary')
const {Member}=require("./server/models/Member")

const {NGO}=require("./server/models/NGO")
const jwt=require('jsonwebtoken')
const fs = require('fs')

var nodemailer = require('nodemailer');

var compression = require('compression'); 

const app=express()
const port = process.env.PORT || 3002;


const server = require('http').Server(app);

require('dotenv').config();
mongoose.Promise=global.Promise
mongoose.connect(process.env.MONGODB_URI)
app.use(compression());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser());

app.use(express.static('myapp/build'))


const defaultemail={from:'webwarriors12@gmail.com'}

const sendmail=(emaildata)=>{
    const compemail=Object.assign(defaultemail,emaildata)
     
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'webwarriors12@gmail.com',
      pass: '123SaySau'
    }
  });
  
  return  transporter.sendMail(compemail, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}  

    app.post('/api/members/register',(req,res)=>{
     console.log('dsd')
     const member = new Member(req.body);
     console.log(member)
     member.save((err,doc)=>{
        if(err) {
            console.log(err)
            return res.json({success:false,err});
        }
            console.log(doc.name) 

        const emaildata={
            to:req.body.email,
            subject:'REGISTRATION',
            text:"YOU ARE REGISTERED FOR CRISISFOOD",
            html:`<p>WELCOME,${doc.name} TO CRISISFOOD</p>`
        }
        
     sendmail(emaildata)
           
     res.status(200).json({
            success: true,doc
                        })
        
        })
     });


     app.post('/api/members/registerngo',(req,res)=>{
        console.log('dsd')
        const member = new NGO(req.body);
        console.log(member)
        member.save((err,doc)=>{
           if(err) {
               console.log(err)
               return res.json({success:false,err});
           }
               console.log(doc.name) 
   
           const emaildata={
               to:req.body.email,
               subject:'REGISTRATION',
               text:"YOU ARE REGISTERED FOR CRISISFOOD",
               html:`<p>WELCOME,${doc.name} TO CRISISFOOD</p>`
           }
           
        sendmail(emaildata)
              
        res.status(200).json({
               success: true,doc
                           })
           
           })
        });


    app.post('/api/members/forgetpassword',(req,res)=>{
        Member.findOne({'email':req.body.email},(err,member)=>{
        if(!member){
        res.status(400).json({
            loginSuccess:false,
            message:'Unable to Login'
        })
        }
        console.log(member.password)
        var token="foslkkkkkkkkkkrgsllllllllllllsdejhgehaot"+member.password;
        console.log(token)
        const emaildata={
            to:req.body.email,
            subject:'Password reset',
            text:"Please follow the informations to reset your password:http://che.herokuapp.com/resetpass?token=${token}",
            html:`<p>Please click the following link</p><p>http://che.herokuapp.com/resetpass?token=${token}</p>`
        }
        Member.update({email:req.body.email},{$set:{resetpasslink:token}},function(err,member){
           if(err) return res.send(err)
           else 
           sendmail(emaildata)
           res.status(200).json({message:"email has been sent"})
       })
    }) 
});


   app.post('/api/members/forgetpass',(req,res)=>{
    
      console.log(req.body.data.password)
      Member.findOne({'resetpasslink':req.body.reset.token},(err,member)=>{
        if(!member){
        res.status(400).json({
            loginSuccess:false,
            message:'Unable to Login'
        })
        }
        console.log(member)
        member.password=req.body.data.password
        console.log(member)
        const emaildata={
            to:member.email,
            subject:'Password reset',
            text:"Reset Successful",
            html:`<p>Reset Successful</p>`
        }

    member.save((err,doc)=>{
        if(err) {
            console.log(err)
            return res.json({success:false,err});
        }
            console.log(doc)    
   
            sendmail(emaildata)
            res.status(200).json({success:true,message:"Reset done"})
        })

    
        
        
    })

    })
        
app.get('/api/members/logout',auth,(req,res)=>{
    console.log(req.user._id)
    Member.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})





app.post('/api/members/login',(req,res)=>{
    Member.findOne({'email':req.body.email},(err,member)=>{
        if(!member){
     return   res.json({
            loginSuccess:false,
            message:'Unable to Login'
        })
        }
           member.comparepassword(req.body.password,(err,match)=>{
            if(!match){
        return        res.json({
                    loginSuccess:false,
                    message:'Unable to Login'
                })
                }

            member.generateToken((err,member)=>{
                if(err) return res.send(err);
                        res.cookie('w_auth',member.token).status(200).json({
                        loginSuccess: true,
                        member:member
                    })
                })
              })
    

    })
})


app.get('/api/records/allalum',auth,(req,res)=>{
   console.log('hhhh')
    NGO
    .find()
    .exec((err,allalum)=>{
        if(err){
            console.log(err)
            res.status(400).send(err)
            
        }
       return res.status(200).send(allalum)
    })
 })
app.get('/api/members/auth',auth,(req,res)=>{
    res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        id:req.user.id,
        lastname: req.user.lastname,
        role: req.user.role,
        address:req.user.address
    })
})


if( process.env.NODE_ENV === 'production' ){
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../myapp','build','index.html'))
    })
}


server.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})