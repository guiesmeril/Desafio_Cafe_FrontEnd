import axios from 'axios';

const api = axios.create({
    baseURL: ' https://desafio-grupo.herokuapp.com',
})

export default api;