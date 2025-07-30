import { CheckCircle, Cloud, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface SaveIndicatorProps {
  isSaving: boolean
  hasUnsavedChanges: boolean
  lastSaved?: string
}

export default function SaveIndicator({ 
  isSaving, 
  hasUnsavedChanges, 
  lastSaved 
}: SaveIndicatorProps) {
  if (isSaving) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Saving...</span>
      </div>
    )
  }

  if (hasUnsavedChanges) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Cloud className="w-4 h-4" />
        <span>Unsaved changes</span>
      </div>
    )
  }

  if (lastSaved) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle className="w-4 h-4 text-green-500" />
        <span>
          Saved {format(new Date(lastSaved), 'h:mm a')}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <CheckCircle className="w-4 h-4" />
      <span>All changes saved</span>
    </div>
  )
}