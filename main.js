const server = require('./index')
const PORT = process.env.PORT || 5000



server.listen(PORT, ()=>{
    console.log("server is running")
})
