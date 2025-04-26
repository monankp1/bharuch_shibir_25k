'use client'

import LoginForm from '@/components/login/LoginForm'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const token = useAppSelector((state) => state.user.user?.token)
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/home')
        } else {
            router.push('/')
        }
    }, [token, router])

    return (
        <div className="login-page">
            <LoginForm />
        </div>
    )
}
