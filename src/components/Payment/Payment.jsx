import React, { useState } from 'react'
import './Payment.scss'
import Layout from '../../layouts/Layout'
import Input from '../../uiComponents/Input/Input'
function Payment() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [mentor, setMentor] = useState('')
    const [group, setGroup] = useState('')

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
                    <div className='payment-box'>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Payment