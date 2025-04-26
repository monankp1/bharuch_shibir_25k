'use client'
import './globals.css'
import '@/styles/styles.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import LoginForm from '@/components/login/LoginForm'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
    const user = useAppSelector((state) => state.user.user)
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/home')
        } else {
            router.push('/')
        }
    }, [user, router])

    return (
        <>
            <LoginForm />
        </>
    )
}
