import http from '@/config/config'
import apiURL from '@/constants/apiEndPoints'

import axios from 'axios'

/**
 * post login user details
 *
 * @param {string} shibirId - Shibir id of the user.
 * @param {string} password - password of the user.
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLoginUser = async (formData: any) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/auth/login`, formData)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}
