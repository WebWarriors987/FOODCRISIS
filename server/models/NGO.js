const mongoose=require('mongoose')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const SALT_I=10;
require('dotenv').config()
const validator=require('validator');
const Schema = mongoose.Schema;



const ngoSchema=mongoose.Schema({
    email:{
        required:true,
        trim:true,
        unique:1,
        type:String,
        validate(value){
          if(!validator.isEmail(value)){
              console.log('Invalid Email')
          }
        }
    },
    name:{
        required:true,
        type:String
    },
    lastname:{
        required:true,
        type:String
    },
    token:{
        type:String
    },
    resetpasslink:{
        type:String
    },
    address:{
        type:Object,
        required:true
    },
    contact:{
         type:String,
         default:''
    },
    additionalinfo:{
        type:String,
        default:''
    }
   
},{timestamps:true})



const NGO =mongoose.model('NGO',ngoSchema)


module.exports={NGO}