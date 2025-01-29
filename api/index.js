require('module-alias/register')
const express = require('express')
const mongoose=require('mongoose')
//const {User,Categories,Brands,Orders,Products,Review,Details}=require('./models/index')
const routes=require('./routes')
const {config}=require('dotenv')
const {env} = require("@/lib/functions");
const cors = require('cors')


config()


const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.use(routes)

app.use((error,req,res,next)=>{
  res.status(error.status||400).send({
    message:error.message||'problem while processing request.',
    validation:error.validation,
  })
})
//all

app.listen(env('API_PORT'),async()=>{
  console.log(`server started at http://localhost:${env('API_PORT')}`)
  console.log('Press Ctrl+C to stop..')

  //await mongoose.connect(process.env.MONGO_URL)
  await mongoose.connect(env('MONGO_URL'))
  console.log('MongoDB connected...')


 /*  const user=await User.find()
  console.log('user',user)

  const categories=await Categories.find()
  console.log('categories',categories)

  const products=await Products.find()
  console.log('products',products)

  const orders=await Orders.find()
  console.log('orders',orders)

  const details=await Details.find()
  console.log('details',details)

  const brands=await Brands.find()
  console.log('brands',brands)

  const review=await Review.find()
  console.log('review',review) */
})

 

/* 
Middleware- runs in middle(req ra res ko middle ma)
-Application -code we write
-Router- routing set garne (mapping)
-Built-In/First party-express ko library ma hunxa
-Third party-outside of express package for express
-Error-handleing
 */

/* /mvc-model 
view -
controller */

//JSON=javascript object Notation

let obj = {
  name:'Person A',
  age:36,
  subjects:['node','express']
}
//let jsonStr='{"name":"Person A","age":15,"subjects":["Node","React"]}'

//JSON.parse()  //to convert into json