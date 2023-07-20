import axios from "./fetch";

const Group = {
    all(){
        return axios.get('/groups/')
    },
    getOne(id){
        return axios.get(`/groups/${id}`)
    }
}

export default Group