import React from 'react'
import './Modal.scss'
export default function Modal({type='', text, setClose}) {
  return (
    <div className={`modal ${type}`}>
        <p>{text}</p>
        <div className='x' onClick={() => setClose('')}>
            <i className='fa-solid fa-x'></i>
        </div>
    </div>
  )
}
