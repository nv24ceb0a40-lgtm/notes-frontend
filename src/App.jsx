import { useState,useEffect } from 'react'
import './App.css'

function App() {

  const [title,settitle]=useState('')
  const [content,setcontent]=useState('')
  const [notes,setnotes]=useState([])
  useEffect(()=>{
    const fetchnotes= async()=>
    {
      const response= await fetch('http://localhost:5000/notes',{
      method:'GET'
      })
      const data=await response.json()
      setnotes(data)}

      fetchnotes()
    
  },[])
  const handlesubmit= async ()=>
  {
    const response=await fetch('http://localhost:5000/notes',{

      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({title,content})

    })
    const data=await response.json()
    console.log(data)
    setnotes([...notes,data])
    setcontent('')
    settitle('')
  }
  const deletenote= async (id)=>{

   const response = await fetch(`http://localhost:5000/notes/${id}`,{
    method:'DELETE'
    })
    console.log(response.json())
    setnotes(notes.filter((note) => note._id !== id))
  }

  return (
    <>
     <h1>NOTES</h1>
    <div>
      <input
        value={title}
        onChange={(e)=>{
        settitle(e.target.value)
        }}
      ></input>
    </div>

    <div>
    <input
    value={content}
    onChange={(e)=>{
      setcontent(e.target.value)
    }}
    ></input>
    </div>

    <button
    onClick={handlesubmit}
    >submit</button>

    <>
    {
      notes.map((note,index)=>
      (
        <div
        key={index}
        >
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <button
          onClick={()=>{
            deletenote(note._id)
          }}
          >DELETE</button>
        </div> 
      ))
    }
    </>

    </>
  )
}

export default App
