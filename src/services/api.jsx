import axios from 'axios';

const api = axios.crerate({
    baseURL: 'https://api-nodejs-todolist.herokuapp.com/'
})

export default api;