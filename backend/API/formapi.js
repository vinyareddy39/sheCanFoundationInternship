import exp from 'express' 
import {formModel} from '../model/formModel.js'
export const formapp = exp.Router() 


formapp.post('/forms',async(req,res) =>{
//   const newform = req.body;
  const newfromDocument = new formModel(req.body)
    const result = await newfromDocument.save()
res.status(201).json({message: "form created "}) ;
})


formapp.get("/forms",async(req,res)=>{
    // read all users from db 
    const  formList = await  formModel.find()
    res.status(200).json({message:"created",payLoad:formList})
    });


formapp.delete("/forms/:id", async (req,res)=>{

    

        const deletedform = await productModel.findByIdAndDelete(req.params.id)

        res.json({
            message:"Product deleted successfully",
            payload:deletedform})
}) 