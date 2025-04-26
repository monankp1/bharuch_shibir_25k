import axios from 'axios'
import apiURL from '@/constants/apiEndPoints'

const http = axios.create({
    baseURL: apiURL.BACKEND_ENDPOINT
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || JSON.parse(localStorage.getItem('user') || '{}')?.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default http
