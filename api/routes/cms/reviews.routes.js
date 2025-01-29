const {Router}=require('express')
const {Cms} = require("@/controllers");
const {upload} = require("@/lib/middlewares");


const router = Router()

router.get('/',Cms.ReviewsCtrl.index)

router.delete('/:id',Cms.ReviewsCtrl.destroy)



module.exports= router