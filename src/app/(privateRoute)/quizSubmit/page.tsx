'use client'

import QuizSubmit from '@/components/quizSubmit/QuizSubmit'

export default function QuizSubmitPage() {
    return (
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-gray-50 to-blue-100">
            <div className="container mx-auto px-4 max-w-xs">
                <QuizSubmit />
            </div>
        </div>
    )
}
