const {errorMsg,notFoundError} = require("@/lib/functions");
const {Brands} = require("@/models");

class brandsController{
    index = async(req, res, next) => {
        try{
            const brands = await Brands.find()
            res.send(brands)

        }catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) =>{
        try {
            const {name, status} = req.body

            await Brands.create({name, status})

            res.status(201).send({
                message: 'Brand added'
            })

        }catch(error){
            errorMsg(next, error)
        }
    }
    show = async (req,res,next) =>{
        try{
            const {id} = req.params
            const brands = await Brands.findById(id)
            if(brands){
                res.send(brands)
            }else{
                notFoundError(next, 'Brands')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next)=> {
        try {
            const {id} = req.params
            const brands = await Brands.findById(id)
            if (brands) {
                const {name,status} = req.body

                await Brands.findByIdAndUpdate(
                    id,
                    {name,status},
                    {runValidators: true},
                )
                res.send({
                    message: 'Brand updated.',
                })
            } else {
                notFoundError(next, 'Brnads')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const brands = await Brands.findById(id)

            if(brands) {
                await Brands.findByIdAndDelete(id)

                res.send({
                    message: 'Brands deleted.',
                })
            }else{
                notFoundError(next, 'Brands')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new brandsController
