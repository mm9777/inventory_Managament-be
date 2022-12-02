const {check} = require("express-validator")
const moduleSchema = require('../model/module_schema')
 
 

exports.product_validator = () => {
    return [
      check('product')
       
      .custom( async (product,{req})=>{
        const prod = req.body.product
        console.log(prod,"jnn",req.body)
       
       const user_info = await moduleSchema.findOne({product:prod})
                    
        console.log("wwwwwwwww",user_info)
  
        if(user_info){
             throw new Error("product is allready exist"); 
        // req.body.userInfo = user_info;
      }
        
  else{
    // throw new Error("Invalid User")
         req.body.userInfo = user_info;
  }
        return true
      }),
     ]
  }
  exports.addProduct_validator = () => {
    return [
      check('product')
      
      .isAlpha().withMessage("product is always in characters")
    ]
  }
  exports.billProduct_vlidator = () => {
    return [
      check('product')
      .isAlpha().withMessage("product is always in characters") 
    ]
  }  