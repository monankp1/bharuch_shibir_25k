import axios from 'axios'
import apiURL from '@/constants/apiEndPoints'

const http = axios.create({
    baseURL: apiURL.BACKEND_ENDPOINT
})

export const getLocalStorage = (key = 'persist:root') => {
    if (typeof window !== 'undefined') {
        const localStorageStr = localStorage.getItem(key)
        if (localStorageStr) {
            return JSON.parse(localStorageStr)
        }
    }
    return null
}

export const getUserToken = () => {
    const storage = getLocalStorage()
    if (storage && storage.user) {
        const userObj = JSON.parse(storage.user)
        return userObj?.user?.token || null
    }
    return null
}

http.interceptors.request.use((req) => {
    const token = getUserToken()
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

export default http
