/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
        unoptimized: true
    },
    distDir: process.env.NEXT_PUBLIC_BUILD_DIR,
    trailingSlash: false,
    publicRuntimeConfig: {}
}

export default nextConfig
