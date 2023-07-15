import React, {  useState } from 'react'
import './Payment.scss'
import Layout from '../../layouts/Layout'
import Input from '../../uiComponents/Input/Input'
import PrinterCheck from "../PrinterCheck/PrinterCheck"
function Payment() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [mentor, setMentor] = useState('')
    const [group, setGroup] = useState('')
    const [untilDay, setUntilDay] = useState('')

    
    return (
        <Layout>
            <div className="payment-container">
                <div className="payment-left">
                    <div className='payment-form'>
                        <Input setState={setName} state={name} placeholder={"Student's name"} label={'Name'} />
                        <Input type={'number'} setState={setPrice} state={price} placeholder={"Price"} label={'Price...'} />
                        <Input setState={setMentor} state={mentor} placeholder={"Mentor"} label={`Teacher's name`} />
                        <Input setState={setGroup} state={group} placeholder={"Group"} label={``} />
                        <Input setState={setUntilDay} state={untilDay} placeholder={"Until day"} label={``} />
                        <div className='payment-button'>
                            <button>Print</button>
                        </div>
                    </div>
                </div>  
                
                <PrinterCheck params={{name, price, mentor, group, untilDay}} />
            </div>
        </Layout>
    )
}

export default Payment