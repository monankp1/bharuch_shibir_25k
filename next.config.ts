import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    images: {
        unoptimized: true // Important line!
    },
    reactStrictMode: false
}

export default nextConfig
