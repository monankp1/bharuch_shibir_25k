/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true
    },
    distDir: '.next',
    trailingSlash: false,
    publicRuntimeConfig: {}
}

export default nextConfig
