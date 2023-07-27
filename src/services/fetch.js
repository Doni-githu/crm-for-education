import axios from "axios";


const global = 'https://crm-backend-5jb6.onrender.com'
const local = 'http://127.0.0.1:8000'
axios.defaults.baseURL =  process.env.NODE_ENV === 'production' ? global : local




export default axios