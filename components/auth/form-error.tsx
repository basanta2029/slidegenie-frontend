import { AlertCircle } from 'lucide-react'

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}