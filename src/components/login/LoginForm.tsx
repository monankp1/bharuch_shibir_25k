'use client'

import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import ResetPassword from './ResetPassword'
import { setLoading } from '@/redux/slices/loadingSlice'
import { useAppDispatch } from '@/redux/hooks/useAppDispatch'
import { setUser } from '@/redux/slices/userSlice'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { getLoginUser } from '@/services/login'
import useToast from '@/utils/hooks/useToast'

export default function LoginForm() {
    const [formData, setFormData] = useState({ shibirId: '', password: '' })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [openResetModal, setOpenResetModal] = useState(false)
    const dispatch = useAppDispatch()
    const loading = useAppSelector((state) => state.loading.loading)
    const { showErrorToast, showSuccessToast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.shibirId) {
            newErrors.shibirId = 'Shibir Id is required'
        } else if (!/^[A-Z]{4}\d{3}$/.test(formData.shibirId)) {
            newErrors.shibirId = 'Incorrect Shibir ID'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            dispatch(setLoading(true))
            const { result } = await getLoginUser(formData)

            dispatch(setUser(result?.data))
            console.log(result.data)
            showSuccessToast('Successfully LoggedIn')
            setFormData({ shibirId: '', password: '' })
            setErrors({})
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-primaryLight px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200">
                <h2 className="text-center text-2xl sm:text-3xl font-bold text-accent mb-6">Welcome Back 👋</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <FloatLabel>
                            <InputText
                                id="shibirId"
                                name="shibirId"
                                value={formData.shibirId}
                                onChange={handleChange}
                                maxLength={7}
                                className="w-full border rounded-lg border-gray-300"
                            />
                            <label htmlFor="shibirId">Shibir Id</label>
                        </FloatLabel>

                        {errors.shibirId && <small className="text-red-500 text-xs">{errors.shibirId}</small>}
                    </div>

                    <div className="mt-4">
                        <FloatLabel>
                            <InputText
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full border rounded-lg border-gray-300"
                            />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>

                        {errors.password && <small className="text-red-500 text-xs">{errors.password}</small>}
                    </div>

                    <Button
                        type="submit"
                        label="Login"
                        disabled={loading}
                        className="w-full bg-primary text-white font-medium py-2 px-4 rounded-xl transition duration-200"
                    />

                    <Button
                        label="Forgot Password?"
                        link
                        className="text-sm text-indigo-600 hover:underline hover:text-indigo-800 mt-2"
                        onClick={() => setOpenResetModal(true)}
                    />
                </form>
            </div>

            <ResetPassword open={openResetModal} handleClose={() => setOpenResetModal(false)} />
        </div>
    )
}
