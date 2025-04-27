'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const user = useAppSelector((state) => state.user?.user)
    const router = useRouter()

    useEffect(() => {
        if (!user || !user.token) {
            router.replace('/') // Replace so user can't go back
        }
    }, [user, router])

    return <>{children}</>
}
