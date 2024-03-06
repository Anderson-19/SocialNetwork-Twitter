import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    }
})