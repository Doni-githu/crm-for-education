import Layout from "../../layouts/Layout";
import Card from "../Card/Card";
import './Groups.scss'
export default function Groups() {    
    return (
        <Layout>
            <div className="groups-container">
                {[].map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </div>
        </Layout>
    )
}