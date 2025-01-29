const { Router } = require('express')
const {Front} = require("@/controllers");
const {auth, customerOnly} = require("@/lib/middlewares");


const router=Router();

router.get('/categories',Front.MixCtrl.categories)
router.get('/categories/:id/products',Front.ProductsCtrl.byCategoryId)
router.get('/categories/:id',Front.MixCtrl.catrgoryById)

router.get('/brands',Front.MixCtrl.brands)
router.get('/brands/:id/products',Front.ProductsCtrl.byBrandId)
router.get('/brands/:id',Front.MixCtrl.brandById)

router.get('/image/:filename',(req,res,next)=>{
    const{filename}=req.params
    res.sendFile(`./uploads/${filename}`,{root:'./'})
})

router.post('/checkout',auth,customerOnly,Front.MixCtrl.checkout)

module.exports=router