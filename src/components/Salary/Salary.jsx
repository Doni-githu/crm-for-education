import React, { useContext } from 'react'
import Layout from "../../layouts/Layout"
import './Salary.scss'
import { context } from '../../provider/provider'

function Salary() {
    const { state: { salary }, dispatch } = useContext(context)
    const data = salary

    function onSelect(id) {
        dispatch({ type: 'selected', payload: id })
    }

    return (
        <Layout>
            <div className="salary-container">
                <p className='salary-title'>Teacher's name</p>
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
                            <div key={idx} className='table-room'>
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
            </div>
        </Layout>
    )
}

export default Salary