const {Schema,model}=require('mongoose')
const {numRequired,modelConfig,relatedRequired}=require('@/lib/constants')


const Details =model('Details',new Schema({
  orderId:{
    ...relatedRequired,
    ref:'Orders',
  },
  productId:{
    ...relatedRequired,
    ref:'Products',
  },
  quantity:numRequired,
  price:numRequired,
  total:numRequired,
 },modelConfig))
module.exports = Details