import { useState, useEffect } from 'react'
import { Collaborator } from '@/types'
import { presentationService } from '@/services/presentation.service'

interface CollaboratorAvatarsProps {
  presentationId: string
  maxDisplay?: number
}

export default function CollaboratorAvatars({ 
  presentationId, 
  maxDisplay = 3 
}: CollaboratorAvatarsProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])

  useEffect(() => {
    loadCollaborators()
    
    // Simulate real-time updates
    const interval = setInterval(loadCollaborators, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [presentationId])

  const loadCollaborators = async () => {
    try {
      // This would be replaced with actual API call
      // const data = await presentationService.getCollaborators(presentationId)
      // setCollaborators(data)
      
      // Mock data for demonstration
      setCollaborators([
        {
          id: '1',
          userId: '1',
          user: {
            id: '1',
            name: 'You',
            email: 'you@example.com',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          role: 'owner',
          isActive: true
        }
      ])
    } catch (error) {
      console.error('Failed to load collaborators:', error)
    }
  }

  const activeCollaborators = collaborators.filter(c => c.isActive)
  const displayCollaborators = activeCollaborators.slice(0, maxDisplay)
  const remainingCount = activeCollaborators.length - maxDisplay

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (userId: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-indigo-500'
    ]
    const index = parseInt(userId) % colors.length
    return colors[index]
  }

  if (activeCollaborators.length === 0) {
    return null
  }

  return (
    <div className="flex items-center -space-x-2">
      {displayCollaborators.map((collaborator) => (
        <div
          key={collaborator.id}
          className="relative group"
          title={`${collaborator.user.name} (${collaborator.role})`}
        >
          {collaborator.user.avatar ? (
            <img
              src={collaborator.user.avatar}
              alt={collaborator.user.name}
              className="w-8 h-8 rounded-full border-2 border-background"
            />
          ) : (
            <div
              className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium text-white ${
                getAvatarColor(collaborator.userId)
              }`}
            >
              {getInitials(collaborator.user.name)}
            </div>
          )}
          
          {/* Active indicator */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {collaborator.user.name}
            <div className="text-[10px] text-muted-foreground">
              {collaborator.role}
            </div>
          </div>
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  )
}