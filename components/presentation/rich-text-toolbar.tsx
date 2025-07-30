import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Image,
  Code,
  Quote
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface RichTextToolbarProps {
  onFormat: (command: string, value?: string) => void
}

export default function RichTextToolbar({ onFormat }: RichTextToolbarProps) {
  const formatButtons = [
    { command: 'bold', icon: Bold, title: 'Bold (Ctrl+B)' },
    { command: 'italic', icon: Italic, title: 'Italic (Ctrl+I)' },
    { command: 'underline', icon: Underline, title: 'Underline (Ctrl+U)' },
  ]

  const listButtons = [
    { command: 'insertUnorderedList', icon: List, title: 'Bullet List' },
    { command: 'insertOrderedList', icon: ListOrdered, title: 'Numbered List' },
  ]

  const alignButtons = [
    { command: 'justifyLeft', icon: AlignLeft, title: 'Align Left' },
    { command: 'justifyCenter', icon: AlignCenter, title: 'Align Center' },
    { command: 'justifyRight', icon: AlignRight, title: 'Align Right' },
  ]

  const insertButtons = [
    { command: 'createLink', icon: Link, title: 'Insert Link' },
    { command: 'insertImage', icon: Image, title: 'Insert Image' },
    { command: 'formatBlock', icon: Quote, title: 'Quote', value: 'blockquote' },
    { command: 'formatBlock', icon: Code, title: 'Code Block', value: 'pre' },
  ]

  const handleCommand = (command: string, value?: string) => {
    if (command === 'createLink') {
      const url = window.prompt('Enter URL:')
      if (url) {
        onFormat(command, url)
      }
    } else if (command === 'insertImage') {
      const url = window.prompt('Enter image URL:')
      if (url) {
        onFormat('insertHTML', `<img src="${url}" alt="Image" class="max-w-full h-auto" />`)
      }
    } else {
      onFormat(command, value)
    }
  }

  return (
    <div className="flex items-center gap-1 px-4 py-2 border-t bg-background">
      {/* Text Formatting */}
      <div className="flex items-center gap-1">
        {formatButtons.map((button) => (
          <Button
            key={button.command}
            variant="ghost"
            size="sm"
            onClick={() => handleCommand(button.command)}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists */}
      <div className="flex items-center gap-1">
        {listButtons.map((button) => (
          <Button
            key={button.command}
            variant="ghost"
            size="sm"
            onClick={() => handleCommand(button.command)}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Alignment */}
      <div className="flex items-center gap-1">
        {alignButtons.map((button) => (
          <Button
            key={button.command}
            variant="ghost"
            size="sm"
            onClick={() => handleCommand(button.command)}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Insert */}
      <div className="flex items-center gap-1">
        {insertButtons.map((button, index) => (
          <Button
            key={`${button.command}-${index}`}
            variant="ghost"
            size="sm"
            onClick={() => handleCommand(button.command, button.value)}
            title={button.title}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Font Size */}
      <select
        onChange={(e) => handleCommand('fontSize', e.target.value)}
        className="h-8 px-2 text-sm border rounded bg-background"
        defaultValue="3"
      >
        <option value="1">Small</option>
        <option value="3">Normal</option>
        <option value="5">Large</option>
        <option value="7">Huge</option>
      </select>

      {/* Heading Level */}
      <select
        onChange={(e) => handleCommand('formatBlock', e.target.value)}
        className="h-8 px-2 text-sm border rounded bg-background ml-2"
        defaultValue="p"
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>
    </div>
  )
}