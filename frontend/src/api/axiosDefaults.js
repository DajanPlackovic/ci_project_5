import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:8000/api'; // dev
axios.defaults.baseURL = '/api'; // prod

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
