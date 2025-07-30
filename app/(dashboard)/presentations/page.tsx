'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Search as SearchIcon,
  Plus as PlusIcon,
  Grid as GridIcon,
  List as ListIcon,
  Filter as FilterIcon,
  ArrowUpDown as ArrowUpDownIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Tag as TagIcon,
  MoreVertical as MoreVerticalIcon,
} from 'lucide-react'
import { PresentationCard } from '@/components/dashboard/presentation-card'
import { EmptyState } from '@/components/dashboard/empty-state'
import { FilterDropdown } from '@/components/dashboard/filter-dropdown'
import { SearchBar } from '@/components/dashboard/search-bar'
import { LoadingGrid } from '@/components/dashboard/loading-grid'
import { useDebounce } from '@/hooks/use-debounce'

// Mock data - replace with actual API calls
const mockPresentations = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to ML concepts and algorithms',
    thumbnail: '/thumbnails/ml-presentation.jpg',
    lastModified: new Date('2024-01-25'),
    template: 'Academic Research',
    slides: 25,
    status: 'completed',
  },
  {
    id: '2',
    title: 'Climate Change Analysis',
    description: 'Environmental impact study results',
    thumbnail: '/thumbnails/climate-presentation.jpg',
    lastModified: new Date('2024-01-24'),
    template: 'Scientific Report',
    slides: 30,
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Literature Review: Digital Humanities',
    description: 'Comprehensive review of recent publications',
    thumbnail: '/thumbnails/literature-presentation.jpg',
    lastModified: new Date('2024-01-22'),
    template: 'Literature Review',
    slides: 18,
    status: 'completed',
  },
  {
    id: '4',
    title: 'Quantum Computing Overview',
    description: 'Basic principles and applications',
    thumbnail: '/thumbnails/quantum-presentation.jpg',
    lastModified: new Date('2024-01-20'),
    template: 'Technical Tutorial',
    slides: 22,
    status: 'draft',
  },
  {
    id: '5',
    title: 'Data Visualization Best Practices',
    description: 'Effective techniques for presenting data',
    thumbnail: '/thumbnails/dataviz-presentation.jpg',
    lastModified: new Date('2024-01-18'),
    template: 'Workshop',
    slides: 28,
    status: 'completed',
  },
  {
    id: '6',
    title: 'Research Methodology',
    description: 'Qualitative and quantitative approaches',
    thumbnail: '/thumbnails/methodology-presentation.jpg',
    lastModified: new Date('2024-01-15'),
    template: 'Academic Research',
    slides: 35,
    status: 'completed',
  },
]

type ViewMode = 'grid' | 'list'
type SortOption = 'date' | 'name' | 'modified'
type FilterOption = {
  dateRange?: string
  template?: string
  status?: string
}

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState(mockPresentations)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('modified')
  const [filters, setFilters] = useState<FilterOption>({})
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const itemsPerPage = 12

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  // Filter and sort presentations
  const filteredPresentations = useCallback(() => {
    let filtered = [...presentations]

    // Search filter
    if (debouncedSearchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    }

    // Template filter
    if (filters.template && filters.template !== 'all') {
      filtered = filtered.filter((p) => p.template === filters.template)
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((p) => p.status === filters.status)
    }

    // Date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date()
      const ranges = {
        'today': 1,
        'week': 7,
        'month': 30,
        'year': 365,
      }
      const days = ranges[filters.dateRange as keyof typeof ranges]
      if (days) {
        filtered = filtered.filter((p) => {
          const diff = now.getTime() - p.lastModified.getTime()
          return diff <= days * 24 * 60 * 60 * 1000
        })
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'date':
          return b.lastModified.getTime() - a.lastModified.getTime()
        case 'modified':
        default:
          return b.lastModified.getTime() - a.lastModified.getTime()
      }
    })

    return filtered
  }, [presentations, debouncedSearchQuery, filters, sortBy])

  const paginatedPresentations = filteredPresentations().slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  const totalPages = Math.ceil(filteredPresentations().length / itemsPerPage)

  const handleDelete = (id: string) => {
    setPresentations(presentations.filter((p) => p.id !== id))
  }

  const handleDuplicate = (id: string) => {
    const presentation = presentations.find((p) => p.id === id)
    if (presentation) {
      const duplicate = {
        ...presentation,
        id: Date.now().toString(),
        title: `${presentation.title} (Copy)`,
        lastModified: new Date(),
      }
      setPresentations([duplicate, ...presentations])
    }
  }

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Presentations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize all your presentations in one place
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <PlusIcon className="h-5 w-5" />
          New Presentation
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search presentations..."
            className="max-w-md"
          />
          <FilterDropdown
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUpDownIcon className="h-4 w-4" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortBy('modified')}>
                Last Modified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('name')}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('date')}>
                Date Created
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
            <TabsList>
              <TabsTrigger value="grid" className="gap-2">
                <GridIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <ListIcon className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <p>
          Showing {paginatedPresentations.length} of {filteredPresentations().length} presentations
        </p>
        {(debouncedSearchQuery || Object.keys(filters).length > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery('')
              setFilters({})
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Presentations Grid/List */}
      {loading ? (
        <LoadingGrid count={6} viewMode={viewMode} />
      ) : paginatedPresentations.length > 0 ? (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'space-y-4'
            }
          >
            {paginatedPresentations.map((presentation) => (
              <PresentationCard
                key={presentation.id}
                presentation={presentation}
                view={viewMode}
                onDelete={() => handleDelete(presentation.id)}
                onDuplicate={() => handleDuplicate(presentation.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'ghost'}
                    size="sm"
                    className="w-10"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={<SearchIcon className="h-12 w-12" />}
          title="No presentations found"
          description={
            debouncedSearchQuery || Object.keys(filters).length > 0
              ? 'Try adjusting your search or filters'
              : 'Create your first presentation to get started'
          }
          action={
            debouncedSearchQuery || Object.keys(filters).length > 0 ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setFilters({})
                }}
              >
                Clear filters
              </Button>
            ) : (
              <Button>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Presentation
              </Button>
            )
          }
        />
      )}
    </div>
  )
}