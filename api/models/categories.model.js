const {Schema ,model}=require('mongoose')
const {stringRequired,boolTrue,modelConfig}=require('@/lib/constants')

const Categories=model('Categories',new Schema({
  name:stringRequired,
  status:boolTrue,
},modelConfig))
module.exports=Categories