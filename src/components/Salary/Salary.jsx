import React from 'react'
import Table from '../Table/Table'
import Layout from "../../layouts/Layout"
import './Salary.scss'
import { useNavigate } from 'react-router-dom'

function Salary() {
    const navigate = useNavigate()
    return (
        <Layout>
            <div className="salary-container">
                <div className="salary-header">
                    <p className='salary-title'>Students</p>
                    <div className="btn">
                        <button onClick={() => navigate('/add/student')}>
                            <div className="img">
                                <i className='fa-solid fa-plus'></i>
                            </div>
                            <span>Add Student</span>
                        </button>
                    </div>
                </div>
                <Table />
            </div>
        </Layout>
    )
}

export default Salary