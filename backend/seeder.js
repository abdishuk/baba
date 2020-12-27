import dotenv from 'dotenv'
import users from './data/user.js'
import products from './data/products.js'
import User from './Models/userModel.js'
import Product from './Models/productModel.js'
import Order from './Models/orderModel.js'
import connectDB from './config/db.js'
import mongoose from 'mongoose'
connectDB()
const importData=async ()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
       const CreatedUsers= await User.insertMany(users)
       const adminUser=CreatedUsers[0]._id
       const sampleproducts=products.map((product)=>{
           return{...product,user: mongoose.Types.ObjectId(adminUser)}
       })
      await  Product.insertMany(sampleproducts)
      console.log('data imported')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
const destroyData=async ()=>{
    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()
      
      console.log('data destroyed')
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    importData()
} else{
    destroyData()
}