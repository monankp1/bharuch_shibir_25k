import { AxiosError } from 'axios'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorType = AxiosError<any> | string | unknown

const useToast = () => {
    const showSuccessToast = useCallback((message: string) => {
        toast.success(message)
    }, [])

    const showErrorToast = useCallback((error: ErrorType) => {
        if (!error) {
            toast.error('Something went wrong!')
            return
        }

        if (typeof error === 'string') {
            toast.error(error)
            return
        }

        if (error instanceof AxiosError) {
            const message =
                error.response?.data?.message ||
                error.response?.statusText ||
                error.message ||
                'Something went wrong!'
            toast.error(message)
            return
        }

        // fallback for non-Axios errors
        toast.error((error as Error)?.message || 'Something went wrong!')
    }, [])

    return { showSuccessToast, showErrorToast }
}

export default useToast
