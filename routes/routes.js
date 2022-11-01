 const routes = require('express').Router();
 const {controller, updateStock, addStock, postProductDetail,loginUser, getProductBill, getProduct, getProductDetail} = require('../controller/result_controller');
const {result_validator} = require('../middleware/globalmiddleware');
const{product_validator, addProduct_validator} = require('../validation/product_validation');

 (()=>{
   get_request()
    post_request()
    patch_request()
    
 })();

 function get_request(){
   routes.get('/getDetails',getProductDetail)
   routes.get('/getProduct',getProduct)
   routes.get('/getBill',getProductBill)

 }
 function post_request(){
    routes.post("/invetoryProduct",product_validator(),result_validator,controller)
    routes.post("/product",postProductDetail)
    routes.post("/login",loginUser) 

 }
 function patch_request(){
    routes.patch("/updatestock",updateStock)
    routes.patch('/addStock',addProduct_validator(),addStock)



 }
  
    
 

module.exports = routes