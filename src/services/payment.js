import axios from "./fetch";

const Payment = {
    all(){
        return axios.get('/payment/')
    }
}

export default Payment