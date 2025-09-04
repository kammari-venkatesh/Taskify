const UsertasksModel = require("../model/Usertasksmodel");
const Jwt = require("jsonwebtoken");

let ioInstance = null; // To store socket.io instance

// ✅ This function will be called in server.js to set io
const setSocketInstance = (io) => {
    ioInstance = io;
};

const checkusertasks = (req, res, next) => {
    const { title, description, status, priority } = req.body;
    if (!title || !description || !status || !priority) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};


const CreateUsertasks = async (req, res) => {
    try {
        const userid = req.user.data._id;
        const username = req.user.data.name;
        const { title, description, status, priority } = req.body;

        const task = await UsertasksModel.create({
            title,
            description,
            status,
            priority,
            userid,
            username,
            teamId: "TEAM_001"
        });

        if (ioInstance) {
            ioInstance.emit("taskUpdate", { action: "create", task });
        }

        res.status(200).json({
            status: "success",
            data: task
        });
    } catch (err) {
        res.status(400).json({ message: "Error creating task", error: err });
    }
};

const getuserVerified = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: err.message });
        }
        req.user = user;
        next();
    });
};

const getUsertasks = async (req, res) => {
    try {
        const userId = req.user.data._id;
        const tasks = await UsertasksModel.find({ userid: userId });
        res.status(200).json({
            status: "success",
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error: error });
    }
};

const getTeamTasks = async (req, res) => {
    try {
        const tasks = await UsertasksModel.find({ teamId: "TEAM_001" });
        res.status(200).json({
            status: "success",
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching team tasks", error });
    }
};
const UpdateUsertasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority } = req.body;

        const task = await UsertasksModel.findByIdAndUpdate(id, {
            title,
            description,
            status,
            priority
        }, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (ioInstance) {
            ioInstance.emit("taskUpdate", { action: "update", task });
        }

        res.status(200).json({
            status: "success",
            data: task
        });
    } catch (err) {
        res.status(400).json({ message: "Error updating task", error: err });
    }
};
const  DeleteUsertasks = function (req, res) {
    const { id } = req.params;
    UsertasksModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Task deleted successfully" });
        })
        .catch((err) => {
            res.status(400).json({ message: "Error deleting task", error: err });
        });
};

module.exports = {
    setSocketInstance,
    checkusertasks,
    CreateUsertasks,
    getuserVerified,
    getUsertasks,
    getTeamTasks,
    DeleteUsertasks,
    UpdateUsertasks
};
