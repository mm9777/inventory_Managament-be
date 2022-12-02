const moduleSchema = require('../model/module_schema')
const billSchema = require('../model/billSchema')
const loginSchema = require('../model/login_schema')
const path = require('path');
const login = path.join(__dirname,'../Storage/login.json');
// var mongoXlsx = require('mongo-xlsx');
// const date = require('date-and-time');

exports.controller = async (req, res) => {
    console.log(req.body)
    moduleSchema(req.body).save((err, result) => {

        if (err) {
            res.send(new Error("Data not saved"));
        }
        else {
            console.log("bsdnb", result) 
            res.status(200).send({ result })
        }
    })

}

// -----------------addStock------------


exports.addStock = async (req, res) => {
    let { product, quantity, price,unit, myprice, myunit} = req.body
    console.log(req.body)
    let productDetail = await moduleSchema.findOne({product:product})  
    console.log(productDetail,"mmmmmmmm")
    if (productDetail) { 
        const netQuantity = parseInt(productDetail.quantity) + parseInt(req.body.quantity)
        const netMyprice = parseInt(productDetail.myprice) +parseInt(req.body.myprice) 
        const netPrice = parseInt(productDetail.price) +parseInt(req.body.price)
        console.log("kkkkkk", netPrice)
        console.log("ddddd", netMyprice)
        req.body.quantity = netQuantity
        const resuData = await moduleSchema.updateOne({ product }, { $set: { quantity: netQuantity, myprice: netMyprice, price: netPrice } }, { new: true })

        if (resuData) res.send({ resuData })
        else res.send({ err: "err occured" })
    }
    else {
        res.send({ msg: "product is not in our stock " })   
    }
}

// -------------billing Product------------

exports.postProductDetail = async (req, res) => {

    
    
    
    
    
    let { product, quantity, discount, payment, billing_to ,mobile_No} = req.body  
    // const indexOf=[]
   
    
    
 
    let products = []

    let amount = 0;
    var promise = await product?.map(async (val, i) => {
        products.push({ product: val, quantity: quantity[i] }) 
        let result = await moduleSchema.findOne({ product: val })
        console.log("vvvvvvvvvv", result)
        let myprice = (result.myprice / result.quantity) * quantity[i]
        console.log(myprice, "price")
        let resPrice = parseInt(myprice - (myprice * discount[i] / 100)) 
        amount = amount + resPrice
        console.log("final price", resPrice,amount)  
        return amount; 
    })


    let data = {
        products: products,
        gst: "5%",
        amount: 10,
        date: new Date(),
        discount: discount,
        payment: payment,
        status: "success",
        billing_to: billing_to,
        mobile_No: mobile_No


    }
    Promise.all(promise).then(function (results) {
        results.sort()
        // let data;
        let maxi = Math.max(...results)
        console.log("data",maxi)
        let pricewithgst = maxi * 5 / 100 + maxi
        console.log(pricewithgst)
        data.amount = pricewithgst
        console.log(results, "sdhb",data)
        billSchema(req.body).save({ data })
        res.send(data)   
    })
 
}

// ---------------------------
// exports.addProduct = async(req,res) =>{
//     let{product,quantity,price,unt,myprice,myunit}=req.body
//     // let products = [];

//     let promise = await product.map(async (val, i) => {
//         // products.push({ product: val, quantity: quantity[i],price:price[i],myprice:myprice[i] })
//         let result = await moduleSchema.findOne({ product: val })
//         console.log("vvvvvvvvvv", result)
//         let myprice = result.myprice
//         console.log("qqqq",myprice)
//         let quantity = result.quantity;
//         console.log("wwwww",quantity)

        
//     })
//     Promise.all(promise).then((result)=>{

//         // res.send({msg:"successdully stock is updated",result})
//     })
    
// }

    


// ---------------------updateStock--------------------

exports.updateStock = async (req, res) => {
    let { product, quantity, discount, payment, billing_to ,mobile_No,unit} = req.body  
    console.log(product)  


    

    var promise = await product?.map(async (val, i) => {
        let productDetail = await moduleSchema.findOne({ product: val })
        console.log(productDetail)

        let priceAccount = parseInt(productDetail.price) / parseInt(productDetail.quantity) 
        console.log("aaaaaaaa", quantity)
        let totalPurchasedAmount = priceAccount*quantity
        let resPrice = productDetail.price - totalPurchasedAmount 
        let resQuantity = productDetail.quantity - quantity
        console.log("hhsdfg",resPrice,resQuantity)
        let result = await moduleSchema.findOneAndUpdate({product:val},{quantity:resQuantity,price:resPrice},{new:true})
        return result;
        
    })
    let data = {
        product: product,
        gst: "5%",
        amount: 10,
        date: new Date(),
        discount: discount,
        unit:unit,
        payment: payment,
        status: "success",
        billing_to: billing_to,
        mobile_No: mobile_No


    }


    Promise.all(promise).then((result)=>{
        result.sort()
        // let data;
        let maxi = Math.max(...result)
        console.log("data",maxi)
        let pricewithgst = maxi * 5 / 100 + maxi
        console.log(pricewithgst)
        data.amount = pricewithgst
        console.log(result, "sdhb",data)
        billSchema(req.body).save({ data })

        res.send({msg:"successdully stock is updated",result})
    })


}
exports.getProductDetail = async(req,res,next)=>{
    let product = await moduleSchema.find()
    let bill = await billSchema.find()
    let totalAmount = 0;
    let sellerAmount = 0;
    let amount = await moduleSchema.find({})
    console.log("aaaaaaaaa",amount)
    let data = amount.map((val)=>{
       console.log(val.myprice)
       totalAmount += parseInt(val.price)
        sellerAmount += parseInt(val.myprice)
    })
    console.log("xxxxxxxx",sellerAmount)
    console.log(product,bill)   
    res.send({product,bill,totalAmount,sellerAmount})
}
exports.getProduct= async(req,res,next)=>{
    let Product = await moduleSchema.find() 
    console.log(Product)
    res.send({Product})
}
exports.getProductUpdate = ("_id",async(req,res)=>{
    let Product = await moduleSchema.findOne()
    console.log(Product)
    res.send(Product)
})
exports.getProductBill= async(req,res,next)=>{
    let bill = await billSchema.find()
    console.log(bill)
    res.send(bill)
}
exports.getAmount = async(req,res)=>{
    let totalAmount = 0;
    let amount = await moduleSchema.find({})
    console.log("aaaaaaaaa",amount)
    let data = amount.map((val)=>{
       console.log(val.myprice)
        totalAmount += parseInt(val.myprice)
    })
    console.log("xxxxxxxx",(totalAmount))
    let amount1 = amount.price

    // console.log(amount1)
   
    // console.log(data) 

}
 
exports.getProductDate = async(req,res)=>{
    const startDate = new Date(req.query.startDate)
    console.log("startdate",startDate) 
    const date1 = startDate.toISOString()
    
    const endDate = new Date(req.query.endDate)
    console.log(req.query.endDate)
    const date2 = endDate.toISOString()
    console.log(date1,date2)
    let update = await moduleSchema.find({updated_on:{$gte:date1,$lte:date2}});
    
       
       
         
    
    console.log(update)  
    res.send(update) 
}
 exports.getProductDate1 =async(req,res)=>{
    const startDate = new Date(req.query.startDate)
    console.log("startdate",startDate)
    const date1 = startDate.toISOString()
    
    const endDate = new Date(req.query.endDate)
    console.log(req.query.endDate)
    const date2 = endDate.toISOString()
    console.log(date1,date2)
    let update = await billSchema.find({updated_on:{$gte:date1,$lte:date2}});
    console.log(update)  
    res.send(update) 
 }
    
    

// return m.updated_on !== startDate
   // console.log(data)
    // let Date = Update.updated_on 
    // const str = Date.toString().slice(0,15) 
    // console.log("aaaa",Date);
    // console.log("mmmm",str)
    // res.send(data)
     
     

exports.loginUser = async(req,res,next) =>{
        const {email,password} = req.body 
        // console.log(req.body) 
        // const data = fs.readFileSync(login,'utf8')
        // const dataJson = data ? JSON.parse(data) : [];

        let user = await loginSchema.findOne({ email:email }) 
        if(!user){
            res.status(404).send("user not found")
        }
        else{
            if(!req.body.password){
                res.status(400).send("please provide a password")
            }
            else{
                if(req.body.password === user.password){
                    res.status(200).send(user)
                }
                else{
                    res.send("password not matched")
                }
            }
        }
      
        // let index = dataJson.findIndex(( v ) => v.email == email);
        // if (index<0) return next(new Error("No admin found"));
        // if (dataJson[index].password == password) return res.status(201).send({msg:'successfully login'})
        // return next(new Error("Password not matched"));
    
}
 


