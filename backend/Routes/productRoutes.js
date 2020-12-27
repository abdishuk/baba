import express from 'express'
const router=express.Router()
import Product from '../Models/productModel.js'
import asyncHandler from 'express-async-handler'
import{authToken,admin} from '../utils/auth.js'

// @desc get all products
// @access public
// @ route Get api/products
router.get('/',asyncHandler(async(req,res)=>{
const products=await Product.find({})
res.json(products)
}))

// @desc get a product by id
// @access public
// @ route Get api/products/:id
router.get('/:id',asyncHandler(async(req,res)=>{
    const product= await Product.findById(req.params.id)
    if (product)
    res.json(product)
    else
    res.status(404).json({msg:'no product found'})
}))
router.post('/',authToken,admin,asyncHandler(async(req,res)=>{
    const product=new Product({
       name:'sample name' ,
       price:0,
       user:req.user._id,
       image:'/images/airpods.jpg', 
       category:'sample Category',
       countInstock:0,
       numReviews:0,
       description:'sample description'
    })
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
   
}))
router.put('/:id/update',authToken,admin,asyncHandler(async(req,res)=>{
    console.log('update route hit')
    const product=Product.findById(req.params.id)
    const{name,price,image,countInStock,category,description}=req.body
    if(product){
        product.name=name
        product.image=image
        product.countInStock=countInStock
        product.category=category
        product.description=description
        product.price=price
        const updatedProduct=await product.save()
        /*const updatedProduct=await product.save()
        console.log(updatedProduct)*/
    res.status(201).json(updatedProduct)
    } else{
        res.status(401).json('Product not found')
    }
    
    
}))


export default router