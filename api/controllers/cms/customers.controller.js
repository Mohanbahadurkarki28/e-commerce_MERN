const {errorMsg, validationError, notFoundError} = require("@/lib/functions");
const {User} = require("@/models");
const bcrypt = require("bcryptjs");

class customersController{
    index = async(req, res, next) => {
        try{
            const customers = await User.find({role:'Customer'})
            res.send(customers)

        }catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) =>{
        try{
            const{name, email, password, confirmPassword, phone, address, status} = req.body

            if(password == confirmPassword) {
                const hashed = bcrypt.hashSync(password)

                await User.create({name, email, password:hashed, phone, address, status, role: 'Customer'})

                res.status(201).send({
                    message:"Customer added."
                })

            }else{
                validationError(next,{
                    password: "password is not confirmed.",

                })
            }

        }catch(error){
            errorMsg(next, error)
        }
    }
    show = async (req,res,next) =>{
        try{
            const {id} = req.params
            const customers= await User.findById(id)
            if(customers && customers.role == 'Customer'){
                res.send(customers)
            }else{
                notFoundError(next, 'Customer')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next)=> {
        try {
            const {id} = req.params
            const customers = await User.findById(id)
            if (customers && customers.role == 'Customer') {
                const {name, phone, address, status} = req.body

                await User.findByIdAndUpdate(
                    id,
                    {name, phone, address, status},
                    {runValidators: true},
                )
                res.send({
                    message: 'Customer updated.',
                })
            } else {
                notFoundError(next, 'Customer')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const customers = await User.findById(id)

            if(customers && customers.role == 'Customer') {
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'Customer deleted.',
                })
            }else{
                notFoundError(next, 'Customer')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new customersController