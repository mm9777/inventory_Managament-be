const mongoose = require('mongoose')
const bill_schema = new mongoose.Schema({
    product:{
        type:Array,
        required:true,
    },
    quantity:{
        type:Array,
        required:true,
    },
    unit:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        require:true,
    },
    gst:{
        type:String,
        require:true, 
    },
   
    discount :{
        type:Array,
        required:true,
    },
    payment : {
        type:String, 
        require:true,
    },
    status :{
        type:String,
        require:true,
    },
    billing_to:{
        type:String,
        required:true,
    },
    mobile_No:{
        type:Number,
        required:true
    },
    updated_on:{
           type:Date,
           default:new Date()
    }
})

const billSchema = mongoose.model("bill_schema",bill_schema); 
module.exports = billSchema

