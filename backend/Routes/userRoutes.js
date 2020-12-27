import bcrypt from 'bcryptjs'
import User from '../Models/userModel.js'
import express from 'express'
import AsyncHandler from 'express-async-handler'
const router=express.Router()
import generateToken from '../utils/generateToken.js'

   // login user post api/users/logim
   //@ access public
router.post('/login',AsyncHandler(async(req,res)=>{
   const{email,password}=req.body
    const user=await User.findOne({email})
    
    if(user &&(await user.matchPassword(password))){
        res.status(201).json({
          _id: user._id,
          name:user.name,
          email:user.email,
          contact:user.contact,
          isAdmin:user.isAdmin,
          token:generateToken(user._id)
        })
      } else{
        res.status(401).json({
            error:'invalid password or user'
        })}
        
}))

// register user post api/users
   //@ access public
   router.post('/',AsyncHandler(async(req,res)=>{
    const{email,name,contact,password}=req.body
     const user=await User.findOne({email})
     if(user){
        return res.status(400).json({msg:'user already exists'})
     }
     const createUser=new User({
         email,name,password,contact
     })
     await createUser.save()
     if(createUser){
            res.status(201).json({
              _id: createUser._id,
              name:createUser.name,
              email:createUser.email,
              isAdmin:createUser.isAdmin,
              contact:createUser.contact,
              token:generateToken(createUser._id)
            })
           
     }
    
         
 }))
 // get list of users
  router.get('/users',AsyncHandler(async(req,res)=>{
  
    const users=await User.find({})
    if(users){
      res.status(201).json(users)
    }
  

  }))



export default router