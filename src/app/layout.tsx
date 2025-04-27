// src/app/layout.tsx
'use client'
import './globals.css'
import '@/styles/styles.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/redux/store'
import { Toaster } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import AuthGuard from './AuthGaurd'

const AppLoader = dynamic(() => import('@/components/common/AppLoader'), {
    ssr: false
})

export default function RootLayout({ children }: { children: ReactNode }) {
    // const user = useAppSelector((state) => state.user.user)
    // const router = useRouter()

    // useEffect(() => {
    //     if (user) {
    //         router.push('/home')
    //     } else {
    //         router.push('/')
    //     }
    // }, [user, router])

    return (
        <Provider store={store}>
            <html lang="en">
                <body>
                    <Toaster position="top-center" reverseOrder={false} />
                    <PersistGate loading={null} persistor={persistor}>
                        <AuthGuard>
                            <AppLoader />
                            {children}
                        </AuthGuard>
                    </PersistGate>
                </body>
            </html>
        </Provider>
    )
}
