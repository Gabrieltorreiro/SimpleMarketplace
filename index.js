const express = require("express");
const app = express();
const path = require("path");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/client",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/client.html"));
});

app.get("/seller",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/seller.html"));
});


app.listen(3000);