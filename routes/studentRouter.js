import express from "express";

const studentRouter =express.Router();

studentRouter.get("/",(req,res)=>{
    console.log("This is a get request for student router")

    res.json({
        message: "This is a get request for student router"
    })
})


studentRouter.post("/",(req,res)=>{
    
    const student = new Student(req.body)
    student.save().then(()=>{
        res.json({
            message: "Student created"
        })
    }).catch(()=>{
        res.json({
            message :"Student not found"
        })
    })
    
})

export default studentRouter;