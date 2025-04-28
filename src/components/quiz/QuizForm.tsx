'use client'

import { useState, useEffect } from 'react'
import QuizPage from './QuizPage'
import { useRouter } from 'next/navigation'

interface QuizFormProps {
    quizData: any
}

export default function QuizForm({ quizData }: QuizFormProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState(60)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else if (timeLeft === 0) {
            handleNextOrSubmit()
        }
    }, [timeLeft, isSubmitted])

    const handleAnswer = (questionId: number, selectedOptionId: number) => {
        const newAnswers = [...answers]
        const existingAnswerIndex = newAnswers.findIndex((a) => a.questionId === questionId)
        if (existingAnswerIndex >= 0) {
            newAnswers[existingAnswerIndex] = { questionId, selectedOptionId }
        } else {
            newAnswers.push({ questionId, selectedOptionId })
        }
        setAnswers(newAnswers)
    }

    const handleNextOrSubmit = () => {
        if (currentQuestionIndex < quizData.questionCount - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setTimeLeft(60)
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        const submission = {
            shibirId: 'BHYK001', // This would typically come from auth context
            quizId: quizData.quizId,
            answers: answers
        }
        console.log('Quiz Submission:', submission)
        setIsSubmitted(true)
        router.push('/quizSubmit')
    }

    const handleClose = () => {
        router.push('/') // Or wherever you want to redirect
    }

    if (isSubmitted) return null

    // Calculate timer progress - 100% at 60s, 0% at 0s
    const timerProgress = (timeLeft / 60) * 100

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 relative">
            {/* Close button */}
            <button onClick={handleClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            {/* Quiz header */}
            <h2 className="text-xl font-semibold text-center mb-4 text-blue-600">{quizData.quizName}</h2>

            {/* Timer */}
            <div className="flex justify-center mb-4">
                <div className="relative">
                    {/* Timer circle background */}
                    <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>

                    {/* Timer progress */}
                    <svg className="absolute top-0 left-0 w-12 h-12" viewBox="0 0 36 36">
                        <path
                            className="text-blue-600 stroke-current"
                            fill="none"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${timerProgress}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            transform="rotate(-90, 18, 18)"
                        />
                    </svg>

                    {/* Timer text */}
                    <span className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center text-sm font-medium">
                        {timeLeft}s
                    </span>
                </div>
            </div>

            {/* Question component */}
            <QuizPage question={quizData.questions[currentQuestionIndex]} onAnswer={handleAnswer} />

            {/* Next/Submit button */}
            <button
                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                onClick={handleNextOrSubmit}
            >
                {currentQuestionIndex === quizData.questionCount - 1 ? 'Submit' : 'Next'}
            </button>
        </div>
    )
}
