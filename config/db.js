const dotenv =require("dotenv")
dotenv.config();

 const mongoose =  require("mongoose");
const {PORT , DB_USERNAME , DB_PASSWORD} =process.env

const DB_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.mqh7sqq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
function connectDB() {
  mongoose.connect(DB_URL).then(function(connection){

  }).catch(err => console.log(err))
}

module.exports = connectDB;
