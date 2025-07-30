'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'
import { Filter as FilterIcon, Calendar as CalendarIcon, Tag as TagIcon, Check as CheckIcon } from 'lucide-react'

interface FilterOption {
  dateRange?: string
  template?: string
  status?: string
}

interface FilterDropdownProps {
  filters: FilterOption
  onFiltersChange: (filters: FilterOption) => void
}

const dateRangeOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
]

const templateOptions = [
  { value: 'all', label: 'All Templates' },
  { value: 'Academic Research', label: 'Academic Research' },
  { value: 'Scientific Report', label: 'Scientific Report' },
  { value: 'Literature Review', label: 'Literature Review' },
  { value: 'Technical Tutorial', label: 'Technical Tutorial' },
  { value: 'Workshop', label: 'Workshop' },
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

export function FilterDropdown({ filters, onFiltersChange }: FilterDropdownProps) {
  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && value !== 'all'
  ).length

  const updateFilter = (key: keyof FilterOption, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FilterIcon className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Date Range */}
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          <CalendarIcon className="mr-2 h-3 w-3 inline" />
          Date Range
        </DropdownMenuLabel>
        {dateRangeOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={filters.dateRange === option.value}
            onCheckedChange={() => updateFilter('dateRange', option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* Template */}
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          <TagIcon className="mr-2 h-3 w-3 inline" />
          Template
        </DropdownMenuLabel>
        {templateOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={filters.template === option.value}
            onCheckedChange={() => updateFilter('template', option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* Status */}
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          <CheckIcon className="mr-2 h-3 w-3 inline" />
          Status
        </DropdownMenuLabel>
        {statusOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={filters.status === option.value}
            onCheckedChange={() => updateFilter('status', option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        
        {activeFiltersCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters} className="text-center">
              Clear all filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}