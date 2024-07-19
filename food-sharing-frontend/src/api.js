import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
    },
});

export default api;
