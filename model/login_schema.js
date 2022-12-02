 
const mongoose = require('mongoose')
const login_schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
     
})

const loginSchema = mongoose.model("login_schema",login_schema);
module.exports = loginSchema

