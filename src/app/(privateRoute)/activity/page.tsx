import Footer from '@/components/footer/Footer'
import React from 'react'

const Activity = () => {
    const activityBox = (header: string) => {
        return (
            <div className="relative border border-primary rounded-lg p-6 w-full max-w-md ">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-md font-bold text-lg">
                    {header}
                </div>
                <div className="mt-4">Play quiz to get swami bapa's rajipo</div>
            </div>
        )
    }
    return (
        <div className="flex flex-col justify-center items-center ">
            <div> {activityBox('Quiz')}</div>
            <Footer />
        </div>
    )
}

export default Activity
