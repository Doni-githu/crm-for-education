import React, { useState } from 'react'
import './Header.scss'

export default function Header() {
    const [term, setTerm] = useState('')
    
    return (
        <div className='header'>
            <div className="left">
                <div className="search">
                    <div className='icon'>
                        <img src="/img/search.png" alt="Search" />
                    </div>
                    <input placeholder={'search'} onChange={(e) => setTerm(e.target.value)} value={term} />
                </div>
            </div>
            <div className="profile">
                <img src="/img/photo.png" alt="Profile" />
                <p>Paloncha</p>
                <div className='down'>
                    <i className="fa-solid fa-sort-down"></i>
                </div>
            </div>
        </div>
    )
}
