'use client'
import { setLoading } from '@/redux/slices/loadingSlice'
import { getAllNotifications } from '@/services/notifications'
import useToast from '@/utils/hooks/useToast'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Notifications = () => {
    const dispatch = useDispatch()
    const { showErrorToast, showSuccessToast } = useToast()
    const [allNotifications, setAllNotifications] = useState([])

    const fetchAllNotifications = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getAllNotifications()
            setAllNotifications(result?.data)
            showSuccessToast('Notifications fetched successfully')
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    console.log(Notifications)

    useEffect(() => {
        fetchAllNotifications()
    }, [fetchAllNotifications])

    return (
        <div>
            <div></div>
        </div>
    )
}

export default Notifications
