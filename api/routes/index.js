const {Router}=require('express')
const authRoutes=require('./auth.routes')
const profileRoutes=require('./profile.routes')
const cmsRoutes=require('./cms')
const frontRoutes=require('./front')
const {auth, cmsUser} = require("@/lib/middlewares");
const {notFoundError} = require("@/lib/functions");

const router=Router()

router.use('/auth',authRoutes)

router.use('/profile',auth,profileRoutes)

router.use('/cms',auth,cmsUser,cmsRoutes)

router.use(frontRoutes)

router.use((req,res,next)=>{
   notFoundError(next,'URL')
})

module.exports=router