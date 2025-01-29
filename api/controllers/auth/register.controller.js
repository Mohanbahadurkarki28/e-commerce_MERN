
const bcrypt=require('bcryptjs')
const {User} = require("@/models");
const{validationError}=require('@/lib/functions')
const {errorMsg} = require("@/lib/functions");

class RegisterController{
  register=async(req,res,next)=>{
   //res.send(req.body)
    //
    try{
      const {name,email,password,confirmPassword,phone,address}=req.body
     // throw new error('thid isd fdifsdjfdf')
      if(password==confirmPassword){
           //const hashed =bcrypt.hashSync(password,bcrypt.genSaltSync(10))//shortcut salt is extra bit of data if used in hash can make it more secure
        const hashed =bcrypt.hashSync(password)//normally 10 so no need to write .bigger the no more secure but need more power
       await User.create({name,email,password:hashed,phone,address})
        res.status(201).send({
          message: 'Thank u for registering'
        })
      }else {
        //next({
        // message:"There was some data validation error.",
        // status:422,
        // validation:{
        validationError(next, {
          password: "Password is not confirmed.",
        })
      }
    }catch(error){
      errorMsg(next,error)
     /* console.log(error)
      if ('errors'in error) {
        let validation = {}
        for (let k in error.errors) {
          validation = {
            ...validation,
            [k]: error.errors[k].message,
          }
        }

        //next({
        // message:"There was some data validation error.",
        // status:422,
        validationError(next,validation)
      }else if ('code' in error && error.code==11000)
        validationError(next,{
          email:'the given email is taken',
      })else {
        next({
          message:'problem while processing',
        })
      }*/

        }
    }
  }
module.exports=new RegisterController