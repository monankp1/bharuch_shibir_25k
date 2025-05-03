'use client'
import React, { useEffect, useState } from 'react'
import QuizStartPage from '@/components/quiz/QuizStartPage'
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setLoading } from '@/redux/slices/loadingSlice'
import { getScore } from '@/services/quiz'
import useToast from '@/utils/hooks/useToast'
import { useAppSelector } from '@/redux/hooks/useAppSelector'

interface ScoreData {
    totalScore: number
    totalQuestions: number
}

const Quiz: React.FC = () => {
    const [startQuiz, setStartQuiz] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { showErrorToast } = useToast()
    const user = useAppSelector((state) => state.user?.user)
    const userId = user?._id
    const [score, setScore] = useState<ScoreData | null>(null)

    const fetchScoreFromServer = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getScore(userId)
            setScore(result?.data)
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        if (userId) fetchScoreFromServer()
    }, [userId])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
            {!startQuiz ? (
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Quiz!</h1>

                    {score && (
                        <div className="bg-indigo-100 text-indigo-800 font-semibold rounded-lg py-3 px-5 mb-6 shadow-inner">
                            Your total score: {score.totalScore} / {score.totalQuestions}
                        </div>
                    )}

                    <button
                        onClick={() => setStartQuiz(true)}
                        className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition duration-300"
                    >
                        Play Quiz
                    </button>
                </div>
            ) : (
                <QuizStartPage />
            )}
        </div>
    )
}

export default Quiz
