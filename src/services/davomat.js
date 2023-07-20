import axios from "./fetch";

const DavomatReq = {
    getOne(id, data){
        return axios.put(`/davomat/${id}`, data)
    }
}

export default DavomatReq