// User types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

// Presentation types
export interface Presentation {
  id: string
  title: string
  description?: string
  slides: Slide[]
  userId: string
  templateId?: string
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface Slide {
  id: string
  order: number
  title?: string
  content: SlideContent
  layout: SlideLayout
  notes?: string
  animations?: Animation[]
}

export interface SlideContent {
  type: 'text' | 'image' | 'chart' | 'table' | 'mixed'
  data: any
}

export type SlideLayout = 
  | 'title'
  | 'title-content'
  | 'two-column'
  | 'image-right'
  | 'image-left'
  | 'full-image'
  | 'comparison'
  | 'quote'

export interface Animation {
  element: string
  type: 'fade' | 'slide' | 'zoom' | 'rotate'
  duration: number
  delay?: number
}

// Template types
export interface Template {
  id: string
  name: string
  description: string
  category: 'academic' | 'business' | 'creative' | 'minimal'
  thumbnail: string
  slides: SlideTemplate[]
}

export interface SlideTemplate {
  layout: SlideLayout
  defaultContent?: Partial<SlideContent>
  styles?: Record<string, any>
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
  status: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  name: string
  confirmPassword: string
}

export interface CreatePresentationForm {
  title: string
  description?: string
  templateId?: string
  file?: File
  content?: string
}

// Upload and Generation types
export interface PresentationConfig {
  template: string
  conferenceType: 'academic' | 'business' | 'workshop' | 'lecture'
  duration: number // in minutes
  includeCitations?: boolean
  includeMath?: boolean
  colorScheme?: string
  language?: string
}

export interface GenerationProgress {
  id: string
  stage: 'analyzing' | 'structuring' | 'generating' | 'finalizing'
  progress: number // 0-100
  currentSlide?: number
  totalSlides?: number
  message?: string
  preview?: SlidePreview[]
  error?: string
}

export interface SlidePreview {
  id: string
  title: string
  thumbnail?: string
  order: number
}

export interface FileUpload {
  file: File
  type: 'pdf' | 'docx' | 'latex' | 'txt'
  status: 'pending' | 'uploading' | 'processing' | 'complete' | 'error'
  progress?: number
  error?: string
}

// Export types
export type ExportFormat = 'pptx' | 'pdf' | 'latex'

export interface ExportOptions {
  format: ExportFormat
  quality?: 'low' | 'medium' | 'high'
  includeNotes?: boolean
  slidesPerPage?: number // for PDF handouts
  emailTo?: string
}

export interface ExportHistory {
  id: string
  presentationId: string
  format: ExportFormat
  options: ExportOptions
  status: 'pending' | 'processing' | 'complete' | 'failed'
  url?: string
  createdAt: string
}

// Collaboration types
export interface Collaborator {
  id: string
  userId: string
  user: User
  role: 'viewer' | 'editor' | 'owner'
  isActive?: boolean
}

// Editor types
export interface EditorState {
  selectedSlideId?: string
  isEditing: boolean
  hasUnsavedChanges: boolean
  lastSaved?: string
}