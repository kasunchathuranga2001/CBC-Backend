import Product from "../models/product.js";

export function loginUser(req,res){
    (users)=>{
        res.json({
            message: "User logged in",
            token: token
        }) 
    } else{
        res.json({
            massage: "User not logged in (wrong pasword)"
        })
    }
}

