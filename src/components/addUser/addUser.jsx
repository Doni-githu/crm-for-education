import React from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../layouts/Layout'
import AddStudent from '../addStudent/addStudent'
import AddTeacher from '../addTeacher/AddTeacher'
import AddGroup from '../addGroup/AddGroup'
import AddProfession from '../addProfession/addProfession'
import AddTechnologies from '../AddTechnologies/AddTechnologies'

export default function AddUser() {
    const params = useParams()
    return (
        <Layout>
            {params.what === 'student' ? <>
                <AddStudent />
            </> :
                params.what === 'teacher' ? <>
                    <AddTeacher />
                </> :
                    params.what === 'group' ? <>
                        <AddGroup />
                    </> :
                        params.what === 'pro' ? <>
                            <AddProfession />
                        </> :
                            params.what === "technology" ? <>
                                <AddTechnologies />
                            </> :
                                null}
        </Layout>
    )
}
