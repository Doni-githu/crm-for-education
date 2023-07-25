import React, { useEffect } from 'react'
import ReactRouter, { useParams, useHistory, useNavigate } from 'react-router-dom'
import Layout from '../../layouts/Layout'
import EditGroup from '../EditGroup/EditGroup'
import EditStudent from '../EditStudent/EditStudent'
import EditTeacher from '../EditTeacher/EditTeacher'

export default function EditHandler() {
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "AD") {
            navigate(-1)
        }
    }, [])
    return (
        <Layout>
            {params.what === "group" ? <>
                <EditGroup id={params.id} />
            </> :
                params.what === "student" ? <>
                    <EditStudent id={parseInt(params.id)} />
                </> : params.what === "teacher" ? <>
                    <EditTeacher />
                </> : null}
        </Layout>
    )
}
