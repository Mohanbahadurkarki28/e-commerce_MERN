const {Schema,model}=require('mongoose')
const {stringRequired,boolTrue,modelConfig}=require('@/lib/constants')

const Brands =model('Brands',new Schema({
  name:stringRequired,
  status:boolTrue,
  
},modelConfig))
module.exports =Brands