import express from 'express'
import dotenv from 'dotenv'	 // for creating .env file in the root to store environment variables
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'
const app=express()

import bodyParser from 'body-parser'
 
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// post api/users/login
// @desc login user
// @access public
app.use('/api/products',jsonParser,productRoutes)
app.use('/api/users',jsonParser,userRoutes)
app.use('/api/orders',jsonParser,orderRoutes)
dotenv.config() 
import products from './data/products.js'
import nodemailer from 'nodemailer'
import connectDB from './config/db.js'
connectDB()
app.use(express.json())// to post json data

// custom error middleware
app.use((err,req,res,next)=>{
    const statusCode=res.statusCode===200? 500:res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='production'?null:err.stack,
        
    })
})
// contact form route
app.post('/form',(req,res)=>{
    const{name,email,message,contact}=req.body
    nodemailer.createTestAccount((err,account)=>{
        const htmlEmail=`
        <h3>ContactFormDetails</h3>
        <ul>
        <li>Name:${name}</li>
        <li>Email:${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
        <h5>${contact}</h5>        `
        let transporter=nodemailer.createTransport({
            host: 'smtp.gmail.com',
port: 465,
secure: true,
            auth: {
                user: 'abdishukri.yussuf2014@gmail.com',
                pass: 'nuriya2016'
            }
        
        })
        let mailoptions={
            from:email,
            to:'abdishukri.yussuf2014@gmail.com',
            replyTo:email,
            subject:'New message',
            text:message,
            html:htmlEmail
        }
 transporter.sendMail(mailoptions,(err,info)=>{
     if(err){
          console.log(err)
          return res.json({error:err})
     }
     console.log('message sent',info.message)
     res.json(info.message)
     console.log('url',nodemailer.getTestMessageUrl(info))
 })
    })
})

// paypal route
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
  })
  

    app.listen(5000,console.log('server listening on port '+ process.env.PORT))

