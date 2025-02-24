import express,{NextFunction,Request,Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from '../routes/user.route'

const app = express()
dotenv.config()
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin:['http://localhost:3001'],
  optionsSuccessStatus:200,
  credentials:true
}))
app.use(cookieParser())
app.use(userRouter)
app.all('*',(req:Request,res:Response,next:NextFunction)=>{
  const error = new Error('error not found') as any
  error.statusCode = 401
  console.log(error);
  next(error)
  
})
export default app