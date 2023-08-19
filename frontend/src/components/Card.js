import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({body,updated,id}) => {
  
  let getTilte = () =>{
    let title = body.split('\n')[0]
    if (title.length>45){
      return title.slice(0,45)
    }
    return title
  }

  let getContent = () =>{
    let content = body.replaceAll('\n', ' ')
    if (content.length>45){
      return content.slice(0,45)+'...'
    }
    return content
  }

  let getDate = () =>{
    return new Date(updated).toLocaleDateString()
  }
  return (

      <Link to={`/note/${id}`}>
        <div className='notes-list-item'>
          <h3>{getTilte()}</h3>
          <p><span>{getDate()}</span><span>{getContent()}</span></p>
         
        </div>
        </Link>
  )
}
