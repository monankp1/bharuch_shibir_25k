import apiURL from '@/constants/apiEndPoints'
import http from '@/config/config'

/**
 * get running quiz
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const getLiveQuiz = async () => {
    try {
        const res = await http.get(`${apiURL.BACKEND_ENDPOINT}/quiz/live`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * get all quiz list
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const getAllQuiz = async () => {
    try {
        const res = await http.get(`${apiURL.BACKEND_ENDPOINT}/quiz`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Create a new quiz
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const createQuiz = async (data: any) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/quiz`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Get quiz by quizId
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const getQuizById = async (quizId: string) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/quiz/${quizId}`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Update he quiz name
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const updateQuizName = async (quizId: string, data: any) => {
    try {
        const res = await http.patch(`${apiURL.BACKEND_ENDPOINT}/quiz/${quizId}`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Start or Stop the quiz
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const startStopQuiz = async (quizId: string, data: any) => {
    try {
        const res = await http.patch(`${apiURL.BACKEND_ENDPOINT}/quiz/${quizId}/startQuiz`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Add a question in quiz
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const addQuestionInQuiz = async (quizId: string, data: any) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/quiz/${quizId}`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Update the question of the quiz
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const updateQuestionInQuiz = async (quizId: string, questionId: string, data: any) => {
    try {
        const res = await http.patch(`${apiURL.BACKEND_ENDPOINT}/quiz/${quizId}/question/${questionId}`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Submit quiz to server
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const submitQuiz = async (userId: string, data: any) => {
    try {
        const res = await http.post(`${apiURL.BACKEND_ENDPOINT}/quiz/submit/${userId}`, data)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}

/**
 * Get Score from server
 *
 * @returns {Promise<Object>} - returns an object containing the result or error.
 * @returns {Object} result - The data returned from the server on success.
 */
export const getScore = async (userId: string) => {
    try {
        const res = await http.get(`${apiURL.BACKEND_ENDPOINT}/quiz/history/${userId}`)
        return { result: res?.data }
    } catch (error) {
        throw error
    }
}
