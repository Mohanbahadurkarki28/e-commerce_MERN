const {Router}=require('express')
//const RegisterController=require('../controllers/auth/register.controller')
//after making index in auth
//const {RegisterCtrl}=require('../controllers/auth')
//after making index in controller
const {Auth}=require('@/controllers')
const router=Router()

//router.post('/register',RegisterController.register)         //RegisterController ko function register xa
//router.post('/register',RegisterCtrl.register)
//after change
router.post('/register',Auth.RegisterCtrl.register)
router.post('/login',Auth.LoginCtrl.login)
module.exports=router