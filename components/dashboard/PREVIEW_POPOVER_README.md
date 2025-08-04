# Presentation Preview Popover Feature

## Overview

This feature adds a hover preview functionality to presentation cards, allowing users to see slide thumbnails when hovering over a presentation.

## Components Created

### 1. **UI Components**

#### `/components/ui/hover-card.tsx`
- Base hover card component from Radix UI
- Provides the hover interaction and positioning logic
- Supports customizable animations and positioning

#### `/components/ui/popover.tsx`
- Alternative popover component for click-based interactions
- Can be used if hover behavior needs to be changed to click

### 2. **Feature Component**

#### `/components/dashboard/presentation-preview-popover.tsx`
- Main preview popover component
- Features:
  - Displays presentation title and description
  - Shows up to 6 slide thumbnails in a grid
  - Displays slide count, template type, and last modified time
  - Lazy loads slide data on hover
  - Shows loading skeletons while fetching
  - Handles empty states gracefully
  - Responsive grid layout (3 columns)

### 3. **Integration**

#### Updated: `/components/dashboard/presentation-card.tsx`
- Wrapped both grid and list view cards with `PresentationPreviewPopover`
- Added `slideData` optional property to Presentation interface
- Cards now have cursor-pointer style to indicate interactivity

## Usage

### Basic Implementation

```tsx
import { PresentationPreviewPopover } from './presentation-preview-popover'

<PresentationPreviewPopover
  presentationId="123"
  title="My Presentation"
  description="A great presentation"
  slides={slideArray} // Optional pre-loaded slides
  slideCount={24}
  lastModified={new Date()}
  template="Academic"
>
  <YourTriggerComponent />
</PresentationPreviewPopover>
```

### With PresentationCard

The preview popover is automatically integrated into `PresentationCard`. Just pass your presentation data:

```tsx
<PresentationCard
  presentation={{
    id: '1',
    title: 'My Presentation',
    description: 'Description',
    slides: 24,
    slideData: [...], // Optional pre-loaded slide data
    lastModified: new Date(),
    template: 'Academic',
    status: 'completed'
  }}
  view="grid" // or "list"
  onDelete={() => {}}
  onDuplicate={() => {}}
/>
```

## API Integration

The component includes a mock `fetchSlides` function that simulates loading slide data. To integrate with your actual API:

1. Replace the mock function in `presentation-preview-popover.tsx`:

```tsx
const fetchSlides = React.useCallback(async () => {
  if (!shouldLoad || loadedSlides.length > 0) return
  
  setLoading(true)
  try {
    // Replace with actual API call
    const response = await fetch(`/api/presentations/${presentationId}/slides?limit=6`)
    const data = await response.json()
    
    setLoadedSlides(data.slides)
  } catch (error) {
    console.error("Failed to fetch slides:", error)
  } finally {
    setLoading(false)
  }
}, [presentationId, shouldLoad, loadedSlides.length])
```

2. Ensure your API returns slide data in this format:

```typescript
interface Slide {
  id: string
  order: number
  title?: string
  thumbnail?: string // URL to slide thumbnail image
}
```

## Customization

### Styling

- The popover width is set to 400px by default
- Grid shows 3 columns of slide thumbnails
- Customize via the `className` prop

### Behavior

- **Open delay**: 300ms (prevents accidental triggers)
- **Close delay**: 100ms (smooth experience)
- **Position**: Right side of trigger, aligned to start
- **Max slides shown**: 6 (with "+X more" indicator)

### Loading States

The component handles three states:
1. **Loading**: Shows skeleton placeholders
2. **Loaded**: Shows actual slide thumbnails
3. **Empty**: Shows "No slide previews available"

## Dependencies

Make sure these packages are installed:

```json
{
  "@radix-ui/react-hover-card": "^1.1.2",
  "@radix-ui/react-popover": "^1.1.2"
}
```

Run: `npm install @radix-ui/react-hover-card @radix-ui/react-popover`

## Testing

A test page is available at `/test-preview` to see the preview popover in action with mock data.

## Future Enhancements

1. **Caching**: Implement caching for loaded slide data
2. **Preloading**: Preload slide data for visible presentations
3. **Animations**: Add slide transition animations
4. **Keyboard Navigation**: Support keyboard navigation through slides
5. **Full Preview Mode**: Click to open full presentation preview
6. **Real Thumbnails**: Generate and display actual slide thumbnails
7. **Performance**: Virtual scrolling for presentations with many slides