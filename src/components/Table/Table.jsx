import React, { useContext, useEffect, useState } from 'react'
import { context } from '../../provider/provider'
import './Table.scss'
import Mentor from '../../services/mentor'
import User from '../../services/user'
import Payment from '../../services/payment'
import Group from '../../services/groups'
import { useNavigate, useParams } from 'react-router-dom'
export default function Table() {
    const data = []
    function onSelect(id) {
        dispatch({ type: 'selected', payload: id })
    }

    const { state, dispatch } = useContext(context)
    const [data2, setData2] = useState([])
    const [pays, setPays] = useState([])
    const [slug, setSlug] = useState('')
    const [groups, setGroups] = useState([])
    function findAndUpdate(slug) {
        localStorage.setItem('any', slug)
        setSlug(slug)
    }
    const navigate = useNavigate()
    const params = useParams()
    useEffect(() => {
        setSlug(localStorage.getItem('any'))
        // Mentor.all()
        //     .then((res) => {
        //         console.log(res.data);
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        // User.all()
        //     .then((res2) => {
        //         const filted = res2.data.filter(c => c.teachers.filter(h => h.id === parseInt(params.id)))
        //         setData2(filted)

        //     }).catch((err) => {
        //         console.log(err)
        //     })

        // Group.all()
        //     .then((res) => {
        //         setGroups(res.data.filter(c => c.teacher.id === parseInt(params.id)))
        //     })
        // Payment.all()
        //     .then((res3) => {
        //         const filtered2 = res3.data.filter((item => item.teacher.id === parseInt(params.id)))
        //         setPays(filtered2)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }, [])

    return (
        <div className="salary-table">
            <div className="table-header">
                <div className='col-header'>
                    <p>ID</p>
                </div>
                <div className="col-header">
                    <p>Name</p>
                </div>
                <div className="col-header">
                    <p>Surname</p>
                </div>
                <div className="col-header">
                    <p>Groups</p>
                </div>
                <div className="col-header">
                    <p>Student</p>
                </div>
                <div className='col-header'>
                    <p>Salary</p>
                </div>
            </div>
            <div className="table-body">
                {data.map((item, idx) => (
                    <div key={item.id} className='table-room'>
                        <div className='col-body id'>
                            <label className='label'>
                                <input defaultChecked={item.selected} onChange={() => onSelect(idx)} type="checkbox" className='hid' />
                                <span className='fake'></span>
                            </label>
                            <div className="col-body-left">
                                <p>{idx + 1}</p>
                            </div>
                        </div>
                        <div className='col-body'>
                            <p>{item.name}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.surname}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.groups}</p>
                        </div>
                        <div className='col-body'>
                            <p>{item.students}</p>
                        </div>
                        <div className="col-body">
                            <p>{item.salary}$</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
