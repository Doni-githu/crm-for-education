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
    }
}

export default Auth