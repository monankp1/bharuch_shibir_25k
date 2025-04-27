'use client'
import { setLoading } from '@/redux/slices/loadingSlice'
import { getNityavanchan } from '@/services/nityavanchan'
import { getAllNotifications } from '@/services/notifications'
import useToast from '@/utils/hooks/useToast'
import Image from 'next/image'
import { Carousel } from 'primereact/carousel'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Nityavanchan = () => {
    const dispatch = useDispatch()
    const { showErrorToast, showSuccessToast } = useToast()
    const [nityavanchan, setNityavanchan] = useState<any[]>([])

    const fetchNityavanchan = async () => {
        try {
            dispatch(setLoading(true))
            const { result } = await getNityavanchan()
            setNityavanchan(result?.data)
        } catch (error) {
            showErrorToast(error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        fetchNityavanchan()
    }, [])

    const itemTemplate = (item: any) => {
        return (
            <div className="flex flex-col items-center justify-center p-4">
                {/* Example: Render Image */}
                <Image
                    src={item.imageUrl} // assuming you have imageUrl in API response
                    alt="Nityavanchan Item"
                    width={200}
                    height={300}
                    className="object-cover rounded-lg"
                />
                {/* Example: If you have videos later */}
                {/* <video src={item.videoUrl} controls className="w-full rounded-lg" /> */}
            </div>
        )
    }

    return (
        <div className="w-auto overflow-x-auto flex p-4 m-2">
            <div className="m-2">
                <Image
                    src="https://baps.store/Images/StoreImages/Store_2442/ItemImage/LRG/23.jpg"
                    alt="Vanchanamrut"
                    height={200}
                    width={100}
                />
            </div>
            <div className="m-2">
                <Image
                    src="https://baps.store/Images/StoreImages/Store_2442/ItemImage/LRG/8710.jpg"
                    alt="Vanchanamrut"
                    height={200}
                    width={100}
                />
            </div>
            <div className="m-2">
                <Image
                    src="https://www.baps.org/Data/Sites/1/Media/ProductCategoryImages/1324/FullSizeImages/6a636e92-3421-4c3c-99d6-f4d334d6743a.jpg"
                    alt="Vanchanamrut"
                    height={200}
                    width={100}
                />
            </div>
            <div className="m-2">Video</div>
        </div>
    )
}

export default Nityavanchan
