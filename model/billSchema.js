const mongoose = require('mongoose')
const bill_schema = new mongoose.Schema({
    product:{
        type:Array,
        required:true,
    },
    quantity:{
        type:Array,
        min:1,
        require:true,
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
        require:true,
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
        require:true,
    },
    mobile_No:{
        type:Number,
        require:true
    }
})

const billSchema = mongoose.model("bill_schema",bill_schema);
module.exports = billSchema

