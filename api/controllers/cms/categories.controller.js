const {errorMsg,notFoundError} = require("@/lib/functions");
const {Categories} = require("@/models");

class categoriesController{
    index = async(req, res, next) => {
        try{
            const categories = await Categories.find()
            res.send(categories)

        }catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) =>{
        try {
            const {name, status} = req.body

            await Categories.create({name, status})

            res.status(201).send({
                message: 'Categories added'
            })

        }catch(error){
            errorMsg(next, error)
        }
    }
    show = async (req,res,next) =>{
        try{
            const {id} = req.params
            const categories = await Categories.findById(id)
            if(categories){
                res.send(categories)
            }else{
                notFoundError(next, 'Categories')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next)=> {
        try {
            const {id} = req.params
            const categories = await Categories.findById(id)
            if (categories) {
                const {name,status} = req.body

                await Categories.findByIdAndUpdate(
                    id,
                    {name,status},
                    {runValidators: true},
                )
                res.send({
                    message: 'Categories updated.',
                })
            } else {
                notFoundError(next, 'Categories')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const categories = await Categories.findById(id)

            if(categories) {
                await Categories.findByIdAndDelete(id)

                res.send({
                    message: 'Categories deleted.',
                })
            }else{
                notFoundError(next, 'Categories')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new categoriesController
