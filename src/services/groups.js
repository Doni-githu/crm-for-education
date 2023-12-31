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
    },
    edit(id, data){
        return axios.put(`/groups/${id}`, data)
    },
    remove(id){
        return axios.delete(`/groups/${id}`)
    }
}

export default Group