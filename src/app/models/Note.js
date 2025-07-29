import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
     
      id: String,
      namelist: String,
      time: String,
      color: Boolean
    
})

const Note = mongoose.models.Note || mongoose.model('Note',NoteSchema)

export default Note