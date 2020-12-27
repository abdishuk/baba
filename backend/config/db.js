import mongoose from 'mongoose'

const connectDB=async ()=>{
    try {
        const conn=await mongoose.connect('mongodb+srv://shukri2014:shukri2014@devconnector.ia5do.mongodb.net/CakeShop?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex:true
        })
        console.log('Mobgodb connected on '+ conn.connection.host)
    } catch (error) {
        console.error('Error: '+ error.message)
        process.exit(1)
    }
}
export default connectDB