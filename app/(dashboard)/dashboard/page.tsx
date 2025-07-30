'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus as PlusIcon,
  Presentation as PresentationIcon,
  Download as DownloadIcon,
  Users as UsersIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
  Sparkles as SparklesIcon,
  FileText as FileTextIcon,
  Rocket as RocketIcon,
  Activity as ActivityIcon,
} from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { PresentationCard } from '@/components/dashboard/presentation-card'
import { EmptyState } from '@/components/dashboard/empty-state'

// Mock data - replace with actual API calls
const mockStats = {
  totalPresentations: 12,
  monthlyPresentations: 3,
  totalExports: 45,
  totalCollaborators: 5,
}

const mockRecentPresentations = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to ML concepts and algorithms',
    thumbnail: '/thumbnails/ml-presentation.jpg',
    lastModified: new Date('2024-01-25'),
    template: 'Academic Research',
    slides: 25,
  },
  {
    id: '2',
    title: 'Climate Change Analysis',
    description: 'Environmental impact study results',
    thumbnail: '/thumbnails/climate-presentation.jpg',
    lastModified: new Date('2024-01-24'),
    template: 'Scientific Report',
    slides: 30,
  },
  {
    id: '3',
    title: 'Literature Review: Digital Humanities',
    description: 'Comprehensive review of recent publications',
    thumbnail: '/thumbnails/literature-presentation.jpg',
    lastModified: new Date('2024-01-22'),
    template: 'Literature Review',
    slides: 18,
  },
]

const mockActivityTimeline = [
  {
    id: '1',
    action: 'Created presentation',
    item: 'Machine Learning Fundamentals',
    time: '2 hours ago',
    icon: PlusIcon,
  },
  {
    id: '2',
    action: 'Exported to PDF',
    item: 'Climate Change Analysis',
    time: '5 hours ago',
    icon: DownloadIcon,
  },
  {
    id: '3',
    action: 'Shared with team',
    item: 'Literature Review: Digital Humanities',
    time: 'Yesterday',
    icon: UsersIcon,
  },
]

export default function DashboardPage() {
  const [userName, setUserName] = useState('John')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {greeting}, {userName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ready to create amazing presentations today?
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <PlusIcon className="h-5 w-5" />
          New Presentation
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Presentations"
          value={mockStats.totalPresentations}
          description="All time"
          icon={<PresentationIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="This Month"
          value={mockStats.monthlyPresentations}
          description="Presentations created"
          icon={<ClockIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Total Exports"
          value={mockStats.totalExports}
          description="PDF & PPTX downloads"
          icon={<DownloadIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Collaborators"
          value={mockStats.totalCollaborators}
          description="Team members"
          icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Quick Start Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RocketIcon className="h-5 w-5" />
            Quick Start
          </CardTitle>
          <CardDescription>Jump right into creating your next presentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary" asChild>
              <Link href="/create?template=blank">
                <FileTextIcon className="h-8 w-8" />
                <span>Start from Scratch</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary" asChild>
              <Link href="/templates">
                <SparklesIcon className="h-8 w-8" />
                <span>Use AI Templates</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 hover:border-primary" asChild>
              <Link href="/create?import=true">
                <TrendingUpIcon className="h-8 w-8" />
                <span>Import Content</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Presentations and Activity */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Presentations</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/presentations">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {mockRecentPresentations.length > 0 ? (
                <div className="grid gap-4">
                  {mockRecentPresentations.map((presentation) => (
                    <PresentationCard
                      key={presentation.id}
                      presentation={presentation}
                      view="list"
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={<PresentationIcon className="h-12 w-12" />}
                  title="No presentations yet"
                  description="Create your first presentation to get started"
                  action={
                    <Button>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Create Presentation
                    </Button>
                  }
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ActivityIcon className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivityTimeline.map((activity, index) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <activity.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    {index < mockActivityTimeline.length - 1 && (
                      <div className="absolute left-5 top-10 h-full w-px bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.item}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips and Updates */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-primary" />
            Pro Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Did you know? You can use AI to automatically generate slide content from your research papers. 
            Simply upload a PDF or paste your text, and SlideGenie will create a professional presentation 
            tailored to your academic field.
          </p>
          <Button variant="link" className="mt-2 p-0 h-auto" asChild>
            <Link href="/help/ai-features">Learn more about AI features →</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}