import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const userSchema=mongoose.Schema({
    name:{
       type:String,
       required:true 
    },
    email:{
        type:String,
        required:true ,
        unique:true
     },
     contact:{
        type:String,
        required:true 
     },
     password:{
        type:String,
        required:true 
     },
     isAdmin:{
        type:Boolean,
        required:true ,
        default:false
     }
},{
    timestamps:true
}
)
// pre save middleware
 userSchema.pre('save',async function(next){
   if(!this.isModified('password'))
   next()
   const salt=await bcrypt.genSalt(10)
   this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.matchPassword=async function(enteredpassword){
 const psd=await bcrypt.compare(enteredpassword,this.password)
 return psd

} 
const User=mongoose.model('User',userSchema)
export default User