'use client';

import { Dialog } from 'primereact/dialog';

interface ViewAnswerProps {
    visible: boolean;
    onHide: () => void;
    data: any;
}

export default function ViewAnswer({ visible, onHide, data }: ViewAnswerProps) {
    const header = (
        <div className="text-xl font-semibold text-blue-600">
            {data.quizName} - Answers
        </div>
    );

    return (
        <Dialog 
            header={header} 
            visible={visible} 
            onHide={onHide}
            className="w-11/12 max-w-md"
            breakpoints={{'960px': '75vw', '640px': '90vw'}}
            draggable={false}
            style={{ maxHeight: '80vh' }}
        >
            <div className="mt-2 overflow-y-auto">
                <ul className="divide-y divide-gray-200">
                    {data.answers.map((answer: any, index: number) => (
                        <li key={index} className="py-3">
                            <p className="font-medium">{answer.question}</p>
                            <p className="text-sm text-gray-600">
                                Correct Answer: {answer.corrrectOption || answer.selectedOption}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </Dialog>
    );
}