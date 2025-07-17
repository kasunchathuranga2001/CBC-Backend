import Order from "../models/order.js";

export async function createOrder(req,res) {
    try{
        const latestOrder = await Order.find().sort
        ({date : -1}).limit(1)

        let orderId

        if(latestOrder.length == 0) {
            orderId = "CBC0001"
        }else{
             
        }

    }catch(error) {
        res.status(500).json({
            message : error.message
        })
    }
}