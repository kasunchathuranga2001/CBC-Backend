import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; 
import userRouter from "./routes/userRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const app = express();


const mongoURL = process.env.MONGO_DB_URL

mongoose.connect(mongoURL,{})
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database conected");
})
 
app.use(bodyParser.json())

app.use(
    (req,res,next)=>{

        const token =req.header("Authorization")?.replace("Bearer ","")
        console.log(token)

        if(token != null) {
            jwt.verify(token,"process.env.SECRET",(error,
                decoded)=>{
                    if(!error) {
                        req.user = decoded
                    }
                })

        }

        next()
    }
)




app.use("/api/Users",userRouter) 

 

app.listen(
    5000,
    ()=>{ 
        console.log('Server is running on port 5000'); 
    }
)  