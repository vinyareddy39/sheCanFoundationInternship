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
 
// to delete the form 
formapp.delete("/forms/:id", async (req,res)=>{
        const deletedform = await formModel.findByIdAndDelete(req.params.id)
        res.json({message:"form deleted successfully",payload:deletedform})
})   

// to uadate the form 
formapp.put("/forms/:id",async(req,res)=>  
{// get modififed user from req
    const  modifiedform = req.body;
    const uid = req.params.id;
   const updatedform = await  formModel.findByIdAndUpdate(uid,{$set:{...modifiedform}},{new : true , runValidators:true},) ;//pervious object 
 res.status(200).json({message:"user modified",payLoad:updatedform}) ;
})