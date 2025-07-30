'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Save, 
  Undo, 
  Redo, 
  Plus, 
  Trash2, 
  Copy, 
  Eye,
  ArrowLeft,
  Palette,
  Layout,
  Type,
  Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { presentationService } from '@/services/presentation.service'
import { Presentation, Slide, EditorState } from '@/types'
import SlideEditor from '@/components/presentation/slide-editor'
import SlideList from '@/components/presentation/slide-list'
import RichTextToolbar from '@/components/presentation/rich-text-toolbar'
import SpeakerNotesEditor from '@/components/presentation/speaker-notes-editor'
import SaveIndicator from '@/components/presentation/save-indicator'
import TemplateSelector from '@/components/presentation/template-selector'
import CollaboratorAvatars from '@/components/presentation/collaborator-avatars'
import { useDebounce } from '@/hooks/use-debounce'

export default function PresentationEditorPage() {
  const params = useParams()
  const router = useRouter()
  const presentationId = params.id as string
  
  const [presentation, setPresentation] = useState<Presentation | null>(null)
  const [editorState, setEditorState] = useState<EditorState>({
    isEditing: false,
    hasUnsavedChanges: false
  })
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [history, setHistory] = useState<Presentation[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const debouncedPresentation = useDebounce(presentation, 1000)

  useEffect(() => {
    loadPresentation()
  }, [presentationId])

  // Auto-save
  useEffect(() => {
    if (debouncedPresentation && editorState.hasUnsavedChanges) {
      savePresentation()
    }
  }, [debouncedPresentation])

  const loadPresentation = async () => {
    try {
      setIsLoading(true)
      const data = await presentationService.getPresentation(presentationId)
      setPresentation(data)
      setHistory([data])
      setHistoryIndex(0)
    } catch (error) {
      console.error('Failed to load presentation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const savePresentation = async () => {
    if (!presentation || isSaving) return

    try {
      setIsSaving(true)
      await presentationService.updatePresentation(presentationId, presentation)
      setEditorState(prev => ({
        ...prev,
        hasUnsavedChanges: false,
        lastSaved: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Failed to save presentation:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const updatePresentation = (updates: Partial<Presentation>) => {
    if (!presentation) return

    const updated = { ...presentation, ...updates }
    setPresentation(updated)
    setEditorState(prev => ({ ...prev, hasUnsavedChanges: true }))
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(updated)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const updateSlide = (slideIndex: number, updates: Partial<Slide>) => {
    if (!presentation) return

    const newSlides = [...presentation.slides]
    newSlides[slideIndex] = { ...newSlides[slideIndex], ...updates }
    updatePresentation({ slides: newSlides })
  }

  const addSlide = (afterIndex?: number) => {
    if (!presentation) return

    const insertIndex = afterIndex !== undefined ? afterIndex + 1 : presentation.slides.length
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      order: insertIndex,
      layout: 'title-content',
      content: {
        type: 'text',
        data: {
          title: 'New Slide',
          content: ''
        }
      }
    }

    const newSlides = [...presentation.slides]
    newSlides.splice(insertIndex, 0, newSlide)
    
    // Update order for subsequent slides
    newSlides.forEach((slide, index) => {
      slide.order = index
    })

    updatePresentation({ slides: newSlides })
    setSelectedSlideIndex(insertIndex)
  }

  const duplicateSlide = (slideIndex: number) => {
    if (!presentation) return

    const originalSlide = presentation.slides[slideIndex]
    const duplicatedSlide: Slide = {
      ...originalSlide,
      id: `slide-${Date.now()}`,
      order: slideIndex + 1
    }

    const newSlides = [...presentation.slides]
    newSlides.splice(slideIndex + 1, 0, duplicatedSlide)
    
    // Update order for subsequent slides
    newSlides.forEach((slide, index) => {
      slide.order = index
    })

    updatePresentation({ slides: newSlides })
    setSelectedSlideIndex(slideIndex + 1)
  }

  const deleteSlide = (slideIndex: number) => {
    if (!presentation || presentation.slides.length <= 1) return

    const newSlides = presentation.slides.filter((_, index) => index !== slideIndex)
    
    // Update order
    newSlides.forEach((slide, index) => {
      slide.order = index
    })

    updatePresentation({ slides: newSlides })
    
    // Adjust selected slide
    if (slideIndex >= newSlides.length) {
      setSelectedSlideIndex(newSlides.length - 1)
    }
  }

  const reorderSlides = (startIndex: number, endIndex: number) => {
    if (!presentation) return

    const newSlides = [...presentation.slides]
    const [removed] = newSlides.splice(startIndex, 1)
    newSlides.splice(endIndex, 0, removed)
    
    // Update order
    newSlides.forEach((slide, index) => {
      slide.order = index
    })

    updatePresentation({ slides: newSlides })
    setSelectedSlideIndex(endIndex)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPresentation(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPresentation(history[historyIndex + 1])
    }
  }

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading presentation...</p>
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

  const currentSlide = presentation.slides[selectedSlideIndex]

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/presentation/${presentationId}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Exit Editor
            </Button>
            
            <input
              type="text"
              value={presentation.title}
              onChange={(e) => updatePresentation({ title: e.target.value })}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <SaveIndicator
              isSaving={isSaving}
              hasUnsavedChanges={editorState.hasUnsavedChanges}
              lastSaved={editorState.lastSaved}
            />
            
            <CollaboratorAvatars presentationId={presentationId} />
            
            <div className="flex items-center gap-1 border-l pl-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(`/presentation/${presentationId}`)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
            
            <Button
              size="sm"
              onClick={savePresentation}
              disabled={!editorState.hasUnsavedChanges || isSaving}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        
        {/* Rich Text Toolbar */}
        <RichTextToolbar
          onFormat={(format) => {
            // Handle text formatting
            document.execCommand(format, false)
          }}
        />
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide List Sidebar */}
        <div className="w-64 border-r bg-muted/10 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => addSlide()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Slide
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <SlideList
              slides={presentation.slides}
              selectedIndex={selectedSlideIndex}
              onSelectSlide={setSelectedSlideIndex}
              onReorderSlides={reorderSlides}
              onDuplicateSlide={duplicateSlide}
              onDeleteSlide={deleteSlide}
            />
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="content" className="flex-1 flex flex-col">
            <TabsList className="mx-4 mt-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="notes">Speaker Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="flex-1 p-4 overflow-auto">
              <SlideEditor
                slide={currentSlide}
                onUpdate={(updates) => updateSlide(selectedSlideIndex, updates)}
                isEditing={editorState.isEditing}
                onEditingChange={(isEditing) => 
                  setEditorState(prev => ({ ...prev, isEditing }))
                }
              />
            </TabsContent>
            
            <TabsContent value="design" className="flex-1 p-4">
              <div className="max-w-2xl mx-auto space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Slide Layout
                  </h3>
                  <TemplateSelector
                    currentLayout={currentSlide.layout}
                    onSelectLayout={(layout) => 
                      updateSlide(selectedSlideIndex, { layout })
                    }
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Theme Options
                  </h3>
                  <p className="text-muted-foreground">Theme customization coming soon...</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="flex-1 p-4">
              <SpeakerNotesEditor
                notes={currentSlide.notes || ''}
                onUpdate={(notes) => updateSlide(selectedSlideIndex, { notes })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}