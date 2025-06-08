import Product from "../models/product.js";


export function getProduct(req,res){
    Product.find().then(
        (productList)=>{
            res.json({
                list : productList
            })
        } 

    ).catch(
        (err)=>{
            res.json({
                message : "Error"
            })
        }
    )

}


export function createProduct(req,res){
    
    console.log(req.user)

    if(req.user == null) {
        res.json({
            message : "You are not log in"
        })

        return
    }

    if(req.user.type != "admin") {
        res.json ({
            message : "You are not admin"
        })

        return
    }

    const product = new Product(req.body)  
    product.save().then(()=>{
        res.json({
            message : "Product Created"
        })
    }).catch(()=>{
        res.json({
            message : "Product not created"
        })
    })

}


export function deleteProduct(req,res){
    Product.deleteOne({name : req.body.name}).then(
        ()=>{
            res.json({
                message : "product deleted successfully"
            })
        }
    ).catch(()=>{
        res.json({
            message : "Product is not deleted" 
        })
    })
}

export function getProductByName(req,res){

    const name = req.params.name;
    Product.find({name : name}).then(
        (productList)=>{

            if (productList.length == 0){
                res.json({
                    message : "Product not found"
                })
            }else{
                res.json({
                    list : productList
                })
            }
        }
    ).catch(
        ()=>{
            res.json({
                mesage : "Error"
            })
        }
    )
}  