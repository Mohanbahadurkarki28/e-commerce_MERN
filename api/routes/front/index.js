const { Router } = require('express')
const productsRoutes=require('./products.routes')
const mixRoutes=require('./mix.routes')
const router=Router();

router.use('/products', productsRoutes)
router.use(mixRoutes)

module.exports=router