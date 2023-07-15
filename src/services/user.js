import axios from "./fetch"


const Auth = {
    login(user){
        return axios.post('/login', user) 
    }
}

export default Auth