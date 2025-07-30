'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/types'

interface FileDropzoneProps {
  onFileSelect: (file: File) => void
  onFileRemove?: () => void
  acceptedTypes?: string[]
  maxSize?: number // in MB
  className?: string
  disabled?: boolean
}

const FILE_ICONS = {
  pdf: '📄',
  docx: '📝',
  latex: '📐',
  txt: '📃',
}

export function FileDropzone({
  onFileSelect,
  onFileRemove,
  acceptedTypes = ['.pdf', '.docx', '.tex', '.txt'],
  maxSize = 10,
  className,
  disabled = false,
}: FileDropzoneProps) {
  const [selectedFile, setSelectedFile] = useState<FileUpload | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Clear previous error
    setError(null)

    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0]
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`File size exceeds ${maxSize}MB limit`)
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError(`File type not supported. Please upload ${acceptedTypes.join(', ')} files.`)
      } else {
        setError('File upload failed. Please try again.')
      }
      return
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const extension = file.name.split('.').pop()?.toLowerCase()
      const fileType = extension === 'tex' ? 'latex' : extension as 'pdf' | 'docx' | 'txt'

      setSelectedFile({
        file,
        type: fileType,
        status: 'pending',
      })
      onFileSelect(file)
    }
  }, [maxSize, acceptedTypes, onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/x-tex': ['.tex'],
      'text/plain': ['.txt'],
    },
    maxSize: maxSize * 1024 * 1024,
    multiple: false,
    disabled,
  })

  const handleRemove = () => {
    setSelectedFile(null)
    setError(null)
    onFileRemove?.()
  }

  return (
    <div className={cn('w-full', className)}>
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400',
            error && 'border-red-500'
          )}
        >
          <input {...getInputProps()} />
          
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          
          <p className="text-sm font-medium text-gray-900 mb-1">
            {isDragActive ? 'Drop the file here...' : 'Drop your file here, or click to browse'}
          </p>
          
          <p className="text-xs text-gray-500">
            Supported formats: PDF, DOCX, LaTeX, TXT (max {maxSize}MB)
          </p>

          {error && (
            <p className="mt-2 text-xs text-red-600">{error}</p>
          )}
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <span className="text-2xl" role="img" aria-label={selectedFile.type}>
                {FILE_ICONS[selectedFile.type]}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {selectedFile.status === 'uploading' && selectedFile.progress && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading...</span>
                <span>{selectedFile.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${selectedFile.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}