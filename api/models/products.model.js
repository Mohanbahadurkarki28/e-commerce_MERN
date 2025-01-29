const {Schema,model}=require('mongoose')
const {stringRequired,boolTrue,modelConfig,numRequired,relatedRequired}=require('@/lib/constants')




const Product =model('Products',new Schema({
  name:stringRequired,
  description:stringRequired,
  summary:stringRequired,
  price:numRequired,
  discountPrice:{
    type:Number,
    default:0,
  },
  images:[stringRequired],
  categoryId:{
   ...relatedRequired,
    ref:'Category',
  },
  brandId:{
   ...relatedRequired,
    ref:'Brands',
  },
   status:boolTrue,
  featured:{
    type:Boolean,
    default:false,
  },
  
},modelConfig))
module.exports =Product
