// import { useState } from "react";
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState=(props)=>{
    const notesInitial =[
  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },

  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },
  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },
  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },
  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },
  {
    "_id": "685e318729cb4d39375c017d",
    "user": "6826eafbbcc41407006d3ab9",
    "title": "my title",
    "description": "wake up early",
    "tag": "personal",
    "date": "2025-06-27T05:52:07.116Z",
    "__v": 0
  },
]

    const [notes, setNotes] = useState(notesInitial)
  
    return(
        <noteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}
export default NoteState;