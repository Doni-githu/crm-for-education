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
    }
}

export default Mentor