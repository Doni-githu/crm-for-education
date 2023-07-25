import React, { useContext, useEffect, useState } from 'react'
import './Payment.scss'
import Layout from '../../layouts/Layout'
import Input from '../../uiComponents/Input/Input'
import PrinterCheck from "../PrinterCheck/PrinterCheck"
import Group from "../../services/groups"
import MentorFetchs from "../../services/mentor"
import Auth from "../../services/user"
import PaymentF from "../../services/payment"
import { context } from '../../provider/provider'
import { useNavigate } from 'react-router-dom'
function Payment() {
    const [name, setName] = useState(0)
    const [price, setPrice] = useState('')
    const [mentor, setMentor] = useState(0)
    const [group, setGroup] = useState(0)
    const [admin, setAdmin] = useState(0)
    const [untilDay, setUntilDay] = useState('')
    const [payMethod, setPayMenthod] = useState('cash')
    const [groups, setGroups] = useState([])
    const [mentors, setMentors] = useState([])
    const [students, setStudents] = useState([])
    const [admins, setAdmins] = useState([])
    const { state } = useContext(context)
    const navigate = useNavigate()
    function Pay() {
        if (!name || !price || !mentor || !group) {
            return
        }
        const payData = {
            quantity: parseInt(price),
            student: parseInt(name),
            group,
            teacher: mentor,
            administrator: admin,
            month: untilDay,
            payment: payMethod
        }
        PaymentF.make(payData)
            .then((res) => {
                navigate(`/profile/${name}`)
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        if (state.role === 'ST') {
            navigate(`/profile/${state.user.id}`)
            return;
        }
    }, [])

    useEffect(() => {
        Auth.allAdmin()
            .then((res) => {
                if (res.data.length > 0) {
                    setAdmin(res.data[0].id)
                    setAdmins(res.data)
                }
            })
        Group.all()
            .then((res) => {
                if (res.data.length > 0) {
                    setGroup(res.data[0].id)
                    setGroups(res.data)
                }
            })
        MentorFetchs.all()
            .then((res) => {
                if (res.data.length > 0) {
                    setMentor(res.data[0].id)
                    setMentors(res.data)
                }
            })
        Auth.all()
            .then(res => {
                if (res.data.length > 0) {
                    setName(res.data[0].id)
                    setStudents(res.data)
                }
            })
    }, [])

    return (
        <Layout>
            <div className="payment-container">
                {groups.length !== 0 && mentors.length !== 0 && students.length !== 0 ? <>
                    <div className="payment-left">
                        <div className='payment-form'>
                            <Input type={'number'} setState={setPrice} state={price} placeholder={"Price"} label={'Price...'} />
                            <div className='contain-select'>
                                <p className='label-placeholder'>Stundet</p>
                                <select onChange={(e) => setName(e.target.value)}>
                                    {students.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name} {item.surname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='contain-select'>
                                <p className='label-placeholder'>Mentor</p>
                                <select onChange={(e) => setMentor(e.target.value)}>
                                    {mentors.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name} {item.surname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='contain-select'>
                                <p className='label-placeholder'>Admin</p>
                                <select onChange={e => setAdmin(e.target.value)}>
                                    {admins.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name} {item.surname}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='contain-select'>
                                <p className='label-placeholder'>Group</p>
                                <select onChange={e => setGroup(e.target.value)}>
                                    {groups.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Input setState={setUntilDay} id={"label-2"} state={untilDay} placeholder={"Month"} label={`Month`} />
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
                                <button onClick={Pay}>Pay</button>
                            </div>
                        </div>
                    </div>
                    <PrinterCheck params={{ name, price, mentor, group, untilDay, students, mentors, groups, admin, admins }} />
                </> :
                    <>
                        <center>
                            <h1 style={{
                                width: '50%',
                                fontWeight: '400'
                            }}>Siz grouppa, mentor, admin va student qo'shishiz kerak tolov tizimni ishlatish uchun</h1>
                        </center>
                    </>}
            </div>
        </Layout>
    )
}

export default Payment