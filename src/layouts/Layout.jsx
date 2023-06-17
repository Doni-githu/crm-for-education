import React from 'react'
import Navigation from "../components/Navigation/Navigation"
import './Layout.scss'
import Header from '../components/Header/Header'
export default function Layout({ children }) {
    return (
        <div className='container3'>
            <div className='container2'>
                <Navigation />
                <div className='left-container'>
                    <Header />
                    {children}
                </div>
            </div>
        </div>
    )
}
