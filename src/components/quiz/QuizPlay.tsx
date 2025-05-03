'use client'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { submitQuiz } from '@/services/quiz'
import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setLoading } from '@/redux/slices/loadingSlice'
import useToast from '@/utils/hooks/useToast'

interface QuestionType {
    _id: string
    question: string
    options: string[]
    correctAnswer?: string
}

interface QuizDataType {
    _id: string
    quizName: string
    questions: QuestionType[]
}

interface ResponseType {
    questionId: string
    selectedAnswer: string
}

interface FinalSubmission {
    quizId: string
    responses: ResponseType[]
}

type QuizPlayType = {
    show: boolean
    onClose: () => void
    quizData: QuizDataType
}

const QuizPlay = ({ show, onClose, quizData }: QuizPlayType) => {
    const user = useAppSelector((state) => state.user?.user)
    const dispatch = useAppDispatch()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState('')
    const [responses, setResponses] = useState<ResponseType[]>([])
    const [timer, setTimer] = useState(40)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showCompletionMessage, setShowCompletionMessage] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const { showErrorToast, showSuccessToast } = useToast()

    const currentQuestion = quizData.questions[currentIndex]
    const totalQuestions = quizData.questions.length
    const progressPercentage = (currentIndex / totalQuestions) * 100
    const userId = user?._id

    console.log(userId)

    useEffect(() => {
        if (show) {
            startTimer()
        }
        return () => stopTimer()
    }, [show, currentIndex])

    useEffect(() => {
        if (timer === 0) handleNext()
    }, [timer])

    const startTimer = () => {
        stopTimer()
        setTimer(40)
        timerRef.current = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)
    }

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
    }

    const handleNext = () => {
        stopTimer()

        const response: ResponseType = {
            questionId: currentQuestion._id,
            selectedAnswer: selectedOption || ''
        }

        setResponses((prev) => [...prev, response])
        setSelectedOption('')

        if (currentIndex < quizData.questions.length - 1) {
            setCurrentIndex((prev) => prev + 1)
        } else {
            // Last question - show confetti first
            setShowConfetti(true)

            // Show completion message after a short delay
            setTimeout(() => {
                setShowCompletionMessage(true)
            }, 1000)

            // Wait for confetti to finish (3.5 seconds) before submitting
            setTimeout(() => {
                handleSubmit([...responses, response])
            }, 3500)
        }
    }

    const handleSubmit = async (finalResponses: ResponseType[]) => {
        stopTimer()

        const finalPayload: FinalSubmission = {
            quizId: quizData._id,
            responses: finalResponses
        }

        try {
            dispatch(setLoading(true))
            const { result } = await submitQuiz(userId, finalPayload)
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
        onClose()
    }

    const getTimerColor = () => {
        if (timer > 20) return 'bg-green-400 shadow-green-400/50'
        if (timer > 10) return 'bg-yellow-400 shadow-yellow-400/50'
        return 'bg-red-400 shadow-red-400/50'
    }

    const getTimerAnimation = () => {
        if (timer > 10) return 'animate-pulse-slow'
        return 'animate-blink'
    }

    const renderConfetti = () => {
        if (!showConfetti) return null

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {[...Array(75)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>
        )
    }

    if (!show) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Progress bar */}
                <div className="h-1 bg-white/20">
                    <div className="h-full bg-white transition-all duration-500 ease-out" style={{ width: `${progressPercentage}%` }} />
                </div>

                <div className="p-6">
                    {showCompletionMessage ? (
                        <div className="min-h-[400px] flex flex-col items-center justify-center">
                            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                            <p className="text-white/80 mb-2">Thanks for taking the quiz</p>
                            <p className="text-white/80">Submitting your answers...</p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">{quizData.quizName}</h2>
                                <div className="text-sm font-medium">
                                    Question <span className="font-bold">{currentIndex + 1}</span> of <span>{totalQuestions}</span>
                                </div>
                            </div>

                            {/* Timer */}
                            <div className="flex justify-center mb-8">
                                <div
                                    className={`${getTimerColor()} ${getTimerAnimation()} w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}
                                >
                                    <span className="text-2xl font-bold">{timer}</span>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="p-5 bg-white/10 backdrop-blur-sm rounded-xl mb-6">
                                <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>

                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                                                selectedOption === option
                                                    ? 'bg-white text-indigo-700 shadow-lg transform -translate-y-1'
                                                    : 'bg-white/5 hover:bg-white/20'
                                            }`}
                                            onClick={() => setSelectedOption(option)}
                                        >
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                                        selectedOption === option ? 'border-indigo-700' : 'border-white'
                                                    }`}
                                                >
                                                    {selectedOption === option && <div className="w-3 h-3 rounded-full bg-indigo-700" />}
                                                </div>
                                                <label className="cursor-pointer w-full">{option}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next/Submit button */}
                            <div className="flex justify-end">
                                <button
                                    className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2 ${
                                        selectedOption === '' && timer > 0
                                            ? 'bg-white/20 cursor-not-allowed'
                                            : 'bg-white text-indigo-700 hover:shadow-lg hover:-translate-y-1'
                                    }`}
                                    onClick={handleNext}
                                    disabled={selectedOption === '' && timer > 0}
                                >
                                    {currentIndex === quizData.questions.length - 1 ? 'Submit' : 'Next'}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}

                    {renderConfetti()}
                </div>
            </div>

            {/* Add inline keyframe animations */}
            <style jsx global>{`
                @keyframes pulse-slow {
                    0%,
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                }

                @keyframes blink {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }

                @keyframes confetti {
                    0% {
                        top: -10px;
                        transform: translateX(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        transform: translateX(100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .animate-pulse-slow {
                    animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-blink {
                    animation: blink 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .animate-confetti {
                    animation: confetti 3s linear infinite;
                }
            `}</style>
        </div>
    )
}

export default QuizPlay
