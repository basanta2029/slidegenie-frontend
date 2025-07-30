'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search as SearchIcon, X as XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onSearch?: () => void
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  onSearch,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.()
  }

  const handleClear = () => {
    setLocalValue('')
    onChange('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className="pl-9 pr-10"
      />
      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
          onClick={handleClear}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </form>
  )
}