import exp from 'express' 
import {formModel} from '../model/formModel.js'
export const formapp = exp.Router() 


formapp.post('/forms', async (req, res) => {
  try {
    const newFormDocument = new formModel(req.body)
    const result = await newFormDocument.save()
    res.status(201).json({ message: "form created", payLoad: result })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


formapp.get("/forms", async (req, res) => {
  try {
    const formList = await formModel.find()
    res.status(200).json({ message: "created", payLoad: formList })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 
// to delete the form 
formapp.delete("/forms/:id", async (req, res) => {
  try {
    const deletedform = await formModel.findByIdAndDelete(req.params.id)
    res.json({ message: "form deleted successfully", payload: deletedform })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})   

// to update the form 
formapp.put("/forms/:id", async (req, res) => {
  try {
    const modifiedform = req.body;
    const uid = req.params.id;
    const updatedform = await formModel.findByIdAndUpdate(uid, { $set: { ...modifiedform } }, { new: true, runValidators: true })
    res.status(200).json({ message: "user modified", payLoad: updatedform })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})