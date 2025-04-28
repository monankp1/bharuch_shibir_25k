'use client'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { LogOut } from 'lucide-react'
import { clearUser } from '@/redux/slices/userSlice'

const settings = ['Profile', 'Logout']

function Header() {
    const dispatch = useDispatch()

    const user = useAppSelector((state) => state.user.user)
    const handleLogout = () => {
        dispatch(clearUser())
    }
    return (
        <div className="flex items-center justify-between bg-primaryLight p-4 text-primary">
            <div className="bg-white p-1 border rounded-full">
                <img
                    src={'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Baps_logo.svg/800px-Baps_logo.svg.png'}
                    height={30}
                    width={30}
                    alt="Logo"
                />
            </div>

            <div className="text-primary flex flex-col items-center">
                <div className="text-xl font-bold">Jai Swaminarayan</div>
                <div className=" ">
                    {user?.firstName} {user?.lastName}
                </div>
            </div>

            <div>
                <button className="flex items-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-xl" onClick={handleLogout}>
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

export default Header
