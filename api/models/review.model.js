const {Schema,model}=require('mongoose')
const {stringRequired,numRequired,modelConfig,relatedRequired}=require('@/lib/constants')



const Review =model('Review',new Schema({
  userId:{
    ...relatedRequired,
    ref:'User',
  },
  productId:{
    ...relatedRequired,
    ref:'Products',
  },
  rating:numRequired,
  comment:stringRequired,
  
},modelConfig))
module.exports =Review