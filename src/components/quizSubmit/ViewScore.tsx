'use client'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

interface ViewScoreProps {
    visible: boolean
    onHide: () => void
    data: any
}

export default function ViewScore({ visible, onHide, data }: ViewScoreProps) {
    const header = (
        <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-blue-600">Quiz Score</span>
        </div>
    )

    return (
        <Dialog
            header={header}
            visible={visible}
            onHide={onHide}
            className="w-11/12 max-w-md"
            breakpoints={{ '960px': '75vw', '640px': '90vw' }}
            draggable={false}
        >
            <div className="mt-2">
                <p className="mb-4">
                    Overall Score: {data.currentScore}/{data.total}
                </p>

                <ul className="divide-y divide-gray-200">
                    {data.quiz.map((q: any) => (
                        <li key={q.quizId} className="py-3">
                            <p className="font-medium">{q.quizName}</p>
                            <p className="text-sm text-gray-600">
                                Score: {q.score}/{q.total}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </Dialog>
    )
}
