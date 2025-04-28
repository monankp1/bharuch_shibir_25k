'use client' // If using Next.js 13+ App Router

import React from 'react'
import { Carousel } from 'primereact/carousel'
import { Card } from 'primereact/card'
import { Info } from 'lucide-react' // Importing Lucide Info icon
import { Button } from 'primereact/button'

interface Milestone {
    date: string
    time: string
    location: string
}

const milestones: Milestone[] = [
    { date: '27 May', time: '1.00 AM', location: 'Aagna' },
    { date: '28 May', time: '12.00 AM', location: 'Upasana' },
    { date: '29 May', time: '7.00 PM', location: 'Seva' },
    { date: '30 May', time: '1.00 AM', location: 'Rajipo' },
    { date: '30 May', time: '1.00 AM', location: 'Akshardham' }
]

const Routes = () => {
    const milestoneTemplate = (milestone: Milestone) => {
        return (
            <div className="mr-3 w-[100px]">
                <div className="bg-primary rounded-t-[32px] p-[10px] w-full gap-1 flex flex-col justify-center items-center">
                    <div className="text-white">{milestone.date}</div>
                    <div className="text-primaryLight text-sm">{milestone.time}</div>
                </div>
                <div className="bg-primaryLight w-full p-4 flex flex-col justify-center items-center">
                    <div className="text-primary">{milestone.location}</div>
                    <div className="bg-primary text-primaryLight rounded-full">
                        <Info />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card px-4 py-8">
            <Carousel
                value={milestones}
                showIndicators={false}
                showNavigators={false}
                itemTemplate={milestoneTemplate}
                numVisible={3}
                numScroll={2}
                circular={false}
            />
        </div>
    )
}

export default Routes
