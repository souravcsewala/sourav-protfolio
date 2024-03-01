require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const protfoliorouter = require("./routes/protfolioroute");
const path = require('path');
const {mongodbconnect} =require("./database/protfoliodb")

const PORT = 7001;
const app = express();
const corsOptions = {
    origin: "http://localhost:8000",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };

dotenv.config(corsOptions);

// Middleware
app.use(cors());
app.use(express.json());

// Set the view engine and serve static files
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/protfolio", protfoliorouter);

app.get("/", (req, res) => {
    res.render("index.ejs");
});
// static for production
// app.use(express.static(path.join(__dirname,"../sourav-protfolio-app/dist")))
// console.log(path.join(__dirname,"../client/dist"))
// // index.html for production
//  app.get("*",function(req,res){
//         res.sendFile(path.join(__dirname,"../sourav-protfolio-app/dist/index.html"))
//  })
   
   mongodbconnect().then(()=>{
       app.listen(PORT,()=>{
           console.log(`the server is running at the port number ${PORT}`)
       })
   })


   

