const mongoose = require("mongoose")
const UserSchemaRules = {
    name : {
        type:String,
        require :true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true ,
        minlength : 9
    },
    confirmPassword : {
        type: String ,
        require : true ,
        minlength : 9,
        validate : function(){
            return this.password == this.confirmPassword;
        }
    },
    createAte : {
        type: Date,
        default : Date.now()
    }
 } 
 const  UserSchema = new mongoose.Schema(UserSchemaRules)
 const  UserdetailsModel  = mongoose.model("UserdetailsModel",UserSchema)

module.exports = UserdetailsModel;