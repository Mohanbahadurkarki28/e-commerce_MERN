const { Router } = require('express')
const {Front} = require("@/controllers")
const {auth,customerOnly} = require("@/lib/middlewares");


const router=Router();

router.get('/latest', Front.ProductsCtrl.latest)
router.get('/featured', Front.ProductsCtrl.featured)
router.get('/top-selling', Front.ProductsCtrl.topSelling)
router.get('/:id/similar', Front.ProductsCtrl.similar)
router.get('/:id', Front.ProductsCtrl.byId)
router.post('/:id/review', auth,customerOnly, Front.ProductsCtrl.review)





module.exports=router
