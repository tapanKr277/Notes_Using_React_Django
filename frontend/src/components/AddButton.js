import React from 'react'
import { ReactComponent as AddIcon } from '../assets/add.svg'
import { Link } from 'react-router-dom'

export const AddButton = () => {
  return (
    <Link to='/note/new/' className='floating-button'>
        <AddIcon></AddIcon>
    </Link>
  )
}
