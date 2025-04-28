'use client'

import { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import { FloatLabel } from 'primereact/floatlabel'

interface ResetPasswordProps {
    open: boolean
    handleClose: () => void
}

export default function ResetPassword({ open, handleClose }: ResetPasswordProps) {
    const [formData, setFormData] = useState({
        shibirId: '',
        phoneNo: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.shibirId) newErrors.shibirId = 'Shibir ID is required'
        else if (!/^[A-Z]{4}\d{3}$/.test(formData.shibirId)) newErrors.shibirId = 'Shibir ID must be 4 letters followed by 3 numbers'

        if (!formData.phoneNo) newErrors.phoneNo = 'Phone number is required'
        else if (!/^\d{10}$/.test(formData.phoneNo)) newErrors.phoneNo = 'Phone number must be 10 digits'

        if (!formData.password) newErrors.password = 'Password is required'
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required'
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        try {
            const response = {
                shibirId: formData.shibirId,
                phoneNo: formData.phoneNo,
                Password: formData.password
            }
            console.log('Reset Password Request:', response)

            setFormData({
                shibirId: '',
                phoneNo: '',
                password: '',
                confirmPassword: ''
            })
            handleClose()
        } catch (error) {
            console.error('Reset password failed:', error)
        }
    }

    return (
        <Dialog
            visible={open}
            onHide={handleClose}
            header={<h2 className="text-xl font-semibold rounded-xl text-center text-blue-600">Reset Password</h2>}
            className="w-[90%] max-w-md"
            contentClassName="p-6"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                    <FloatLabel>
                        <InputText
                            id="shibirId"
                            name="shibirId"
                            value={formData.shibirId}
                            onChange={handleChange}
                            maxLength={7}
                            className={classNames({ 'p-invalid': errors.shibirId }) + ' w-full'}
                        />
                        <label htmlFor="shibirId" className="text-sm font-medium">
                            Shibir ID
                        </label>
                    </FloatLabel>
                    {errors.shibirId && <small className="text-red-500">{errors.shibirId}</small>}
                </div>

                <div>
                    <FloatLabel>
                        <InputText
                            id="phoneNo"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            className={classNames({ 'p-invalid': errors.phoneNo }) + ' w-full'}
                        />
                        <label htmlFor="phoneNo" className="text-sm font-medium">
                            Phone Number
                        </label>
                    </FloatLabel>
                    {errors.phoneNo && <small className="text-red-500">{errors.phoneNo}</small>}
                </div>

                <div>
                    <FloatLabel>
                        <InputText
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => handleChange(e)}
                            className={classNames({ 'p-invalid': errors.password }) + ' w-full'}
                        />
                        <label htmlFor="password" className="text-sm font-medium">
                            New Password
                        </label>
                    </FloatLabel>
                    {errors.password && <small className="text-red-500">{errors.password}</small>}
                </div>

                <div>
                    <FloatLabel>
                        <InputText
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange(e)}
                            className={classNames({ 'p-invalid': errors.confirmPassword }) + ' w-full'}
                        />
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </label>
                    </FloatLabel>
                    {errors.confirmPassword && <small className="text-red-500">{errors.confirmPassword}</small>}
                </div>

                <Button type="submit" label="Reset Password" className="w-full bg-blue-600 border-none py-2" />
            </form>
        </Dialog>
    )
}
