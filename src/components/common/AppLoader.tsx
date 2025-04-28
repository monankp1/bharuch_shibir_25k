'use client'

import { useAppSelector } from '@/redux/hooks/useAppSelector'
import Lottie from 'lottie-react'
import groovyWalkAnimation from '../../../public/animation/Animation - 1745431237829.json'

export default function AppLoader() {
    const loading = useAppSelector((state) => state.loading.loading)

    if (!loading) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="w-40 h-40">
                <Lottie animationData={groovyWalkAnimation} loop autoplay />
            </div>
        </div>
    )
}
