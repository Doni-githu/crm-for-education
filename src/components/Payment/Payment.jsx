import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { useReactToPrint } from "react-to-print"
import Loader from '../../uiComponents/Loader/Loader'
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
    const [isLoading, setIsLoading] = useState(false)
    const { state } = useContext(context)
    const componentRef = useRef(null)
    const navigate = useNavigate()
    async function Pay() {
        if (!name || !price || !mentor || !group || !untilDay || !admin || !payMethod) {
            return
        }
        const fd = new FormData()

        fd.append('quantity', parseInt(price))
        fd.append('student', parseInt(name))
        fd.append('group', group)
        fd.append('teacher', mentor)
        fd.append('administrator', admin)
        fd.append('month', untilDay)
        fd.append('payment', payMethod)
        fd.append('when', new Date().toJSON())

        PaymentF.make(fd)
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
        setIsLoading(true)
        Auth.allAdmin()
            .then((res1) => {
                if (res1.data.length > 0) {
                    setAdmin(res1.data[0].id)
                    setAdmins(res1.data)
                }
                Group.all()
                    .then((res2) => {
                        if (res2.data.length > 0) {
                            setGroup(res2.data[0].id)
                            setGroups(res2.data)
                        }
                        Auth.all()
                            .then(res4 => {
                                setName(res4.data[0].id)
                                setStudents(res4.data)
                                setMentor(res4.data[0].teachers[0].id)
                            }).finally(() => {
                                setIsLoading(false)
                            })
                    })
            })

    }, [])

    useMemo(() => {
        for (let i = 0; i < students.length; i++) {
            const element = students[i];
            if (element.id === name ? parseInt(name) : '') {
                setMentors(element.teachers)
            }
        }
    }, [name])
    return (
        <Layout>
            {!isLoading ? <>
                <div className="payment-container container-2">
                    {groups.length !== 0 && mentors.length !== 0 && students.length !== 0 && !isLoading ? <>
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
                        <PrinterCheck params={{ name, price, mentor, group, untilDay, students, mentors, groups, admin, admins, componentRef }} />
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
            </> : <>
                <div style={{
                    height: window.innerHeight,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </div>
            </>}
        </Layout>
    )
}

export default Payment