
const express = require('express')

const Jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const promisifiedVerify = promisify(Jwt.verify);
const promisifiessignin = promisify(Jwt.sign);
const UserdetailsModel = require("../model/UserdetailsModel")




const postuserdetails = async function(req,res) {
  try{
  const {email,name,password,confirmPassword} = req.body;
  const user = await UserdetailsModel.create({email,name,password,confirmPassword})
  res.status(200).json({
    status:"user successfully signed in",
    message : user
  })

}
  catch(err){
    res.status(400).json({
      status:"failed to sign in",
      message : err.message
    })
  }
  
}
const Getlogindetails = async function(req,res){
try {
  const {email,password} = req.body;
  const user = await UserdetailsModel.findOne({email,password});
  if(!user){
    return res.status(404).json({
      status:"failed to find user",
      message : "User not found"
    })
  }
  else{
const token = await promisifiessignin(
  { data: user },
  process.env.JWT_SECRET_KEY,
  { expiresIn: "10h", algorithm: "HS256" }
);
 res.cookie('jwt',token,{maxAge : 10000000000,httpOnly : true})    
    res.status(200).json({
      status:"user found",
      message : user,
      token
    })
  }
}
catch(err){
  res.status(400).json({
    status:"failed to get user",
    message : err.message
  })
}
}

const checkinputforlogin = function(req,res,next){
  const {email,password} = req.body;
  console.log("body " ,req.body)
  if(!email || !password){
    return res.status(400).json({message:"All fields are required"})
  }
  else{
    next()
  }
}

const getuserVerified = function(req,res,next){
  console.log("auth")
  const token = req.cookies.jwt;
  if(!token){
    return res.status(401).json({message:"Unauthorized"})
  }
  promisifiedVerify(token,process.env.JWT_SECRET_KEY)
  .then(decoded => {
    req.user = decoded.data;
    next();
  })
  .catch(err => {
    res.status(401).json({message:"Unauthorized"})
  })
}
const checkinput = function(req,res,next){
  const {name,email,password,confirmPassword} = req.body;
  if(!name || !email || !password || !confirmPassword){
    return res.status(400).json({message:"All fields are required"})
  }
  next();
}

module.exports = {postuserdetails,Getlogindetails,getuserVerified,checkinputforlogin,checkinput}