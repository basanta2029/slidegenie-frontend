import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface KeyboardShortcutsProps {
  onClose: () => void
}

export default function KeyboardShortcuts({ onClose }: KeyboardShortcutsProps) {
  const shortcuts = [
    { key: '← →', description: 'Navigate between slides' },
    { key: 'F', description: 'Toggle fullscreen' },
    { key: 'G', description: 'Show/hide slide grid' },
    { key: 'P', description: 'Toggle presenter view' },
    { key: 'ESC', description: 'Exit current view' },
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: 'Space', description: 'Next slide' },
    { key: 'Enter', description: 'Next slide' },
    { key: 'Home', description: 'First slide' },
    { key: 'End', description: 'Last slide' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between py-2"
              >
                <kbd className="px-3 py-1 text-sm font-mono bg-muted rounded">
                  {shortcut.key}
                </kbd>
                <span className="text-sm text-muted-foreground">
                  {shortcut.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 pt-0">
          <Button
            className="w-full"
            onClick={onClose}
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  )
}