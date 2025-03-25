import React from 'react'
import { useParams } from 'react-router-dom';

const CardDetail = () => {
    const { id } = useParams();
  return (
    <div>
         <p>ID: {id}</p>
    </div>
  )
}

export default CardDetail