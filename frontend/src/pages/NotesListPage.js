import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Spinner } from '../components/Spinner';
import { AddButton } from '../components/AddButton';


export const NotesListPage = () => {

    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    async function apicall()
    {   
        setLoading(true)
        try{
            const response =await fetch('/api/notes/')
            const output = await response.json()
            console.log(output)
            setNotes(output)
            
        }
        catch(error){
            console.log(error)
        }
        setLoading(false)
        }
        
  useEffect(()=>{
    apicall()
  },[])

  return (

        <div className='notes'>
        <div className='notes-header'>
            <h2 className='notes-title'>&#9782; Notes</h2>
            <p className='notes-count'>{notes.length}</p>
        </div>
        <div className='notes-list'>
        {   loading ? <Spinner></Spinner> :
            notes.map((data)=>{
                return <Card key={data.id} {...data}></Card>
            })
        }
        <AddButton></AddButton>
        </div>
        
    </div>
  )
}
