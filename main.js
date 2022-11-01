const server = require('./index')
const PORT = 5000||process.env.PORT



server.listen(PORT, ()=>{
    console.log("server is running")
})
