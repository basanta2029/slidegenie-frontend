import { useState, useCallback } from 'react'

interface FileValidationOptions {
  maxSize?: number // in MB
  acceptedTypes?: string[]
  onValidationError?: (error: string) => void
}

interface ValidationResult {
  isValid: boolean
  error?: string
}

export function useFileValidation({
  maxSize = 10,
  acceptedTypes = ['.pdf', '.docx', '.tex', '.txt'],
  onValidationError,
}: FileValidationOptions = {}) {
  const [validationError, setValidationError] = useState<string | null>(null)

  const validateFile = useCallback((file: File): ValidationResult => {
    // Clear previous error
    setValidationError(null)

    // Check file extension
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!acceptedTypes.includes(extension)) {
      const error = `File type not supported. Please upload ${acceptedTypes.join(', ')} files.`
      setValidationError(error)
      onValidationError?.(error)
      return { isValid: false, error }
    }

    // Check file size
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSize) {
      const error = `File size exceeds ${maxSize}MB limit. Your file is ${sizeMB.toFixed(2)}MB.`
      setValidationError(error)
      onValidationError?.(error)
      return { isValid: false, error }
    }

    // Additional validations for specific file types
    if (extension === '.pdf' && !file.type.includes('pdf')) {
      const error = 'Invalid PDF file. Please ensure the file is a valid PDF document.'
      setValidationError(error)
      onValidationError?.(error)
      return { isValid: false, error }
    }

    if (extension === '.docx' && !file.type.includes('officedocument')) {
      const error = 'Invalid DOCX file. Please ensure the file is a valid Word document.'
      setValidationError(error)
      onValidationError?.(error)
      return { isValid: false, error }
    }

    return { isValid: true }
  }, [maxSize, acceptedTypes, onValidationError])

  const clearError = useCallback(() => {
    setValidationError(null)
  }, [])

  return {
    validateFile,
    validationError,
    clearError,
  }
}