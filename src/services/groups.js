import axios from "./fetch";

const Group = {
    all(){
        return axios.get('/groups/')
    },
    getOne(id){
        return axios.get(`/groups/${id}`)
    },
    make(data){
        return axios.post('/groups/', data)
    }
}

export default Group