const {errorMsg,notFoundError} = require("@/lib/functions");
const {Product}=require('@/models')
const{unlinkSync}=require('node:fs')

class productsController{
    index = async(req, res, next) => {
        try{
            let products = await Product.aggregate()
                .lookup({from:'categories', localField:'categoryId', foreignField:'_id', as:'category'})
                .lookup({from:'brands', localField:'brandId', foreignField:'_id', as:'brand'})

            for(let i in products){
                products[i].category=products[i].category[0]
                products[i].brand=products[i].brand[0]
            }


            res.send(products)

        }catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) =>{
        try{
            const{name,description,summary,price,discountPrice,categoryId,brandId,featured,status} = req.body
            let images=req.files.map(file=>file.filename)

            await Product.create({name,description,summary,price,discountPrice,categoryId,brandId,featured,status,images})

            res.status(201).send({
                message: 'Product added'

            })
        }catch(error){
            errorMsg(next, error)
        }
    }
    show = async (req,res,next) =>{
        try{
            const {id} = req.params
            const products = await Product.findById(id)
            if(products){
                res.send(products)
            }else{
                notFoundError(next, 'Product')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next)=> {
        try {
            const {id} = req.params
            const products= await Product.findById(id)
            if (products) {
                const{name,description,summary,price,discountPrice,categoryId,brandId,featured,status} = req.body

                let images =products.images
                if(req.files?.length>0){
                    let temp =req.files.map(file=>file.filename)

                    images=[
                        ...images,
                        ...temp,
                    ]
                }

                await Product.create({name,description,summary,price,discountPrice,categoryId,brandId,featured,status,images})

                res.send({
                    message: 'Product updated'

                })
            } else {
                notFoundError(next, 'Product')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const products = await Product.findById(id)

            if(products) {
                for(let file of products.images){
                    unlinkSync(`./uploads/${file}`)
                }
                await Product.findByIdAndDelete(id)

                res.send({
                    message: 'Product deleted.',
                })
            }else{
                notFoundError(next, 'Product')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }
    image=async(req,res,next)=>{
        try{
            const{id,filename}=req.params
            const products=await Product.findById(id)
            if(products){
                if(products.images.length>1){
                    unlinkSync(`./uploads/${filename}`)
                    const images=products.images.filter((file=>file !=filename))
                    await Product.findByIdAndUpdate(id,{images})
                    res.send({
                        message:'Product image deleted.'
                    })
                }else{
                    next({
                        message:'At least one image must remain in the product.',
                        status:403
                    })
                }

            }else{
                notFoundError(next,'Product')
            }
        }catch(error){

        }

    }

}

module.exports = new productsController
