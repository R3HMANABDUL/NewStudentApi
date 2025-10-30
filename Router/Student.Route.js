const express = require("express");
const router = express.Router();
const Student = require("../Model/StudentModel");

// 🔹 Get All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Get One Student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student Not Found" });
    }
    res.status(200).json(student); // ✅ 200 instead of "201"
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔹 Add New Student
router.post("/", async (req, res) => {
  try {
    const { name, email, age, course, isActive } = req.body;

    // ✅ You forgot to await .save()
    const newStudent = new Student({ name, email, age, course, isActive });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

// 🔹 Update Student (PUT)
router.put("/:id", async (req, res) => {
  try {
    console.log("Received body:", req.body); 
    const { name, email, age, course, isActive } = req.body;
    
    
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,                            // Which student to update
      { name, email, age, course, isActive },   // New data
      { new: true, runValidators: true }        // Options: return updated doc + validate schema
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.status(200).json(updatedStudent);       // ✅ Return updated student
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error",message:error.message });
  }
});

// 🔹 Delete Student (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student Not Found" });
    }

    res.status(200).json({ message: "Student Deleted Successfully ✅" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;