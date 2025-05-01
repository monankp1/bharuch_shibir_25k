'use client'

import { RadioButton } from 'primereact/radiobutton'

interface QuizPageProps {
    question: any
    onAnswer: (questionId: number, selectedOptionId: number) => void
}

export default function QuizPage({ question, onAnswer }: QuizPageProps) {
    const handleChange = (optionId: number) => {
        onAnswer(question.questionId, optionId)
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

            <div className="flex flex-col gap-3">
                {question.options.map((option: any, index: number) => (
                    <div key={option[`option${index + 1}Id`]} className="flex items-center gap-2">
                        <RadioButton
                            inputId={`option${index + 1}`}
                            name="quizOption"
                            value={option[`option${index + 1}Id`]}
                            onChange={() => handleChange(option[`option${index + 1}Id`])}
                        />
                        <label htmlFor={`option${index + 1}`} className="ml-2 cursor-pointer">
                            {option[`option${index + 1}`]}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
