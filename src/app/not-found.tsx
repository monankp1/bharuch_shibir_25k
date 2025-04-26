// app/not-found.tsx

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 text-center h-full">
            <img
                width={300}
                height={300}
                alt="404"
                src={'https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg'}
            />
            <p className="mt-6 text-lg text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <link href="/home" className="text-blue-500 underline">
                Go back to Homepage
            </link>
        </div>
    )
}
