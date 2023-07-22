import axios from "./fetch";

const Technology = {
    all(){
        return axios.get('/technology/')
    },
    allWeekDays(){
        return axios.get('/days/')
    },
    create(data){
        return axios.post('/technology/', data)
    },
    delete(id){
        return axios.delete(`/technology/${id}`)
    }
}

export default Technology