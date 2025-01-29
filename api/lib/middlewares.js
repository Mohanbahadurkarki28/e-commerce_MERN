const jwt =require('jsonwebtoken')
const {env} = require("@/lib/functions")
const{User}=require("@/models")
const multer=require('multer')
const auth = async (req,res,next)=>{
   try{
       if('authorization' in req.headers){
           const token=req.headers.authorization.split(' ').pop()

           const decoded = jwt.verify(token,env('JWT_SECRET'))

           const user =await User.findById(decoded.uid)

           if(user){
               if(user.status){
                   req.user=user

                   next()
               }else{
                   next({
                       message:'User account deactivated.',
                       status:403
                   })
               }
           }else{
               next({
                   message:'Bearer token is invalid.',
                   status:401
               })
           }
       }else{
           next({
               message:'Bearer token is missing.',
               status:401
           })
       }
   }catch(error){
       next({
           message:'Bearer token is invalid.',
           status:401
       })
   }
}
const cmsUser=(req,res,next)=>{
    if(req.user.role !='Customer'){
        next()
    }else{
        next({
            message:'Access denied',
            status:403,
        })
    }
}

const adminonly=(req,res,next)=>{
    if(req.user.role =='Admin'){
        next()
    }else{
        next({
            message:'Access denied',
            status:403
        })
    }
}
const customerOnly=(req,res,next)=>{
    if(req.user.role =='Customer'){
        next()
    }else{
        next({
            message:'Access denied',
            status:403
        })
    }
}
const upload=()=>multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
           cb(null,'./uploads')
        },
        filename:(req,file,cb)=>{
        const ext =file.originalname.split('.').pop()
            cb(null,Date.now() + '-'+ Math.round(Math.random()*1E9) + `.${ext}`)
        }
    }),
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image')){
            cb(null,true)
        }else{
            cb(new Error('Only image file supported.'))
        }
    }
})

module.exports={auth,cmsUser,adminonly,customerOnly,upload}