import { useState, useCallback } from 'react'
import axios, { AxiosProgressEvent } from 'axios'

interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

interface UseFileUploadOptions {
  url: string
  onProgress?: (progress: UploadProgress) => void
  onSuccess?: (response: any) => void
  onError?: (error: Error) => void
}

export function useFileUpload({
  url,
  onProgress,
  onSuccess,
  onError,
}: UseFileUploadOptions) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState<UploadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
  })
  const [error, setError] = useState<Error | null>(null)

  const uploadFile = useCallback(async (file: File, additionalData?: Record<string, any>) => {
    setIsUploading(true)
    setError(null)
    setProgress({ loaded: 0, total: 0, percentage: 0 })

    const formData = new FormData()
    formData.append('file', file)

    // Add additional data to form data
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (progressEvent.total) {
            const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            const uploadProgress = {
              loaded: progressEvent.loaded,
              total: progressEvent.total,
              percentage,
            }
            setProgress(uploadProgress)
            onProgress?.(uploadProgress)
          }
        },
      })

      setIsUploading(false)
      onSuccess?.(response.data)
      return response.data
    } catch (err) {
      const error = err as Error
      setError(error)
      setIsUploading(false)
      onError?.(error)
      throw error
    }
  }, [url, onProgress, onSuccess, onError])

  const cancelUpload = useCallback(() => {
    // TODO: Implement axios cancel token
    setIsUploading(false)
  }, [])

  return {
    uploadFile,
    isUploading,
    progress,
    error,
    cancelUpload,
  }
}