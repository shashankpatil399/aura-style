const express = require("express"); 
const app = express();
const mongoose = require("mongoose"); 
const router = require("./routes/routess")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(router)


mongoose.connect('mongodb://localhost:27017/userdb').then(()=>{
    console.log("mongodb connect")
}).catch((error)=>{
    console.log("mongodb connect",error);
})

app.listen(8040,()=>{
    console.log("server is run on 8040")
}) 