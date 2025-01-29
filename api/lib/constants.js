
const {Types}=require('mongoose')

const stringRequired={
  type:String,
  required:true,
}
const boolTrue={
  type:Boolean,
  default:true,
}
const modelConfig={
  timestamps:true,
  autoIndex:true,
  autoCreate:true,
}
const numRequired={
  type:Number,
  required:true,
}
const relatedRequired={
  type:Types.ObjectId,
  required:true
}

module.exports={stringRequired,boolTrue,modelConfig,numRequired,relatedRequired}