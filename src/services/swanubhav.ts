import apiURL from '@/constants/apiEndPoints'
import http from '@/config/config'

/**
 * get all swanubhav
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const getAllSwanubhav = async () => {
    try {
        const res = await http.get(`${apiURL.BACKEND_ENDPOINT}/swanubhav`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Create a new swanubhav
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const createSwanubhav = async (data: any) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/swanubhav`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}
