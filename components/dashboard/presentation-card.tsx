import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical as MoreVerticalIcon,
  Edit as EditIcon,
  Eye as EyeIcon,
  Copy as CopyIcon,
  Trash as TrashIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Clock as ClockIcon,
  FileText as FileTextIcon,
} from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { PresentationPreviewPopover } from './presentation-preview-popover'

interface Slide {
  id: string
  order: number
  title?: string
  thumbnail?: string
}

interface Presentation {
  id: string
  title: string
  description: string
  thumbnail?: string
  lastModified: Date
  template: string
  slides: number
  slideData?: Slide[]
  status?: string
}

interface PresentationCardProps {
  presentation: Presentation
  view: 'grid' | 'list'
  onDelete?: () => void
  onDuplicate?: () => void
  className?: string
}

export function PresentationCard({
  presentation,
  view,
  onDelete,
  onDuplicate,
  className,
}: PresentationCardProps) {
  const statusColors = {
    'draft': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  }

  if (view === 'list') {
    return (
      <PresentationPreviewPopover
        presentationId={presentation.id}
        title={presentation.title}
        description={presentation.description}
        slides={presentation.slideData}
        slideCount={presentation.slides}
        lastModified={presentation.lastModified}
        template={presentation.template}
      >
        <Card className={cn('group hover:shadow-md transition-shadow cursor-pointer', className)}>
          <div className="flex items-center gap-4 p-4">
          {/* Thumbnail */}
          <div className="hidden sm:block w-24 h-16 rounded bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center">
              <FileTextIcon className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <Link
                  href={`/editor/${presentation.id}`}
                  className="text-sm font-medium text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-1"
                >
                  {presentation.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                  {presentation.description}
                </p>
              </div>
              {presentation.status && (
                <Badge
                  variant="secondary"
                  className={cn('ml-2 flex-shrink-0', statusColors[presentation.status as keyof typeof statusColors])}
                >
                  {presentation.status}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FileTextIcon className="h-3 w-3" />
                {presentation.slides} slides
              </span>
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {formatDistanceToNow(presentation.lastModified, { addSuffix: true })}
              </span>
              <Badge variant="outline" className="text-xs">
                {presentation.template}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/editor/${presentation.id}`}>
                <EditIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/preview/${presentation.id}`}>
                <EyeIcon className="h-4 w-4" />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onDuplicate}>
                  <CopyIcon className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShareIcon className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-red-600 dark:text-red-400"
                >
                  <TrashIcon className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        </Card>
      </PresentationPreviewPopover>
    )
  }

  return (
    <PresentationPreviewPopover
      presentationId={presentation.id}
      title={presentation.title}
      description={presentation.description}
      slides={presentation.slideData}
      slideCount={presentation.slides}
      lastModified={presentation.lastModified}
      template={presentation.template}
    >
      <Card className={cn('group hover:shadow-lg transition-shadow cursor-pointer', className)}>
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <FileTextIcon className="h-16 w-16 text-gray-400" />
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button variant="secondary" size="sm" asChild>
              <Link href={`/editor/${presentation.id}`}>
                <EditIcon className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <Link href={`/preview/${presentation.id}`}>
                <EyeIcon className="mr-2 h-4 w-4" />
                View
              </Link>
            </Button>
          </div>
          {presentation.status && (
            <Badge
              variant="secondary"
              className={cn('absolute top-2 right-2', statusColors[presentation.status as keyof typeof statusColors])}
            >
              {presentation.status}
            </Badge>
          )}
        </div>

      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between">
          <Link
            href={`/editor/${presentation.id}`}
            className="text-base font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-1"
          >
            {presentation.title}
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-1">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDuplicate}>
                <CopyIcon className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShareIcon className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600 dark:text-red-400"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {presentation.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <FileTextIcon className="h-3 w-3" />
              {presentation.slides} slides
            </span>
            <Badge variant="outline" className="text-xs">
              {presentation.template}
            </Badge>
          </div>
          <span className="flex items-center gap-1">
            <ClockIcon className="h-3 w-3" />
            {formatDistanceToNow(presentation.lastModified, { addSuffix: true })}
          </span>
        </div>
      </CardContent>
      </Card>
    </PresentationPreviewPopover>
  )
}