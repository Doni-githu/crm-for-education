import React, { useEffect, useState } from 'react'
import './Payment.scss'
import Layout from '../../layouts/Layout'
import Input from '../../uiComponents/Input/Input'
import PrinterCheck from "../PrinterCheck/PrinterCheck"
import Group from "../../services/groups"
import MentorFetchs from "../../services/mentor"
import Auth from "../../services/user"
function Payment() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [mentor, setMentor] = useState('')
    const [group, setGroup] = useState('')
    const [untilDay, setUntilDay] = useState('')
    const [payMethod, setPayMenthod] = useState('cash')
    const [groups, setGroups] = useState([])
    const [mentors, setMentors] = useState([])
    const [students, setStudents] = useState([])
    function Pay() {
        const payData = {
            quantity: price,
        }
    }

    useEffect(() => {
        Group.all()
            .then((res) => {
                setGroup(res.data[0].name)
                setGroups(res.data)
            })
        MentorFetchs.all()
            .then((res) => {
                setMentor(res.data[0].name + " " + res.data[0].surname)
                setMentors(res.data)
            })
        Auth.all()
            .then(res => {
                setName(res.data[0].name + " " + res.data[0].surname)
                setStudents(res.data)
            })
    }, [])

    return (
        <Layout>
            <div className="payment-container">
                <div className="payment-left">
                    <div className='payment-form'>
                        <Input type={'number'} setState={setPrice} state={price} placeholder={"Price"} label={'Price...'} />
                        <div className='contain-select'>
                            {students.length !== 0 ? <>
                                <select onChange={(e) => setName(e.target.value)}>
                                    {students.map((item) => (
                                        <option key={item.id} value={item.name + " " + item.surname}>{item.name} {item.surname}</option>
                                    ))}
                                </select>
                            </> : null}
                        </div>
                        <div className='contain-select'>
                            {mentors.length !== 0 ? <>
                                <select onChange={(e) => setMentor(e.target.value)}>
                                    {mentors.map((item) => (
                                        <option key={item.id} value={item.name + " " + item.surname}>{item.name} {item.surname}</option>
                                    ))}
                                </select>
                            </> : null}
                        </div>
                        <div className='contain-select'>
                            {groups.length !== 0 ? <>
                                <select onChange={e => setGroup(e.target.value)}>
                                    {groups.map((item) => (
                                        <option key={item.id} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </> : null}
                        </div>
                        <Input setState={setUntilDay} state={untilDay} placeholder={"Month"} label={``} />
                        <div className='radios'>
                            <div className={`radio-btn ${payMethod === 'cash' ? 'radio-active' : ''}`}>
                                <button onClick={() => setPayMenthod('cash')}>Cash</button>
                            </div>
                            <div className={`radio-btn ${payMethod === 'creditCard' ? 'radio-active' : ''}`}>
                                <button onClick={() => setPayMenthod('creditCard')}>Credit card</button>
                            </div>
                            <div className={`radio-btn ${payMethod === 'debitCard' ? 'radio-active' : ''}`}>
                                <button onClick={() => setPayMenthod('debitCard')}>Debit card</button>
                            </div>
                        </div>
                        <div className='payment-button'>
                            <button onClick={Pay}>Print</button>
                        </div>
                    </div>
                </div>

                <PrinterCheck params={{ name, price, mentor, group, untilDay }} />
            </div>
        </Layout>
    )
}

export default Payment