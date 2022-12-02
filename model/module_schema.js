
const mongoose = require('mongoose')
const add_schema = new mongoose.Schema({
    product:{
        type:Array,
        required:true,
    },
    price:{
        type:Array,
        required:true,
    },
    quantity:{
        type:Array,
        required:true,
    }, 
    unit:{
        type:String,
        required:true,
    },
    myprice:{
        type:Array,
        required:true,
    },
  
    updated_on:{
        type: Date,
        default: new Date()
    
        
    }

    
    

    
    
})
 
const moduleSchema = mongoose.model("module_schema",add_schema);


    

module.exports = moduleSchema
