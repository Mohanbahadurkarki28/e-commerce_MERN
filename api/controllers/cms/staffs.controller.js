const {errorMsg, validationError, notFoundError} = require("@/lib/functions");
const {User} = require("@/models");
const bcrypt = require("bcryptjs");

class staffsController{
    index = async(req, res, next) => {
        try{
            const staffs = await User.find({role:'Staff'})
            res.send(staffs)

        }catch(error){
            errorMsg(next, error)
        }
    }
    store = async (req, res, next) =>{
        try{
            const{name, email, password, confirmPassword, phone, address, status} = req.body

            if(password == confirmPassword) {
                const hashed = bcrypt.hashSync(password)

                await User.create({name, email, password:hashed, phone, address, status, role: 'Staff'})

                res.status(201).send({
                    message: 'Staff added'
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
            const staff = await User.findById(id)
            if(staff && staff.role == 'Staff'){
                res.send(staff)
            }else{
                notFoundError(next, 'Staff')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

    update = async (req, res, next)=> {
        try {
            const {id} = req.params
            const staff = await User.findById(id)
            if (staff && staff.role == 'Staff') {
                const {name, phone, address, status} = req.body

                await User.findByIdAndUpdate(
                    id,
                    {name, phone, address, status},
                    {runValidators: true},
                )
                res.send({
                    message: 'staff updated.',
                })
            } else {
                notFoundError(next, 'Staff')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    destroy = async (req,res,next) =>{
        try{
            const{id}= req.params

            const staff = await User.findById(id)

            if(staff && staff.role == 'Staff') {
                await User.findByIdAndDelete(id)

                res.send({
                    message: 'staff deleted.',
                })
            }else{
                notFoundError(next, 'Staff')
            }
        }catch(error){
            errorMsg(next, error)
        }
    }

}

module.exports = new staffsController
