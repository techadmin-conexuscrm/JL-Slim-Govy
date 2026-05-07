import axios, { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROD_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const isAxiosError = (error: unknown): error is AxiosError => axios.isAxiosError(error)

const hasErrorProp = (data: unknown): data is { error: { message?: string } } =>
  typeof data === 'object' && data !== null && 'error' in data && typeof (data as any).error === 'object'

export const extractErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data
    if (hasErrorProp(data) && data.error?.message) return data.error.message
    if (typeof data === 'object' && data && 'message' in data && typeof (data as any).message === 'string') {
      return (data as any).message
    }
    return error.message || 'An unknown error occurred.'
  }
  if (error instanceof Error) return error.message
  return 'An unexpected error occurred.'
}
