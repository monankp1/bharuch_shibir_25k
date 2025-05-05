// // src/app/layout.tsx
// 'use client'
// import './globals.css'
// import '@/styles/styles.scss'
// import 'primereact/resources/themes/saga-blue/theme.css'
// import 'primereact/resources/primereact.min.css'
// import 'primeicons/primeicons.css'
// import { ReactNode } from 'react'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from '@/redux/store'
// import { Toaster } from 'react-hot-toast'
// import dynamic from 'next/dynamic'
// import AuthGuard from './AuthGaurd'

// const AppLoader = dynamic(() => import('@/components/common/AppLoader'), {
//     ssr: false
// })

// export default function RootLayout({ children }: { children: ReactNode }) {
//     // const user = useAppSelector((state) => state.user.user)
//     // const router = useRouter()

//     // useEffect(() => {
//     //     if (user) {
//     //         router.push('/home')
//     //     } else {
//     //         router.push('/')
//     //     }
//     // }, [user, router])

//     return (
//         <Provider store={store}>
//             <html lang="en">
//                 <body>
//                     <Toaster position="top-center" reverseOrder={false} />
//                     <PersistGate loading={null} persistor={persistor}>
//                         <AuthGuard>
//                             <AppLoader />
//                             {children}
//                         </AuthGuard>
//                     </PersistGate>
//                 </body>
//             </html>
//         </Provider>
//     )
// }
/*************************************************************************************************/
// src/app/layout.tsx
'use client'
import './globals.css'
import '@/styles/styles.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { ReactNode, useEffect } from 'react'
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
    // Register service worker for PWA
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/sw.js').then(
                    function (registration) {
                        console.log('Service Worker registration successful with scope: ', registration.scope)
                    },
                    function (err) {
                        console.log('Service Worker registration failed: ', err)
                    }
                )
            })
        }
    }, [])

    return (
        <Provider store={store}>
            <html lang="en">
                <head>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="application-name" content="Yoddha Yuvano Mahant Swamina" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="YYMS" />
                    <meta name="theme-color" content="#FFFFFF" />
                    <link rel="apple-touch-icon" href="/logo_app.png" />
                    <script src="/register-sw.js" defer></script>
                </head>
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
