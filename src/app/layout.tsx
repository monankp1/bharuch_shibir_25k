import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', margin: 0 }}>{children}</body>
        </html>
    )
}
