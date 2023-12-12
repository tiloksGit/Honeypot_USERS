import axios from 'axios';

const client = axios.create({
    baseURL:"https://login-server-m5hm.onrender.com"
})

export default client;