import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notifySuccess = (message: string, options?: ToastOptions<{}>) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    closeButton: true,
    hideProgressBar: true,
    style: { background: '#368F8B', color: '#F3DFC1' },
    ...options,
  })

export const notifyFailure = (message: string, options?: ToastOptions<{}>) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    closeButton: true,
    hideProgressBar: true,
    style: { background: '#160F29BF', color: 'white' },
    ...options,
  })
