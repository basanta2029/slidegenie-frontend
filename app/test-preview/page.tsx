"use client"

import { PresentationCard } from '@/components/dashboard/presentation-card'
import { useState } from 'react'

export default function TestPreviewPage() {
  // Mock presentation data
  const mockPresentations = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'A comprehensive overview of ML concepts, algorithms, and applications in modern data science.',
      slides: 24,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      template: 'Academic',
      status: 'completed',
      slideData: [
        { id: '1-1', order: 1, title: 'Title Slide' },
        { id: '1-2', order: 2, title: 'Introduction' },
        { id: '1-3', order: 3, title: 'What is Machine Learning?' },
        { id: '1-4', order: 4, title: 'Types of ML' },
        { id: '1-5', order: 5, title: 'Supervised Learning' },
        { id: '1-6', order: 6, title: 'Unsupervised Learning' },
      ]
    },
    {
      id: '2',
      title: 'Quarterly Business Review',
      description: 'Q4 2024 performance metrics and strategic initiatives for the upcoming quarter.',
      slides: 16,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      template: 'Business',
      status: 'in-progress',
    },
    {
      id: '3',
      title: 'Research Proposal: Climate Change Impact',
      description: 'Investigating the effects of climate change on coastal ecosystems using satellite imagery and ML analysis.',
      slides: 32,
      lastModified: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      template: 'Research',
      status: 'draft',
    },
  ]

  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Presentation Preview Test</h1>
      
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setView('grid')}
          className={`px-4 py-2 rounded ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          Grid View
        </button>
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${view === 'list' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
        >
          List View
        </button>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {mockPresentations.map((presentation) => (
          <PresentationCard
            key={presentation.id}
            presentation={presentation}
            view={view}
            onDelete={() => console.log('Delete:', presentation.id)}
            onDuplicate={() => console.log('Duplicate:', presentation.id)}
          />
        ))}
      </div>
    </div>
  )
}