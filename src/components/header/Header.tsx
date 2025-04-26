'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks/useAppSelector'

const settings = ['Profile', 'Logout']

function Header() {
    const user = useAppSelector((state) => state.user.user.user)

    return (
        <div className="flex items-center justify-between bg-primaryLight p-4 text-primary">
            <div className="bg-white p-1 border rounded-full">
                <Image
                    src={'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/800px-Baps_logo.svg.png'}
                    height={30}
                    width={30}
                    alt="Logo"
                />
            </div>

            <div className="text-primary flex flex-col items-center">
                <div className="text-xl font-bold">{`Hello ${user.firstName}!`}</div>
                <div className="text-xl font-bold">Jay Swaminarayan</div>
            </div>

            <div>Hii</div>
        </div>
    )
}

export default Header
