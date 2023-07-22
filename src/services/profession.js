import axios from "./fetch";

const Profession = {
    all() {
        return axios.get('/profession/')
    },
    create(data){
        return axios.post('/profession/', data)
    },
    delete(id){
        return axios.delete(`/profession/${id}`)
    }
}

export default Profession