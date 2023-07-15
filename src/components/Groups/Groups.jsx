import Layout from "../../layouts/Layout";
import Card from "../Card/Card";
import './Groups.scss'
export default function Groups() {
    const data = [
        {
            src: '/img/profile.png',
            name: 'Diyorbek Safarov',
            professional: 'Backend',
            id: 0,
            students: 12,
            groups: 2
        },
        {
            src: '/img/profile.png',
            name: 'Diyorbek Safarov',
            professional: 'Backend',
            id: 1,
            students: 12,
            groups: 2
        },
    ]
    return (
        <Layout>
            <div className="groups-container">
                {data.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
        </Layout>
    )
}