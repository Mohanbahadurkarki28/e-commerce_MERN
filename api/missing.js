//Profile.controller.js

import {errorMsg, notFoundError} from "./lib/function";
import {Product} from "./models";
import {unlinkSync} from "node:fs";

reviews=async(req,res,next)=>{
    try{
        let reviews=await Review.aggregate()
            .match({userId:new Types.ObjectId(req.user._id)})
            .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
        for(let i in reviews){

        }
        res.send(reviews)
    }catch(error){
        errorMsg(next,error)
    }
}

orders=async(req,res,next)=>{
    try{
        let orders=await Order.find({userId:req.user._id})
        for(let i in orders){
            let details=await Detail.aggregate()
                .match({orderId:order[i]._id})
                .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
            for(let j in details){
                details[j].products=details[j].products[0]
            }
            orders[i]= {
                ...orders[i].toObject(),
                details
            }
        }
        res.send(orders)
    }catch(error){
        errorMsg(next,error)
    }
}

//cms/reviews.controller.js
class ReviewsController{
    index=async(req,res,next)=>{
        try{
            let reviews=await Review.aggregate()
                .lookup({from:'products',localField:'productId',foreignField:'_id',as:'product'})
                .lookup({from:'users',localField:'userId',foreignField:'_id',as:'user'})
            for(let i in reviews){
                reviews[i].product=reviews[i].product[0]
                reviews[i].user=reviews[i].user[0]
            }
            res.send(reviews)
        }catch(error){
            errorMsg(next,error)
        }
    }
    destroy=async(req,res,next)=>{
        try{
            const {id}=req.params

            const product=await Product.findById(id)
            if(product) {
                for(let file of product.images){
                    unlinkSync(`./uploads/${file}`)
                }
                await Product.findByIdAndDelete(id)

                res.send({
                    message: 'Product Deleted.'
                })
            }else{
                notFoundError(next,'Product')
            }
        }catch(error){
            errorMsg(next,error)
        }
    }

}