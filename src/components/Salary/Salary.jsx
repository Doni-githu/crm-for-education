import React from 'react'
import Table from '../Table/Table'
import Layout from "../../layouts/Layout"
import './Salary.scss'

function Salary() {
    return (
        <Layout>
            <div className="salary-container">
                <p className='salary-title'>Teacher's name</p>
                <Table />
            </div>
        </Layout>
    )
}

export default Salary