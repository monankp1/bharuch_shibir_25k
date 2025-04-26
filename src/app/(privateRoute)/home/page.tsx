'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useEffect } from 'react'
import Header from '@/components/header/Header'
import Notifications from '@/components/notifications/Notifications'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
    const token = useAppSelector((state) => state.user.user?.token)
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [token, router])

    return (
        <div>
            <Header />
            <Notifications />
            <Footer />
        </div>
    )
}
