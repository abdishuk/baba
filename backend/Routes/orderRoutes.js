import Order from '../Models/orderModel.js'
import express from 'express'
import AsyncHandler from 'express-async-handler'
const router=express.Router()
import{authToken,admin} from '../utils/auth.js'






router.post('/',authToken,AsyncHandler(async(req,res)=>{
    const{  orderItems,
        deliveryAddress,
         paymentMethod,
         itemsPrice,
         deliveryPrice,
         taxPrice,
        totalPrice
    }=req.body
     
     const createOrder=new Order({
        orderItems,
        deliveryAddress,
         paymentMethod,
         itemsPrice,
         deliveryPrice,
         taxPrice,
        totalPrice,
        user:req.user._id
     })
     await createOrder.save()
     if(createOrder){
            res.status(201).json(
              createOrder
            )
           
     }
    
         
 }))


 
// @desc create new order
//@route POST /api/orders/id
// @access private
router.get('/:id',authToken,AsyncHandler(async(req,res)=>{
    
  const order=await Order.findById(req.params.id).populate('user','name')
  if(order){
      res.json(order)
  } else{
      res.status(404)
      throw new Error('order not found')
  }
 }))

 // @desc update order to paid
//@route put /api/orders/:id/pay
// @access private
router.put('/:id/pay', authToken,AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }
  
      const updatedOrder = await order.save()
  
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  }))


  
 // @desc mark order to delivered
//@route put /api/orders/:id/deliver
// @access private
router.put('/:id/deliver', authToken,AsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelvered = true
    order.deliveredAt = Date.now()
    
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}))

  // get all orders routes
  // @access private/admin only
  router.get('/',authToken,admin,AsyncHandler(async(req,res)=>{
    
    const orders=await Order.find({}).populate('user','name')
    if(orders){
        res.json(orders)
    } else{
        res.status(404)
        throw new Error('no orders found')
    }
   }))

 export default router
