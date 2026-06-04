import exp from 'express' 
import {formapp} from '../backend/API/formapi.js'
import {connect} from 'mongoose' 
const app = exp()
app.use(exp.json())
 app.use('/form-api',formapp) 
const port =3000;
app.listen(port,()=> console.log("server is listening ",port)) 
async function connectDB()
{
    await connect("mongodb://localhost:27017") 
    console.log("db connection is listening ")
}
connectDB()