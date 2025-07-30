'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileDropzone } from '@/components/upload/file-dropzone'
import { TemplateSelector } from '@/components/upload/template-selector'
import { DurationSlider } from '@/components/upload/duration-slider'
import { AdvancedOptions } from '@/components/upload/advanced-options'
import { CostBreakdown } from '@/components/upload/cost-breakdown'
import { PresentationConfig } from '@/types'
import { toast } from 'sonner'
import { presentationService } from '@/services/presentation.service'

const SAMPLE_ABSTRACT = `Artificial Intelligence (AI) has revolutionized numerous fields, from healthcare diagnostics to autonomous vehicles. This presentation explores the fundamental concepts of machine learning, deep neural networks, and their practical applications in solving real-world problems. We'll examine recent breakthroughs in natural language processing and computer vision, discuss ethical considerations in AI development, and explore future trends that will shape the next decade of artificial intelligence research and implementation.`

export default function CreatePage() {
  const router = useRouter()
  const [inputType, setInputType] = useState<'text' | 'file'>('text')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [config, setConfig] = useState<Partial<PresentationConfig>>({
    template: 'academic-modern',
    conferenceType: 'academic',
    duration: 15,
    colorScheme: 'default',
    language: 'en',
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setInputType('file')
  }

  const handleFileRemove = () => {
    setFile(null)
    setInputType('text')
  }

  const handleGenerate = async () => {
    // Validation
    if (inputType === 'text' && !content.trim()) {
      toast.error('Please enter some content for your presentation')
      return
    }

    if (inputType === 'file' && !file) {
      toast.error('Please upload a file')
      return
    }

    if (!config.template) {
      toast.error('Please select a template')
      return
    }

    setIsGenerating(true)

    try {
      const response = await presentationService.createPresentation({
        content: inputType === 'text' ? content : undefined,
        file: inputType === 'file' ? file || undefined : undefined,
        config: config as PresentationConfig,
      })

      // Navigate to progress page with generation ID
      router.push(`/create/progress?id=${response.generationId}`)
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to start generation. Please try again.')
      setIsGenerating(false)
    }
  }

  const estimatedCost = () => {
    const baseCost = 0.5
    const durationMultiplier = config.duration ? config.duration / 10 : 1
    const advancedFeatures = (config.includeCitations ? 0.2 : 0) + (config.includeMath ? 0.2 : 0)
    return (baseCost * durationMultiplier + advancedFeatures).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Presentation
          </h1>
          <p className="text-gray-600">
            Upload your content or paste your abstract to generate a professional presentation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Content Input
              </h2>

              {/* Input type tabs */}
              <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setInputType('text')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    inputType === 'text'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  Text Input
                </button>
                <button
                  onClick={() => setInputType('file')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    inputType === 'file'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  File Upload
                </button>
              </div>

              {inputType === 'text' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">Abstract or Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your abstract, paper content, or presentation outline here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[200px] mt-1"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {content.length} characters
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setContent(SAMPLE_ABSTRACT)}
                      >
                        Use sample text
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <FileDropzone
                  onFileSelect={handleFileSelect}
                  onFileRemove={handleFileRemove}
                  acceptedTypes={['.pdf', '.docx', '.tex', '.txt']}
                  maxSize={10}
                />
              )}

              {/* File type info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Supported formats:</strong> PDF, DOCX, LaTeX (.tex), Plain text
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Configuration */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Configuration
              </h2>

              <div className="space-y-6">
                {/* Template Selection */}
                <div>
                  <Label className="text-base mb-3 block">Choose Template</Label>
                  <TemplateSelector
                    selectedId={config.template}
                    onSelect={(templateId) => 
                      setConfig({ ...config, template: templateId })
                    }
                  />
                </div>

                {/* Conference Type */}
                <div>
                  <Label htmlFor="conferenceType">Conference Type</Label>
                  <Select
                    value={config.conferenceType}
                    onValueChange={(value: any) => 
                      setConfig({ ...config, conferenceType: value })
                    }
                  >
                    <SelectTrigger id="conferenceType" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic Conference</SelectItem>
                      <SelectItem value="business">Business Meeting</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="lecture">Lecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <DurationSlider
                  value={config.duration || 15}
                  onChange={(duration) => 
                    setConfig({ ...config, duration })
                  }
                />

                {/* Advanced Options */}
                <AdvancedOptions
                  config={config}
                  onChange={(newConfig) => setConfig({ ...config, ...newConfig })}
                />
              </div>
            </div>

            {/* Cost & Generate Button */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Cost Breakdown</h3>
              <CostBreakdown config={config} className="mb-6" />
              
              <div className="flex items-center justify-between mb-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>Credits available</p>
                  <p className="text-lg font-medium text-gray-900">100 credits</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>After generation</p>
                  <p className="text-lg font-medium text-gray-900">
                    {(100 - parseFloat(estimatedCost())).toFixed(2)} credits
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || (!content.trim() && !file)}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starting generation...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Presentation
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3">
                Generation typically takes 2-5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}