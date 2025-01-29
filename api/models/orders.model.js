const {Schema,model}=require('mongoose')
const {modelConfig,relatedRequired}=require('@/lib/constants')

const Orders =model('Orders',new Schema({
  userId:{
    ...relatedRequired,
    ref:'User',
  },
  status:{
    type:String,
    enum:['processing','confirmed','shipping','delivered','cancelled'],
    default:'processing',
  },
  
},modelConfig))
module.exports =Orders