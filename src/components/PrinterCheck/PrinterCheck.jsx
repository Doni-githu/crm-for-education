import React from 'react'
import './PrinterCheck.scss'
export default function PrinterCheck({ params }) {
    const year = new Date().getFullYear()
    const day = new Date().getDay()
    const month = new Date().getMonth()
    return (
        <div className='payment-right'>
            <div className="payment-container">
                <div className='payment-title'>
                    <p>Квинтациа</p>
                </div>
                <div className='payment-name'>
                    <div className='payment-date-now'>
                        <p className='d30'><span>&#8810;</span>{day}<span>&#8811;</span></p>
                        <p className='d50'>{month < 10 ? `0${month}` : month}</p>
                        <p className='d30'><span>&#8810;</span>{year}<span>&#8811;</span></p>
                    </div>
                    <p className='payment-name-text'>F.I.O {params.name}</p>
                </div>
                <div className='payment-body'>
                    <div className='payment-header-box'>
                        <p>Gruppa Nomi</p>
                    </div>
                    <div className='payment-header-box'>
                        <p>Miqdori</p>
                    </div>
                    <div className='payment-body-box'>

                    </div>
                    <div className='payment-body-box'>

                    </div>
                    <div className='payment-body-box'>
                        <p>{params.group}</p>
                    </div>
                    <div className='payment-body-box'>
                        <p>{params.price}</p>
                    </div>
                    <div className='payment-body-box'>

                    </div>
                    <div className='payment-body-box'>

                    </div>
                    <div className='payment-body-box'>

                    </div>
                    <div className='payment-body-box'>
                        {params.untilDay}
                    </div>  
                </div>
                <div className='payment-footer'>
                    <div className="payment-name" style={{
                        borderBottomLeftRadius: '5px',
                        borderBottomRightRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px'
                    }}>
                        <p className='payment-name-text'>F.I.O {params.mentor}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}
