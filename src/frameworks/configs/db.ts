import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose'

const mongoUrl = process.env.MONOGO_URI
console.log(process.env.PORT);

if(!mongoUrl){
  console.error("mongourl is not defined")
  process.exit(1)
}
 
const connectDB = async()=>{
  try {
    const con = await mongoose.connect(mongoUrl,{dbName:'machineTest'})  
    console.log(`mongodb connected:${con.connection.host}`)
  } catch (error) {
    console.log(error);
    setTimeout(connectDB,5000)
    
    
  }
}
export default connectDB