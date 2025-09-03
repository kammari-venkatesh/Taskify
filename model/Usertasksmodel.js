const mongoose = require("mongoose");

const Usertasksschemarules = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Open", "Completed"],
        default: "Open"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
      teamId: {
        type: String,
        default: "TEAM_001"
    }
   
};

const UsertasksModel = mongoose.model("Usertasksdb", new mongoose.Schema(Usertasksschemarules));

module.exports = UsertasksModel;
