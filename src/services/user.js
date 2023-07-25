import axios from "./fetch"


const Auth = {
    login(user){
        return axios.post('/accounts/login', user) 
    },
    getUser(token){
        return axios.get(`/accounts/user/${token}`)
    },
    getUseById(id, role){
        return axios.get(`/account/${id}/${role}`)
    },
    all(){
        return axios.get('/student/')
    },
    getOne(id){
        return axios.get(`/student/${id}`)
    },
    make(data){
        return axios.post('/student/', data)
    },
    allAdmin(){
        return axios.get('/administrator/')
    },
    edit(id, data){
        return axios.put(`/student/${id}`, data)
    },
    removeStudent(id){
        return axios.delete(`/student/${id}`)
    }
}

export default Auth