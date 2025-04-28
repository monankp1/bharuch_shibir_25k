'use client'

import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useEffect } from 'react'
import Header from '@/components/header/Header'
import Notifications from '@/components/notifications/Notifications'
import Footer from '@/components/footer/Footer'
import Routes from '@/components/routes/Routes'
import Announcement from './../../../../public/icons/Announcements.png'
import RouteBus from './../../../../public/icons/Routes.png'
import Vanchan from './../../../../public/icons/Vanchan.png'
import Image from 'next/image'
import Link from 'next/link'
import Nityavanchan from '@/components/nityavanchan/Nityavanchan'

export default function HomePage() {
    const token = useAppSelector((state) => state.user.user?.token)
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    }, [token, router])

    return (
        <div className="flex flex-col min-h-screen">
            <div>
                <Header />
            </div>
            <div className="flex-1 pb-16">
                <div className="mt-2">
                    <div className="bg-primaryLight p-2 pl-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div>
                                <Image src={Announcement} alt="Announcement" width={20} height={20} />
                            </div>
                            <div className="text-primary font-bold text-xl ml-2">
                                <p>Announcements</p>
                            </div>
                        </div>
                        <div className="pr-4">
                            <div>{/* <Link href={'/'}> Veiw All</Link> */}</div>
                        </div>
                    </div>
                    <div className="h-[40vh] overflow-y-auto">
                        <Notifications />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="bg-primaryLight p-2 pl-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div>
                                <Image src={RouteBus} alt="Announcement" width={20} height={20} />
                            </div>
                            <div className="text-primary font-bold text-xl ml-2">
                                <p>Yatra Route</p>
                            </div>
                        </div>
                        <div className="pr-4">
                            <div>{/* <Link href={'/'}> Veiw All</Link> */}</div>
                        </div>
                    </div>
                    <div>
                        <Routes />
                    </div>
                </div>
                <div className="mt-2">
                    <div className="bg-primaryLight p-2 pl-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <div>
                                <Image src={Vanchan} alt="Announcement" width={20} height={20} />
                            </div>
                            <div className="text-primary font-bold text-xl ml-2">
                                <p>Nitya Vanchan</p>
                            </div>
                        </div>
                        <div className="pr-4">
                            <div>{/* <Link href={'/'}> Veiw All</Link> */}</div>
                        </div>
                    </div>
                    <div>
                        <Nityavanchan />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
