import { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import Card from "../Card/Card";
import './Groups.scss'
import Teacher from "../../services/mentor"
import Loader from "../../uiComponents/Loader/Loader"
import { useNavigate } from "react-router-dom";
export default function Groups() {
    const [data, setData] = useState([])
    useEffect(() => {
        Teacher.all()
            .then(res => {
                setData(res.data);
            })
    }, [])
    const navigate = useNavigate()
    return (
        <Layout>
            <div className="dashboard-top right">
                <div className="btn">
                    <button onClick={() => navigate('/add/teacher')}>
                        <div className="img">
                            <i className='fa-solid fa-plus'></i>
                        </div>
                        <p>Add Teacher</p>
                    </button>
                </div>
            </div>
            <div className="groups-container">
                {data ? data.map((item) => (
                    <Card item={item} key={item.id} />
                )) : <>
                    <Loader />
                </>}
            </div>
        </Layout>
    )
}