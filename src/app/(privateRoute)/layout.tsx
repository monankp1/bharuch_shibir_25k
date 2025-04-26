'use client'

import { ReactNode } from 'react'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.user.user?.token)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [token, router])

  if (!token) {
    return null // or a loading spinner
  }

  return <>{children}</>
}