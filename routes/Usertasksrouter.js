const express = require('express')
const {
    checkusertasks,
    CreateUsertasks,
    getuserVerified,
    getUsertasks,
    UpdateUsertasks,
    getTeamTasks,
     DeleteUsertasks
} = require("../controllers/Usertaskscontrollers") 

const usertasksrouter = express.Router();

usertasksrouter.post("/addtask",getuserVerified, checkusertasks, CreateUsertasks)
usertasksrouter.get("/gettasks",getuserVerified, getUsertasks)
usertasksrouter.put("/updatetask/:id", getuserVerified, checkusertasks, UpdateUsertasks)
usertasksrouter.delete("/deletetask/:id", getuserVerified, DeleteUsertasks)
usertasksrouter.get("/getteamtasks", getTeamTasks)

module.exports = usertasksrouter;
