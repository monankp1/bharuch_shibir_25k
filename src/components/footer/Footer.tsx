'use client'

import { usePathname } from 'next/navigation'
import { Home, Lightbulb, Gamepad2, Image, User } from 'lucide-react'
import Link from 'next/link'

const navItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/gungrahan', icon: Lightbulb, label: 'Learn' },
    { href: '/activity', icon: Gamepad2, label: 'Activity' },
    { href: '/gallery', icon: Image, label: 'Gallery' },
    { href: '/profile', icon: User, label: 'Profile' }
]

export default function Footer() {
    const pathname = usePathname()

    return (
        <footer className="fixed bottom-0 left-0 right-0 mt-2 bg-primary rounded-t-2xl px-6 py-3 flex justify-between items-center">
            {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href
                return (
                    <Link key={href} href={href} aria-label={label}>
                        <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-primary-light' : 'text-primary-foreground'}`} />
                    </Link>
                )
            })}
        </footer>
    )
}
