const {Router}=require('express')
const staffsRoutes=require('./staffs.routes')
const customersRoutes=require('./customers.routes')
const brandsRoutes=require('./brands.routes')
const categoriesRoutes=require('./categories.routes')
const productsRoutes=require('./products.routes')
const reviewsRoutes=require('./reviews.routes')
const ordersRoutes=require('./orders.routes')



const {adminonly} = require("@/lib/middlewares");

const router = Router()

router.use('/staffs',adminonly,staffsRoutes)
router.use('/customers',customersRoutes)
router.use('/brands',brandsRoutes)
router.use('/categories',categoriesRoutes)
router.use('/products',productsRoutes)
router.use('/reviews',reviewsRoutes)
router.use('/orders',ordersRoutes)


module.exports= router