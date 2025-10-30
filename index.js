const express = require("express");
const app = express();
const mongoose = require("mongoose")

const StudentRout = require("./Router/Student.Route")
require("dotenv").config();
const DbString = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(DbString)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log("MongoDB connection error:", err));

// route 
app.use('/api/students',StudentRout)


app.listen(PORT,()=>{
    console.log(`Server is connect Port : ${PORT}`);
    
})