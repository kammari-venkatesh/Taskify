const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userauthrouter = require("./routes/Userauthrouter");
const usertasksrouter = require("./routes/Usertasksrouter");

const { setSocketInstance } = require("./controllers/Usertaskscontrollers"); 
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://taskify-zq2i.vercel.app", 
        methods: ["GET", "POST","PUT", "DELETE"],
        credentials: true
    }
});


setSocketInstance(io);


app.use(cors({
    origin: "https://taskify-zq2i.vercel.app",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


app.use("/api/Auth", userauthrouter);
app.use("/api/tasks", usertasksrouter);

const  PORT  = process.env.PORT || 3000;


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((req, res) => {
    res.send({
        status: "failed",
        message: "something went wrong"
    });
});
