import React from 'react'
import Image from 'next/image'

import first from './../../../../public/photos/1.jpg'
import second from './../../../../public/photos/2.jpg'
import third from './../../../../public/photos/3.jpg'
import fourth from './../../../../public/photos/4.jpg'
import fifth from './../../../../public/photos/5.jpg'
import sixth from './../../../../public/photos/6.jpg'
import seventh from './../../../../public/photos/7.jpg'
import eighth from './../../../../public/photos/8.jpg'
import ninth from './../../../../public/photos/9.jpg'
import tenth from './../../../../public/photos/10.jpg'
import Footer from '@/components/footer/Footer'

// Add orientation (horizontal / vertical) manually or use metadata
const images = [
    { src: first, alt: 'First', orientation: 'horizontal' },
    { src: second, alt: 'Second', orientation: 'horizontal' },
    { src: third, alt: 'Third', orientation: 'horizontal' },
    { src: fourth, alt: 'Fourth', orientation: 'horizontal' },
    { src: fifth, alt: 'Fifth', orientation: 'vertical' },
    { src: sixth, alt: 'Sixth', orientation: 'vertical' },
    { src: seventh, alt: 'Seventh', orientation: 'vertical' },
    { src: tenth, alt: 'Tenth', orientation: 'vertical' },
    { src: eighth, alt: 'Eighth', orientation: 'horizontal' },
    { src: ninth, alt: 'Ninth', orientation: 'horizontal' }
]

const Gallery = () => {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 mb-10">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden rounded-xl shadow-md ${
                            img.orientation === 'vertical' ? 'aspect-[3/4]' : 'aspect-video'
                        }`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover w-full h-full"
                            placeholder="blur"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Gallery
