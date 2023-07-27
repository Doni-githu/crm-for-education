import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.scss'
import Layout from '../../layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import Auth from '../../services/user'
import { context } from '../../provider/provider'
import Loader from '../../uiComponents/Loader/Loader'
import Payment from '../../services/payment'
import { useReactToPrint } from "react-to-print"

function Profile() {
    const { state, dispatch } = useContext(context)
    const [isLoading, setLoading] = useState(false)
    const someRef = useRef(null)
    const printRef = useRef(null)
    const [pays, setPays] = useState([])
    const [isSee, setIsSee] = useState(false)
    const [params3, setParams3] = useState({})
    const handle = useReactToPrint({
        content: () => printRef.current,
    })
    const params = useParams()
    useEffect(() => {
        setLoading(true)
        const id = parseInt(params.id)
        Auth.getOne(id)
            .then((res) => {
                dispatch({ type: 'studentProfile', payload: res.data })
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            })
        Payment.all()
            .then(res => {
                const filtered = res.data.filter(c => c.student.id === parseInt(params.id))
                setPays(filtered)
            })
    }, [])
    const now = new Date().toJSON()
    let result = changeAttendance(parseInt(now.split('-')[1]))
    let array = []
    const navigate = useNavigate()
    for (let i = 1; i < result + 1; i++) {
        array.push(i)
    }

    function changeAttendance(i) {
        return {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 12,
            7: 12,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        }[i]
    }


    function show(id) {
        let result = pays.find(c => c.id === id)
        setParams3(result)
        setIsSee(true)
        someRef.current.classList.add("modal-active")
    }


    function close(event) {
        if (event.target.className === "modal-success modal-active") {
            someRef.current.classList.remove("modal-active")
            setParams3({})
            setIsSee(false)
        }
    }

    const double = new Array(2).fill(0).map((c, i) => c + i)

    return (
        <Layout>
            {state.studentProfile ?
                <>
                    <div ref={printRef} className='check'>
                        <div className="check-container">
                            {double.map((item) => (
                                <div key={item} className="double">
                                    <div className="check-header">
                                        <div className='header' style={{ textAlign: 'center' }}>
                                            <p>Check</p>
                                        </div>
                                    </div>
                                    <div className="check-body">
                                        <div className="body">
                                            <p>Sana - {params3.when ? params3.when.split('T')[0] : ''}</p>
                                        </div>
                                        <div className="body">
                                            <p>Group - {params3.group ? params3.group.name : ''}</p>
                                        </div>
                                        <div className="body">
                                            <p>Price - {params3.quantity ? params3.quantity + " - Oy " + params3.month : ''}</p>
                                        </div>
                                        <div className="body">
                                            <p>Qabul qiluvchi - {params3.administrator ? params3.administrator.name : ''}</p>
                                        </div>
                                        <div className="body">
                                            <p>Ustoz - {params3.teacher ? params3.teacher.name + " " + params3.teacher.surname : ''}</p>
                                        </div>
                                        <div className="body">
                                            <p>Student - {params3.student ? params3.student.name + " " + params3.student.surname : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div ref={someRef} onClick={close} className={`modal-success ${isSee ? 'modal-active' : ''}`}>
                        {isSee ? <>
                            <div className="modal-2-container">
                                <div className='payment-right'>
                                    <div className="payment-container">
                                        <div className='payment-title'>
                                            <p>Квинтациа</p>
                                        </div>
                                        <div className='payment-name'>
                                            <div className='payment-date-now'>
                                                <p className='d30'>
                                                    <span className='none'>
                                                        <i className='fa-solid fa-angles-left'></i>
                                                    </span>
                                                    <span>
                                                        {params3.when.split('T')[0].split('-')[1]}
                                                    </span>
                                                    <span className='none'>
                                                        <i className='fa-solid fa-angles-right'></i>
                                                    </span>
                                                </p>
                                                <p className='d50'>
                                                    <span style={{ height: '28.4px' }}>{params3.when.split('T')[0].split('-')[2]}</span>
                                                </p>
                                                <p className='d30'>
                                                    <span className='none'>
                                                        <i className='fa-solid fa-angles-left'></i>
                                                    </span>
                                                    <span>{params3.when.split('T')[0].split('-')[0]}</span>
                                                    <span className='none'>
                                                        <i className='fa-solid fa-angles-right'></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='payment-body'>
                                            <div className='payment-header-box'>
                                                <p>Group name</p>
                                            </div>
                                            <div className='payment-header-box'>
                                                <p>Price</p>
                                            </div>
                                            <div className='payment-body-box'>

                                            </div>
                                            <div className='payment-body-box'>

                                            </div>
                                            <div className='payment-body-box'>
                                                <p>{params3.group.name}</p>
                                            </div>
                                            <div className='payment-body-box'>
                                                <p>{params3.quantity}</p>
                                            </div>
                                            <div className='payment-body-box'>

                                            </div>
                                            <div className='payment-body-box'>

                                            </div>
                                            <div className='payment-body-box'>
                                                <p>{params3.administrator.name} {params3.administrator.surname}</p>
                                            </div>
                                            <div className='payment-body-box'>
                                                <p>{params3.month}</p>
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
                                                <p className='payment-name-text'>F.I.O {params3.teacher.name} {params3.teacher.surname}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-2-footer">
                                    <div className="btn">
                                        <button onClick={handle}>
                                            <span>Print</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </> : null}
                    </div>
                    <div className='profile-container'>
                        <div className="profile-header">
                            <p className='title'>Student {state.studentProfile.name} {state.studentProfile.surname}</p>
                            {state.role === "AD" || state.role === "DR" ? <>
                                <div className="btn">
                                    <button onClick={() => navigate(`/edit/student/${state.studentProfile.id}`)}>
                                        <div className="img">
                                            <i className='fa-solid fa-edit'></i>
                                        </div>
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </> : null}
                        </div>
                        <div className="context">
                            <div className="profile-box">
                                <div className="header-showcase">
                                    <div className="img">
                                        <p>{state.studentProfile.name.slice(0, 1)}</p>
                                    </div>
                                </div>
                                <div className="header-body">
                                    <div className="header-title">
                                        <p>{state.studentProfile.name} {state.studentProfile.surname}</p>
                                    </div>
                                    {state.studentProfile.profession ? state.studentProfile.profession.map((item) => (
                                        <div key={item + 1}>
                                            <p className='profession'>{item.name}</p>
                                            <ul>
                                                {item.technologies ? item.technologies.map((item2) => (
                                                    <li key={item2.id}>{item2.name}</li>
                                                )) : ''}
                                            </ul>
                                        </div>
                                    )) : ''}
                                </div>
                            </div>
                            <div className="box-on-right">
                                <div className="box">
                                    <p className="box-title">Teachers</p>
                                    <div className="teachers">
                                        {state.studentProfile.teachers ? state.studentProfile.teachers.map((item) => (
                                            <div className="box-item" key={item.id} onClick={() => state.role === 'ST' || state.role === "TR" ? null : navigate(`/teacher/${item.id}`)}>
                                                <div className='img'>
                                                    <p>{item.name.slice(0, 1)}</p>
                                                </div>
                                                <p className='box-name'>{item.name} {item.surname}</p>
                                                <p className="box-profession">{item.profession[0].name}</p>
                                            </div>
                                        )) : ''}
                                    </div>
                                </div>
                                <div className="box">
                                    <p className='box-title'>Lessons day</p>
                                    <div className="table-container">
                                        <table>
                                            <thead>
                                                <tr>
                                                    {new Array(state.studentProfile.davomat.length).fill(0).map((c, i) => c + i).map(item => (
                                                        <th key={item}>
                                                            <span>{item}</span>
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {state.studentProfile.davomat.map(item => (
                                                        <td key={item.id}>
                                                            <div className={`table-button ${item.keldi}`}>

                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="box">
                                    <p className='box-title'>Payments</p>
                                    <div className='payment'>
                                        {pays.map((item, idx) => (
                                            <div key={idx} className='pay'>
                                                <p onClick={() => show(item.id)}>{item.month}</p>
                                                <p>{item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <div className='loader'>
                    <Loader />
                </div>}
        </Layout >
    )
}

export default Profile