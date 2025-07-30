'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sparkles as SparklesIcon,
  BookOpen as BookOpenIcon,
  Microscope as MicroscopeIcon,
  Presentation as PresentationIcon,
  GraduationCap as GraduationCapIcon,
  Brain as BrainIcon,
  Flask as FlaskIcon,
  BarChart as BarChartIcon,
  FileText as FileTextIcon,
  Rocket as RocketIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Star as StarIcon,
  Lock as LockIcon,
} from 'lucide-react'
import { EmptyState } from '@/components/dashboard/empty-state'

// Template categories with icons
const categories = [
  { id: 'all', name: 'All Templates', icon: SparklesIcon },
  { id: 'research', name: 'Research', icon: MicroscopeIcon },
  { id: 'education', name: 'Education', icon: GraduationCapIcon },
  { id: 'science', name: 'Science', icon: FlaskIcon },
  { id: 'business', name: 'Business', icon: BarChartIcon },
  { id: 'thesis', name: 'Thesis', icon: BookOpenIcon },
  { id: 'conference', name: 'Conference', icon: PresentationIcon },
]

// Mock templates data
const mockTemplates = [
  {
    id: '1',
    name: 'Academic Research Paper',
    description: 'Perfect for presenting research findings with data visualizations',
    category: 'research',
    thumbnail: '/templates/research-paper.jpg',
    slides: 15,
    isPremium: false,
    rating: 4.8,
    uses: 1250,
    fields: ['Computer Science', 'Engineering', 'Mathematics'],
  },
  {
    id: '2',
    name: 'Scientific Conference',
    description: 'Professional template for scientific conferences and symposiums',
    category: 'conference',
    thumbnail: '/templates/scientific-conference.jpg',
    slides: 20,
    isPremium: true,
    rating: 4.9,
    uses: 890,
    fields: ['Biology', 'Chemistry', 'Physics'],
  },
  {
    id: '3',
    name: 'Literature Review',
    description: 'Structured template for comprehensive literature reviews',
    category: 'research',
    thumbnail: '/templates/literature-review.jpg',
    slides: 18,
    isPremium: false,
    rating: 4.7,
    uses: 756,
    fields: ['Humanities', 'Social Sciences', 'Psychology'],
  },
  {
    id: '4',
    name: 'Thesis Defense',
    description: 'Complete template for Masters and PhD thesis presentations',
    category: 'thesis',
    thumbnail: '/templates/thesis-defense.jpg',
    slides: 25,
    isPremium: true,
    rating: 4.9,
    uses: 2100,
    fields: ['All Fields'],
  },
  {
    id: '5',
    name: 'Lab Report',
    description: 'Clean template for presenting laboratory findings and experiments',
    category: 'science',
    thumbnail: '/templates/lab-report.jpg',
    slides: 12,
    isPremium: false,
    rating: 4.6,
    uses: 543,
    fields: ['Biology', 'Chemistry', 'Physics', 'Engineering'],
  },
  {
    id: '6',
    name: 'Case Study Analysis',
    description: 'Detailed template for business and medical case studies',
    category: 'business',
    thumbnail: '/templates/case-study.jpg',
    slides: 16,
    isPremium: true,
    rating: 4.8,
    uses: 678,
    fields: ['Business', 'Medicine', 'Law', 'Social Sciences'],
  },
  {
    id: '7',
    name: 'Educational Workshop',
    description: 'Interactive template for workshops and training sessions',
    category: 'education',
    thumbnail: '/templates/workshop.jpg',
    slides: 22,
    isPremium: false,
    rating: 4.7,
    uses: 932,
    fields: ['Education', 'Training', 'Professional Development'],
  },
  {
    id: '8',
    name: 'Research Proposal',
    description: 'Structured template for research grant proposals',
    category: 'research',
    thumbnail: '/templates/research-proposal.jpg',
    slides: 14,
    isPremium: true,
    rating: 4.8,
    uses: 467,
    fields: ['All Research Fields'],
  },
]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [academicField, setAcademicField] = useState('all')
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  // Filter templates
  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesField = academicField === 'all' || 
                        template.fields.includes('All Fields') ||
                        template.fields.some(field => field.toLowerCase().includes(academicField.toLowerCase()))
    const matchesPremium = !showPremiumOnly || template.isPremium

    return matchesCategory && matchesSearch && matchesField && matchesPremium
  })

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Template Gallery</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Choose from our collection of professionally designed academic templates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <SparklesIcon className="h-3 w-3" />
            {mockTemplates.length} Templates
          </Badge>
          <Badge variant="outline" className="gap-1">
            <StarIcon className="h-3 w-3" />
            Premium Available
          </Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={academicField} onValueChange={setAcademicField}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Academic Field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="humanities">Humanities</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={showPremiumOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className="gap-2"
          >
            <StarIcon className="h-4 w-4" />
            Premium Only
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="gap-2 whitespace-nowrap"
            >
              <category.icon className="h-4 w-4" />
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Premium Badge */}
                  {template.isPremium && (
                    <div className="absolute right-2 top-2 z-10">
                      <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <StarIcon className="h-3 w-3" />
                        Premium
                      </Badge>
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PresentationIcon className="h-16 w-16 text-gray-400" />
                    </div>
                    {template.isPremium && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <LockIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <FileTextIcon className="h-4 w-4 text-gray-400" />
                          {template.slides} slides
                        </span>
                        <span className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 text-yellow-500" />
                          {template.rating}
                        </span>
                      </div>
                      <span className="text-gray-500">{template.uses} uses</span>
                    </div>

                    {/* Fields */}
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 2).map((field) => (
                        <Badge key={field} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                      {template.fields.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.fields.length - 2}
                        </Badge>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button
                      className="w-full"
                      variant={template.isPremium ? 'default' : 'outline'}
                      asChild
                    >
                      <Link href={`/create?template=${template.id}`}>
                        {template.isPremium ? 'Unlock & Use' : 'Use Template'}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchIcon className="h-12 w-12" />}
              title="No templates found"
              description="Try adjusting your search or filters"
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setAcademicField('all')
                    setShowPremiumOnly(false)
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RocketIcon className="h-5 w-5 text-primary" />
            Can't find what you're looking for?
          </CardTitle>
          <CardDescription>
            Our AI can help you create a custom template tailored to your specific needs
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/create?custom=true">
              Create Custom Template
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}