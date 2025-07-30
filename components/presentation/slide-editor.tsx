import { useRef, useEffect } from 'react'
import { Slide } from '@/types'

interface SlideEditorProps {
  slide: Slide
  onUpdate: (updates: Partial<Slide>) => void
  isEditing: boolean
  onEditingChange: (isEditing: boolean) => void
}

export default function SlideEditor({
  slide,
  onUpdate,
  isEditing,
  onEditingChange
}: SlideEditorProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditing && titleRef.current) {
      titleRef.current.focus()
    }
  }, [isEditing])

  const handleTitleChange = () => {
    if (titleRef.current) {
      const newTitle = titleRef.current.textContent || ''
      onUpdate({
        content: {
          ...slide.content,
          data: {
            ...slide.content.data,
            title: newTitle
          }
        }
      })
    }
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML || ''
      onUpdate({
        content: {
          ...slide.content,
          data: {
            ...slide.content.data,
            content: newContent
          }
        }
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle formatting shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault()
          document.execCommand('bold', false)
          break
        case 'i':
          e.preventDefault()
          document.execCommand('italic', false)
          break
        case 'u':
          e.preventDefault()
          document.execCommand('underline', false)
          break
      }
    }
  }

  const renderEditor = () => {
    const { type, data } = slide.content

    switch (slide.layout) {
      case 'title':
        return (
          <div className="flex items-center justify-center h-full text-center">
            <div className="max-w-4xl w-full">
              <div
                ref={titleRef}
                contentEditable={isEditing}
                onBlur={handleTitleChange}
                onKeyDown={handleKeyDown}
                className={`text-5xl font-bold mb-4 outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && onEditingChange(true)}
                dangerouslySetInnerHTML={{ __html: data.title || 'Click to edit title' }}
              />
              {data.subtitle && (
                <div
                  contentEditable={isEditing}
                  className={`text-2xl text-muted-foreground outline-none ${
                    isEditing ? 'cursor-text' : 'cursor-pointer'
                  }`}
                  dangerouslySetInnerHTML={{ __html: data.subtitle }}
                />
              )}
            </div>
          </div>
        )

      case 'title-content':
        return (
          <div className="h-full flex flex-col">
            <div
              ref={titleRef}
              contentEditable={isEditing}
              onBlur={handleTitleChange}
              onKeyDown={handleKeyDown}
              className={`text-3xl font-bold mb-6 outline-none ${
                isEditing ? 'cursor-text' : 'cursor-pointer'
              }`}
              onClick={() => !isEditing && onEditingChange(true)}
              dangerouslySetInnerHTML={{ __html: data.title || 'Click to edit title' }}
            />
            <div
              ref={contentRef}
              contentEditable={isEditing}
              onBlur={handleContentChange}
              onKeyDown={handleKeyDown}
              className={`flex-1 text-lg leading-relaxed outline-none ${
                isEditing ? 'cursor-text' : 'cursor-pointer'
              }`}
              onClick={() => !isEditing && onEditingChange(true)}
              dangerouslySetInnerHTML={{ __html: data.content || 'Click to edit content' }}
            />
          </div>
        )

      case 'two-column':
        return (
          <div className="h-full grid grid-cols-2 gap-8">
            <div>
              <div
                ref={titleRef}
                contentEditable={isEditing}
                onBlur={handleTitleChange}
                onKeyDown={handleKeyDown}
                className={`text-2xl font-bold mb-4 outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && onEditingChange(true)}
                dangerouslySetInnerHTML={{ __html: data.leftTitle || 'Left column title' }}
              />
              <div
                contentEditable={isEditing}
                className={`text-base outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                dangerouslySetInnerHTML={{ __html: data.leftContent || 'Left column content' }}
              />
            </div>
            <div>
              <div
                contentEditable={isEditing}
                className={`text-2xl font-bold mb-4 outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                dangerouslySetInnerHTML={{ __html: data.rightTitle || 'Right column title' }}
              />
              <div
                ref={contentRef}
                contentEditable={isEditing}
                onBlur={handleContentChange}
                onKeyDown={handleKeyDown}
                className={`text-base outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && onEditingChange(true)}
                dangerouslySetInnerHTML={{ __html: data.rightContent || 'Right column content' }}
              />
            </div>
          </div>
        )

      case 'image-right':
      case 'image-left':
        const isImageRight = slide.layout === 'image-right'
        return (
          <div className="h-full grid grid-cols-2 gap-8">
            <div className={isImageRight ? '' : 'order-2'}>
              <div
                ref={titleRef}
                contentEditable={isEditing}
                onBlur={handleTitleChange}
                onKeyDown={handleKeyDown}
                className={`text-2xl font-bold mb-4 outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && onEditingChange(true)}
                dangerouslySetInnerHTML={{ __html: data.title || 'Click to edit title' }}
              />
              <div
                ref={contentRef}
                contentEditable={isEditing}
                onBlur={handleContentChange}
                onKeyDown={handleKeyDown}
                className={`text-base outline-none ${
                  isEditing ? 'cursor-text' : 'cursor-pointer'
                }`}
                onClick={() => !isEditing && onEditingChange(true)}
                dangerouslySetInnerHTML={{ __html: data.content || 'Click to edit content' }}
              />
            </div>
            <div className={`flex items-center justify-center bg-muted rounded-lg ${
              isImageRight ? 'order-2' : ''
            }`}>
              {data.imageUrl ? (
                <img
                  src={data.imageUrl}
                  alt={data.imageAlt || 'Slide image'}
                  className="max-w-full max-h-full object-contain rounded"
                />
              ) : (
                <p className="text-muted-foreground">Click to add image</p>
              )}
            </div>
          </div>
        )

      case 'quote':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="max-w-3xl text-center">
              <blockquote className="text-3xl italic mb-4">
                <div
                  ref={contentRef}
                  contentEditable={isEditing}
                  onBlur={handleContentChange}
                  onKeyDown={handleKeyDown}
                  className={`outline-none ${
                    isEditing ? 'cursor-text' : 'cursor-pointer'
                  }`}
                  onClick={() => !isEditing && onEditingChange(true)}
                  dangerouslySetInnerHTML={{ __html: data.quote || '"Click to edit quote"' }}
                />
              </blockquote>
              <cite className="text-xl text-muted-foreground">
                <div
                  contentEditable={isEditing}
                  className={`outline-none ${
                    isEditing ? 'cursor-text' : 'cursor-pointer'
                  }`}
                  dangerouslySetInnerHTML={{ __html: data.author || '— Author' }}
                />
              </cite>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">
              Select a layout to start editing
            </p>
          </div>
        )
    }
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-lg p-12 relative">
      {renderEditor()}
      
      {/* Editing indicator */}
      {isEditing && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs rounded">
          Editing
        </div>
      )}
      
      {/* Click outside to stop editing */}
      {isEditing && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => onEditingChange(false)}
        />
      )}
    </div>
  )
}