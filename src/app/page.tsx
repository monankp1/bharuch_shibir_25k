'use client'

import LoginForm from '@/components/login/LoginForm'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HomePage() {
    const user = useAppSelector((state) => state.user?.user)
    const router = useRouter()

    useEffect(() => {
        if (user && user.token) {
            router.push('/home')
        } else if (user === null || user === undefined) {
            router.push('/')
        }
    }, [user, router])

    return (
        <>
            <LoginForm />
        </>
    )
}
