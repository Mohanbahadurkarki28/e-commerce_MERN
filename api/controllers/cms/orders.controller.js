const {Review, Orders, Details} = require("@/models");
const {errorMsg, notFoundError} = require("@/lib/functions");

class OrdersController{
    index = async (req, res, next) => {
        try {
            let orders=await Orders.aggregate()
                .lookup({from: 'users', localField: 'userId', foreignField: '_id', as: 'user'})

            for(let i in orders){
                let details=await Details.aggregate()
                    .match({orderId:orders[i]._id})
                    .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
                for(let j in details){
                    details[j].product=details[j].product[0]
                }
                orders[i]={
                    ...orders[i],
                    user:orders[i].user[0],
                    details

                }
            }
            res.send(orders)
        } catch (error) {
            errorMsg(next, error)
        }
    }
    update=async (req,res,next)=>{
        try{
            const{id}= req.params

            const reviews = await Orders.findById(id)

            if(reviews) {
                const{status}=req.body
                await Orders.findByIdAndUpdate(id,{status})

                res.send({
                    message: 'Order updated.',
                })
            }else{
                notFoundError(next, 'Orders')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const orders = await Orders.findById(id)

            if(orders) {
                await Details.deleteMany({orderId:orders._id})
                await Orders.findByIdAndDelete(id)

                res.send({
                    message: 'Order deleted.',
                })
            }else{
                notFoundError(next, 'Order')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
}
module.exports=new OrdersController()