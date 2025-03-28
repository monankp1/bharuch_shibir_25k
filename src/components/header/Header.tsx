'use client'
import { useState } from 'react'
import Image from 'next/image'

const settings = ['Profile', 'Logout']

function Header() {
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
                <div className="bg-white p-1 border rounded-full">
                    <Image
                        src={'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/800px-Baps_logo.svg.png'}
                        height={30}
                        width={30}
                        alt="Logo"
                    />
                </div>

                <div className="relative">
                    <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                        <Image
                            className="w-10 h-10 rounded-full border"
                            src={
                                'https://firebasestorage.googleapis.com/v0/b/natours-336d4.appspot.com/o/user_profile_photos%2Fuser-5c8a24402f8fb814b56fa190-1678040803632.jpeg?alt=media&token=b37adb79-a5a0-48d0-91fa-7b8e03cfe4cd'
                            }
                            alt="User"
                            height={20}
                            width={20}
                        />
                    </button>
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md">
                            {settings.map((setting) => (
                                <button
                                    key={setting}
                                    onClick={() => setUserMenuOpen(false)}
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                                >
                                    {setting}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header
