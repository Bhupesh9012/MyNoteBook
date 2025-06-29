const express = require('express');
const router = express.Router(); 
var fetchuser =require('../middleware/fetchuser');
const Note = require('../models/Note')
const {body,validationResult}= require('express-validator');
//Route1-get all the notes using : Get"/api/notes/getuser" .Does't req auth .no login requireds
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes = await Note.find({user:req.user.id})
        res.json(notes) 
    } catch (error) {
           console.error(error.message);
         res.status(500).send("Internal server error occured");
    }
   
})
//Route2-adding new  notes using : post"/api/notes/addnote" .Does't req auth .no login requireds
router.post('/addnote',fetchuser,[
   body('title','enter a valid title').isLength({min:3}),
   body('description','description must be atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
    try {
    const{title,description,tag}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
   const note=new Note({
    title,description,tag, user:req.user.id
   })
   const savedNote=await note.save()
    res.json(savedNote)
       
   } catch (error) {
       console.error(error.message);
         res.status(500).send("Internal server error occured");
   }
})
//Route3-update  notes : put"/api/notes/updatenote" .Does't req auth .login requireds
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body;
    try {
    //creating a newNote object
    const newNote ={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    
    //find the note to be  update and update it
    let note =await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")}

    if(note.user.toString() !==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note =await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
    } catch (error) {
        console.error(error.message);
         res.status(500).send("Internal server error occured");
    }
})
//Route 4-delete a note:delete"delete"/api/notes/deletenote".Dons't req auth .login req
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
    //find the note to be delete and delete it
    let note =await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    //Allow deletion only if user owns this Note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note =await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted",note:note});
    res.json({note})
      } catch (error) {
        console.error(error.message);
         res.status(500).send("Internal server error occured");
    }
})
module.exports=router