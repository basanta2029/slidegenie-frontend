import { format } from 'date-fns'
import { Download, FileText, FileImage, FileCode, Clock, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExportHistory, ExportFormat } from '@/types'

interface ExportHistoryListProps {
  history: ExportHistory[]
  onDownload: (item: ExportHistory) => void
}

export default function ExportHistoryList({ history, onDownload }: ExportHistoryListProps) {
  const getFormatIcon = (format: ExportFormat) => {
    switch (format) {
      case 'pptx':
        return <FileText className="w-4 h-4" />
      case 'pdf':
        return <FileImage className="w-4 h-4" />
      case 'latex':
        return <FileCode className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: ExportHistory['status']) => {
    switch (status) {
      case 'complete':
        return <Check className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />
      case 'failed':
        return <X className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusText = (status: ExportHistory['status']) => {
    switch (status) {
      case 'complete':
        return 'Ready to download'
      case 'processing':
        return 'Processing...'
      case 'failed':
        return 'Export failed'
      default:
        return 'Pending'
    }
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No export history yet</p>
        <p className="text-sm mt-1">Your exported files will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded">
              {getFormatIcon(item.format)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium uppercase text-sm">
                  {item.format}
                </span>
                {getStatusIcon(item.status)}
              </div>
              <p className="text-sm text-muted-foreground">
                {format(new Date(item.createdAt), 'MMM d, yyyy h:mm a')}
              </p>
              <p className="text-xs text-muted-foreground">
                {getStatusText(item.status)}
              </p>
            </div>
          </div>
          
          {item.status === 'complete' && item.url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(item)}
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}