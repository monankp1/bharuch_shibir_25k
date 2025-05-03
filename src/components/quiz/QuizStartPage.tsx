'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { getLiveQuiz } from '@/services/quiz'
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setLoading } from '@/redux/slices/loadingSlice'
import useToast from '@/utils/hooks/useToast'
import QuizPlay from './QuizPlay'
// Define TypeScript interfaces
interface QuestionType {
    question: string
    options: string[]
    correctAnswer: string
    _id: string
}

interface QuizDataType {
    quizName: string
    questions: QuestionType[]
    _id: string
}

interface ResponseType {
    question: string
    selectedAnswer: string
    isCorrect: boolean
}

interface SubmissionDataType {
    quiz: string
    responses: ResponseType[]
    userId: string
}

// Main Quiz Component
const QuizStartPage = () => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [quizData, setQuizData] = useState<QuizDataType>()
    const dispatch = useAppDispatch()
    const { showErrorToast, showSuccessToast } = useToast()

    const fetchQuizData = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getLiveQuiz()
            const data = result?.data[0]
            setQuizData(data)
            showSuccessToast(result.message)
        } catch (err) {
            console.error('Error fetching quiz:', err)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchQuizData()
    }, [])

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 max-w-md mx-auto w-full">
            <div className="flex flex-col items-center justify-center flex-grow p-4">
                <h1 className="text-2xl font-bold text-center mb-6 text-indigo-800">{quizData?.quizName} Quiz</h1>
                <div className="bg-white rounded-lg shadow-lg p-6 w-full mb-6">
                    <p className="text-center text-gray-700 mb-4">This quiz contains {quizData?.questions?.length} questions.</p>
                    <p className="text-center text-gray-700 mb-4">You'll have 60 seconds to answer each question.</p>
                    <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl text-indigo-600">{quizData?.questions?.length}</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-300"
                >
                    Start Quiz
                </button>
            </div>

            {/* Quiz Modal */}
            {quizData && showModal && <QuizPlay show={showModal} onClose={() => setShowModal(false)} quizData={quizData} />}
        </div>
    )
}

export default QuizStartPage
