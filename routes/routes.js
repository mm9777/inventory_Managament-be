 const routes = require('express').Router();
 const {controller, updateStock, addStock, postProductDetail,loginUser, getProductBill, getProduct, getProductDetail,getProductDate, getProductUpdate, getProductDate1, getAmount} = require('../controller/result_controller');
const {result_validator} = require('../middleware/globalmiddleware');
const{product_validator, addProduct_validator,billProduct_vlidator} = require('../validation/product_validation');

 (()=>{
   get_request()
    post_request()
    patch_request()
    put_request()
    
 })();

 function get_request(){
   routes.get('/getDetails',getProductDetail)
   routes.get('/getProduct',getProduct)
   routes.get('/getBill',getProductBill)
   routes.get('/getDate',getProductDate)
   routes.get('/getEdit',getProductUpdate)
   routes.get('/getDate1',getProductDate1)
   routes.get('/getAmount',getAmount)

 }
 function post_request(){
    routes.post("/invetoryProduct",product_validator(),result_validator,controller)   
    routes.post("/product",billProduct_vlidator(), postProductDetail) 
    routes.post("/login",loginUser) 
   //  routes.post("/addProduct",addProduct)

 }
 function patch_request(){
    routes.patch("/updatestock",updateStock)
    // routes.patch('/addStock',addStock) 



 }
 function put_request(){
  routes.patch('/addStock',addStock)  
 }
  
    
 

module.exports = routes