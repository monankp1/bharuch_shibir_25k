'use client'

import { useState } from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import ViewScore from './ViewScore'
import ViewAnswer from './ViewAnswer'

export default function QuizSubmit() {
    const [showScore, setShowScore] = useState(false)
    const [showAnswers, setShowAnswers] = useState(false)

    // Sample data (would come from backend)
    const scoreData = {
        currentScore: 50,
        total: 100,
        quiz: [{ quizId: 1, quizName: 'Shreeji', score: 1, total: 4 }]
    }

    const answerData = {
        quizId: 1,
        quizName: 'Shreeji',
        answers: [
            { question: 'What is your name?', corrrectOption: 'Tarun' },
            { question: 'What is the capital of France?', selectedOption: 'Paris' }
            // ... other answers
        ]
    }

    return (
        <Card className="shadow-lg p-4 rounded-lg">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">Your response has been submitted successfully</h2>

                <Button
                    label="View Answers"
                    className="w-full mb-3 p-3 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowAnswers(true)}
                />

                <Button label="View Score" className="w-full p-3 bg-blue-600 hover:bg-blue-700" onClick={() => setShowScore(true)} />
            </div>

            <ViewAnswer visible={showAnswers} onHide={() => setShowAnswers(false)} data={answerData} />

            <ViewScore visible={showScore} onHide={() => setShowScore(false)} data={scoreData} />
        </Card>
    )
}
