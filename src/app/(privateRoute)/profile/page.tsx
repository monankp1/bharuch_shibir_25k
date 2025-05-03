'use client'
import Image from 'next/image'
import React from 'react'
import lion from '../../../../public/icons/lion.svg'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import Footer from '@/components/footer/Footer'

const Profile = () => {
    const user = useAppSelector((state) => state.user.user)

    return (
        <div>
            <div className="flex">
                <div>
                    <Image src={lion} alt="lion" width={20} height={20} />
                </div>
                <div>
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                    <div>
                        {' '}
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div></div>
            <Footer />
        </div>
    )
}

export default Profile
