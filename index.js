const express = require("express");
const app = express();
const mongoose = require("mongoose")
const PORT = process.env.PORT||3000;
const StudentRout = require("./Router/Student.Route")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
const DbString = "mongodb+srv://abdulr3hman777_db_user:abdul123@studentcluster.svkh4ix.mongodb.net/?appName=StudentCluster"
mongoose.connect(DbString)
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.log("MongoDB connection error:", err));

// route 
app.use('/api/students',StudentRout)


app.listen(PORT,()=>{
    console.log(`Server is connect Port : ${PORT}`);
    
})