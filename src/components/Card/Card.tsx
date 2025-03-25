import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
const Card = ({id,name,detail,image}) => {
  return (
    <li className='card'>
    <img className='card__image' src={image} alt={name} />
    <div className='card__detail'>
    <h3>{name}</h3>
    <p>{detail}</p>
    <div className="card__link__wrapper">
    <Link className='card__link' to={`card/${id}`}>Batafsil</Link>
    </div>
    </div>
    </li>
  )
}

export default Card