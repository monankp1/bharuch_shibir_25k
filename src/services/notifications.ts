import axios from 'axios'
import apiURL from '@/constants/apiEndPoints'

/**
 * get login user details
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllNotifications = async () => {
    try {
        const res = await axios.get(`${apiURL.BACKEND_ENDPOINT}/notification`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}
