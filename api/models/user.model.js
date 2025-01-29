const {Schema,model}=require('mongoose')
const {stringRequired,boolTrue,modelConfig}=require('@/lib/constants')



const User= model('User',new Schema({
  name:stringRequired,
  email:{
   ...stringRequired,
    unique:true,
  },
  password: {
    ...stringRequired,
    select:false,
  },
  phone:{
    ...stringRequired,
    maxlength:[20,'This phone should not exceed 20 characters'],
  },
  address:stringRequired, 
  role:{
    type:String,
    enum:['Admin','Staff','Customer'],
    default:'Customer'
  },
  status:boolTrue,
  
},modelConfig))
module.exports=User