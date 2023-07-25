import axios from "./fetch";

const Payment = {
    all(){
        return axios.get('/payment/')
    },
    make(data){
        return axios.post('/payment/', data)
    }
}

export default Payment