import axios from "./fetch";

const Mentor = {
    getOne(id){
        return axios.get(`/teacher/${id}`)
    },
    all(){
        return axios.get('/teacher/')
    },
    create(data){
        return axios.post('/teacher/', data)
    },
    edit(id, data){
        return axios.put(`/teacher/${id}`, data)
    },
    delete(id){
        return axios.delete(`/teacher/${id}`)
    }
}

export default Mentor