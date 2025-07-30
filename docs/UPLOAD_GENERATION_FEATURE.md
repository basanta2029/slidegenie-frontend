# Upload & Generation Feature Documentation

## Overview

The upload and generation feature allows users to create professional presentations from various input sources including text abstracts, PDFs, Word documents, and LaTeX files. The system provides real-time progress tracking via WebSocket connections.

## Components

### Pages

1. **Create Page** (`/app/create/page.tsx`)
   - Split interface for input and configuration
   - Supports text input and file upload
   - Template selection with visual previews
   - Duration slider (5-60 minutes)
   - Advanced options for citations, math equations, etc.
   - Real-time cost calculation

2. **Progress Page** (`/app/create/progress/page.tsx`)
   - Real-time generation progress tracking
   - WebSocket integration for live updates
   - Stage-based progress indicators
   - Slide preview as they generate
   - Cancel and retry functionality

### Upload Components

1. **FileDropzone** (`components/upload/file-dropzone.tsx`)
   - Drag-and-drop file upload
   - File type and size validation
   - Visual feedback for drag states
   - Support for PDF, DOCX, LaTeX, and TXT files

2. **TemplateSelector** (`components/upload/template-selector.tsx`)
   - Visual template selection cards
   - Category-based templates (academic, business, creative, minimal)
   - Hover effects and selection states

3. **DurationSlider** (`components/upload/duration-slider.tsx`)
   - Presentation duration selection (5-60 minutes)
   - Estimated slide count calculation
   - Preset duration options

4. **AdvancedOptions** (`components/upload/advanced-options.tsx`)
   - Collapsible advanced settings panel
   - Citation and math equation support toggles
   - Color scheme selection
   - Language preference

5. **ProgressIndicator** (`components/upload/progress-indicator.tsx`)
   - Four-stage progress visualization
   - Real-time status updates
   - Animated progress bar
   - Stage completion indicators

6. **SlidePreview** (`components/upload/slide-preview.tsx`)
   - Live preview of generated slides
   - Navigation between preview slides
   - Slide indicators

7. **CostBreakdown** (`components/upload/cost-breakdown.tsx`)
   - Detailed cost calculation
   - Feature-based pricing
   - Total cost display

## Hooks

1. **useWebSocket** (`hooks/use-websocket.ts`)
   - WebSocket connection management
   - Automatic reconnection logic
   - Support for both native WebSocket and Socket.IO
   - Message queuing and error handling

2. **useFileValidation** (`hooks/use-file-validation.ts`)
   - File type and size validation
   - Extensible validation rules
   - Error message handling

3. **useFileUpload** (`hooks/use-file-upload.ts`)
   - File upload with progress tracking
   - Axios-based implementation
   - Cancel functionality

## Services

1. **PresentationService** (`services/presentation.service.ts`)
   - API integration for presentation generation
   - Generation status tracking
   - Cancel and retry operations
   - CRUD operations for presentations

## API Integration

### Endpoints

```typescript
POST   /api/presentations/generate        - Start generation
GET    /api/presentations/generation/:id/status - Get status
POST   /api/presentations/generation/:id/cancel - Cancel generation
POST   /api/presentations/generation/:id/retry  - Retry generation
```

### WebSocket Events

```typescript
// Client -> Server
connect    - Initial connection with generation ID
cancel     - Cancel generation request

// Server -> Client
progress   - Generation progress updates
complete   - Generation completed
error      - Generation error
```

## Usage Example

```typescript
// 1. User uploads file or enters text
const handleFileSelect = (file: File) => {
  // Validate file
  const { isValid, error } = validateFile(file)
  if (!isValid) {
    toast.error(error)
    return
  }
  
  setSelectedFile(file)
}

// 2. Configure presentation settings
const config: PresentationConfig = {
  template: 'academic-modern',
  conferenceType: 'academic',
  duration: 15,
  includeCitations: true,
  colorScheme: 'default',
  language: 'en'
}

// 3. Start generation
const response = await presentationService.createPresentation({
  file: selectedFile,
  config
})

// 4. Navigate to progress page
router.push(`/create/progress?id=${response.generationId}`)

// 5. Track progress via WebSocket
const { isConnected, lastMessage } = useWebSocket({
  url: `ws://localhost:3001/generation/${generationId}`,
  onMessage: (progress) => {
    updateProgress(progress)
    if (progress.stage === 'complete') {
      router.push(`/presentations/${progress.presentationId}/edit`)
    }
  }
})
```

## Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### File Upload Limits

- Maximum file size: 10MB
- Supported formats: PDF, DOCX, LaTeX (.tex), TXT
- Timeout: 5 minutes for generation

## Error Handling

1. **File Validation Errors**
   - Invalid file type
   - File too large
   - Corrupted file

2. **Generation Errors**
   - Network failures
   - Server errors
   - Timeout errors

3. **WebSocket Errors**
   - Connection lost
   - Reconnection failures
   - Invalid messages

## Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test file upload
# 1. Navigate to /create
# 2. Upload a test PDF
# 3. Configure settings
# 4. Click Generate
# 5. Monitor progress on /create/progress
```

## Future Enhancements

1. **File Processing**
   - OCR for scanned PDFs
   - Multi-language support
   - Bibliography extraction

2. **Templates**
   - Custom template upload
   - Template marketplace
   - AI-powered template suggestions

3. **Collaboration**
   - Real-time collaborative editing
   - Comments and feedback
   - Version control

4. **Export Options**
   - PowerPoint export
   - Google Slides integration
   - PDF export with notes