const {Product,Review} = require("@/models")
const {errorMsg, notFoundError} = require("@/lib/functions")
const{Types}=require('mongoose')

class ProductsController{
    latest=async(req,res,next)=>{
        try{
            const products=await Product.find({status:true}).sort({'createdAt':"desc"})
            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    featured=async(req,res,next)=>{
        try{
            const products=await Product.find({status:true,featured:true}).sort({'createdAt':"desc"})
            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    topSelling=async(req,res,next)=>{
        try{
            const products=await Product.aggregate()
                .match({status:true})
                .lookup({from:'details',localField:'_id',foreignField:'productId',as:'details_count'})
                .addFields({'details_count':{$size:'$details_count'}})
                .sort({details_count:'desc'})

            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    byId=async(req,res,next)=>{
        try{
            const {id} =req.params
            let products=await Product.aggregate()
                .match({_id:new Types.ObjectId(id)})
                .lookup({from:'brands',localField:'brandId',foreignField:'_id',as:'brand'})

            if(products.length>0){  products=products[0]
                products.brand=products.brand[0]

                let reviews=await Review.aggregate()
                    .match({productId:products._id})
                    .lookup({from:'users',localField:'userId', foreignField:'_id', as:'user'})

                for (let i in reviews){
                    reviews[i].user=reviews[i].user[0]
                }
                products.reviews=reviews

                res.send(products)
            }
            else{
                notFoundError(next,'Product')
            }
        }catch(error){
            errorMsg(next,error)
        }
    }
    byCategoryId=async(req,res,next)=>{
        try{
            const {id}=req.params
            const products=await Product.find({status:true,categoryId:id})
            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    byBrandId=async(req,res,next)=>{
        try{
            const {id}=req.params
            const products=await Product.find({status:true,brandId:id})
            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    similar=async(req,res,next)=>{
        try{
            const {id}=req.params
            const product=await Product.findById(id)
            const products=await Product.find({status:true, categoryId:product.categoryId, _id:{$ne:id}})
            res.send(products)
        }catch(error){
            errorMsg(next,error)
        }
    }
    review=async(req,res,next)=>{
        try{
            const {id}=req.params
            const {rating,comment}=req.body

            await Review.create({rating,comment,userId:req.user._id,productId:id})

            next({
                message:'Thank you for your review'
            })


        }catch(error){
            errorMsg(next,error)
        }
    }
}
module.exports=new ProductsController()