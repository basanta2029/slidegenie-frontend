import { useState } from 'react'
import { X, Copy, Check, Mail, Link2, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ShareModalProps {
  presentationId: string
  onClose: () => void
}

export default function ShareModal({ presentationId, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState<'viewer' | 'editor'>('viewer')
  const [inviteSent, setInviteSent] = useState(false)

  const shareUrl = `${window.location.origin}/presentation/${presentationId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const sendInvite = async () => {
    // Simulate sending invite
    setInviteSent(true)
    setTimeout(() => {
      setInviteSent(false)
      setEmail('')
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Share Presentation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">
                <Link2 className="w-4 h-4 mr-2" />
                Share Link
              </TabsTrigger>
              <TabsTrigger value="invite">
                <Mail className="w-4 h-4 mr-2" />
                Invite People
              </TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="share-link">Presentation Link</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="share-link"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Anyone with this link can view your presentation
                </p>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Current Collaborators
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium">YO</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">You (Owner)</p>
                        <p className="text-xs text-muted-foreground">your@email.com</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">Owner</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invite" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="invite-email">Email Address</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="colleague@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="permission">Permission Level</Label>
                <Select value={permission} onValueChange={(v: 'viewer' | 'editor') => setPermission(v)}>
                  <SelectTrigger id="permission" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Can View</SelectItem>
                    <SelectItem value="editor">Can Edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full"
                onClick={sendInvite}
                disabled={!email || inviteSent}
              >
                {inviteSent ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Invite Sent!
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invite
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}