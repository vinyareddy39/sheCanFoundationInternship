import exp from 'express' 
import cors from 'cors'
import dotenv from 'dotenv'
import {formapp} from './API/formapi.js'
import {connect} from 'mongoose' 

dotenv.config()

const app = exp()
app.use(cors())
app.use(exp.json())
app.use('/form-api',formapp) 

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/shecan";

async function connectDB() {
    try {
        await connect(mongoUri)
        console.log("DB connected successfully")
        app.listen(port, () => console.log("server is listening on port", port))
    } catch (err) {
        console.error("DB connection failed:", err.message)
        process.exit(1)
    }
}
connectDB()