import { Presentation, ExportHistory } from '@/types'

export const mockPresentation: Presentation = {
  id: '1',
  title: 'Introduction to Machine Learning',
  description: 'A comprehensive overview of ML concepts and applications',
  userId: 'user-1',
  status: 'published',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  slides: [
    {
      id: 'slide-1',
      order: 0,
      layout: 'title',
      content: {
        type: 'text',
        data: {
          title: 'Introduction to Machine Learning',
          subtitle: 'Understanding the fundamentals of AI and ML'
        }
      },
      notes: 'Welcome everyone. Today we\'ll explore the fascinating world of machine learning.'
    },
    {
      id: 'slide-2',
      order: 1,
      layout: 'title-content',
      content: {
        type: 'text',
        data: {
          title: 'What is Machine Learning?',
          content: '<p>Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.</p><ul><li>Learns from data</li><li>Identifies patterns</li><li>Makes decisions with minimal human intervention</li></ul>'
        }
      },
      notes: 'Emphasize that ML is about pattern recognition and automated decision-making.'
    },
    {
      id: 'slide-3',
      order: 2,
      layout: 'two-column',
      content: {
        type: 'mixed',
        data: {
          leftTitle: 'Supervised Learning',
          leftContent: '<p>Learning with labeled data:</p><ul><li>Classification</li><li>Regression</li><li>Examples: Email spam detection, house price prediction</li></ul>',
          rightTitle: 'Unsupervised Learning',
          rightContent: '<p>Learning without labeled data:</p><ul><li>Clustering</li><li>Dimensionality reduction</li><li>Examples: Customer segmentation, anomaly detection</li></ul>'
        }
      },
      notes: 'Contrast the two main types of learning. Use real-world examples.'
    },
    {
      id: 'slide-4',
      order: 3,
      layout: 'quote',
      content: {
        type: 'text',
        data: {
          quote: 'Machine learning is the science of getting computers to act without being explicitly programmed.',
          author: 'Andrew Ng, Stanford University'
        }
      },
      notes: 'Pause here for emphasis. This quote captures the essence of ML.'
    },
    {
      id: 'slide-5',
      order: 4,
      layout: 'title-content',
      content: {
        type: 'text',
        data: {
          title: 'Thank You',
          content: '<p>Questions?</p><p>Contact: presenter@example.com</p>'
        }
      },
      notes: 'Open the floor for questions. Have backup slides ready for common questions.'
    }
  ]
}

export const mockExportHistory: ExportHistory[] = [
  {
    id: 'export-1',
    presentationId: '1',
    format: 'pdf',
    options: {
      format: 'pdf',
      quality: 'high',
      includeNotes: false,
      slidesPerPage: 1
    },
    status: 'complete',
    url: '/mock-exports/presentation.pdf',
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: 'export-2',
    presentationId: '1',
    format: 'pptx',
    options: {
      format: 'pptx',
      includeNotes: true
    },
    status: 'complete',
    url: '/mock-exports/presentation.pptx',
    createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  },
  {
    id: 'export-3',
    presentationId: '1',
    format: 'latex',
    options: {
      format: 'latex'
    },
    status: 'processing',
    createdAt: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
  }
]