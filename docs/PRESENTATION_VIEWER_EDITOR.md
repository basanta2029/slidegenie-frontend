# Presentation Viewer/Editor Documentation

## Overview

The SlideGenie presentation viewer and editor provides a comprehensive suite of tools for viewing, editing, and exporting presentations. The system includes real-time collaboration features, rich text editing, and multiple export formats.

## Features

### 1. Presentation Viewer (`/presentation/[id]`)

The viewer provides a full-featured presentation experience with:

- **Full-screen Mode**: Toggle between normal and full-screen viewing
- **Slide Navigation**: 
  - Arrow keys (← →) for navigation
  - Slide counter showing current position
  - Thumbnail grid view (press G)
- **Presenter View**: 
  - Speaker notes display
  - Next slide preview
  - Presentation timer
- **Collaboration**: 
  - Real-time collaborator avatars
  - Share presentation with link or email invites
- **Quick Actions**:
  - Edit mode access
  - Export options
  - Share functionality

#### Keyboard Shortcuts
- `←/→` - Navigate slides
- `F` - Toggle fullscreen
- `G` - Show/hide slide grid
- `P` - Toggle presenter view
- `ESC` - Exit current view
- `?` - Show keyboard shortcuts

### 2. Presentation Editor (`/presentation/[id]/edit`)

The editor provides comprehensive editing capabilities:

- **Slide Management**:
  - Add, duplicate, and delete slides
  - Reorder slides (drag-and-drop ready)
  - Slide thumbnails with preview
- **Rich Text Editing**:
  - Inline editing with contenteditable
  - Formatting toolbar (bold, italic, underline)
  - Lists, alignment, and links
  - Heading levels and font sizes
- **Layout Options**:
  - 8 pre-designed layouts
  - Title slides, content slides, two-column
  - Image layouts (left/right/full)
  - Quote and comparison layouts
- **Real-time Features**:
  - Auto-save with debouncing
  - Save status indicator
  - Undo/redo functionality
  - Collaborator presence

### 3. Export Page (`/presentation/[id]/export`)

Multiple export options with format-specific settings:

- **Supported Formats**:
  - **PowerPoint (PPTX)**: Editable slides with template preservation
  - **PDF**: High-quality output with handout options
  - **LaTeX Beamer**: Academic presentation format
- **Export Options**:
  - Quality settings (PDF)
  - Slides per page (PDF handouts)
  - Include/exclude speaker notes
  - Email delivery option
- **Export History**:
  - Track all previous exports
  - Download previous exports
  - Status tracking (pending/processing/complete)

## Component Architecture

### Viewer Components
- `SlideViewer`: Renders individual slides with layout support
- `SlideNavigator`: Thumbnail navigation sidebar
- `PresenterNotes`: Speaker notes and timer display
- `ShareModal`: Sharing and collaboration interface
- `KeyboardShortcuts`: Help modal for shortcuts

### Editor Components
- `SlideEditor`: Contenteditable slide editing
- `SlideList`: Slide management with actions
- `RichTextToolbar`: Text formatting controls
- `SpeakerNotesEditor`: Notes editing interface
- `SaveIndicator`: Auto-save status display
- `TemplateSelector`: Layout selection grid

### Shared Components
- `CollaboratorAvatars`: Active user display
- `ExportHistoryList`: Previous export tracking

## Data Types

### Presentation Structure
```typescript
interface Presentation {
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

interface Slide {
  id: string
  order: number
  title?: string
  content: SlideContent
  layout: SlideLayout
  notes?: string
  animations?: Animation[]
}
```

### Export Types
```typescript
interface ExportOptions {
  format: 'pptx' | 'pdf' | 'latex'
  quality?: 'low' | 'medium' | 'high'
  includeNotes?: boolean
  slidesPerPage?: number
  emailTo?: string
}
```

## API Integration

The presentation service provides methods for:
- CRUD operations on presentations
- Export functionality
- Collaboration management
- Real-time updates (WebSocket ready)

## Development Notes

- Mock data is available for development in `/lib/mock-data.ts`
- The editor uses contenteditable for rich text editing
- Drag-and-drop functionality requires `@hello-pangea/dnd` package
- Real-time features are WebSocket-ready but currently use polling

## Future Enhancements

- Real-time collaborative editing
- Version history and rollback
- Advanced animations and transitions
- Theme customization
- Presentation analytics
- Offline mode support