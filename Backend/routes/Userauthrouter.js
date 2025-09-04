const express = require('express')


const userauthrouter = express.Router();

const {postuserdetails,Getlogindetails,getuserVerified,checkinputforlogin,checkinput} = require("../controllers/Userauthcontroller")







userauthrouter.post("/usersignin",checkinput,postuserdetails)
userauthrouter.post("/userlogin",checkinputforlogin,Getlogindetails)

module.exports = userauthrouter;