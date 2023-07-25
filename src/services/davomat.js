import axios from "./fetch";

const DavomatReq = {
    getOne(id, data){
        return axios.put(`/davomat/${id}`, data)
    },
    create(data){
        return axios.post('/davomat/', data)
    }
}

export default DavomatReq