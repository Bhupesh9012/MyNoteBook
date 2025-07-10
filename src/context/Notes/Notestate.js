// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
  const host = "http://localhost:5000";

    const notesInitial =[]
    const [notes, setNotes] = useState(notesInitial)
   //get all notes
   const getNotes=async()=>{
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNmVhZmJiY2M0MTQwNzAwNmQzYWI5In0sImlhdCI6MTc0ODA5NTQ2N30.UwEcXK1CBQgPWBAY0VwU78imsT0lTk92n7Z0HF6Utnw"
        }
      });
      if (!response.ok) {
        throw new Error('Unauthorized or other error');
      }
      const json = await response.json();
      setNotes(Array.isArray(json) ? json : json.notes || []);
    } catch (error) {
      setNotes([]); // fallback to empty array
      console.error(error);
    }
  }
    //Add a note
  const addNote=async(title,description,tag)=>{
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNmVhZmJiY2M0MTQwNzAwNmQzYWI5In0sImlhdCI6MTc0ODA5NTQ2N30.UwEcXK1CBQgPWBAY0VwU78imsT0lTk92n7Z0HF6Utnw"
      },
      body: JSON.stringify({ title, description, tag })
    });
   
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote=async(id)=>{
    //Api Call
    const response =await fetch (`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'content-Type':'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNmVhZmJiY2M0MTQwNzAwNmQzYWI5In0sImlhdCI6MTc0ODA5NTQ2N30.UwEcXK1CBQgPWBAY0VwU78imsT0lTk92n7Z0HF6Utnw"
      },
    });
    const json=await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  }

  //edit a note
  const editNote=async(id,title,description,tag)=>{
    //API calls
    const response =await fetch (`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'content-Type':'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjgyNmVhZmJiY2M0MTQwNzAwNmQzYWI5In0sImlhdCI6MTc0ODA5NTQ2N30.UwEcXK1CBQgPWBAY0VwU78imsT0lTk92n7Z0HF6Utnw"
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=await response.json();

    let NewNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for(let index=0; index<NewNotes.length;index++){
      const element = NewNotes[index];
      if(element._id===id){
        NewNotes[index].title = title;
        NewNotes[index].description = description;
        NewNotes[index].tag = tag;
        break;
      }
    }
    setNotes(NewNotes);
  }

  return(
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;