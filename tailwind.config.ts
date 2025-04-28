import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}', // app directory
        './src/components/**/*.{js,ts,jsx,tsx}' // components directory
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1D6595',
                primaryLight: '#CFECFF',
                accent: '#FE7D1B',
                accentLight: '#FEDEC9'
            }
        }
    },
    plugins: []
}

export default config
