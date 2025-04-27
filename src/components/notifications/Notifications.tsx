'use client'

import { setLoading } from '@/redux/slices/loadingSlice'
import { addNotificationIds } from '@/redux/slices/notificationSlice'
import { useAppSelector } from '@/redux/hooks/useAppSelector'
import { useDispatch } from 'react-redux'
import { getAllNotifications } from '@/services/notifications'
import useToast from '@/utils/hooks/useToast'
import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import Image from 'next/image'
import Announcement from '../../../public/icons/Announcements.png'

interface NotificationType {
    notificationTitle: string
    notificationBody: string
    _id: string
}

const Notifications = () => {
    const dispatch = useDispatch()
    const { showErrorToast } = useToast()
    const [allNotifications, setAllNotifications] = useState<NotificationType[]>([])
    const [newNotifications, setNewNotifications] = useState<NotificationType[]>([])
    const [showDialog, setShowDialog] = useState(false)

    const seenNotificationIds = useAppSelector((state) => state.notification.seenNotificationIds)

    const fetchAllNotifications = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getAllNotifications()
            const notifications = result?.data || []
            setAllNotifications(notifications)

            // Find new notifications
            const unseen = notifications.filter((n: NotificationType) => !seenNotificationIds?.includes(n._id))
            if (unseen.length > 0) {
                setNewNotifications(unseen)
                setShowDialog(true)
            }
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleDialogClose = () => {
        const newIds = newNotifications.map((n) => n._id)
        dispatch(addNotificationIds(newIds))
        setShowDialog(false)
    }

    useEffect(() => {
        fetchAllNotifications()
        const interval = setInterval(fetchAllNotifications, 5 * 60 * 1000)

        return () => clearInterval(interval)
    }, [])

    const footerNotificationDialog = (
        <div className="flex justify-end pt-2">
            <button onClick={handleDialogClose} className="bg-primary text-white font-semibold py-2 px-6 rounded-xl">
                OK
            </button>
        </div>
    )

    const headerNotificationDialog = (
        <div className="flex items-center gap-2">
            <div>
                <Image src={Announcement} alt="Announcement" width={20} height={20} />
            </div>
            <div className="">
                <p>New Announcements</p>
            </div>
        </div>
    )

    return (
        <div>
            <div>
                {allNotifications.map((notification) => (
                    <div key={notification._id} className="bg-accentLight my-2 mx-8 rounded-tr-xl rounded-bl-xl">
                        <div className="p-4">
                            <div>
                                <div className="font-bold text-xl text-primary  mb-2">{notification.notificationTitle}</div>
                                <div>{notification.notificationBody}</div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <div className="font-bold text-sm mb-2">- પૂ. અનિર્દેશ સ્વામી</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog for New Notifications */}
            <Dialog
                header={headerNotificationDialog}
                visible={showDialog}
                onHide={() => {}} // disable default closing
                dismissableMask={false}
                closable={false}
                draggable={false}
                blockScroll
                style={{
                    width: '90vw',
                    maxWidth: '400px',
                    borderRadius: '24px',
                    background: 'var(--primary)',
                    maxHeight: '80vh',
                    overflow: 'hidden'
                }}
                footer={footerNotificationDialog}
            >
                <div className="max-h-80 overflow-y-auto space-y-4">
                    {newNotifications.map((notification) => (
                        <div key={notification._id} className="p-2">
                            <div>
                                <h3 className="font-bold text-lg text-primary mb-1">{notification.notificationTitle}</h3>
                                <p className="text-gray-700">{notification.notificationBody}</p>
                            </div>
                            <div className="flex justify-end mt-4">
                                <div className="font-bold text-sm mb-2">- પૂ. અનિર્દેશ સ્વામી</div>
                            </div>

                            <hr className="my-3 border-gray-300" />
                        </div>
                    ))}
                </div>
            </Dialog>
        </div>
    )
}

export default Notifications
