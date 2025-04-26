import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true
    },
    distDir: '.next',
    trailingSlash: false,
    publicRuntimeConfig: {},
    reactStrictMode: false
}

export default nextConfig
