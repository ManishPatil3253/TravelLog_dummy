import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Make sure this matches your backend port

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // This is crucial for sending the httpOnly cookie
});