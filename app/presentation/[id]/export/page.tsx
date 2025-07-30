'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Download, 
  FileText, 
  FileImage, 
  FileCode, 
  Mail, 
  Check,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { presentationService } from '@/services/presentation.service'
import { Presentation, ExportFormat, ExportOptions, ExportHistory } from '@/types'
import ExportHistoryList from '@/components/presentation/export-history-list'

interface ExportFormatOption {
  format: ExportFormat
  label: string
  description: string
  icon: React.ReactNode
  available: boolean
}

const exportFormats: ExportFormatOption[] = [
  {
    format: 'pptx',
    label: 'PowerPoint (PPTX)',
    description: 'Export as a PowerPoint presentation with editable slides',
    icon: <FileText className="w-5 h-5" />,
    available: true
  },
  {
    format: 'pdf',
    label: 'PDF Document',
    description: 'Export as a PDF for easy sharing and printing',
    icon: <FileImage className="w-5 h-5" />,
    available: true
  },
  {
    format: 'latex',
    label: 'LaTeX Beamer',
    description: 'Export as LaTeX code for academic presentations',
    icon: <FileCode className="w-5 h-5" />,
    available: true
  }
]

export default function PresentationExportPage() {
  const params = useParams()
  const router = useRouter()
  const presentationId = params.id as string
  
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pptx')
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pptx',
    quality: 'high',
    includeNotes: false,
    slidesPerPage: 1
  })
  const [email, setEmail] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportHistory, setExportHistory] = useState<ExportHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [presentationId])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [presentationData, historyData] = await Promise.all([
        presentationService.getPresentation(presentationId),
        presentationService.getExportHistory(presentationId)
      ])
      setPresentation(presentationData)
      setExportHistory(historyData)
    } catch (error) {
      console.error('Failed to load data:', error)
      setError('Failed to load presentation data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    if (!presentation) return

    try {
      setIsExporting(true)
      setError(null)
      setExportProgress(0)

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setExportProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const options: ExportOptions = {
        ...exportOptions,
        format: selectedFormat,
        emailTo: email || undefined
      }

      const result = await presentationService.exportPresentation(presentationId, options)
      
      clearInterval(progressInterval)
      setExportProgress(100)

      // Download the file if URL is provided
      if (result.url && !email) {
        const link = document.createElement('a')
        link.href = result.url
        link.download = `${presentation.title}.${selectedFormat}`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }

      // Reload export history
      const updatedHistory = await presentationService.getExportHistory(presentationId)
      setExportHistory(updatedHistory)

      // Reset progress after a delay
      setTimeout(() => {
        setExportProgress(0)
        setIsExporting(false)
      }, 1000)
    } catch (error) {
      console.error('Export failed:', error)
      setError('Failed to export presentation. Please try again.')
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading export options...</p>
        </div>
      </div>
    )
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">Presentation not found</p>
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push(`/presentation/${presentationId}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Presentation
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Export Presentation</h1>
          <p className="text-muted-foreground">
            Export "{presentation.title}" in your preferred format
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Export Options */}
          <div className="space-y-6">
            {/* Format Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose Export Format</CardTitle>
                <CardDescription>
                  Select the format that best suits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exportFormats.map((format) => (
                  <div
                    key={format.format}
                    className={`relative flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedFormat === format.format
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'
                    } ${!format.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => format.available && setSelectedFormat(format.format)}
                  >
                    <div className="flex-shrink-0 mt-0.5">{format.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{format.label}</h4>
                      <p className="text-sm text-muted-foreground">
                        {format.description}
                      </p>
                    </div>
                    {selectedFormat === format.format && (
                      <Check className="w-5 h-5 text-primary absolute top-4 right-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Format-specific Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Configure format-specific settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quality Option (for PDF) */}
                {selectedFormat === 'pdf' && (
                  <div className="space-y-2">
                    <Label htmlFor="quality">Quality</Label>
                    <Select
                      value={exportOptions.quality}
                      onValueChange={(value: 'low' | 'medium' | 'high') =>
                        setExportOptions({ ...exportOptions, quality: value })
                      }
                    >
                      <SelectTrigger id="quality">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Smaller file size)</SelectItem>
                        <SelectItem value="medium">Medium (Balanced)</SelectItem>
                        <SelectItem value="high">High (Best quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Slides per Page (for PDF) */}
                {selectedFormat === 'pdf' && (
                  <div className="space-y-2">
                    <Label htmlFor="slidesPerPage">Slides per Page</Label>
                    <Select
                      value={exportOptions.slidesPerPage?.toString()}
                      onValueChange={(value) =>
                        setExportOptions({ ...exportOptions, slidesPerPage: parseInt(value) })
                      }
                    >
                      <SelectTrigger id="slidesPerPage">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 slide per page</SelectItem>
                        <SelectItem value="2">2 slides per page</SelectItem>
                        <SelectItem value="4">4 slides per page</SelectItem>
                        <SelectItem value="6">6 slides per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Include Speaker Notes */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeNotes"
                    checked={exportOptions.includeNotes}
                    onCheckedChange={(checked) =>
                      setExportOptions({ ...exportOptions, includeNotes: checked as boolean })
                    }
                  />
                  <Label
                    htmlFor="includeNotes"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Include speaker notes
                  </Label>
                </div>

                {/* Email Delivery */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Delivery (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Mail className="w-5 h-5 text-muted-foreground self-center" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send the exported file to this email address
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Export Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Exporting... {exportProgress}%
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Export Presentation
                </>
              )}
            </Button>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* Export History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
                <CardDescription>
                  Your previous exports for this presentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExportHistoryList
                  history={exportHistory}
                  onDownload={(item) => {
                    if (item.url) {
                      window.open(item.url, '_blank')
                    }
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}