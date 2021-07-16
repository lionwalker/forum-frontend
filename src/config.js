import axios from "axios"
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export default {
    baseURL: 'http://127.0.0.1:8000/api/',
    userToken: localStorage.getItem('user-token'),
    axios
 } 