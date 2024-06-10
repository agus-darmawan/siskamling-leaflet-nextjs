import { toast } from '@/components/ui/use-toast'
import Axios from 'axios'

const isServer = typeof window === 'undefined'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})


axios.interceptors.response.use(
    (response) => {
        if (response?.data) {
            if (response.data?.success) {
                toast({
                    variant: 'success',
                    title: response.data.success,
                })
            }

            if (response.data?.error) {
                toast({
                    variant: 'error',
                    title: response.data.error,
                })
            }
        }
        return response
    },
    (error) => {
        if (error?.response?.status !== 401 && error?.response?.data?.errors) {
            const obj = error.response.data.errors
            if (obj.length) {
                toast({
                    variant: 'error',
                    title: obj[0].message,
                })
            }
        }

        if (error?.response?.data?.error) {
            toast({
                variant: 'error',
                title: error.response.data.error,
            })
        }

        if (error?.response?.status !== 401 && error?.response?.data?.message) {
            toast({
                variant: 'error',
                title: error.response.data.message,
            })
        }

        return Promise.reject(error)
    },
)

export default axios