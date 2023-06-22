import React, { useEffect, useRef, useState } from 'react'
import './Payment.scss'
import Layout from '../../layouts/Layout'
import Input from '../../uiComponents/Input/Input'
function Payment() {
    const canvasRef = useRef(null)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [mentor, setMentor] = useState('')
    const [group, setGroup] = useState('')
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillText(name, 20, 20)
    }, [name])
    return (
        <Layout>
            <div className="payment-container">
                <div className="payment-left">
                    <p>Payment</p>
                    <div className='payment-form'>
                        <Input setState={setName} state={name} placeholder={"Student's name"} label={'Name'} />
                        <Input type={'number'} setState={setPrice} state={price} placeholder={"Price"} label={'Price...'} />
                        <Input setState={setMentor} state={mentor} placeholder={"Mentor"} label={`Teacher's name`} />
                        <Input setState={setGroup} state={group} placeholder={"Group"} label={``} />
                        <div className='payment-button'>
                            <button>Print</button>
                        </div>
                    </div>
                </div>
                <div className='payment-right'>
                    <canvas ref={canvasRef} className='payment-box'>

                    </canvas>
                </div>
            </div>
        </Layout>
    )
}

export default Payment