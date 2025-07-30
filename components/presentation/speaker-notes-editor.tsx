import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface SpeakerNotesEditorProps {
  notes: string
  onUpdate: (notes: string) => void
}

export default function SpeakerNotesEditor({ notes, onUpdate }: SpeakerNotesEditorProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-4">
        <div>
          <Label htmlFor="speaker-notes" className="text-lg font-semibold">
            Speaker Notes
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Add notes that will only be visible to you during presentation
          </p>
        </div>
        
        <Textarea
          id="speaker-notes"
          value={notes}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Enter your speaker notes here..."
          className="min-h-[400px] text-base leading-relaxed"
        />
        
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-2">Tips for effective speaker notes:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep notes brief and use bullet points</li>
            <li>Include key statistics or facts you want to remember</li>
            <li>Add timing cues for important transitions</li>
            <li>Note any audience interaction points</li>
            <li>Include backup information for Q&A</li>
          </ul>
        </div>
      </div>
    </div>
  )
}