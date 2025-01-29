const {Product, Categories, Brands, Details, Orders} = require("@/models");
const {errorMsg, notFoundError} = require("@/lib/functions");

class MixController{
    categories=async (req,res,next)=>{
        try{
            const categories=await Categories.find({status:true})
            res.send(categories)
        }catch(error){
            errorMsg(next,error)
        }
    }

    catrgoryById=async (req,res,next)=>{
        try{
            const {id}=req.params
            const category=await Categories.findOne({status:true,_id:id})
            if (category){
                res.send(category)
            }
           else{
               notFoundError(next,'Catogories')
            }
        }catch(error){
            errorMsg(next,error)
        }
    }

    brands=async (req,res,next)=>{
        try{
            const brands=await Brands.find({status:true})
            res.send(brands)
        }catch(error){
            errorMsg(next,error)
        }
    }

    brandById=async (req,res,next)=>{
        try{
            const {id}=req.params
            const category=await Brands.findOne({status:true,_id:id})
            if (category){
                res.send(category)
            }
            else{
                notFoundError(next,'Brands')
            }
        }catch(error){
            errorMsg(next,error)
        }
    }
    checkout=async (req,res,next)=>{
        try{
           const cart=req.body
            const orders= await Orders.create({userId:req.user._id, status:'processing'})
            for(let item of cart){
                const products = await Product.findById(item.productId)
                const price=products.discountedPrice>0 ? products.discountedPrice:products.price
                const total=price*item.qty

                await Details.create({price,total,quantity:item.qty,orderId:orders._id,productId:products._id})
            }
            next({
                message:"Thank u for your order.We will update you soon."
            })
        }catch(error){
            errorMsg(next,error)
        }
    }
}
module.exports=new MixController