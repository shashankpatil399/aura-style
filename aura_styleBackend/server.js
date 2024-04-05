const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const router = require("./routes/routess")
 require("dotenv").config();
 const port = process.env.PORT;
const cors = require("cors")

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router)

mongoose.connect('mongodb://localhost:27017/userdb').then(()=>{

    console.log("mongodb connect")
    }).catch((error)=>{
    console.log("mongodb connect",error);
    })
    app.listen(port,()=>{
    console.log(`server is run on ${port}`)
    })