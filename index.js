const express = require("express");
const app = express();

const PORT = process.env.PORT||3000;


app.get('/',(req,res)=>{
    res.send("Hello Abdul — this is your first live backend 🚀")
})

app.listen(PORT,()=>{
    console.log(`Server is connect Port : ${PORT}`);
    
})