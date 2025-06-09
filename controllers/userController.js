import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req, res) {

    const newUserData = req.body
    newUserData.password = bcrypt.hashSync(newUserData.password,10)

    console.log(newUserData)
    const user = new User(newUserData);

    user.save()
        .then(() => {
            res.status(201).json({
                message: "User created"
            });
        })
        .catch((error) => {
            console.error("Error creating user:", error); // Log the error to the console
            res.status(400).json({
                message: "User not created",
                error: error.message // Send the actual error message to the frontend
            });
        });
}
 


export function logingUser(req,res) {
    User.find({email : req.body.email}).then(
        (users)=>{
            if(users.length == 0) {
                res.json({
                    message : "user not found"
                })
            }else {
                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if(isPasswordCorrect){

                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePicture : user.profilePicture 
                    }, "process.env.SECRET")

                    console.log(token)

                    res.json({
                        message : "User logged in"
                    })
                }else {
                    res.json({
                        message : "User not logged in (Wrong password)"
                    })
                }
            }
        }
    )
}


export function deleteUser(req,res){
    User.deleteOne({email : req.body.email}).then(()=>{
        res.json({
            message : "User deleted"
        })
    })
}