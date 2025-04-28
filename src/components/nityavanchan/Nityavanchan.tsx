'use client'
import { setLoading } from '@/redux/slices/loadingSlice'
import { getNityavanchan } from '@/services/nityavanchan'
import { getAllNotifications } from '@/services/notifications'
import useToast from '@/utils/hooks/useToast'
import Image from 'next/image'
import { Carousel } from 'primereact/carousel'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Dialog } from 'primereact/dialog'

interface VanchanType {
    title: string
    text: string
}
interface NityavanchanType {
    jivanCharitra: VanchanType
    swamiNiVato: string[]
    vachanamrut: VanchanType
    videoPrasang: string
}

const Nityavanchan = () => {
    const dispatch = useDispatch()
    const { showErrorToast, showSuccessToast } = useToast()
    const [nityavanchan, setNityavanchan] = useState<NityavanchanType[] | null>(null)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<{
        type: 'vachanamrut' | 'swamiNiVato' | 'jivanCharitra' | 'videoPrasang'
        title: string
    } | null>(null)

    const fetchNityavanchan = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getNityavanchan()
            setNityavanchan(result)
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchNityavanchan()
    }, [])

    const openDialog = (type: 'vachanamrut' | 'swamiNiVato' | 'jivanCharitra' | 'videoPrasang', title: string) => {
        setSelectedItem({ type, title })
        setDialogVisible(true)
    }

    console.log(nityavanchan)

    const renderDialogContent = () => {
        if (!selectedItem) return <p>No item selected</p>
        if (!nityavanchan || nityavanchan.length === 0) return <p>Loading content...</p>

        // Create a mock data object for demonstration if API data isn't available yet
        const data = nityavanchan[0] || {
            vachanamrut: { title: 'Sample Vachanamrut Title', text: 'Sample Vachanamrut text content.' },
            swamiNiVato: ['Sample Swami Ni Vato 1', 'Sample Swami Ni Vato 2', 'Sample Swami Ni Vato 3'],
            jivanCharitra: { title: 'Sample Jivan Charitra Title', text: 'Sample Jivan Charitra text content.' },
            videoPrasang: 'https://www.youtube.com/embed/M6mZcfsVinc?si=C8SXCQseBReQQGm0'
        }

        switch (selectedItem.type) {
            case 'jivanCharitra':
                return (
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">{data.jivanCharitra.title}</h2>
                        <p className="text-gray-700">{data.jivanCharitra.text}</p>
                    </div>
                )
            case 'swamiNiVato':
                return (
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Swami Ni Vato</h2>
                        <ul className="list-disc pl-5">
                            {data.swamiNiVato.map((vato, index) => (
                                <li key={index} className="mb-2">
                                    {vato}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            case 'vachanamrut':
                return (
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">{data.vachanamrut.title}</h2>
                        <p className="text-gray-700">{data.vachanamrut.text}</p>
                    </div>
                )
            case 'videoPrasang':
                return (
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold mb-4">Video Prasang</h2>
                        <div className="w-full aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={data.videoPrasang || 'https://www.youtube.com/embed/M6mZcfsVinc?si=C8SXCQseBReQQGm0'}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            <div className="w-auto overflow-x-auto flex p-4 m-2">
                <div
                    className="m-2 border p-2 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openDialog('vachanamrut', 'Vachanamrut')}
                >
                    <Image
                        src="https://baps.store/Images/StoreImages/Store_2442/ItemImage/LRG/23.jpg"
                        alt="Vachanamrut"
                        height={200}
                        width={100}
                    />
                </div>
                <div
                    className="m-2 border p-2 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openDialog('swamiNiVato', 'Swami Ni Vato')}
                >
                    <Image
                        src="https://baps.store/Images/StoreImages/Store_2442/ItemImage/LRG/8710.jpg"
                        alt="Swami Ni Vato"
                        height={200}
                        width={100}
                    />
                </div>
                <div
                    className="m-2 border p-2 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openDialog('jivanCharitra', 'Jivan Charitra')}
                >
                    <Image
                        src="https://www.baps.org/Data/Sites/1/Media/ProductCategoryImages/1324/FullSizeImages/6a636e92-3421-4c3c-99d6-f4d334d6743a.jpg"
                        alt="Jivan Charitra"
                        height={200}
                        width={100}
                    />
                </div>
                <div
                    className="m-2 border p-2 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => openDialog('videoPrasang', 'Video Prasang')}
                >
                    <div className="flex items-center justify-center h-full">
                        Video <br />
                        Prasang
                    </div>
                </div>
            </div>

            <Dialog
                header={selectedItem?.title || ''}
                visible={dialogVisible}
                style={{
                    width: '90vw',
                    maxWidth: '400px',
                    borderRadius: '24px',
                    background: 'var(--primary)',
                    maxHeight: '80vh',
                    overflow: 'hidden'
                }}
                onHide={() => setDialogVisible(false)}
                draggable={false}
                resizable={false}
                // className="p-4"
                blockScroll
            >
                {renderDialogContent()}
            </Dialog>
        </>
    )
}

export default Nityavanchan
